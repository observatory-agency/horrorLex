const slugify = require('../helpers/slugify');

module.exports = (article) => ({
  title: article.Title,
  author: article.Author,
  publication: article.Publication,
  year: article.Year,
  doiStableUrl: article['DOI/Stable URL'],
  freeOnlineCopy: article['Free Online Copy'],
  mla8Citation: article['MLA 8 Citation'],
  reprintedIn: article['Reprinted In'],
  jstor: article.JSTOR,
  horrorLexSummary: article['Horror Lex Summary'],
  filmsDiscussed: article.Films.split('\n'),
  tags: article.Tags.split(', '),
  recommended: article.Rec,
  photo: article.Photo,
  slug: slugify(article.Title),
  type: 'article',
});
