const Mongo = require('../lib/Mongo');

class BaseModel {
  constructor(name) {
    this.name = name;
    this.db = Mongo.db;
    this.initCollection();
    return this.collection;
  }

  // private methods
  async initCollection() {
    try {
      this.collection = this.db.collection(this.name);
    } catch (error) {
      console.error(`Unable to access collection: ${this.name}`);
    }
  }
}

module.exports = BaseModel;
