const BaseController = require('../Base');

jest.mock('../../models/Book');

describe('BaseController', () => {
  let base;
  beforeEach(() => {
    base = new BaseController();
  });

  describe('constructor', () => {
    it('should set up a this.modelsMap', () => {
      expect(base.modelsMap).toBeDefined();
    });
    it('should set this.get', () => {
      expect(base.get).toBeDefined();
    });
    it('should set this.post', () => {
      expect(base.post).toBeDefined();
    });
  });

  describe('models', () => {
    it('should return the modelMap with instantiated models', () => {
      expect(base.models).toMatchSnapshot();
    });
  });
});
