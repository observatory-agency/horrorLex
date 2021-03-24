const BaseController = require('./Base');
const Search = require('../lib/Search');

class SearchController extends BaseController {
  constructor() {
    super();
    this.template = {
      get: 'search.hbs',
      post: 'results.hbs',
    };
  }

  get(_, res) {
    res.render(this.template.get);
  }

  async post(req, res, next) {
    try {
      const { body } = req;
      const search = new Search(this.model.book);
      const results = await search.advanced(body);
      return results
        ? res.render(this.template.post, { results })
        : res.sendStatus(400);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = SearchController;
