const BaseModel = require('./Base');
const { books } = require('../constants/collections');

class BookModel extends BaseModel {
  constructor() {
    super(books.name, books.index);
  }
}

module.exports = BookModel;
