const BaseController = require('./Base');

class ContactController extends BaseController {
  constructor() {
    super();
    this.template = {
      get: 'contact.hbs',
    };
  }

  get(_, res) {
    return res.render(this.template.get);
  }
}

module.exports = ContactController;
