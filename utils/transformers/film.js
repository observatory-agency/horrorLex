const stopWordRemover = require('../helpers/stopWordRemover');

module.exports = (film) => ({
  title: film['#Horror (2015)'],
  browseTitle: stopWordRemover(film['#Horror (2015)']),
});
