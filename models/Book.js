const Mongo = require('../lib/Mongo');
const { books } = require('../constants/collections');

class BookModel {
  constructor() {
    this.name = books.name;
    this.index = books.index;
    this.db = Mongo.db;
    this.initCollection(this.name);
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
  async initCollection() {
    try {
      this.collection = this.db.collection(this.name);
      await this.collection.createIndex(this.index);
    } catch (error) {
      console.error(`Unable to access collection: ${this.name}`);
    }
  }
}

module.exports = BookModel;
