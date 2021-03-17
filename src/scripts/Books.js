class Books {
  constructor() {
    this.enums = {
      browse: 'browse',
      browseEndPoint: '/browse',
      browseSelector: 'div[data-container="browse"]',
      count: 10,
      enterKey: 'Enter',
      page: 1,
      paramPage: 'page',
      paramSearch: 'search',
      paramTag: 'tag',
      quickSearch: 'quickSearch',
      results: '/results',
      sort: 'sort',
      tag: 'tag',
    };
  }

  async browseHandler(event) {
    const { dataset } = event.target;
    const hasHandler = !!dataset.handler;
    const isBrowse = dataset.handler === this.enums.browse
    if (hasHandler && isBrowse) {
      try {
        const books = dataset.books.split(',');
        const data = await this.fetchWrapper(books);
        const { results } = await data.json();
        this.destroyBrowseItem();
        results.forEach(this.createBrowseItem.bind(this));
      } catch (error) {
        // TODO handle error in UI on failed "browse" attempts
        console.error(error);
      }
    }
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
        search: value,
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
        search: params.get(this.enums.paramSearch),
        sort: value,
        tag: params.get(this.enums.paramTag),
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
        tag: dataset.tag,
      });
    }
  }

  // private methods
  createBrowseItem(browseItem) {
    const child = {
      title: document.createElement('p'),
      tags: document.createElement('p'),
      url: document.createElement('a'),
    };
    const parent = document.createElement('div');
    const root = document.querySelector(this.enums.browseSelector);
    child.title.innerText = `Title: ${browseItem.title}`;
    child.tags.innerText = `Tags: ${browseItem.tags}`;
    child.url.innerText = 'View Book';
    child.url.href = `/${browseItem.href}`;
    parent.append(child.title);
    parent.append(child.tags);
    parent.append(child.url);
    root.append(parent);
  }

  destroyBrowseItem() {
    const root = document.querySelector(this.enums.browseSelector);
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
  }

  async fetchWrapper(books) {
    return fetch(this.enums.browseEndPoint, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ books }),
    });
  }

  getResults(params) {
    const url = new URL(`${window.origin}${this.enums.results}`);
    const keys = Object.keys(params);
    keys.forEach((param) => (
      params[param] && url.searchParams.set(param, encodeURI(params[param]))
    ));
    return url.href;
  }
}

export default Books;
