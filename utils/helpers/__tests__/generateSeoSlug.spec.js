const generateSeoSlug = require('../generateSeoSlug');

describe('generateSeoSlug', () => {
  it('should match the snapshot', () => {
    const title = 'Encyclopedia of the Vampire: The Living Dead in Myth, Legend, and Popular Culture';
    expect(generateSeoSlug(title)).toMatchSnapshot();
  });
});
