const BaseController = require('./Base');

class StoryBlokController extends BaseController {
  constructor() {
    super();
  }

  post(req, res, next) {
    const { headers, body } = req;
    const signature = headers['webhook-signature'];
    const verifiedSignature = this.verifySignature(body, signature);
    return verifiedSignature ? res.sendStatus(201) : res.sendStatus(422);
  }
}

module.exports = StoryBlokController;
