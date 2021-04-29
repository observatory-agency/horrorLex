const { bookTransformer, filmTransformer } = require('../transformers');
const { BookModel, FilmModel } = require('../../models');

module.exports = (name) => {
  let model;
  let transformer;
  switch (name) {
    case 'books': {
      transformer = bookTransformer;
      model = new BookModel();
      break;
    }
    case 'films': {
      transformer = filmTransformer;
      model = new FilmModel();
      break;
    }
    default: {
      throw new Error();
    }
  }
  return { model, transformer };
};
