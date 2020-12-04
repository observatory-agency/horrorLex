class Search {
  constructor(element) {
    this.element = element;
    this.count = '10';
  }

  static createUrl({ count, search, sort }) {
    const { origin } = window.location;
    return `${origin}/results/?count=${count}&search=${encodeURI(search)}&sort=${sort}&page=1`;
  }

  browse() {

  }

  quickSearch() {
    document.onkeydown = (event) => {
      const { value } = event.target;
      const enterKeyDown = event.key === 'Enter';
      const quickSearch = event.target.id === this.element.id;
      if (enterKeyDown && quickSearch) {
        window.location.href = Search.createUrl({
          count: this.count,
          search: value,
          sort: 'title',
        });
      }
    };
  }

  sortBy() {
    this.element.addEventListener('change', (event) => {
      const { value } = event.target;
      const { search } = window.location;
      const params = new URLSearchParams(search);
      window.location.href = Search.createUrl({
        count: this.count,
        search: params.get('search'),
        sort: value,
      });
    })
  }
}

export default Search;
