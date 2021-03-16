const AboutController = require('../About');

describe('AboutController', () => {
  let about;
  beforeEach(() => {
    about = new AboutController();
  });

  describe('constructor', () => {
    it('should set its templates', () => {
      expect(about.template).toMatchSnapshot();
    });
  });

  describe('get', () => {
    it('should call render with the "get" template', () => {
      const renderMock = jest.fn();
      const resMock = { render: renderMock };
      about.get(null, resMock);
      expect(renderMock).toHaveBeenCalledWith(about.template.get);
    });
  });
});
