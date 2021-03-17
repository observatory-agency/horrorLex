const BookModel = require('../Book');
const Mongo = require('../../lib/Mongo');

jest.mock('../../lib/Mongo', () => ({
  db: {
    collection: jest.fn(() => ({
      aggregate: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
    })),
  },
}));

describe('BookModel', () => {
  let bookModel;
  beforeEach(() => {
    bookModel = new BookModel();
  });
  describe('constructor', () => {
    it('should set this.collection', () => {
      expect(bookModel.collection).toBeDefined();
    });
  });

  describe('aggregate', () => {
    it('should call this.collection.aggregate', () => {
      const mockQuery = {};
      bookModel.aggregate(mockQuery);
      expect(bookModel.collection.aggregate).toHaveBeenCalledWith(mockQuery);
    });
  });

  describe('findOne', () => {
    it('should call this.collection.findOne', () => {
      const mockQuery = {};
      bookModel.findOne(mockQuery);
      expect(bookModel.collection.findOne).toHaveBeenCalledWith(mockQuery);
    });
  });

  describe('find', () => {
    it('should call this.collection.find', () => {
      const mockQuery = {};
      bookModel.find(mockQuery);
      expect(bookModel.collection.find).toHaveBeenCalledWith(mockQuery);
    });
  });
});
