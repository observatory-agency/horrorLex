async function advancedSearch(req, res, next) {
  try {
    const {
      app: { locals: { books } },
      body,
    } = req;
    console.log({ body });
    return res.json(body);
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

module.exports = {
  advancedSearch,
  quickSearch,
  getOne,
};
