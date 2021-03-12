const mongo = require('../models/mongo');

class BaseController {
  constructor() {
    this.mongo = mongo;
    this.get = this.get ? this.get.bind(this) : null;
    this.post = this.post ? this.post.bind(this) : null;
  }

  get bookModel() {
    return this.mongo.bookModel;
  }
}

module.exports = BaseController;
