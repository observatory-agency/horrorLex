const stopWordRemover = require('../helpers/stopWordRemover');

module.exports = (film) => ({
  title: film.films,
  browseTitle: stopWordRemover(film.films),
});
