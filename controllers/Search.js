const BaseController = require('./Base');

class SearchController extends BaseController {
  constructor() {
    super();
    this.template = {
      get: 'search.hbs',
    };
  }

  get(_, res) {
    res.render(this.template.get);
  }
}

module.exports = SearchController;
