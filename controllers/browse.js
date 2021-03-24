const BaseController = require('./Base');
const Browse = require('../lib/Browse');

class BrowseController extends BaseController {
  constructor() {
    super();
    this.template = {
      get: 'browse.hbs',
    };
  }

  async get(req, res, next) {
    try {
      const { params: { char } } = req;
      const regexChar = Browse.createRegexStr(char);
      const browse = new Browse(this.model.book);
      const results = await browse.byChar(regexChar);
      return res.render(this.template.get, { results });
    } catch (error) {
      return next(error);
    }
  }

  async post(req, res, next) {
    try {
      const { body: { books } } = req;
      const browse = new Browse(this.model.book);
      const results = await browse.relatedBooks(books);
      return res.json({ results });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BrowseController;
