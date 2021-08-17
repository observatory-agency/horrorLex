const DataImport = require('./DataImport');
const {
  articleTransformer,
  categoryTransformer,
  bookTransformer,
  filmTransformer,
} = require('../transformers');
const {
  CategoryModel,
  FilmModel,
  PublicationModel,
} = require('../../models');
const collections = require('../../constants/collections');

module.exports = async (name) => {
  let docs;
  let model;
  let modelAttributes;

  const dataImport = new DataImport();
  await dataImport.fromCsv(`./data/${name}.csv`);

  switch (name) {
    case 'articles': {
      model = new PublicationModel();
      modelAttributes = collections.publications;
      dataImport.mutateEach(articleTransformer);
      docs = dataImport.docs;
      break;
    }
    case 'books': {
      model = new PublicationModel();
      modelAttributes = collections.publications;
      dataImport.mutateEach(bookTransformer);
      docs = dataImport.docs;
      break;
    }
    case 'categories': {
      model = new CategoryModel();
      modelAttributes = collections.categories;
      dataImport.buildMap(categoryTransformer.mapper, categoryTransformer.transformer);
      docs = dataImport.docs;
      break;
    }
    case 'films': {
      model = new FilmModel();
      modelAttributes = collections.films;
      dataImport.mutateEach(filmTransformer);
      docs = dataImport.docs;
      break;
    }
    default: {
      throw new Error();
    }
  }
  return { docs, collection: { model, modelAttributes } };
};
