const BaseController = require('./Base');

class BlogPostController extends BaseController {
  constructor() {
    super();
    this.template = {
      get: 'blog-post.hbs',
    };
  }

  get(_, res) {
    return res.render(this.template.get);
  }
}

module.exports = BlogPostController;
