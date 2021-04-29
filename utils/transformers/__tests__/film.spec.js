const filmTransformer = require('../film');

const mockFilm = {
  '#Horror (2015)': '4D Man (1959)',
};

describe('bookTransformer', () => {
  it('should match the snapshot', () => {
    expect(filmTransformer(mockFilm)).toMatchSnapshot();
  });
});
