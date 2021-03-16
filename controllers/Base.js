const { BookModel } = require('../models');

class BaseController {
  constructor() {
    this.modelMap = {};
    this.get = this.get ? this.get.bind(this) : null;
    this.post = this.post ? this.post.bind(this) : null;
  }

  get model() {
    this.modelMap.book = new BookModel();
    return this.modelMap;
  }
}

module.exports = BaseController;
