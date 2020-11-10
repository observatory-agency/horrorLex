const hbs = require('hbs');
const navBar = require('../../constants/navBar');
const Env = require('../../lib/Env');

/** Registers Handlebars helper functions */
const registerHelpers = () => {
  // Add functions here
  hbs.registerHelper('production', () => Env.is('production'));
  hbs.registerHelper('navBar', () => navBar);
  hbs.registerHelper('pager', (page, options) => {
    const { lastPage, nextPage } = options.data.root;
    const isCurrentPage = page - 1 === lastPage && page + 1 === nextPage;
    return isCurrentPage ? options.fn(this) : options.inverse(this);
  });
};

module.exports = registerHelpers;
