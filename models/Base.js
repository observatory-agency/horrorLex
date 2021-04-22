const Mongo = require('../lib/Mongo');

class BaseModel {
  constructor(name, index) {
    this.name = name;
    this.index = index;
    this.db = Mongo.db;
    this.initCollection();
    return this.collection;
  }

  // private methods
  async initCollection() {
    try {
      this.collection = this.db.collection(this.name);
      if (this.index) {
        await this.collection.createIndex(this.index);
      }
    } catch (error) {
      console.error(`Unable to access collection: ${this.name}`);
    }
  }
}

module.exports = BaseModel;
