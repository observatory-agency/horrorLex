// NOTE style import for webpack should stay here and be loaded first
import '../styles/base.css';
import '../styles/main.css';

import Search from './search';

const quickSearchElement = document.getElementById('quick-search');
const sortByDropDownElement = document.getElementById('sort-results');

if (quickSearchElement) {
  new Search(quickSearchElement).quickSearch();
}

if (sortByDropDownElement) {
  new Search(sortByDropDownElement).sortBy();
} 
