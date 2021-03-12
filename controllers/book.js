const BaseController = require('./Base');

class BookController extends BaseController {
  constructor() {
    super();
    this.template = 'book.hbs';
  }

  async get(req, res, next) {
    try {
      const { bookModel } = this.mongo;
      const { params: { slug } } = req;
      const result = await bookModel.findOne({ href: slug });
      return result ? res.render(this.template, { result }) : res.sendStatus(404);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BookController;
