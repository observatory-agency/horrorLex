const BaseController = require('./Base');
const Search = require('../lib/Search');

class BookController extends BaseController {
  constructor() {
    super();
    this.template = {
      get: 'book.hbs',
    };
  }

  async get(req, res, next) {
    try {
      const { params: { slug } } = req;
      const { BookModel } = this.models;
      const bookModel = new BookModel();
      const search = new Search(bookModel);
      const book = await search.one(slug);
      return book
        ? res.render(this.template.get, { book })
        : res.sendStatus(404);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BookController;
