const hbs = require('hbs');
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
    const getSlice = (start, stop) => {
      const leftSkip = start > 1;
      const rightSkip = stop < pages.length - 1;
      const overflowLeft = start >= 0 && stop >= pages.length;
      const overflowRight = start <= 0 && stop <= pages.length;
      if (overflowLeft) {
        return getSlice(start - 1, stop - 1);
      }
      if (overflowRight) {
        return getSlice(start + 1, stop + 1);
      }

      const slice = pages.slice(start, stop);

      if (leftSkip && rightSkip) {
        return ['...', ...slice, '...'];
      }
      if (rightSkip) {
        return [...slice, '...'];
      }
      if (leftSkip) {
        return ['...', ...slice];
      }
      return slice;
    };

    const first = pages[0];
    const last = pages[pages.length - 1];
    const middle = Math.ceil(BUFFER / 2);
    const start = pages.length < BUFFER ? 1 : (currPage - middle);
    const stop = pages.length < BUFFER ? pages.length - 1 : ((currPage + middle) - 1);
    const filteredPages = [first, ...getSlice(start, stop), last];
    return filteredPages.map((page) => options.fn({ page: pages[page - 1] })).join('');
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
