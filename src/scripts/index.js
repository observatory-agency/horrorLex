// NOTE style import for webpack should stay here and be loaded first
import '../styles/base.css';
import '../styles/main.css';

import Publications from './Publications';

document.addEventListener('change', (event) => {
  const publications = new Publications();
  publications.sortHandler(event);
});

document.addEventListener('keydown', (event) => {
  const publications = new Publications();
  publications.quickSearchHandler(event);
});
