const handleCollection = require('../handleCollection');

jest.mock('../../../lib/Mongo', () => ({ db: { collection: jest.fn(() => ({})) } }));

describe('handleCollection', () => {
  it('should return the appropriate transformer and model for a collection', () => {
    expect(handleCollection('articles')).toMatchSnapshot();
    expect(handleCollection('books')).toMatchSnapshot();
    expect(handleCollection('films')).toMatchSnapshot();
    expect(() => { handleCollection('somethingElse'); }).toThrow();
  });
});
