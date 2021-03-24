// NOTE style import for webpack should stay here and be loaded first
import '../styles/base.css';
import '../styles/main.css';

import Books from './Books';

document.addEventListener('change', (event) => {
  const books = new Books();
  books.sortHandler(event);
});

document.addEventListener('click', (event) => {
  const books = new Books();
  books.browseHandler(event);
  books.tagHandler(event);
});

document.addEventListener('keydown', (event) => {
  const books = new Books();
  books.quickSearchHandler(event);
});
