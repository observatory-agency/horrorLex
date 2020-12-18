// NOTE style import for webpack should stay here and be loaded first
import '../styles/base.css';
import '../styles/main.css';

import Books from './Books';

document.addEventListener('change', (event) => {
  Books.sortHandler(event);
});

document.addEventListener('click', (event) => {
  Books.browseHandler(event);
  Books.tagHandler(event);
});

document.addEventListener('keydown', (event) => {
  Books.quickSearchHandler(event);
});
