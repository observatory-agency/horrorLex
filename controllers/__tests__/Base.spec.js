const BaseController = require('../Base');

jest.mock('../../models/Book');

// class SomeOtherController extends BaseController {
//   constructor() {
//     super();
//     this.get = 'get';
//     this.post = 'post';
//   }

//   get() {
//     return this.get;
//   }

//   post() {
//     return this.post;
//   }
// }

describe('BaseController', () => {
  let base;
  beforeEach(() => {
    base = new BaseController();
    // someOtherController = new SomeOtherController();
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
