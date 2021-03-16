const mongodb = require('mongodb');
const Mongo = require('../Mongo');

jest.mock('mongodb', () => ({
  MongoClient: jest.fn(() => ({
    connect: jest.fn(() => ({})),
    db: jest.fn(() => ({})),
  })),
}));

describe('Mongo', () => {
  describe('constructor', () => {
    it('should set Mongo.client', () => {
      expect(Mongo.client).toBeTruthy();
    });
  });
  describe('connect', () => {
    it('should set Mongo.db', async () => {
      await Mongo.connect();
      expect(Mongo.db).toBeTruthy();
    });
  });
});
