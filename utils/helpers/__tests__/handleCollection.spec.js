const handleCollection = require('../handleCollection');

describe('handleCollection', () => {
  it('should return the appropriate transformer and model for a collection', () => {
    expect(handleCollection('books')).toMatchSnapshot();
    expect(handleCollection('films')).toMatchSnapshot();
    expect(() => {
      handleCollection('somethingElse');
    }).toThrow();
  });
});
