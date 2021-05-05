const BaseController = require('./Base');
const Search = require('../lib/Search');

class ResultsController extends BaseController {
  constructor() {
    super();
    this.template = {
      error: 'error.hbs',
      get: 'results.hbs',
    };
  }

  async get(req, res, next) {
    try {
      const { query } = req;
      const { PublicationModel } = this.models;
      const publicationModel = new PublicationModel();
      const search = new Search(publicationModel);
      const results = await search.many(query);
      return results
        ? res.render(this.template.get, { results })
        : res.status(400).render(this.template.error, { status: 400 });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = ResultsController;
