async function getAll(req, res, next) {
  try {
    const {
      app: { locals: { books } },
      query: {
        count,
        page,
        search,
        // sort,
        tag,
      },
    } = req;

    const countNumber = parseInt(count, 10) || 10;
    const pageNumber = parseInt(page, 10) || 1;
    const skip = (pageNumber - 1) * countNumber;

    const query = [];
    const textQuery = { $match: { $text: { $search: search } } };
    const tagQuery = { $match: { tags: tag } };
    const facetQuery = {
      $facet: {
        // TODO add sorting
        documents: [{ $skip: skip }, {
          $limit: countNumber,
        }],
        total: [{ $count: 'count' }],
      },
    };

    if (tag) {
      query.push(tagQuery);
    }

    if (search) {
      query.push(textQuery);
    }

    query.push(facetQuery);

    const [results] = await books.aggregate(query).toArray();
    const { documents } = results;
    const total = results.total[0].count;
    const range = (documents.length + skip);
    const nextPage = (range < total) ? (pageNumber + 1) : 0;
    const prevPage = (pageNumber !== 1) ? (pageNumber - 1) : 0;
    const currPage = pageNumber;
    const pages = Array.from({ length: Math.ceil(total / countNumber) }, (a, i) => i + 1);
    const param = tag || search;
    const type = (tag && 'tag') || (search && 'search');

    // TODO handle queries with no results
    if (!documents.length > 0) {
      return res.sendStatus(400);
      // return res.render('results', {
      //   noResults: true,
      //   param: search,
      // });
    }

    return res.render('results', {
      documents,
      page: {
        count,
        param,
        range,
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
    const { app: { locals: { books } } } = req;
    const documents = await books.find().toArray();
    const document = documents[Math.floor(Math.random() * documents.length - 1)];
    return document ? res.render('individualResult', { document }) : res.sendStatus(500);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAll,
  getOne,
};
