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

  describe('one', () => {
    it('should return a document', async () => {
      const result = await search.one('some book slug');
      expect(result).toBe(mockDocument);
    });
  });

  describe('many', () => {
    describe('advanced', () => {
      describe('first page', () => {
        it('should return an object representing the results', async () => {
          const mockParams = { title: 'vampire' };
          const results = await search.many(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
    });
    describe('film', () => {
      describe('first page', () => {
        it('should return an object representing the results', async () => {
          const mockParams = { title: 'vampire', type: 'film' };
          const results = await search.many(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
    });
    describe('quick', () => {
      describe('first page', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            count: '10',
            page: '1',
            query: 'vampire',
            sort: 'title',
            type: 'quick',
          };
          const results = await search.many(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
      describe('last page', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            count: '10',
            page: '100',
            query: 'vampire',
            sort: 'title',
            type: 'quick',
          };
          const results = await search.many(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
      describe('minimum amount of parameters', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            query: 'vampire',
            type: 'quick',
          };
          const results = await search.many(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
    });

    describe('tag', () => {
      describe('first page', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            count: '10',
            page: '1',
            query: 'vampire',
            sort: 'title',
            type: 'tag',
          };
          const results = await search.many(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
      describe('last page', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            count: '10',
            page: '100',
            query: 'vampire',
            sort: 'title',
            type: 'tag',
          };
          const results = await search.many(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
      describe('minimum amount of parameters', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            query: 'vampire',
            type: 'tag',
          };
          const results = await search.many(mockParams);
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
          count: '10',
          page: '1',
          sort: 'author',
          type: 'vampire',
        };
        const results = await search.many(mockParams);
        expect(results).toMatchSnapshot();
      });
    });
  });
});
