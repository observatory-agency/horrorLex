const Mongo = require('../lib/Mongo');
const { books } = require('../constants/collections');

class BookModel {
  constructor() {
    this.collection = Mongo.db.collection(books);
  }

  aggregate(query) {
    return this.collection.aggregate(query);
  }

  find(query) {
    return this.collection.find(query);
  }

  findOne(query) {
    return this.collection.findOne(query);
  }
}

module.exports = BookModel;
