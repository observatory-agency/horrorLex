const fs = require('fs');
const path = require('path');

class ClearModuleCache {
  static watch() {
    fs.watch('./', { recursive: true }, (eventType, filename) => {
      const resolvedPath = path.resolve(filename);
      delete require.cache[resolvedPath];
    });
  }
}

module.exports = ClearModuleCache;
