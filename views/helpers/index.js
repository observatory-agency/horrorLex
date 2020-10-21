const hbs = require('hbs');

/** Registers Handlebars helper functions */
const registerHelpers = () => {
  // Add functions here
  hbs.registerHelper('production', () => process.env.NODE_ENV === 'production');
};

module.exports = registerHelpers;
