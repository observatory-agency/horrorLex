// TODO - this may be controlled in the UI
const DOCS_PER_PAGE = 10;

async function getAll(req, res, next) {
  // try {
  //   const { app: { locals: { books } } } = req;
  //   const allDocuments = await books.find().toArray();
  //   // const document = documents[Math.floor(Math.random() * documents.length - 1)];
  //   const documents = allDocuments.slice(0, 10);
  //   return documents ? res.render('results', { documents }) : res.sendStatus(500);
  // } catch (error) {
  //   return next(error);
  // }
  try {
    const {
      app: { locals: { books } },
      query: {
        count,
        page,
        search,
        sort,
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
        // TODO add sort
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
    const lastPage = (pageNumber !== 1) ? (pageNumber - 1) : 0;
    const pageCount = Math.ceil(total / count);
    const pages = Array.from({ length: pageCount }, (a, i) => i + 1);

    return res.render('results', {
      count, // query param for count (number per page)
      documents,
      lastPage,
      nextPage,
      pages, // an array of page numbers
      range, // chunk of documents for the page
      total, // documents total count
      param: tag || search, // query param for action
      type: (tag && 'tag') || (search && 'search'),
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
