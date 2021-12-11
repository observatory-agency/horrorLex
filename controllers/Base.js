require('dotenv').config();
const crypto = require('crypto');
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

  verifySignature(body, signature) {
    const { STORYBLOK_SECRET } = process.env
    const hmac = crypto.createHmac('sha1', STORYBLOK_SECRET)
      .update(JSON.stringify(body))
      .digest('hex');
    return hmac === signature;
  }
}

module.exports = BaseController;
