const collections = require('../collections');

describe('collections', () => {
  it('should match the snapshot', () => {
    expect(collections).toMatchSnapshot();
  });
});
