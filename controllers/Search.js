const Search = require('../lib/Search');
const BaseController = require('./Base');

class SearchController extends BaseController {
  constructor() {
    super();
    this.template = {
      get: 'search.hbs',
      post: 'results.hbs',
    };
  }

  get(req, res) {
    res.render(this.template.get);
  }

  async post(req, res, next) {
    try {
      const { body } = req;
      const search = new Search(this.bookModel);
      const advanceSearch = await search.advanced(body);
      return advanceSearch
        ? res.render(this.template.post)
        : res.render(400);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = SearchController;
