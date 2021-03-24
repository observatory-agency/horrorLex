const bookTransformer = require('../book');

const mockBook = {
  Title: 'The Wrong House: The Architecture of Alfred Hitchcock',
  Author: 'Jacobs, Steven',
  'ISBN-13': '9789462080966 (paperback)',
  Year: '2007',
  'Original Publisher': '010 Publishers',
  'Updated Edition': 'nai010 Publishers (reprint, 2013)',
  'Publisher/Stable URL': 'https://www.nai010.com/en/publicaties/the-wrong-house/141156',
  'MLA 8 Citation': 'Jacobs, Steven. The Wrong House: The Architecture of Alfred Hitchcock. 2007. Nai010 Publishers, 2013.',
  'Free Online Copy': 'https://archive.org/details/TheWrongHouseTheArchitectureOfAlfredHitchcock/\n' +
    '\n' +
    'https://api.semanticscholar.org/CorpusID:193662730',
  Buy: '',
  'Google Books': 'https://books.google.com/books/about/The_Wrong_House.html?id=rIDVqjD6SZIC',
  Goodreads: 'https://www.goodreads.com/en/book/show/3562159',
  WorldCat: 'http://www.worldcat.org/oclc/175647408',
  'Horror Lex Summary': '',
  'Films Discussed': 'The Birds (1963)\n'
    + 'Dial M for Murder (1954)\n'
    + 'Frenzy (1972)\n'
    + 'Psycho (1960)\n'
    + 'Rear Window (1954)\n'
    + 'Rebecca (1940)\n'
    + 'Shadow of a Doubt (1943)\n'
    + 'Suspicion (1941)\n'
    + 'Vertigo (1958)',
  Tags: 'apartment, architecture, cities, haunted house, haunting, Hitchcock, urban',
  'HL Recommended': '',
  Photo: 'JACSTE2007',
};

describe('bookTransformer', () => {
  it('should match the snapshot', () => {
    expect(bookTransformer(mockBook)).toMatchSnapshot();
  });
});
