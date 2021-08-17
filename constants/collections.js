const publicationsSearchIndex = require('../config/publicationsSearchIndex.json');
/** Supported Mongo Collections */
module.exports = {
  categories: { name: 'categories' },
  films: { name: 'films' },
  publications: {
    name: 'publications',
    searchIndexJson: JSON.stringify(publicationsSearchIndex),
  },
};
