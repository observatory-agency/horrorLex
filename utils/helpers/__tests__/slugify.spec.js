const slugify = require('../slugify');

describe('slugify', () => {
  it('should match the snapshot', () => {
    const title = 'Encyclopedia of the Vampire: The Living Dead in Myth, Legend, and Popular Culture';
    expect(slugify(title)).toMatchSnapshot();
  });
});
