const BaseController = require('./Base');

class AboutController extends BaseController {
  constructor() {
    super();
    this.view = 'about.hbs';
  }

  get(req, res) {
    return res.render(this.view);
  }
}

module.exports = AboutController;
