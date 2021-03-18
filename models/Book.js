const Mongo = require('../lib/Mongo');
const { books } = require('../constants/collections');

class BookModel {
  constructor() {
    this.db = Mongo.db;
    this.handleCollection(books);
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

  // private methods
  async handleCollection(name) {
    this.collection = this.db.collection(name)
      || await this.db.createCollection(name);
  }
}

module.exports = BookModel;
