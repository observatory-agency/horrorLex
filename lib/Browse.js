const { ObjectID } = require('mongodb');

/** Browses bookModel by character or by "film to relatedBooks" associations */
class Browse {
  constructor(model) {
    this.model = model;
  }

  static createRegexStr(char) {
    if (!(/[a-zA-Z]/).test(char) && char.length === 1) {
      throw new Error('Invalid characters');
    }
    return `^[${char.toUpperCase()}${char.toLowerCase()}]`;
  }

  async byChar(regexChar) {
    const results = await this.model.aggregate([{
      $unwind: '$filmsDiscussed',
    }, {
      $match: { filmsDiscussed: { $regex: new RegExp(regexChar) } },
    }, {
      $group: { _id: '$filmsDiscussed' },
    }, {
      $sort: { _id: 1 },
    }]).toArray();
    return results.map(({ _id }) => ({
      film: _id,
      urlEncodedFilm: encodeURIComponent(_id),
    }));
  }

  async relatedBooks(docs) {
    const results = await this.model.find({
      _id: {
        $in: docs.map((doc) => ObjectID(doc)),
      },
    }).toArray();
    return results;
  }
}

module.exports = Browse;
