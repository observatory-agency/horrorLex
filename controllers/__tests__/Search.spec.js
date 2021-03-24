const SearchController = require('../Search');
const Search = require('../../lib/Search');
const BookModel = require('../../models/Book');

jest.mock('../../lib/Search');
jest.mock('../../models/Book');

describe('SearchController', () => {
  let search;
  beforeEach(() => {
    Search.mockImplementation(() => ({
      advanced: jest.fn(() => ([])),
    }));
    search = new SearchController();
  });

  describe('constructor', () => {
    it('should set its templates', () => {
      expect(search.template).toMatchSnapshot();
    });
  });

  describe('get', () => {
    it('should call res.render with "get" template', async () => {
      const renderMock = jest.fn();
      const resMock = { render: renderMock };
      await search.get(null, resMock);
      expect(renderMock).toHaveBeenCalledWith(search.template.get);
    });
  });

  describe('post', () => {
    describe('with a result', () => {
      it('should call res.render with "post" template and the results', async () => {
        const renderMock = jest.fn();
        const resMock = { render: renderMock };
        const reqMock = { body: '' };
        const nextMock = jest.fn();
        await search.post(reqMock, resMock, nextMock);
        expect(renderMock).toHaveBeenCalledWith(search.template.post, { results: [] });
      });
    });

    describe('without a result', () => {
      it('should call res.sendStatus with a "400"', async () => {
        const sendStatusMock = jest.fn();
        const resMock = { sendStatus: sendStatusMock };
        const reqMock = { body: '' };
        const nextMock = jest.fn();
        Search.mockImplementation(() => ({
          advanced: jest.fn(() => null),
        }));
        await search.post(reqMock, resMock, nextMock);
        expect(sendStatusMock).toHaveBeenCalledWith(400);
      });
    });

    it('should call "next" on errors', async () => {
      const error = new Error();
      const resMock = jest.fn();
      const reqMock = { body: '' };
      const nextMock = jest.fn();
      Search.mockImplementation(() => ({
        advanced: jest.fn(() => { throw error; }),
      }));
      await search.post(reqMock, resMock, nextMock);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });
});
