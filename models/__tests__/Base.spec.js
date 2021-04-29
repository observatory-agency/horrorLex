const BaseModel = require('../Base');
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

describe('BaseModel', () => {
  let baseModel;
  const mockCollection = { name: 'books', index: {} };
  describe('constructor', () => {
    it('should return a Mongo db collection', () => {
      baseModel = new BaseModel(mockCollection.name, mockCollection.index);
      expect(baseModel).toBeDefined();
      expect(baseModel.aggregate).toBeDefined();
      expect(baseModel.createIndex).toBeDefined();
      expect(baseModel.drop).toBeDefined();
      expect(baseModel.findOne).toBeDefined();
      expect(baseModel.find).toBeDefined();
      expect(baseModel.insertMany).toBeDefined();
    });

    describe('unable to access a collection', () => {
      it('should call console.error', async () => {
        try {
          Mongo.db.collection = () => { throw new Error(); };
          baseModel = new BaseModel(mockCollection.name, mockCollection.index);
        } catch (error) {
          expect(console.error).toHaveBeenCalled();
        }
      });
    });
  });
});
