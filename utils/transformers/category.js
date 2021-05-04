module.exports = {
  mapper({ category, tag }, categoryMap) {
    // eslint-disable-next-line no-param-reassign
    categoryMap[category] = categoryMap[category] || [];
    categoryMap[category].push(tag);
  },
  transformer(map) {
    return Object.keys(map).map((title) => ({
      title, tags: map[title],
    }));
  },
};
