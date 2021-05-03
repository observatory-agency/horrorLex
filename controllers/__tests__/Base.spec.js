const BaseController = require('../Base');

describe('BaseController', () => {
  let base;
  beforeEach(() => {
    base = new BaseController();
  });
  describe('constructor', () => {
    describe('modelsMap', () => {
      it('should set up a this.modelsMap', () => {
        expect(base.modelsMap).toBeDefined();
      });
    });
    describe('get', () => {
      describe('when there is a get method', () => {
        it('should bind this.get', () => {
          base.get = jest.fn();
          expect(base.get).toBeTruthy();
        });
      });
      describe('when there is not a get method', () => {
        it('should set this.get to null', () => {
          expect(base.get).toBeNull();
        });
      });
    });
  });
});
