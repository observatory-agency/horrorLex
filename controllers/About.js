const BaseController = require('./Base');

class AboutController extends BaseController {
  constructor() {
    super();
    this.template = {
      get: 'about.hbs',
    };
  }

  get(_, res) {
    return res.render(this.template.get);
  }
}

module.exports = AboutController;
