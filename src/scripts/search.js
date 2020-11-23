class Search {
  constructor(element) {
    this.element = element;
    this.count = '10';
  }

  browse() {

  }

  quickSearch() {
    document.onkeydown = (event) => {
      const { value } = event.target;
      const enterKeyDown = event.key === 'Enter';
      const quickSearch = event.target.id === this.element.id;
      if (enterKeyDown && quickSearch) {
        const { origin } = window.location;
        const url = `${origin}/results/?search=${encodeURI(value)}&count=${this.count}&page=1`;
        window.location.href = url;
      }
    };
  }
}

export default Search;
