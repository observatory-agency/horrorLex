const models = require('../models');

class BaseController {
  constructor() {
    this.modelsMap = models;
    this.get = this.get ? this.get.bind(this) : null;
    this.post = this.post ? this.post.bind(this) : null;
  }

  get models() {
    return this.modelsMap;
  }
}

module.exports = BaseController;
