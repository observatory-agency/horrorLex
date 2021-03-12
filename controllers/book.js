const mongo = require('../models/mongo');

class BookController {
  constructor() {
    this.mongo = mongo;
    this.get = this.get.bind(this);
  }

  async get(req, res, next) {
    try {
      const { bookModel } = this.mongo;
      const { params: { slug } } = req;
      const result = await bookModel.findOne({ href: slug });
      return result ? res.render('book', { result }) : res.sendStatus(404);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BookController;
