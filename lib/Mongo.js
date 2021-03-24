require('dotenv').config();
const { MongoClient } = require('mongodb');

const { DB_CONNECTION, DB_NAME } = process.env;

class Mongo {
  constructor() {
    this.client = new MongoClient(`${DB_CONNECTION}`, {
      useUnifiedTopology: true,
    });
    this.isConnected = false;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(DB_NAME);
      this.isConnected = true;
    } catch (error) {
      console.error(error);
    }
  }

  close() {
    this.client.close();
  }
}

const MongoInstance = new Mongo();

module.exports = MongoInstance;
