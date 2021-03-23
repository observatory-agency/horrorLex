const cvs = require('csvtojson');

class DataImport {
  constructor() {
    this.docs = [];
  }

  async fromCsv(path) {
    this.docs = await cvs().fromFile(path);
  }

  async mutateEach(callback) {
    this.docs.forEach((doc, i) => {
      this.docs[i] = callback(doc);
    });
  }
}

module.exports = DataImport;
