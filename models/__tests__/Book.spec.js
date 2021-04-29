const BookModel = require('../Book');
const Mongo = require('../../lib/Mongo');

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

describe('BookModel', () => {
  let bookModel;
  beforeEach(() => {
    bookModel = new BookModel();
  });
  describe('constructor', () => {
    it('should return a Mongo db collection', () => {
      expect(bookModel).toBeDefined();
      expect(bookModel.aggregate).toBeDefined();
      expect(bookModel.createIndex).toBeDefined();
      expect(bookModel.drop).toBeDefined();
      expect(bookModel.findOne).toBeDefined();
      expect(bookModel.find).toBeDefined();
      expect(bookModel.insertMany).toBeDefined();
    });
  });
});
