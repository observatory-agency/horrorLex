class Search {
  constructor(model) {
    this.enums = {
      advancedSearch: 'advancedSearch',
      author: 'author',
      count: 'count',
      horrorLexSummary: 'horrorLexSummary',
      on: 'on',
      quickSearch: 'quickSearch',
      search: 'search',
      tag: 'tag',
      title: 'title',
      year: 'year',
    };
    this.model = model;
  }

  async advanced(body) {
    this.handleBody(body);
    this.handleParams();
    await this.buildResults(this.enums.advancedSearch);
    return this.results;
  }

  async one(slug) {
    return this.model.findOne({ slug });
  }

  async quick(params) {
    this.handleBody();
    this.handleParams(params);
    await this.buildResults(this.enums.quickSearch);
    return this.results;
  }

  // private methods
  async buildResults(type) {
    const [{ documents, total }] = await this.model.aggregate([
      this.query[type],
      this.query.sort,
      this.query.facet,
    ]).toArray();
    this.results = { documents, total };
    this.results.page = {
      count: this.params.count,
      curr: this.params.number,
      next: ((this.results.documents.length + this.params.skip) < this.results.total[0].count)
        ? (this.params.number + 1) : 0,
      number: this.params.number,
      pages: Array.from({
        length: Math.ceil(this.results.total[0].count / this.params.count),
      }, (_, i) => i + 1),
      param: this.params.tag || this.params.search,
      prev: (this.params.number !== 1) ? (this.params.number - 1) : 0,
      range: (this.results.documents.length + this.params.skip),
      sort: this.params.sort,
      skip: this.params.skip,
      total: this.results.total[0].count,
      type: (this.params.tag && this.enums.tag) || (this.params.search && this.enums.search),
    };
  }

  handleBody(body = {}) {
    this.body = {
      input: {
        title: body.title,
        author: body.author,
        isbn13: body.isbn13,
        year: body.year,
      },
      checkbox: {
        books: body.books === this.enums.on,
        freeOnlineCopy: body.freeOnlineCopy === this.enums.on,
        horrorLexSummary: body.horrorLexSummary === this.enums.on,
      },
    };
  }

  handleParams(params = {}) {
    this.params = {
      count: parseInt(params.count, 10) || 10,
      number: parseInt(params.page, 10) || 1,
      search: params.search ? decodeURIComponent(params.search) : undefined,
      sort: params.sort || this.enums.title,
      skip: (parseInt(params.page, 10) || 1 - 1) * (parseInt(params.count, 10) || 10),
      tag: params.tag ? decodeURIComponent(params.tag) : undefined,
    };
  }

  get query() {
    const a = Object.keys(this.body.input).map((key) => this.body.input[key]
      && { text: { query: this.body.input[key], path: key } });
    console.dir({ a }, { depth: null });
    return {
      advancedSearch: {
        $search: {
          compound: {
            must: Object.keys(this.body.input).map((key) => this.body.input[key]
              && ({ text: { query: this.body.input[key], path: key } })),
          },
        },
      },
      facet: {
        $facet: {
          documents: [{
            $skip: ((this.params.number - 1) * this.params.count),
          }, {
            $limit: this.params.count,
          }],
          total: [{ $count: this.enums.count }],
        },
      },
      quickSearch: this.params.tag ? { $match: { tags: this.params.tag } } : {
        $search: {
          index: this.enums.quickSearch,
          text: {
            query: this.params.search,
            path: [
              this.enums.title,
              this.enums.author,
              this.enums.horrorLexSummary,
              this.enums.year,
            ],
            fuzzy: { maxEdits: 1, maxExpansions: 100 },
          },
        },
      },
      sort: { $sort: { [this.params.sort]: 1 } },
    };
  }
}

module.exports = Search;
