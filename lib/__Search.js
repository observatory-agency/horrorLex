class Search {
  constructor(model) {
    this.body = {};
    this.params = {};
    this.results = {
      documents: [],
      total: 0,
      page: {},
    };
    this.model = model;
    this.enums = {
      advancedSearch: 'advancedSearch',
      author: 'author',
      count: 'count',
      horrorLexSummary: 'horrorLexSummary',
      quickSearch: 'quickSearch',
      search: 'search',
      tag: 'tag',
      title: 'title',
      year: 'year',
    };
  }

  async advanced(body) {
  //   title: 'title',
  // author: 'author',
  // isbn13: 'ISSN',
  // year: '2000',
  // journal: 'journal',
  // tags: 'keywords',
  // filmsDiscussed: 'film',
  // books: 'on',
  // freeOnlineCopy: 'on',
  // horrorLexSummary: 'on'
    console.log(body);
    this.body = body;
    this.params = {
      count: 10,
      search: '',
      sort: '',
      tag: '',
    };
    return [];
  }

  async one(slug) {
    return this.model.findOne({ slug });
  }

  async quick(params) {
    const query = [
      this.query.quickSearch,
      this.query.sort,
      this.query.facet,
    ];

    if (this.params.tag) {
      query.push(this.query.tag);
    }
    this.params = params;
    // FIXME - have UI handle empty documents array
    await this.buildResults(query);
    return this.results;
  }

  // private methods
  get query() {
    return {
      advancedSearch: {
        $search: {
          compound: {
            must: [{
              text: {
                query: '',
                path: '',
              },
            }],
          },
        },
      },
      facet: {
        $facet: {
          documents: [{ $skip: this.page.skip }, { $limit: this.page.count }],
          total: [{ $count: this.enums.count }],
        },
      },
      quickSearch: {
        $search: {
          index: this.enums.quickSearch,
          text: {
            query: decodeURIComponent(this.params.search),
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
      sort: { $sort: { [this.params.sort || this.enums.tittle]: 1 } },
      tag: { $match: { tags: decodeURIComponent(this.params.tag) } },
    };
  }

  buildPagination() {
    this.page.total = this.results.total[0].count;
    this.page.range = (this.results.documents.length + this.page.skip);
    this.page.next = (this.page.range < this.page.total) ? (this.page.number + 1) : 0;
    this.page.prev = (this.page.number !== 1) ? (this.page.number - 1) : 0;
    this.page.curr = this.page.number;
    this.page.pages = Array.from({
      length: Math.ceil(this.page.total / this.page.count),
    }, (_, i) => i + 1);
  }

  buildPaginationParams() {
    this.page.count = parseInt(this.params.count, 10) || 10;
    this.page.number = parseInt(this.params.page, 10) || 1;
    this.page.skip = (this.page.number - 1) * this.page.count;
    this.page.param = (this.params.tag || this.params.search)
      ? decodeURI(this.params.tag || this.params.search) : null;
    this.page.type = (this.params.tag && this.enums.tag)
      || (this.params.search && this.enums.search);
    this.page.sort = this.params.sort;
  }

  // async makeQuery(query) {
  //   const [results] = await this.model.aggregate(query).toArray();
  //   return results;
  // }
  async buildResults(query) {
    this.buildPaginationParams();
    const results = await this.model.aggregate(query);
    const [{ documents, total }] = results.toArray();
    this.results.documents = documents;
    this.results.total = total;
    this.buildPagination();
    this.results.page = this.page;
  }
}

module.exports = Search;
