const cvs = require('csvtojson');

class DataImport {
  constructor() {
    this.docs = [];
  }

  buildMap(callback, done) {
    const map = {};
    this.docs.forEach((doc) => {
      callback(doc, map);
    });
    this.docs = done(map);
  }

  async fromCsv(path) {
    this.docs = await cvs().fromFile(path);
  }

  mutateEach(callback) {
    this.docs.forEach((doc, i) => {
      this.docs[i] = callback(doc);
    });
  }
}

module.exports = DataImport;
