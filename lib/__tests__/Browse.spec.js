const Browse = require('../Browse');

jest.mock('mongodb');

describe('Browse', () => {
  let browse;
  const model = {
    aggregate: jest.fn(() => ({
      toArray: jest.fn(() => [{
        _id: { tags: [], title: 'book1' },
      }]),
    })),
  };

  beforeEach(() => {
    browse = new Browse(model);
  });

  describe('constructor', () => {
    it('should set this.model', () => {
      expect(browse.model).toBe(model);
    });
  });

  describe('createRegexStr', () => {
    describe('"a-zA-Z" character', () => {
      it('should return a formatted regex expressions', () => {
        const validChar = 'a';
        expect(Browse.createRegexStr(validChar)).toMatchSnapshot();
      });
    });
    describe('numerical character', () => {
      it('should return a formatted regex expressions', () => {
        const validChar = 'num';
        expect(Browse.createRegexStr(validChar)).toMatchSnapshot();
      });
    });
    describe('invalid characters', () => {
      it('should throw', () => {
        const invalidChar = '<';
        expect(() => {
          Browse.createRegexStr(invalidChar);
        }).toThrow('Invalid characters');
      });
    });
  });

  describe('byChar', () => {
    it('should return an object of formatted results', async () => {
      const regexChar = Browse.createRegexStr('a');
      const results = await browse.byChar(regexChar);
      expect(results).toMatchSnapshot();
    });
  });
});
