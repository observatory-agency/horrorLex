const BaseController = require('./Base');
const Browse = require('../lib/Browse');

class BrowseController extends BaseController {
  constructor() {
    super();
    this.template = {
      get: 'browse.hbs',
      post: 'results.hbs',
    };
  }

  async get(req, res, next) {
    try {
      const { params: { char } } = req;
      const { BookModel } = this.models;
      const bookModel = new BookModel();
      const regexChar = Browse.createRegexStr(char);
      const browse = new Browse(bookModel);
      const results = await browse.byChar(regexChar);
      return res.render(this.template.get, { results });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BrowseController;
