const { DataImport } = require('./helpers');
const { bookTransformer } = require('./transformers');
const Mongo = require('../lib/Mongo');
const BookModel = require('../models/Book');

const init = async () => {
  try {
    await Mongo.connect();

    const dataImport = new DataImport();
    await dataImport.fromCsv('./data/books.csv');

    dataImport.mutateEach(bookTransformer);

    const { docs } = dataImport;
    const bookModel = new BookModel();
    const { result: { n } } = await bookModel.insertMany(docs);
    console.log(`Inserted ${n} documents into collection "${bookModel.name}"`);
  } catch (error) {
    console.error(error);
  }
  Mongo.close();
};

init();
