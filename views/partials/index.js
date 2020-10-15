const hbs = require('hbs');

/** Registers Handlebars partials at the app level */
const registerPartials = () => {
  hbs.registerPartials(__dirname, (error) => error && console.error(error));
};

module.exports = registerPartials;
