const dataFilters = require('../dataFilters');

describe('dataFilters', () => {
  it('should match the snapshot', () => {
    expect(dataFilters).toMatchSnapshot();
  });
});
