const cvs = require('csvtojson');

class DataImport {
  constructor(path) {
    this.docs = [];
    this.path = path;
  }

  async fromCsv() {
    this.docs = await cvs().fromFile(this.path);
  }

  async transform(callback) {
    this.docs.map((doc) => callback(doc));
  }
}

module.exports = DataImport;
