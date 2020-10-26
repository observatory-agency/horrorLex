const env = require('../constants/env');

/** Static class for identifying supported NODE_ENV values */
class Env {
  static is(string) {
    return env[string] ? process.env.NODE_ENV === string : false;
  }
}

module.exports = Env;
