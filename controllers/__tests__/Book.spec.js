const BookController = require('../Book');
const Search = require('../../lib/Search');
const BookModel = require('../../models/Book');

jest.mock('../../lib/Search');
jest.mock('../../models/Book');

describe('BookController', () => {
  let book;
  beforeEach(() => {
    Search.mockImplementation(() => ({
      one: jest.fn(() => ({})),
    }));
    book = new BookController();
  });

  describe('constructor', () => {
    it('should set its templates', () => {
      expect(book.template).toMatchSnapshot();
    });
  });

  describe('get', () => {
    describe('with a result', () => {
      it('should call res.render with "get" template and results', async () => {
        const renderMock = jest.fn();
        const resMock = { render: renderMock };
        const reqMock = { params: { slug: 'a book' } };
        const nextMock = jest.fn();
        await book.get(reqMock, resMock, nextMock);
        expect(renderMock).toHaveBeenCalledWith(book.template.get, { book: {} });
      });
    });

    describe('without a result', () => {
      it('should call res.sendStatus with a "404"', async () => {
        const sendStatusMock = jest.fn();
        const resMock = { sendStatus: sendStatusMock };
        const reqMock = { params: { slug: 'a book' } };
        const nextMock = jest.fn();
        Search.mockImplementation(() => ({
          one: jest.fn(() => null),
        }));
        await book.get(reqMock, resMock, nextMock);
        expect(sendStatusMock).toHaveBeenCalledWith(404);
      });
    });

    it('should call "next" on errors', async () => {
      const error = new Error();
      const resMock = jest.fn();
      const reqMock = { params: { slug: 'a book' } };
      const nextMock = jest.fn();
      Search.mockImplementation(() => ({
        one: jest.fn(() => { throw error; }),
      }));
      await book.get(reqMock, resMock, nextMock);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });
});
