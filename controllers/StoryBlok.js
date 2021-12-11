const BaseController = require('./Base');
const BlogEngine = require('../lib/BlogEngine');

class StoryBlokController extends BaseController {
  post(req, res, next) {
    const { headers, body } = req;
    const blogEngine = new BlogEngine();
    const signature = headers['webhook-signature'];
    try {
      return this.verifySignature(body, signature)
        ? res.sendStatus(201) && blogEngine.build()
        : res.sendStatus(422);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = StoryBlokController;
