const hbs = require('hbs');
const HandlebarsHelpers = require('../../lib/HandlebarsHelpers');

const helpersToRegister = [
  'env',
  'ifEqual',
  'isSelected',
  'isUrl',
  'italicizeMLA8',
  'pageActive',
  'pageNumber',
  'pageSkip',
  'uriEncode',
];

const registerHelpers = () => {
  helpersToRegister.forEach((helper) => {
    hbs.registerHelper(helper, new HandlebarsHelpers(hbs)[helper]);
  });
};

module.exports = { hbs, registerHelpers };
