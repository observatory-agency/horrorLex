const Browse = require('../Browse');

jest.mock('mongodb');

describe('Browse', () => {
  let browse;
  const model = {
    aggregate: jest.fn(() => ({
      toArray: jest.fn(() => [{
        _id: 1, documents: [{ title: 'book1' }],
      }]),
    })),
    find: jest.fn(() => ({
      toArray: jest.fn(() => [{ title: 'book1' }]),
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
    describe('invalid characters', () => {
      it('should throw', () => {
        const invalidChar = '5';
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

  describe('relatedBooks', () => {
    it('should return an array of results', async () => {
      const results = await browse.relatedBooks([
        '1234567890',
        '0987654321',
      ]);
      expect(results).toMatchSnapshot();
    });
  });
});
