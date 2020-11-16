const HandlebarsHelpers = require('./HandlebarsHelpers');

const hbsMock = jest.fn();
const optionsMock = {
  fn: jest.fn(),
  inverse: jest.fn(),
  data: {
    root: {
      pagination: {
        currPage: '5',
      },
    },
  },
};

describe('HandlebarsHelpers', () => {
  describe('constructor', () => {
    it('should return an instance of HandlebarsHelpers', () => {
      expect(new HandlebarsHelpers(hbsMock)).toBeInstanceOf(HandlebarsHelpers);
    });
  });

  describe('envHelper', () => {
    it('should call options.fn', () => {
      new HandlebarsHelpers(hbsMock).envHelper('development', optionsMock);
      expect(optionsMock.fn).toHaveBeenCalled();
    });
    it('should call options.inverse', () => {
      new HandlebarsHelpers(hbsMock).envHelper('production', optionsMock);
      expect(optionsMock.inverse).toHaveBeenCalled();
    });
  });

  describe('pageActiveHelper', () => {
    it('should call options.fn', () => {
      new HandlebarsHelpers(hbsMock).pageActiveHelper('5', optionsMock);
      expect(optionsMock.fn).toHaveBeenCalled();
    });
    it('should call options.inverse', () => {
      new HandlebarsHelpers(hbsMock).pageActiveHelper('4', optionsMock);
      expect(optionsMock.inverse).toHaveBeenCalled();
    });
  });

  describe('pageNumberHelper', () => {
    it('should return a string', () => {
      
    })
  })
});
