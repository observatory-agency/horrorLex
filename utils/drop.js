const Mongo = require('../lib/Mongo');
const BookModel = require('../models/Book');

const init = async () => {
  try {
    await Mongo.connect();
    const bookModel = new BookModel();
    await bookModel.drop();
    console.log(`Dropped collection "${bookModel.name}"`);
  } catch (error) {
    console.error(error);
  }
  Mongo.close();
};

init();
