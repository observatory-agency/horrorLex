const slugify = require('../helpers/slugify');

module.exports = (book) => {
  const formattedBook = {
    title: book.Title,
    author: book.Author,
    isbn13: book['ISBN-13'].split('\n'),
    year: book.Year,
    originalPublisher: book['Original Publisher'],
    updatedEdition: book['Updated Edition'],
    publisherStableUrl: book['Publisher/Stable URL'],
    mla8Citation: book['MLA 8 Citation'],
    freeOnlineCopy: book['Free Online Copy']
      && book['Free Online Copy'] !== 'Not Available'
      ? book['Free Online Copy']
      : undefined,
    buy: book.Buy,
    googleBooks: book['Google Books'],
    goodReads: book.Goodreads,
    worldCat: book.WorldCat,
    summary: book['Horror Lex Summary']
      && book['Horror Lex Summary'] !== 'Coming Soon'
      ? book['Horror Lex Summary']
      : undefined,
    films: book['Films Discussed'].split('\n'),
    tags: book.Tags.split(', '),
    recommended: book.Recommended
      && book.Recommended === 'Yes'
      ? book.Recommended
      : undefined,
    photo: book.Photo,
    slug: slugify(book.Title),
    isBook: true,
  };

  Object.keys(formattedBook).forEach((key) => {
    if (!formattedBook[key]) {
      delete formattedBook[key];
    }
  });

  return formattedBook;
};
