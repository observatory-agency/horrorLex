const BaseModel = require('../Base');
const Mongo = require('../../lib/Mongo');

jest.mock('../../lib/Mongo', () => ({ db: { collection: jest.fn(() => ({})) } }));

describe('BaseModel', () => {
  // silence errors during tests
  beforeEach(() => {
    console.error = jest.fn();
  });
  let baseModel;
  const mockCollection = { name: 'publications', index: {} };
  describe('constructor', () => {
    it('should return a Mongo db collection', () => {
      baseModel = new BaseModel(mockCollection.name);
      expect(baseModel).toBeDefined();
    });

    describe('unable to access a collection', () => {
      it('should call console.error', async () => {
        try {
          Mongo.db.collection = () => { throw new Error(); };
          baseModel = new BaseModel(mockCollection.name);
        } catch (error) {
          expect(console.error).toHaveBeenCalled();
        }
      });
    });
  });
});
