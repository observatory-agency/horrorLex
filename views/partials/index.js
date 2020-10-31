const hbs = require('hbs');
const hbsutils = require('hbs-utils')(hbs);

/** Registers Handlebars partials at the app level */
const registerPartials = () => {
  hbs.registerPartials('./views/partials', (error) => error && console.error(error));
  hbsutils.registerWatchedPartials('./views/partials');
};

module.exports = registerPartials;
