const PublicationController = require('../Publication');
const Search = require('../../lib/Search');
const PublicationModel = require('../../models/Publication');

jest.mock('../../lib/Search');
jest.mock('../../models/Publication');

describe('PublicationController', () => {
  let publication;
  const bookMock = { title: 'some title', type: 'book' };
  beforeEach(() => {
    Search.mockImplementation(() => ({ one: jest.fn(() => bookMock) }));
    publication = new PublicationController();
  });

  describe('constructor', () => {
    it('should set its templates', () => {
      expect(publication.template).toMatchSnapshot();
    });
  });

  describe('get', () => {
    describe('with a result', () => {
      it('should call res.render with "get" template and results', async () => {
        const templateMock = 'book.hbs';
        const renderMock = jest.fn();
        const resMock = { render: renderMock };
        const reqMock = { params: { slug: 'a book' } };
        const nextMock = jest.fn();
        await publication.get(reqMock, resMock, nextMock);
        expect(renderMock).toHaveBeenCalledWith(templateMock, { book: bookMock });
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
        await publication.get(reqMock, resMock, nextMock);
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
      await publication.get(reqMock, resMock, nextMock);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });
});
