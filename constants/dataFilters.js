/** Filters for data importing utils */
module.exports = {
  // object props to split to an array and which char to split on
  propToArray: {
    'ISBN-13': '\n',
    'Films Discussed': '\n',
    Tags: ', ',
  },
  // strips/replaces special characters from keys
  specialCharFilter: {
    '/': '',
    '-': '',
  },
};
