const CategoryModel = require('../Category');
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

describe('CategoryModel', () => {
  let categoryModel;
  beforeEach(() => {
    categoryModel = new CategoryModel();
  });
  describe('constructor', () => {
    it('should return a Mongo db collection', () => {
      expect(categoryModel).toBeDefined();
    });
  });
});
