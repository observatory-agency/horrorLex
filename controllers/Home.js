const BaseController = require('./Base');

class HomeController extends BaseController {
  constructor() {
    super();
    this.view = 'home.hbs';
  }

  get(req, res) {
    return res.render(this.view);
  }
}

module.exports = HomeController;
