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

    const pageNumber = parseInt(page, 10) || 1;
    const skip = (pageNumber - 1) * count;

    const query = [];
    const text = { $match: { $text: { $search: search } } };
    const match = { $match: { tags: tag } };
    const facet = {
      $facet: {
        // TODO add sorting
        documents: [{ $skip: skip }, {
          $limit: parseInt(count, 10) || 10,
        }],
        total: [{ $count: 'count' }],
      },
    };

    if (tag) {
      query.push(match);
    }

    if (search) {
      query.push(text);
    }

    query.push(facet);

    const [results] = await books.aggregate(query).toArray();
    const { documents } = results;

    if (!documents.length > 0) {
      return res.render('results', {
        noResults: true,
        param: search,
      });
    }

    const total = results.total[0].count;
    const range = (documents.length + skip);
    const nextPage = (range < total) ? (pageNumber + 1) : 0;
    const prevPage = (pageNumber !== 1) ? (pageNumber - 1) : 0;
    const currPage = pageNumber;
    const pages = Array.from({ length: Math.ceil(total / count) }, (a, i) => i + 1);
    const param = tag || search;
    const type = (tag && 'tag') || (search && 'search');

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
