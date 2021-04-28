const hbs = require('hbs');
const HandlebarsHelpers = require('../../lib/HandlebarsHelpers');

const helpersToRegister = [
  'case',
  'env',
  'isSelected',
  'pageActive',
  'pageNumber',
  'pageSkip',
  'switch',
];

const registerHelpers = () => {
  helpersToRegister.forEach((helper) => {
    hbs.registerHelper(helper, new HandlebarsHelpers(hbs)[helper]);
  });
};

module.exports = registerHelpers;
