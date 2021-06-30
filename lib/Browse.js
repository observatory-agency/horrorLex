class Browse {
  constructor(model) {
    this.model = model;
    this.enums = {
      categories: 'categories',
      films: 'films',
    };
    this.regexChar = '';
  }

  static createRegexStr(char) {
    const isLetter = (/[a-zA-Z]/).test(char) && char.length === 1;
    const isNum = char === 'num';
    if (!isLetter && !isNum) {
      throw new Error('Invalid characters');
    }
    return isNum ? '^[0-9]' : `^[${char.toUpperCase()}${char.toLowerCase()}]`;
  }

  byChar(regexChar) {
    this.regexChar = regexChar;
    switch (this.model.collectionName) {
      case this.enums.categories: {
        return this.categories();
      }
      case this.enums.films: {
        return this.films();
      }
      default: {
        throw new Error('Invalid model');
      }
    }
  }

  // private
  async categories() {
    const results = await this.model.aggregate([{
      $unwind: '$tags',
    }, {
      $match: { tags: { $regex: new RegExp(this.regexChar) } },
    }, {
      $group: { _id: '$tags', documents: { $push: '$$ROOT._id' } },
    }, {
      $sort: { _id: 1 },
    }], { collation: { locale: 'en' } }).toArray();
    return results.map(({ _id }) => ({ title: _id }));
  }

  async films() {
    const results = await this.model.aggregate([{
      $match: { browseTitle: { $regex: new RegExp(this.regexChar) } },
    }, {
      $group: { _id: { browseTitle: '$browseTitle', title: '$title' } },
    }, {
      $sort: { _id: 1 },
    }]).toArray();
    return results.map(({ _id: { browseTitle, title } }) => ({ browseTitle, title }));
  }
}

module.exports = Browse;
