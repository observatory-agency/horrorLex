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

  // describe('advanced', () => {
  // });

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
            count: '10',
            page: '1',
            search: 'vampire',
            sort: 'title',
          };
          const results = await search.quick(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
      describe('last page', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            count: '10',
            page: '100',
            search: 'vampire',
            sort: 'title',
          };
          const results = await search.quick(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
      describe('minimum amount of parameters', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            search: 'vampire',
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
            count: '10',
            page: '1',
            tag: 'vampire',
            sort: 'title',
          };
          const results = await search.quick(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
      describe('last page', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            count: '10',
            page: '100',
            tag: 'vampire',
            sort: 'title',
          };
          const results = await search.quick(mockParams);
          expect(results).toMatchSnapshot();
        });
      });
      describe('minimum amount of parameters', () => {
        it('should return an object representing the results', async () => {
          const mockParams = {
            tag: 'vampire',
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
              documents: [], total: [{ count: 0 }],
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
          tag: 'vampire',
        };
        const results = await search.quick(mockParams);
        expect(results).toMatchSnapshot();
      });
    });
  });
});