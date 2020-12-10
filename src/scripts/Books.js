class Books {
  static getResultsUtil(params) {
    const url = new URL(`${window.origin}/results`);
    const keys = Object.keys(params);
    keys.forEach((param) => (
      params[param] && url.searchParams.set(param, encodeURI(params[param]))
    ));
    return url.href;
  }

  static browseHandler() {
    const name = 'browse';
  }

  static quickSearchHandler(event) {
    const enter = 'Enter';
    const name = 'quickSearch';
    const { dataset, value } = event.target;
    const enterKeyDown = event.key === enter;
    if (enterKeyDown && dataset.handler && dataset.handler === name) {
      window.location.href = Books.getResultsUtil({
        count: 10,
        page: 1,
        search: value,
      });
    }
  }

  static tagHandler(event) {
    const name = 'tag';
    const { dataset } = event.target;
    if (dataset.handler && dataset.handler === name) {
      window.location.href = Books.getResultsUtil({
        count: 10,
        page: 1,
        tag: dataset.tag,
      });
    }
  }

  static sortHandler(event) {
    const name = 'sort';
    const { dataset } = event.target;
    if (dataset.handler && dataset.handler === name) {
      const { value } = event.target;
      const { search } = window.location;
      const params = new URLSearchParams(search);
      window.location.href = Books.getResultsUtil({
        count: 10,
        page: params.get('page'),
        search: params.get('search'),
        sort: value,
        tag: params.get('tag'),
      });
    }
  }
}

export default Books;
