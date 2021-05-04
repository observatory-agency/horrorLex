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
    describe('without a char param', () => {
      it('should call res.render with "get" template and results', async () => {
        const renderMock = jest.fn();
        const resMock = { render: renderMock };
        const reqMock = { params: { view: 'film' } };
        const nextMock = jest.fn();
        await browse.get(reqMock, resMock, nextMock);
        expect(renderMock).toHaveBeenCalledWith(
          browse.template.get, { results: [], view: 'film' },
        );
      });
    });
    describe('with a char param', () => {
      it('should call res.render with "get" template and results', async () => {
        const renderMock = jest.fn();
        const resMock = { render: renderMock };
        const reqMock = { params: { char: 'a', view: 'film' } };
        const nextMock = jest.fn();
        await browse.get(reqMock, resMock, nextMock);
        expect(renderMock).toHaveBeenCalledWith(
          browse.template.get, { results: [], view: 'film' },
        );
      });
    });
    describe('with an invalid view param', () => {
      it('should call res.renderStatus with 404', async () => {
        const sendStatusMock = jest.fn();
        const resMock = { sendStatus: sendStatusMock };
        const reqMock = { params: { char: 'a', view: 'articles' } };
        const nextMock = jest.fn();
        await browse.get(reqMock, resMock, nextMock);
        expect(sendStatusMock).toHaveBeenCalledWith(404);
      });
    });
    describe('other errors', () => {
      it('should call "next" on errors', async () => {
        const error = new Error();
        const resMock = jest.fn();
        const reqMock = { params: { char: 'a', view: 'film' } };
        const nextMock = jest.fn();
        Browse.mockImplementation(() => ({
          byChar: jest.fn(() => { throw error; }),
        }));
        await browse.get(reqMock, resMock, nextMock);
        expect(nextMock).toHaveBeenCalledWith(error);
      });
    });
  });
});
