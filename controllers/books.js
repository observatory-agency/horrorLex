const { ObjectID } = require('mongodb');

async function advancedSearch(model, params) {
  const { body } = params;
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
  return body
}

async function browse(model, params) {
  const { letter } = params;
  const regexStr = `^[${letter.toUpperCase()}${letter.toLowerCase()}]`
  const results = await model.aggregate([
    { $unwind: '$filmsDiscussed' },
    {
      $match: { filmsDiscussed: { $regex: new RegExp(regexStr) } },
    }, {
      $group: {
        _id: '$filmsDiscussed',
        documents: { $push: '$$ROOT._id' },
      },
    }, {
      $sort: { _id: 1 },
    },
  ]).toArray();
  return {
    results: results.map(({ _id, documents }) => ({
      title: _id,
       books: documents,
    })),
  };
}

async function quickSearch(model, params) {
  const {
    query: {
      count,
      page,
      search,
      sort,
      tag,
    },
  } = params;

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

  const [results] = await model.aggregate(query).toArray();
  const { documents } = results;

  if (!documents.length > 0) {
    return null;
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

  return {
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
  }
}

async function getOne(books, params) {
  const { book } = params;
  return books.findOne({ href: book });
}

async function getMany(model, params) {
  const { documents } = params
  return model.find({
    _id: { $in: documents.map((document) => ObjectID(document)) },
  }).toArray();
}

module.exports = {
  advancedSearch,
  browse,
  quickSearch,
  getOne,
  getMany,
};
