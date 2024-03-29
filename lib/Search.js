const querystring = require('querystring');

class Search {
  constructor(model) {
    this.enums = {
      index: 'search',
      clause: {
        article: 'article',
        book: 'book',
        freeOnlineCopy: 'freeOnlineCopy',
        isArticle: 'isArticle',
        isBook: 'isBook',
        jstor: 'jstor',
        muse: 'muse',
        tags: 'tags',
        type: 'type',
        recommended: 'recommended',
        summary: 'summary',
      },
      searchType: {
        advanced: 'advanced',
        film: 'film',
        quick: 'quick',
        tag: 'tag',
      },
      sortType: {
        author: 'author',
        bestMatch: 'bestMatch',
        count: 'count',
        summary: 'summary',
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
    this.params.original = params;
    // remove the 'page' key, as the view will handle adding this
    delete this.params.original.page;
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

  parseParams(params) {
    const { advanced, quick, settings } = this.params;
    advanced.author = decodeURIComponent(params.author || '');
    advanced.article = params.article === 'on';
    advanced.book = params.book === 'on';
    advanced.films = decodeURIComponent(params.films || '');
    advanced.freeOnlineCopy = params.freeOnlineCopy === 'on';
    advanced.isbn13 = decodeURIComponent(params.isbn13 || '');
    advanced.journal = decodeURIComponent(params.journal || '');
    advanced.jstor = params.jstor === 'on';
    advanced.muse = params.muse === 'on';
    advanced.recommended = params.recommended === 'on';
    advanced.summary = params.summary === 'on';
    advanced.tags = decodeURIComponent(params.tags || '');
    advanced.title = decodeURIComponent(params.title || '');
    advanced.year = params.year || '';
    quick.tags = decodeURIComponent(params.tags || '');
    quick.query = decodeURIComponent(params.query || '');
    settings.count = parseInt(params.count, 10) || 10;
    settings.number = parseInt(params.page, 10) || 1;
    settings.sort = params.sort || this.enums.sortType.title;
    settings.skip = ((parseInt(params.page, 10) || 1) - 1) * (parseInt(params.count, 10) || 10);
    settings.type = params.type || this.enums.searchType.advanced;
  }

  get query() {
    return {
      advanced: {
        $search: {
          index: this.enums.index,
          compound: {
            must: Object.keys(this.params.advanced).map((key) => {
              let clause;
              switch (key) {
                case this.enums.clause.article: {
                  clause = this.params.advanced[key]
                    && !this.params.advanced.book
                    && {
                      equals: {
                        path: this.enums.clause.isArticle,
                        value: true,
                      },
                    };
                  break;
                }
                case this.enums.clause.book: {
                  clause = this.params.advanced[key]
                    && !this.params.advanced.article
                    && {
                      equals: {
                        path: this.enums.clause.isBook,
                        value: true,
                      },
                    };
                  break;
                }
                case this.enums.clause.freeOnlineCopy:
                case this.enums.clause.jstor:
                case this.enums.clause.muse:
                case this.enums.clause.recommended:
                case this.enums.clause.summary: {
                  clause = this.params.advanced[key] && {
                    exists: { path: key },
                  };
                  break;
                }
                case this.enums.clause.tags: {
                  clause = this.params.advanced[key].length > 0
                    && { text: { query: this.params.advanced[key].split(','), path: key } };
                  break;
                }
                default: {
                  clause = this.params.advanced[key].length > 0
                    && { text: { query: this.params.advanced[key], path: key } };
                }
              }
              return clause;
            }).filter((clause) => clause),
          },
        },
      },
      category: { $match: { tags: { $in: this.params.quick.tags.split(',') } } },
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
      film: { $match: { films: this.params.quick.query } },
      quick: {
        $search: {
          index: this.enums.index,
          text: {
            query: this.params.quick.query,
            path: [
              this.enums.sortType.title,
              this.enums.sortType.author,
              this.enums.sortType.summary,
              this.enums.sortType.year,
            ],
            fuzzy: { maxEdits: 1, maxExpansions: 100 },
          },
        },
      },
      sort: {
        $sort: {
          [this.params.settings.sort]: this.params.settings.sort === this.enums.sortType.bestMatch
            ? { $meta: 'textScore' } : 1,
        },
      },
      tag: { $match: { tags: this.params.quick.query } },
    };
  }
}

module.exports = Search;
