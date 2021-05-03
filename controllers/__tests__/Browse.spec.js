const BrowseController = require('../Browse');
const Browse = require('../../lib/Browse');

jest.mock('../../lib/Browse');
jest.mock('../../lib/Mongo', () => ({
  db: {
    collection: jest.fn(() => ({
      aggregate: jest.fn(),
      createIndex: jest.fn(),
      drop: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      insertMany: jest.fn(),
    })),
  },
}));

describe('BrowseController', () => {
  let browse;
  beforeEach(() => {
    Browse.mockImplementation(() => ({
      byChar: jest.fn(() => []),
    }));
    browse = new BrowseController();
  });

  describe('constructor', () => {
    it('should set its templates', () => {
      expect(browse.template).toMatchSnapshot();
    });
  });

  describe('get', () => {
    it('should call res.render with "get" template and results', async () => {
      const renderMock = jest.fn();
      const resMock = { render: renderMock };
      const reqMock = { params: 'a' };
      const nextMock = jest.fn();
      await browse.get(reqMock, resMock, nextMock);
      expect(renderMock).toHaveBeenCalledWith(
        browse.template.get, { results: [] },
      );
    });
    it('should call "next" on errors', async () => {
      const error = new Error();
      const resMock = jest.fn();
      const reqMock = { params: 'a' };
      const nextMock = jest.fn();
      Browse.mockImplementation(() => ({
        byChar: jest.fn(() => { throw error; }),
      }));
      await browse.get(reqMock, resMock, nextMock);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });
});
