const env = require('../env');

describe('env', () => {
  it('should match the snapshot', () => {
    expect(env).toMatchSnapshot();
  });
});
