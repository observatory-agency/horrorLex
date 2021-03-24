const BookModel = require('../Book');
const Mongo = require('../../lib/Mongo');
const { books } = require('../../constants/collections');

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
  let initCollectionSpy;
  beforeEach(() => {
    bookModel = new BookModel();
    initCollectionSpy = jest.spyOn(BookModel.prototype, 'initCollection');
  });
  describe('constructor', () => {
    it('should set this.db', () => {
      expect(bookModel.db).toBeDefined();
    });
    it('should call this.initCollection', () => {
      expect(initCollectionSpy).toHaveBeenCalled();
    });
  });

  describe('aggregate', () => {
    it('should call this.collection.aggregate', () => {
      const mockQuery = {};
      bookModel.aggregate(mockQuery);
      expect(bookModel.collection.aggregate).toHaveBeenCalledWith(mockQuery);
    });
  });

  describe('drop', () => {
    it('should call this.collection.drop', () => {
      bookModel.drop();
      expect(bookModel.collection.drop).toHaveBeenCalled();
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

  describe('initCollection', () => {
    describe('successfully accessing the collection', () => {
      it('should call this.db.collection', async () => {
        await bookModel.initCollection(books);
        expect(bookModel.db.collection).toHaveBeenNthCalledWith(1, books.name);
      });
      it('should call this.collection.createIndex', async () => {
        await bookModel.initCollection(books);
        expect(bookModel.collection.createIndex).toHaveBeenNthCalledWith(1, books.index);
      });
    });
    describe('unsuccessfully accessing a collection', () => {
      let collection;
      beforeEach(() => {
        collection = Mongo.db.collection;
        Mongo.db.collection = jest.fn(() => { throw new Error(); });
      });
      afterEach(() => {
        Mongo.db.collection = collection;
      });
      it('should call console.error', async () => {
        const expected = 'Unable to access collection: books';
        try {
          await bookModel.initCollection(books);
        } catch (error) {
          expect(console.error).toHaveBeenCalledWith(expected);
        }
      });
    });
  });

  describe('insertMany', () => {
    it('should call this.collection.insertMany', () => {
      const mockDocs = [];
      bookModel.insertMany(mockDocs);
      expect(bookModel.collection.insertMany).toHaveBeenCalledWith(mockDocs);
    });
  });
});
