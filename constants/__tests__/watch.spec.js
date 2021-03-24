const watch = require('../watch');

describe('watch', () => {
  it('should match the snapshot', () => {
    expect(watch).toMatchSnapshot();
  });
});
