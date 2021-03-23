/** Create SEO friendly URL */
// https://stackoverflow.com/questions/14107522/producing-seo-friendly-url-in-javascript
module.exports = (title) => title
  .toString()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/\s+/g, '-')
  .toLowerCase()
  .replace(/&/g, '-and-')
  .replace(/[^a-z0-9-]/g, '')
  .replace(/-+/g, '-')
  .replace(/^-*/, '')
  .replace(/-*$/, '');
