module.exports = (map) => Object.keys(map).map((title) => ({
  title, tags: map[title],
}));
