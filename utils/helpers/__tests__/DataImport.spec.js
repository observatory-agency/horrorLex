const csv = require('csvtojson');
const DataImport = require('../DataImport');

const mockBook1 = { title: 'werewolf book' };
const mockBook2 = { title: 'vampure book' };

jest.mock('csvtojson', () => () => ({
  fromFile: jest.fn(() => [mockBook1]),
}));

describe('DataImport', () => {
  let dataImport;
  beforeEach(() => {
    dataImport = new DataImport();
  });

  describe('constructor', () => {
    it('should set this.docs', () => {
      expect(dataImport.docs).toBeDefined();
    });
  });

  describe('fromCsv', () => {
    it('should set this.docs', async () => {
      await dataImport.fromCsv('./some-path.csv');
      expect(dataImport.docs).toEqual([mockBook1]);
    });
  });

  describe('mutateEach', () => {
    it('should mutate the contents of the this.docs array', async () => {
      await dataImport.fromCsv('./some-path.csv');
      dataImport.mutateEach(() => (mockBook2));
      expect(dataImport.docs).toEqual([mockBook2]);
    });
  });
});
