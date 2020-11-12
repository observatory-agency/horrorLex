const hbs = require('hbs');
const { filter } = require('../../constants/navBar');
const navBar = require('../../constants/navBar');
const Env = require('../../lib/Env');

/** Registers Handlebars helper functions */
const registerHelpers = () => {
  hbs.registerHelper('production', () => Env.is('production'));
  hbs.registerHelper('navBar', () => navBar);
  hbs.registerHelper('pageNumber', (pages, options) => {
    // Buffer is the chunk of pages to render when handling many pages
    // e.g., "1 ... 50, 51, *52*, 53, 54 ... 100"
    const BUFFER = 5;
    const { currPage } = options.data.root.pagination;
    // recurse to extract a chunk with a buffer that won't overflow
    const getSlice = (left, middle, right) => {
      const overflowLeft = left >= 0 && right >= pages.length;
      const overflowRight = left <= 0 && right <= pages.length;
      if (overflowLeft) return getSlice(left - 1, middle, right - 1);
      if (overflowRight) return getSlice(left + 1, middle, right + 1);
      return pages.slice(left, right);
    };
    const first = pages[0];
    const last = pages[pages.length - 1];
    // current page starts at the "middle" of the buffer
    const middle = Math.ceil(BUFFER / 2);
    const left = (currPage - middle);
    const right = ((currPage + middle) - 1);
    const filteredPages = [first, ...getSlice(left, middle, right), last];
    return filteredPages.map((index) => options.fn(pages[index - 1])).join('');
  });
  // for pageActove, we need the correct 'this', so use a regular function
  hbs.registerHelper('pageActive', function callback(page, options) {
    const { currPage } = options.data.root.pagination;
    return page && page === currPage ? options.fn(this) : options.inverse(this);
  });
  hbs.registerHelper('pageSkip', function callback(page, options) {
    const { pages } = options.data.root.pagination;
  });
};

module.exports = registerHelpers;
