/** Supported Mongo Collections */
module.exports = {
  books: {
    name: 'books',
    index: {
      author: 'text',
      title: 'text',
      isbn13: 'text',
      year: 'text',
    },
  },
};
