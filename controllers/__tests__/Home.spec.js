const HomeController = require('../Home');

describe('HomeController', () => {
  let home;
  beforeEach(() => {
    home = new HomeController();
  });

  describe('constructor', () => {
    it('should set its templates', () => {
      expect(home.template).toMatchSnapshot();
    });
  });

  describe('get', () => {
    it('should call render with the "get" template', () => {
      const renderMock = jest.fn();
      const resMock = { render: renderMock };
      home.get(null, resMock);
      expect(renderMock).toHaveBeenCalledWith(home.template.get);
    });
  });
});
