const os = require('os');
const LocalAddress = require('../LocalAddress');

jest.mock('os');

os.networkInterfaces = jest.fn(() => ({
  en01: [{ address: '10.0.1.5', family: 'IPv4' }],
}));

describe('LocalAddress', () => {
  describe('#ip', () => {
    it('should return a local IP address', () => {
      expect(LocalAddress.ip()).toMatchSnapshot();
    });
  });
});
