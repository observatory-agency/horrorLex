const ContactController = require('../Contact');

describe('ContactController', () => {
  let contact;
  beforeEach(() => {
    contact = new ContactController();
  });

  describe('constructor', () => {
    it('should set its templates', () => {
      expect(contact.template).toMatchSnapshot();
    });
  });

  describe('get', () => {
    it('should call render with the "get" template', () => {
      const renderMock = jest.fn();
      const resMock = { render: renderMock };
      contact.get(null, resMock);
      expect(renderMock).toHaveBeenCalledWith(contact.template.get);
    });
  });
});
