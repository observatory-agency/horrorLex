const Mongo = require('../lib/Mongo');
const { books } = require('../constants/collections');

class BookModel {
  constructor() {
    this.name = books;
    this.db = Mongo.db;
    this.handleCollection(this.name);
  }

  aggregate(query) {
    return this.collection.aggregate(query);
  }

  drop() {
    return this.collection.drop();
  }

  find(query) {
    return this.collection.find(query);
  }

  findOne(query) {
    return this.collection.findOne(query);
  }

  insertMany(docs) {
    return this.collection.insertMany(docs);
  }

  // private methods
  async handleCollection(name) {
    try {
      this.collection = this.db.collection(name)
      || await this.db.createCollection(name);
    } catch (error) {
      console.error(`Unable to access collection: ${this.name}`);
    }
  }
}

module.exports = BookModel;
