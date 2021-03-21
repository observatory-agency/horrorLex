const BookModel = require('../Book');
const Mongo = require('../../lib/Mongo');
const { books } = require('../../constants/collections');

jest.mock('../../lib/Mongo', () => ({
  db: {
    collection: jest.fn(() => ({
      aggregate: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
    })),
    createCollection: jest.fn(() => ({})),
  },
}));

describe('BookModel', () => {
  let bookModel;
  let handleCollectionSpy;
  beforeEach(() => {
    bookModel = new BookModel();
    handleCollectionSpy = jest.spyOn(BookModel.prototype, 'handleCollection');
  });
  describe('constructor', () => {
    it('should set this.db', () => {
      expect(bookModel.db).toBeDefined();
    });
    it('should call this.handleCollection', () => {
      expect(handleCollectionSpy).toHaveBeenNthCalledWith(1, books);
    });
  });

  describe('handleCollection', () => {
    describe('existing collection', () => {
      it('should call this.db.handleCollection', async () => {
        await bookModel.handleCollection(books);
        expect(Mongo.db.collection).toHaveBeenNthCalledWith(1, books);
      });
    });
    describe('non-existing collection', () => {
      let collection;
      beforeEach(() => {
        collection = Mongo.db.collection;
        Mongo.db.collection = jest.fn(() => null);
      });
      afterEach(() => {
        Mongo.db.collection = collection;
      });
      it('should call this.db.handleCollection', async () => {
        await bookModel.handleCollection(books);
        expect(Mongo.db.createCollection).toHaveBeenNthCalledWith(1, books);
      });
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
