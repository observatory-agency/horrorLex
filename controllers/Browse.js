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
      const { FilmModel } = this.models;
      const publicationModel = new FilmModel();
      const regexChar = Browse.createRegexStr(char || 'a');
      const browse = new Browse(publicationModel);
      const results = await browse.byChar(regexChar);
      return res.render(this.template.get, { results });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BrowseController;
