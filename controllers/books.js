const { ObjectID } = require('mongodb');

async function advancedSearch(req, res, next) {
  try {
    const {
      app: { locals: { books } },
      body,
    } = req;
    console.log({ body });

    // const search = // concat body

    const countNumber = 10;
    const pageNumber = 1;
    const skipNumber = (pageNumber - 1) * countNumber;

    const query = [];
    const textQuery = { $match: { $text: { $search: decodeURIComponent(search) } } };
    const facetQuery = {
      $facet: {
        // TODO add sorting
        documents: [{ $skip: skipNumber }, {
          $limit: countNumber,
        }],
        total: [{ $count: 'count' }],
      },
    };

    return res.json(body);
  } catch (error) {
    return next(error);
  }
}

async function browse(req, res, next) {
  try {
    const {
      app: { locals: { books } },
      params: { letter },
    } = req;
    const lower = letter.toLowerCase();
    const upper = letter.toUpperCase();

    // ensure we have a valid letter
    const isValid = (x) => (/[a-zA-Z]/).test(x) && x.length === 1;

    if (!isValid(lower) && !isValid(upper)) {
      return res.sendStatus(400);
    }

    const results = await books.aggregate([
      { $unwind: '$filmsDiscussed' },
      {
        $match: { filmsDiscussed: { $regex: new RegExp(`^[${upper}${lower}]`) } },
      }, {
        $group: {
          _id: '$filmsDiscussed',
          documents: { $push: '$$ROOT._id' },
        },
      }, {
        $sort: { _id: 1 },
      },
    ]).toArray();
    res.render('browse.hbs', {
      results: results.map(({ _id, documents }) => ({
        title: _id,
        books: documents,
      })),
    });
  } catch (error) {
    return next(error);
  }
}

async function quickSearch(req, res, next) {
  try {
    const {
      app: {
        locals: {
          books,
        },
      },
      query: {
        count,
        page,
        search,
        sort,
        tag,
      },
    } = req;

    const countNumber = parseInt(count, 10) || 10;
    const pageNumber = parseInt(page, 10) || 1;
    const skipNumber = (pageNumber - 1) * countNumber;

    const query = [];
    const sortQuery = { $sort: { [sort || 'title']: 1 } };
    const textQuery = { $match: { $text: { $search: decodeURIComponent(search) } } };
    const tagQuery = { $match: { tags: decodeURIComponent(tag) } };
    const facetQuery = {
      $facet: {
        // TODO add sorting
        documents: [{ $skip: skipNumber }, {
          $limit: countNumber,
        }],
        total: [{ $count: 'count' }],
      },
    };

    if (search) {
      query.push(textQuery);
    }

    if (sort) {
      query.push(sortQuery);
    }

    if (tag) {
      query.push(tagQuery);
    }

    query.push(facetQuery);

    const [results] = await books.aggregate(query).toArray();
    const { documents } = results;

    // TODO handle queries with no results, show something in the UI
    if (!documents.length > 0) {
      return res.sendStatus(400);
      // return res.render('results', {
      //   noResults: true,
      //   param: search,
      // });
    }

    const total = results.total[0].count;
    const range = (documents.length + skipNumber);
    const nextPage = (range < total) ? (pageNumber + 1) : 0;
    const prevPage = (pageNumber !== 1) ? (pageNumber - 1) : 0;
    const currPage = pageNumber;
    const pages = Array.from({
      length: Math.ceil(total / countNumber),
    }, (a, i) => i + 1);
    const getParam = tag || search;
    const param = decodeURI(getParam);
    const type = (tag && 'tag') || (search && 'search');

    return res.render('results', {
      documents,
      page: {
        count,
        param,
        range,
        sort,
        total,
        type,
      },
      pagination: {
        pages,
        prevPage,
        currPage,
        nextPage,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function getOne(req, res, next) {
  try {
    const {
      app: { locals: { books } },
      params: { book },
    } = req;
    const document = await books.findOne({ href: book });
    return document ? res.render('book', { document }) : res.sendStatus(404);
  } catch (error) {
    return next(error);
  }
}

async function getMany(req, res, next) {
  try {
    const {
      app: { locals: { books } },
      body: { documents },
    } = req;
    const results = await books.find({
      _id: { $in: documents.map((document) => ObjectID(document)) },
    }).toArray();
    res.json({ books: results });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  advancedSearch,
  browse,
  quickSearch,
  getOne,
  getMany,
};
