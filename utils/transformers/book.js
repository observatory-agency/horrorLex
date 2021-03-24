const generateSeoUrl = require('../helpers/generateSeoSlug');

module.exports = (book) => ({
  title: book.Title,
  author: book.Author,
  isbn13: book['ISBN-13'].split('\n'),
  year: book.Year,
  originalPublisher: book['Original Publisher'],
  updatedEdition: book['Updated Edition'],
  publisherStableUrl: book['Publisher/Stable URL'],
  mla8Citation: book['MLA 8 Citation'],
  freeOnlineCopy: book['Free Online Copy'],
  buy: book.Buy,
  googleBooks: book['Google Books'],
  goodReads: book.Goodreads,
  worldCat: book.WorldCat,
  horrorLexSummary: book['Horror Lex Summary'],
  filmsDiscussed: book['Films Discussed'].split('\n'),
  tags: book.Tags.split(', '),
  photo: book.Photo,
  href: generateSeoUrl(book.Title),
});
