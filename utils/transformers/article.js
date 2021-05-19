const slugify = require('../helpers/slugify');

module.exports = (article) => {
  const formattedArticle = {
    title: article.Title,
    author: article.Author,
    publication: article.Publication,
    year: article.Year,
    doiStableUrl: article['DOI/Stable URL'],
    freeOnlineCopy: article['Free Online Copy']
      && article['Free Online Copy'] !== 'Not Available'
      ? article['Free Online Copy'].split('\n')
      : undefined,
    mla8Citation: article['MLA 8 Citation'],
    reprintedIn: article['Reprinted In'],
    muse: article.MUSE
      && article.MUSE !== 'No'
      ? article.MUSE
      : undefined,
    jstor: article.JSTOR
      && article.JSTOR !== 'No'
      ? article.JSTOR
      : undefined,
    summary: article['Horror Lex Summary']
      && article['Horror Lex Summary'] !== 'Coming Soon'
      ? article['Horror Lex Summary']
      : undefined,
    films: article.Films.split('\n'),
    tags: article.Tags.split(', '),
    recommended: article.Rec
      && article.Rec === 'Y'
      ? true
      : undefined,
    photo: article.Photo,
    slug: slugify(article.Title),
    isArticle: true,
  };

  Object.keys(formattedArticle).forEach((key) => {
    if (!formattedArticle[key]) {
      delete formattedArticle[key];
    }
  });

  return formattedArticle;
};
