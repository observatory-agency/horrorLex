const ResultsController = require('../Results');
const Search = require('../../lib/Search');
const PublicationModel = require('../../models/Publication');

jest.mock('../../lib/Search');
jest.mock('../../models/Publication');

describe('ResultsController', () => {
  let results;
  beforeEach(() => {
    Search.mockImplementation(() => ({
      many: jest.fn(() => ([])),
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
      it('should call res.status with a "404"', async () => {
        const statusMock = jest.fn();
        const resMock = {};
        const reqMock = { query: '123' };
        const nextMock = jest.fn();
        resMock.status = statusMock;
        Search.mockImplementation(() => ({
          many: jest.fn(() => null),
        }));
        await results.get(reqMock, resMock, nextMock);
        expect(statusMock).toHaveBeenCalledWith(404);
      });
    });

    it('should call "next" on errors', async () => {
      const error = new Error();
      const resMock = jest.fn();
      const reqMock = { query: '123' };
      const nextMock = jest.fn();
      Search.mockImplementation(() => ({
        many: jest.fn(() => { throw error; }),
      }));
      await results.get(reqMock, resMock, nextMock);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });
});
