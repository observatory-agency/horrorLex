const Env = require('../Env');

describe('Env', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });
  describe('#is', () => {
    it('should return a boolean value', () => {
      expect(Env.is('production')).toBe(true);
    });
  });
});
