const { MongoClient } = require('mongodb');
const { BookModel } = require('./index');

const { DB_CONNECTION, DB_NAME } = process.env;

let MongoInstance = null;

class Mongo {
  constructor() {
    if (!MongoInstance) {
      MongoInstance = this;
    }
    this.client = new MongoClient(`${DB_CONNECTION}`, {
      useUnifiedTopology: true,
    });
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(DB_NAME);
      this.registerModels();
    } catch (error) {
      throw new Error(error);
    }
  }

  registerModels() {
    this.bookModel = new BookModel(this.db);
  }
}

module.exports = MongoInstance || new Mongo();
