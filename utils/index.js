const DataImport = require('./DataImport');

const camelCaseKeys = () => {};
const filterTags = () => {};
const generateSlugs = () => {};

const dataImporter = new DataImport('./data/books.csv');
dataImporter
  .transform(filterTags)
  .transform(camelCaseKeys)
  .transform(generateSlugs);
