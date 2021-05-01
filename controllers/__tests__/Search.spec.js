const SearchController = require('../Search');

describe('SearchController', () => {
  let search;
  beforeEach(() => {
    search = new SearchController();
  });

  describe('constructor', () => {
    it('should set its templates', () => {
      expect(search.template).toMatchSnapshot();
    });
  });

  describe('get', () => {
    it('should call render with the "get" template', () => {
      const renderMock = jest.fn();
      const resMock = { render: renderMock };
      search.get(null, resMock);
      expect(renderMock).toHaveBeenCalledWith(search.template.get);
    });
  });
});
