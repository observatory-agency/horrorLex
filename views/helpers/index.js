const hbs = require('hbs');
const HandlebarsHelpers = require('../../lib/HandlebarsHelpers');

const helpersToRegister = [
  'env',
  'ifEqual',
  'isFreeOnlineCopyUrl',
  'isSelected',
  'pageActive',
  'pageNumber',
  'pageSkip',
];

const registerHelpers = () => {
  helpersToRegister.forEach((helper) => {
    hbs.registerHelper(helper, new HandlebarsHelpers(hbs)[helper]);
  });
};

module.exports = registerHelpers;
