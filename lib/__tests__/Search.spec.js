const Search = require('../Search');

describe('Search', () => {
  let search;
  const mockDocument = {
    title: 'book1',
  };
  const mockModel = {
    aggregate: jest.fn(() => ({
      toArray: jest.fn(() => [{
        documents: [mockDocument], total: [{ count: 100 }],
      }]),
    })),
    findOne: jest.fn(() => Promise.resolve(mockDocument)),
  };

  beforeEach(() => {
    search = new Search(mockModel);
  });

  describe('constructor', () => {
    it('should set this.model', () => {
      expect(search.model).toBe(mockModel);
    });
  });

  describe('advanced', () => {
    describe('minimum amount of parameters', () => {
      it('should return an object representing the results', async () => {
        const mockParams = {
          input: {
            title: 'vampire',
            author: '',
            isbn13: '',
            year: '2016',
          },
          checkbox: {
            books: 'on',
            freeOnlineCopy: 'off',
            horrorLexSummary: 'off',
          },
        };
        const results = await search.advanced(mockParams);
        expect(results).toMatchSnapshot();
      });
    });
  });

  describe('one', () => {
    it('should return a document', async () => {
      const result = await search.one('some book slug');
      expect(result).toBe(mockDocument);
    });
  });

  describe('quick', () => {
    describe('search', () => {
      describe('first page', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            c: '10',
            p: '1',
            q: 'vampire',
            s: 'title',
            t: 'quick',
          };
          const results = await search.quick(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
      describe('last page', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            c: '10',
            p: '100',
            q: 'vampire',
            s: 'title',
            t: 'quick',
          };
          const results = await search.quick(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
      describe('minimum amount of parameters', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            q: 'vampire',
            t: 'quick',
          };
          const results = await search.quick(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
    });

    describe('tag', () => {
      describe('first page', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            c: '10',
            p: '1',
            q: 'vampire',
            s: 'title',
            t: 'tag',
          };
          const results = await search.quick(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
      describe('last page', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            c: '10',
            p: '100',
            q: 'vampire',
            s: 'title',
            t: 'tag',
          };
          const results = await search.quick(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
      describe('minimum amount of parameters', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            q: 'vampire',
            t: 'tag',
          };
          const results = await search.quick(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
    });

    describe('no results', () => {
      beforeEach(() => {
        const mockModelNoResults = {
          aggregate: jest.fn(() => ({
            toArray: jest.fn(() => [{
              documents: [], total: [],
            }]),
          })),
        };
        search = new Search(mockModelNoResults);
      });
      it('should return "null"', async () => {
        const mockParams = {
          c: '10',
          p: '1',
          s: 'author',
          t: 'vampire',
        };
        const results = await search.quick(mockParams);
        expect(results).toMatchSnapshot();
      });
    });
  });
});
