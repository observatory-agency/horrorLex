const Browse = require('../Browse');

jest.mock('mongodb');

describe('Browse', () => {
  let browse;
  const model = {
    collectionName: 'films',
    aggregate: jest.fn(() => ({
      toArray: jest.fn(() => [{
        _id: { title: 'book1' },
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
    describe('when there are tags included with the results', () => {
      beforeEach(() => {
        browse = new Browse({
          collectionName: 'films',
          aggregate: jest.fn(() => ({
            toArray: jest.fn(() => [{
              _id: { tags: ['tag1', 'tag2'], title: 'book1' },
            }]),
          })),
        });
      });
      it('should return an object of formatted results', async () => {
        const regexChar = Browse.createRegexStr('a');
        const results = await browse.byChar(regexChar);
        expect(results).toMatchSnapshot();
      });
    });
  });
});
