const BaseController = require('./Base');

class HomeController extends BaseController {
  constructor() {
    super();
    this.template = {
      get: 'home.hbs',
    };
  }

  get(_, res) {
    return res.render(this.template.get);
  }
}

module.exports = HomeController;
