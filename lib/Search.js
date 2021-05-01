const querystring = require('querystring');

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
    this.params = {
      advanced: {},
      original: {},
      quick: {},
      settings: {},
    };
    this.results = null;
  }

  async one(slug) {
    return this.model.findOne({ slug });
  }

  async many(params) {
    this.parseParams(params);
    await this.makeQuery();
    return this.buildResults();
  }

  // private methods
  async makeQuery() {
    const [{ documents, total }] = await this.model.aggregate([
      this.query[this.params.settings.type],
      this.query.sort,
      this.query.facet,
    ]).toArray();
    this.results = total[0] ? { documents, total } : null;
  }

  buildResults() {
    if (this.results) {
      const { documents, total } = this.results;
      this.results.page = {
        count: this.params.settings.count,
        curr: this.params.settings.number,
        next: ((documents.length + this.params.settings.skip) < total[0].count)
          ? (this.params.settings.number + 1) : 0,
        number: this.params.settings.number,
        pages: Array.from({
          length: Math.ceil(total[0].count / this.params.settings.count),
        }, (_, i) => i + 1),
        params: querystring.stringify(this.params.original),
        query: this.params.quick.query,
        prev: (this.params.settings.number !== 1) ? (this.params.settings.number - 1) : 0,
        range: (documents.length + this.params.settings.skip),
        sort: this.params.settings.sort,
        skip: this.params.settings.skip,
        total: total[0].count,
        type: this.params.settings.type,
      };
    }
    return this.results;
  }

  parseParams(params = {}) {
    this.params.advanced.author = params.author ? decodeURIComponent(params.author) : null;
    this.params.advanced.books = params.books === 'on';
    this.params.advanced.filmsDiscussed = params.filmsDiscussed
      ? decodeURIComponent(params.filmsDiscussed) : null;
    this.params.advanced.freeOnlineCopy = params.freeOnlineCopy === 'on';
    this.params.advanced.horrorLexSummary = params.horrorLexSummary === 'on';
    this.params.advanced.isbn13 = params.isbn13 ? decodeURIComponent(params.isbn13) : null;
    this.params.advanced.journal = params.journal ? decodeURIComponent(params.journal) : null;
    this.params.advanced.tags = params.tag ? decodeURIComponent(params.tag) : null;
    this.params.advanced.title = params.title ? decodeURIComponent(params.title) : null;
    this.params.advanced.year = params.year || null;
    this.params.quick.query = params.q ? decodeURIComponent(params.q) : null;
    this.params.settings.count = parseInt(params.c, 10) || 10;
    this.params.settings.number = parseInt(params.p, 10) || 1;
    this.params.settings.sort = params.s || this.enums.sortType.title;
    this.params.settings.skip = ((parseInt(params.p, 10) || 1) - 1)
      * (parseInt(params.c, 10) || 10);
    this.params.settings.type = params.t || this.enums.searchType.advanced;
    this.params.original = {
      ...params,
      c: this.params.settings.count,
      s: this.params.settings.sort,
      t: this.params.settings.type,
    };
    // remove the original "p" (page num) query string param and let the view handle this
    delete this.params.original.p;
  }

  get query() {
    return {
      advanced: {
        $search: {
          index: this.enums.index,
          compound: {
            must: Object.keys(this.params.advanced)
              .map((key) => ({ text: { query: this.params.advanced[key], path: key } }))
              .filter((clause) => clause.text.query && clause.text.query.length > 0),
          },
        },
      },
      facet: {
        $facet: {
          documents: [{
            $skip: ((this.params.settings.number - 1) * this.params.settings.count),
          }, {
            $limit: this.params.settings.count,
          }],
          total: [{ $count: this.enums.sortType.count }],
        },
      },
      film: { $match: { filmsDiscussed: this.params.quick.query } },
      quick: {
        $search: {
          index: this.enums.index,
          text: {
            query: this.params.quick.query,
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
      sort: { $sort: { [this.params.settings.sort]: 1 } },
      tag: { $match: { tags: this.params.quick.query } },
    };
  }
}

module.exports = Search;
