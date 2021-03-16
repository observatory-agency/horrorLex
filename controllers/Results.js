const BaseController = require('./Base');
const Search = require('../lib/Search');

class ResultsController extends BaseController {
  constructor() {
    super();
    this.template = {
      get: 'results.hbs',
    };
  }

  async get(req, res, next) {
    try {
      const { query } = req;
      const search = new Search(this.model.book);
      const results = await search.quick(query);
      return results
        ? res.render(this.template.get, { results })
        : res.sendStatus(400);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = ResultsController;
