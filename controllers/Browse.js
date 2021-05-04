const BaseController = require('./Base');
const Browse = require('../lib/Browse');

class BrowseController extends BaseController {
  constructor() {
    super();
    this.enums = {
      defaultChar: 'a',
      model: {
        category: 'CategoryModel',
        film: 'FilmModel',
      },
    };
    this.template = {
      get: 'browse.hbs',
      post: 'results.hbs',
    };
    this.validViews = [
      'category',
      'film',
    ];
  }

  async get(req, res, next) {
    try {
      const { params: { char, view } } = req;
      const Model = this.models[this.enums.model[view]];
      const model = this.enums.model[view] ? new Model() : {};
      const regexChar = Browse.createRegexStr(char || this.enums.defaultChar);
      const browse = new Browse(model, view);
      const results = await browse.byChar(regexChar);
      return this.validViews.includes(view)
        ? res.render(this.template.get, { results, view })
        : res.sendStatus(404);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BrowseController;
