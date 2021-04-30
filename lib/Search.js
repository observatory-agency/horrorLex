class Search {
  constructor(model) {
    this.body = { checkbox: {}, input: {} };
    this.enums = {
      index: 'search',
      searchType: {
        advanced: 'advanced',
        film: 'film',
        quick: 'quick',
        tag: 'tag',
      },
      sortType: {
        author: 'author',
        count: 'count',
        horrorLexSummary: 'horrorLexSummary',
        title: 'title',
        year: 'year',
      },
    };
    this.model = model;
    this.params = {};
    this.results = null;
  }

  async advanced(body) {
    this.handleBody(body);
    this.handleParams();
    await this.makeQuery();
    return this.buildResults();
  }

  async one(slug) {
    return this.model.findOne({ slug });
  }

  async quick(params) {
    this.handleBody();
    this.handleParams(params);
    await this.makeQuery();
    return this.buildResults();
  }

  // private methods
  async makeQuery() {
    const [{ documents, total }] = await this.model.aggregate([
      this.query[this.params.type],
      this.query.sort,
      this.query.facet,
    ]).toArray();
    this.results = total[0] ? { documents, total } : null;
  }

  buildResults() {
    if (this.results) {
      const { documents, total } = this.results;
      this.results.page = {
        count: this.params.count,
        curr: this.params.number,
        next: ((documents.length + this.params.skip) < total[0].count)
          ? (this.params.number + 1) : 0,
        number: this.params.number,
        pages: Array.from({
          length: Math.ceil(total[0].count / this.params.count),
        }, (_, i) => i + 1),
        query: this.params.query,
        prev: (this.params.number !== 1) ? (this.params.number - 1) : 0,
        range: (documents.length + this.params.skip),
        sort: this.params.sort,
        skip: this.params.skip,
        total: total[0].count,
        type: this.params.type,
      };
    }
    return this.results;
  }

  handleBody(body = {}) {
    const ON = 'on';
    this.body.input.title = body.title;
    this.body.input.author = body.author;
    this.body.input.isbn13 = body.isbn13;
    this.body.input.year = body.year;
    this.body.checkbox.books = body.books === ON;
    this.body.checkbox.freeOnlineCopy = body.freeOnlineCopy === ON;
    this.body.checkbox.horrorLexSummary = body.horrorLexSummary === ON;
  }

  handleParams(params = {}) {
    this.params.count = parseInt(params.c, 10) || 10;
    this.params.number = parseInt(params.p, 10) || 1;
    this.params.query = params.q ? decodeURIComponent(params.q) : null;
    this.params.sort = params.s || this.enums.sortType.title;
    this.params.skip = ((parseInt(params.p, 10) || 1) - 1) * (parseInt(params.c, 10) || 10);
    this.params.type = params.t || this.enums.searchType.advanced;
  }

  get query() {
    return {
      advanced: {
        $search: {
          index: this.enums.index,
          compound: {
            must: Object.keys(this.body.input)
              .map((key) => ({ text: { query: this.body.input[key], path: key } }))
              .filter((clause) => clause.text.query && clause.text.query.length > 0),
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
          total: [{ $count: this.enums.sortType.count }],
        },
      },
      film: { $match: { filmsDiscussed: this.params.query } },
      quick: {
        $search: {
          index: this.enums.index,
          text: {
            query: this.params.query,
            path: [
              this.enums.sortType.title,
              this.enums.sortType.author,
              this.enums.sortType.horrorLexSummary,
              this.enums.sortType.year,
            ],
            fuzzy: { maxEdits: 1, maxExpansions: 100 },
          },
        },
      },
      sort: { $sort: { [this.params.sort]: 1 } },
      tag: { $match: { tags: this.params.query } },
    };
  }
}

module.exports = Search;
