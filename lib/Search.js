class Search {
  constructor(bookModel) {
    this.page = {};
    this.bookModel = bookModel;
  }

  async advance(params) {
    this.params = params;
    // const { body } = params;
    // const countNumber = 10;
    // const pageNumber = 1;
    // const skipNumber = (pageNumber - 1) * countNumber;
    // const query = [];
    // const textQuery = { $match: { $text: { $search: decodeURIComponent(search) } } };
    // const facetQuery = {
    //   $facet: {
    //     // TODO add sorting
    //     documents: [{ $skip: skipNumber }, {
    //       $limit: countNumber,
    //     }],
    //     total: [{ $count: 'count' }],
    //   },
    // };
    // return body
  }

  async quick(params) {
    this.params = params;
    this.buildPaginationParams();
    await this.query();
    if (!this.documents.length > 0) {
      return null;
    }
    this.buildPagination();
    return { documents: this.documents, page: this.page };
  }

  // private methods
  buildPaginationParams() {
    const SEARCH = 'search';
    const TAG = 'tag';
    const TEN = 10;
    this.page.count = parseInt(this.params.count, TEN) || TEN;
    this.page.number = parseInt(this.params.page, TEN) || 1;
    this.page.skip = (this.page.number - 1) * this.page.count;
    this.page.param = decodeURI(this.params.tag || this.params.search);
    this.page.type = (this.params.tag && TAG) || (this.params.search && SEARCH);
  }

  buildPagination() {
    this.page.total = this.results.total[0].count;
    this.page.range = (this.documents.length + this.page.skip);
    this.page.next = (this.page.range < this.page.total) ? (this.page.number + 1) : 0;
    this.page.prev = (this.page.number !== 1) ? (this.page.number - 1) : 0;
    this.page.curr = this.page.number;
    this.page.pages = Array.from({
      length: Math.ceil(this.page.total / this.page.count),
    }, (_, i) => i + 1);
  }

  buildQueryParams() {
    const COUNT = 'count';
    const TITLE = 'title';
    const sortQuery = this.params.sort ? {
      $sort: { [this.params.sort || TITLE]: 1 },
    } : undefined;
    const textQuery = this.params.search ? {
      $match: { $text: { $search: decodeURIComponent(this.params.search) } },
    } : undefined;
    const tagQuery = this.params.tag ? {
      $match: { tags: decodeURIComponent(this.params.tag) },
    } : undefined;
    // FIXME: add sorting
    const facetQuery = {
      $facet: {
        documents: [{
          $skip: this.page.skip,
        }, {
          $limit: this.page.count,
        }],
        total: [{ $count: COUNT }],
      },
    };
    return [
      textQuery,
      sortQuery,
      tagQuery,
      facetQuery,
    ].filter((q) => q && q);
  }

  async query() {
    const queryParams = this.buildQueryParams();
    const [results] = await this.bookModel.aggregate(queryParams).toArray();
    const { documents } = results;
    this.results = results;
    this.documents = documents;
  }
}

module.exports = Search;
