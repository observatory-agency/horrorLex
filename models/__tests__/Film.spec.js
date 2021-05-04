const FilmModel = require('../Film');
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

describe('FilmModel', () => {
  let filmModel;
  beforeEach(() => {
    filmModel = new FilmModel();
  });
  describe('constructor', () => {
    it('should return a Mongo db collection', () => {
      expect(filmModel).toBeDefined();
    });
  });
});
