const {
  articleTransformer,
  bookTransformer,
  filmTransformer,
} = require('../transformers');
const { FilmModel, PublicationModel } = require('../../models');

module.exports = (name) => {
  let model;
  let modelName;
  let transformer;
  switch (name) {
    case 'articles': {
      model = new PublicationModel();
      modelName = 'publications';
      transformer = articleTransformer;
      break;
    }
    case 'books': {
      model = new PublicationModel();
      modelName = 'publications';
      transformer = bookTransformer;
      break;
    }
    case 'films': {
      model = new FilmModel();
      modelName = 'films';
      transformer = filmTransformer;
      break;
    }
    default: {
      throw new Error();
    }
  }
  return { model, modelName, transformer };
};
