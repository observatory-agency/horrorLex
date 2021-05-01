const PublicationModel = require('../Publication');
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

describe('PublicationModel', () => {
  let publicationModel;
  beforeEach(() => {
    publicationModel = new PublicationModel();
  });
  describe('constructor', () => {
    it('should return a Mongo db collection', () => {
      expect(publicationModel).toBeDefined();
      expect(publicationModel.aggregate).toBeDefined();
      expect(publicationModel.createIndex).toBeDefined();
      expect(publicationModel.drop).toBeDefined();
      expect(publicationModel.findOne).toBeDefined();
      expect(publicationModel.find).toBeDefined();
      expect(publicationModel.insertMany).toBeDefined();
    });
  });
});
