const fs = require('fs/promises');
const hbs = require('hbs');
const BaseController = require('./Base');
const { browseCard } = require('../constants/filePaths');
const Browse = require('../lib/Browse');

class BrowseController extends BaseController {
  constructor() {
    super();
    this.template = {
      get: 'browse.hbs',
    };
  }

  async get(req, res, next) {
    try {
      const { params: { char } } = req;
      const regexChar = Browse.createRegexStr(char);
      const browse = new Browse(this.model.book);
      const results = await browse.byChar(regexChar);
      return res.render(this.template.get, { results });
    } catch (error) {
      return next(error);
    }
  }

  async post(req, res, next) {
    try {
      const { body: { books } } = req;
      const browse = new Browse(this.model.book);
      const results = await browse.relatedBooks(books);
      const source = await fs.readFile(browseCard);
      const template = hbs.handlebars.compile(source.toString());
      return res.json(template({ results }));
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BrowseController;
