const BookModel = require('../../models/Book');
const BaseController = require('../Base');

jest.mock('../../models/Book');

class SomeOtherController extends BaseController {
  constructor() {
    super();
    this.get = 'get';
    this.post = 'post';
  }

  get() {
    return this.get;
  }

  post() {
    return this.post;
  }
}

describe('BaseController', () => {
  let base;
  beforeEach(() => {
    base = new BaseController();
    someOtherController = new SomeOtherController();
  });

  describe('constructor', () => {
    it('should set up a this.modelMap', () => {
      expect(base.modelMap).toBeDefined();
    });
    it('should set this.get', () => {
      expect(base.get).toBeDefined();
    });
    it('should set this.post', () => {
      expect(base.post).toBeDefined();
    });
  });

  describe('model', () => {
    it('should return the modelMap with instantiated models', () => {
      expect(base.model).toMatchSnapshot();
    });
  });
});
