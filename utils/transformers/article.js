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
  muse: article.MUSE !== 'No' ? article.MUSE : undefined,
  jstor: article.JSTOR !== 'No' ? article.JSTOR : undefined,
  summary: article['Horror Lex Summary'] !== 'Coming Soon'
    ? article['Horror Lex Summary']
    : undefined,
  films: article.Films.split('\n'),
  tags: article.Tags.split(', '),
  recommended: article.Rec === 'Y',
  photo: article.Photo,
  slug: slugify(article.Title),
  isArticle: true,
});
