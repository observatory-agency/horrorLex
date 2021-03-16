const { MongoClient } = require('mongodb');

const { DB_CONNECTION, DB_NAME } = process.env;

class Mongo {
  constructor() {
    this.client = new MongoClient(`${DB_CONNECTION}`, {
      useUnifiedTopology: true,
    });
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db(DB_NAME);
  }
}

const MongoInstance = new Mongo();

module.exports = MongoInstance;
