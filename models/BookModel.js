const { BOOKS } = require('../constants/collections');

class BookModel {
  constructor(db) {
    this.db = db;
    this.collection = this.db.collection(BOOKS);
  }

  aggregate(query) {
    return this.collection.aggregate(query);
  }

  findOne(query) {
    return this.collection.findOne(query);
  }

  find(query) {
    return this.collection.find(query);
  }
}

module.exports = BookModel;
