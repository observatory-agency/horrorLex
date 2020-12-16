class Books {
  static getResultsUtil(params) {
    const url = new URL(`${window.origin}${Books.results}`);
    const keys = Object.keys(params);
    keys.forEach((param) => (
      params[param] && url.searchParams.set(param, encodeURI(params[param]))
    ));
    return url.href;
  }

  static createBrowseItemUtil(book) {
    const root = document.querySelector(Books.browseSelector);
    const browseItem = document.createElement('div');
    // TODO - these are placeholders/proofs of concepts, clean this up a ton
    const title = document.createElement('p');
    const tags = document.createElement('p');
    const url = document.createElement('a');
    title.innerText = `Title: ${book.title}`;
    tags.innerText = `Tags: ${book.tags}`;
    url.innerText = 'View Book';
    url.href = `/${book.href}`;
    // TODO build out remaining elements with data
    browseItem.append(title);
    browseItem.append(tags);
    browseItem.append(url);
    root.append(browseItem);
  }

  static destroyBrowseItemUtil() {
    const root = document.querySelector(Books.browseSelector);
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
  }

  static async browseHandler(event) {
    const { dataset } = event.target;
    if (dataset.handler && dataset.handler === Books.browse) {
      try {
        const data = await fetch(Books.browseEndPoint, {
          method: 'POST',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({ documents: dataset.books.split(',') }),
        });
        // FIXME, recieving 'books' as our document collection name can be a bit
        // confusing given the name of this class, maybe change this
        const { books } = await data.json();
        Books.destroyBrowseItemUtil();
        books.forEach(Books.createBrowseItemUtil);
      } catch (error) {
        // TODO handle error UI
        console.error(error);
      }
    }
  }

  static quickSearchHandler(event) {
    const enter = 'Enter';
    const { dataset, value } = event.target;
    const enterKeyDown = event.key === enter;
    if (enterKeyDown && dataset.handler && dataset.handler === Books.quickSearch) {
      window.location.href = Books.getResultsUtil({
        count: 10,
        page: 1,
        search: value,
      });
    }
  }

  static tagHandler(event) {
    const { dataset } = event.target;
    if (dataset.handler && dataset.handler === Books.tag) {
      window.location.href = Books.getResultsUtil({
        count: 10,
        page: 1,
        tag: dataset.tag,
      });
    }
  }

  static sortHandler(event) {
    const { dataset } = event.target;
    if (dataset.handler && dataset.handler === Books.sort) {
      const { value } = event.target;
      const { search } = window.location;
      const params = new URLSearchParams(search);
      window.location.href = Books.getResultsUtil({
        count: 10,
        page: params.get(Books.paramPage),
        search: params.get(Books.paramSearch),
        sort: value,
        tag: params.get(Books.paramTag),
      });
    }
  }
}

Books.browse = 'browse';
Books.browseEndPoint = '/browse';
Books.browseSelector = 'div[data-container="browse"]';
Books.paramPage = 'page';
Books.paramSearch = 'search';
Books.paramTag = 'tag';
Books.quickSearch = 'quickSearch';
Books.results = '/results';
Books.sort = 'sort';
Books.tag = 'tag';

export default Books;
