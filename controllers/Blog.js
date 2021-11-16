const BaseController = require('./Base');

class BlogController extends BaseController {
  constructor() {
    super();
    this.template = {
      get: 'blog.hbs',
    };
  }

  get(_, res) {
    return res.render(this.template.get);
  }
}

module.exports = BlogController;
