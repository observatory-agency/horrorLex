const schema = require('../schema');

describe('schema', () => {
  it('should match the snapshot', () => {
    expect(schema).toMatchSnapshot();
  });
});
