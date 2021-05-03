const mongodb = require('mongodb');
const Mongo = require('../Mongo');


jest.mock('mongodb', () => ({
  MongoClient: jest.fn(() => ({
    close: jest.fn(),
    connect: jest.fn(() => ({})),
    db: jest.fn(() => ({})),
  })),
}));

describe('Mongo', () => {
  // silence errors during tests
  beforeEach(() => {
    console.error = jest.fn();
  });
  describe('constructor', () => {
    it('should set Mongo.client', () => {
      expect(Mongo.client).toBeTruthy();
    });
  });

  describe('connect', () => {
    describe('succsesful connections', () => {
      it('should set Mongo.db', async () => {
        await Mongo.connect();
        expect(Mongo.db).toBeTruthy();
        expect(Mongo.client.connect).toHaveBeenCalled();
        expect(Mongo.client.db).toHaveBeenCalled();
      });
    });
    describe('unsuccessful connections', () => {
      let connect;
      beforeEach(() => {
        connect = Mongo.client.connect;
        Mongo.client.connect = jest.fn(() => { throw new Error(); });
      });
      afterEach(() => {
        Mongo.client.connect = connect;
      });
      it('should call console.error', async () => {
        try {
          await Mongo.connect();
        } catch (error) {
          expect(console.error).toHaveBeenCalled();
        }
      });
    });
  });

  describe('close', () => {
    it('should close connection to Mongo', () => {
      Mongo.close();
      expect(Mongo.client.close).toHaveBeenCalled();
    });
  });
});
