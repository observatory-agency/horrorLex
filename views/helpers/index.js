const hbs = require('hbs');
const Env = require('../../lib/Env');

/** Registers Handlebars helper functions */
const registerHelpers = () => {
  // Add functions here
  hbs.registerHelper('production', () => Env.is('production'));
};

module.exports = registerHelpers;
