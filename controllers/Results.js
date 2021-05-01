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
      const { PublicationModel } = this.models;
      const publicationModel = new PublicationModel();
      const search = new Search(publicationModel);
      const results = await search.many(query);
      return results
        ? res.render(this.template.get, { results })
        : res.sendStatus(400);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = ResultsController;
