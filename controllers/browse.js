const Browse = require('../lib/Browse');
const BaseController = require('./Base');

class BrowseController extends BaseController {
  constructor() {
    super();
    this.view = 'browse.hbs';
  }

  async get(req, res, next) {
    try {
      const { params: { char } } = req;
      const regexChar = Browse.createRegexStr(char);
      const browse = new Browse(this.bookModel);
      const results = await browse.byChar(regexChar);
      return res.render(this.view, results);
    } catch (error) {
      return next(error);
    }
  }

  async post(req, res, next) {
    try {
      const { body: { books } } = req;
      const browse = new Browse(this.bookModel);
      const results = await browse.relatedBooks(books);
      return res.json({ books: results });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BrowseController;
