class Search {
  constructor(model) {
    this.page = {};
    this.model = model;
  }

  // public methods
  // async advanced(params) {
  //   this.params = params;
  // }

  async one(slug) {
    return this.model.findOne({ slug });
  }

  async quick(params) {
    this.params = params;
    this.buildPaginationParams();
    const { documents, total } = await this.makeQuery([
      this.params.search && this.query.search,
      this.params.sort && this.query.sort,
      this.params.tag && this.query.tag,
      this.query.facet,
    ]);
    this.documents = documents;
    this.total = total;
    if (!this.documents.length > 0) {
      return null;
    }
    this.buildPagination();
    return { documents: this.documents, page: this.page };
  }

  // private methods
  get query() {
    const COUNT = 'count';
    const TITLE = 'title';
    return {
      facet: {
        $facet: {
          documents: [{ $skip: this.page.skip }, { $limit: this.page.count }],
          total: [{ $count: COUNT }],
        },
      },
      // atlas search allows just 3 indexes
      search: { $match: { $text: { $search: decodeURIComponent(this.params.search) } } },
      sort: { $sort: { [this.params.sort || TITLE]: 1 } },
      tag: { $match: { tags: decodeURIComponent(this.params.tag) } },
    };
  }

  buildPaginationParams() {
    const SEARCH = 'search';
    const TAG = 'tag';
    const TEN = 10;
    this.page.count = parseInt(this.params.count, TEN) || TEN;
    this.page.number = parseInt(this.params.page, TEN) || 1;
    this.page.skip = (this.page.number - 1) * this.page.count;
    this.page.param = decodeURI(this.params.tag || this.params.search);
    this.page.type = (this.params.tag && TAG) || (this.params.search && SEARCH);
    this.page.sort = this.params.sort;
  }

  buildPagination() {
    this.page.total = this.total[0].count;
    this.page.range = (this.documents.length + this.page.skip);
    this.page.next = (this.page.range < this.page.total) ? (this.page.number + 1) : 0;
    this.page.prev = (this.page.number !== 1) ? (this.page.number - 1) : 0;
    this.page.curr = this.page.number;
    this.page.pages = Array.from({
      length: Math.ceil(this.page.total / this.page.count),
    }, (_, i) => i + 1);
  }

  async makeQuery(query) {
    const [results] = await this.model.aggregate(query.filter(Boolean)).toArray();
    return results;
  }
}

module.exports = Search;
