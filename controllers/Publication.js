const BaseController = require('./Base');
const Search = require('../lib/Search');

class PublicationController extends BaseController {
  constructor() {
    super();
    this.enums = { article: 'article', book: 'book' };
    this.template = {
      error: 'error.hbs',
      get: { article: 'article.hbs', book: 'book.hbs' },
    };
  }

  async get(req, res, next) {
    try {
      const { params: { slug } } = req;
      const { PublicationModel } = this.models;
      const publicationModel = new PublicationModel();
      const search = new Search(publicationModel);
      const publication = await search.one(slug);
      const article = publication.isArticle && this.enums.article;
      const book = publication.isBook && this.enums.book;
      return publication
        ? res.render(this.template.get[article || book], {
          [article || book]: publication,
        })
        : res.status(404).render(this.template.error, { status: 404 });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = PublicationController;
