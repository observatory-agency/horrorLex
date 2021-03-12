const Search = require('../lib/Search');
const BaseController = require('./Base');

class ResultsController extends BaseController {
  constructor() {
    super();
    this.template = 'results.hbs';
  }

  async get(req, res, next) {
    try {
      const { query } = req;
      const search = new Search(this.bookModel);
      const quickSearch = await search.quick(query);
      return quickSearch
        ? res.render(this.template, quickSearch)
        : res.sendStatus(400);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = ResultsController;
