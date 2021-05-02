class Publications {
  constructor() {
    this.enums = {
      count: 10,
      enterKey: 'Enter',
      page: 1,
      paramPage: 'p',
      paramQuery: 'q',
      paramType: 't',
      quickSearch: 'quickSearch',
      results: '/results',
      quick: 'quick',
      sort: 'sort',
      tag: 'tag',
    };
  }

  quickSearchHandler(event) {
    this.event = event;
    const { dataset, value } = event.target;
    const hasHandler = !!dataset.handler;
    const isEnterKey = event.key === this.enums.enterKey;
    const isQuickSearch = dataset.handler === this.enums.quickSearch;
    if (hasHandler && isEnterKey && isQuickSearch) {
      window.location.href = this.getResults({
        count: this.enums.count,
        page: this.enums.page,
        query: encodeURIComponent(value),
        type: this.enums.quick,
      });
    }
  }

  sortHandler(event) {
    const { dataset } = event.target;
    const hasHandler = !!dataset.handler;
    const isSort = dataset.handler === this.enums.sort;
    if (hasHandler && isSort) {
      const { value } = event.target;
      const { search } = window.location;
      const params = new URLSearchParams(search);
      window.location.href = this.getResults({
        count: this.enums.count,
        page: params.get(this.enums.paramPage),
        query: params.get(this.enums.paramQuery),
        sort: value,
        type: params.get(this.enums.paramType),
      });
    }
  }

  tagHandler(event) {
    const { dataset } = event.target;
    const hasHandler = !!dataset.handler;
    const isTag = dataset.handler === this.enums.tag;
    if (hasHandler && isTag) {
      window.location.href = this.getResults({
        count: this.enums.count,
        page: this.enums.page,
        query: dataset.tag,
        type: this.enums.tag,
      });
    }
  }

  // private methods
  getResults(params) {
    const url = new URL(`${window.origin}${this.enums.results}`);
    const keys = Object.keys(params);
    keys.forEach((param) => params[param] && url.searchParams.set(param, params[param]));
    return url.href;
  }
}

export default Publications;
