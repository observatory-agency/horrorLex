// NOTE style import for webpack should stay here and be loaded first
import '../styles/base.css';
import '../styles/main.css';

import Search from './search';

const quickSearchElement = document.getElementById('quick-search');
const quickSearchBar = new Search(quickSearchElement);

quickSearchBar.quickSearch();
