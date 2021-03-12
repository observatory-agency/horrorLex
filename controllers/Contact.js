const BaseController = require('./Base');

class ContactController extends BaseController {
  constructor() {
    super();
    this.view = 'contact.hbs';
  }

  get(req, res) {
    return res.render(this.view);
  }
}

module.exports = ContactController;
