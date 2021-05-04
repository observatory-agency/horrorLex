class Browse {
  constructor(model) {
    this.model = model;
  }

  static createRegexStr(char) {
    const isLetter = (/[a-zA-Z]/).test(char) && char.length === 1;
    const isNum = char === 'num';
    if (!isLetter && !isNum) {
      throw new Error('Invalid characters');
    }
    return isNum ? '^[0-9]' : `^[${char.toUpperCase()}${char.toLowerCase()}]`;
  }

  async byChar(regexChar) {
    const results = await this.model.aggregate([{
      $match: { title: { $regex: new RegExp(regexChar) } },
    }, {
      $group: { _id: { tags: '$tags', title: '$title' } },
    }, {
      $sort: { _id: 1 },
    }]).toArray();
    return results.map(({ _id: { tags, title } }) => ({
      title,
      uriEncoded: {
        tags: tags ? encodeURIComponent(tags.join(',')) : null,
        title: encodeURIComponent(title),
      },
    }));
  }
}

module.exports = Browse;
