const hbs = require('hbs');
const HandlebarsHelpers = require('../../lib/HandlebarsHelpers');

/** Registers Handlebars helper functions */
const registerHelpers = () => {
  hbs.registerHelper('env', new HandlebarsHelpers(hbs).envHelper);
  hbs.registerHelper('pageActive', new HandlebarsHelpers(hbs).pageActiveHelper);
  hbs.registerHelper('pageNumber', new HandlebarsHelpers(hbs).pageNumberHelper);
  hbs.registerHelper('pageSkip', new HandlebarsHelpers(hbs).pageSkipHelper);
};

module.exports = registerHelpers;
