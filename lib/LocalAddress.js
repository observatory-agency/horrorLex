const os = require('os');

const IPV4 = 'IPv4';
const LOCALHOST = '127.0.0.1';

/** Static class for collecting the local IP address */
class LocalAddress {
  static ip() {
    let next;
    const networkStack = [];
    const networkInterfaces = os.networkInterfaces();
    const networkInfs = Object.keys(networkInterfaces);
    const match = ({ address, family }) => family === IPV4 && address !== LOCALHOST;
    next = networkInfs.pop();
    while (next) {
      networkInterfaces[next].forEach((a) => networkStack.push(a));
      next = networkInfs.pop();
    }
    const addresses = networkStack.filter(match);
    return addresses[0].address;
  }
}

module.exports = LocalAddress;
