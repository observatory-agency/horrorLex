const ResultsController = require('../Results');
const Search = require('../../lib/Search');
const BookModel = require('../../models/Book');

jest.mock('../../lib/Search');
jest.mock('../../models/Book');

describe('ResultsController', () => {
  let results;
  beforeEach(() => {
    Search.mockImplementation(() => ({
      quick: jest.fn(() => ([])),
    }));
    results = new ResultsController();
  });

  describe('constructor', () => {
    it('should set its templates', () => {
      expect(results.template).toMatchSnapshot();
    });
  });

  describe('get', () => {
    describe('with a result', () => {
      it('should call res.render with "post" template and the results', async () => {
        const renderMock = jest.fn();
        const resMock = { render: renderMock };
        const reqMock = { query: '123' };
        const nextMock = jest.fn();
        await results.get(reqMock, resMock, nextMock);
        expect(renderMock).toHaveBeenCalledWith(results.template.get, { results: [] });
      });
    });

    describe('without a result', () => {
      it('should call res.sendStatus with a "400"', async () => {
        const sendStatusMock = jest.fn();
        const resMock = { sendStatus: sendStatusMock };
        const reqMock = { query: '123' };
        const nextMock = jest.fn();
        Search.mockImplementation(() => ({
          quick: jest.fn(() => null),
        }));
        await results.get(reqMock, resMock, nextMock);
        expect(sendStatusMock).toHaveBeenCalledWith(400);
      });
    });

    it('should call "next" on errors', async () => {
      const error = new Error();
      const resMock = jest.fn();
      const reqMock = { query: '123' };
      const nextMock = jest.fn();
      Search.mockImplementation(() => ({
        quick: jest.fn(() => { throw error; }),
      }));
      await results.get(reqMock, resMock, nextMock);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });
});
