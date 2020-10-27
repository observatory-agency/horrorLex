const hbs = require('hbs');
const navBar = require('../../constants/navBar');
const Env = require('../../lib/Env');

/** Registers Handlebars helper functions */
const registerHelpers = () => {
  // Add functions here
  hbs.registerHelper('production', () => Env.is('production'));
  hbs.registerHelper('navBar', () => navBar);
};

module.exports = registerHelpers;
