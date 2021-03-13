const Browse = require('./Browse');

describe('Browse', () => {
  let browse;
  const bookModelMock = {
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
    browse = new Browse(bookModelMock);
  });

  describe('constructor', () => {
    it('should set this.bookModel', () => {
      expect(browse.bookModel).toBe(bookModelMock);
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

  });
});
