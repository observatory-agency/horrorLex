const words = require('../../constants/stopWords');

module.exports = (string) => {
  const chunks = string.split(' ');
  const chunk = chunks[0].toLowerCase();
  words.forEach((word) => word === chunk && chunks.shift());
  return chunks.join(' ');
};
