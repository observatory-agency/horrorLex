const BrowseController = require('../Browse');
const Browse = require('../../lib/Browse');
const BookModel = require('../../models/Book');

jest.mock('../../lib/Browse');
jest.mock('../../models/Book');

describe('BrowseController', () => {
  let browse;
  beforeEach(() => {
    Browse.mockImplementation(() => ({
      byChar: jest.fn(() => []),
      relatedBooks: jest.fn(() => ({})),
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

  describe('post', () => {
    it('should call res.json with the results HTML string', async () => {
      const jsonMock = jest.fn();
      const resMock = { json: jsonMock };
      const reqMock = { body: { books: [] } };
      const nextMock = jest.fn();
      await browse.post(reqMock, resMock, nextMock);
      expect(jsonMock).toBeCalled();
    });
    it('should call "next" on errors', async () => {
      const error = new Error();
      const resMock = jest.fn();
      const reqMock = { body: { books: [] } };
      const nextMock = jest.fn();
      Browse.mockImplementation(() => ({
        relatedBooks: jest.fn(() => { throw error; }),
      }));
      await browse.post(reqMock, resMock, nextMock);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });
});
