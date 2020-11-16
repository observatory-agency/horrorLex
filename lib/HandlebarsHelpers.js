const Env = require('./Env');
const navBar = require('../constants/navBar');

class HandlebarsHelpers {
  constructor(handlebars) {
    if (!handlebars) {
      throw new Error('Handlebars instance required.');
    }
    this.env = Env;
    this.hbs = handlebars;
    this.constants = {
      navBar,
      pageBuffer: 5,
      skip: '...',
    };
    this.options = null;
    // bind our methods to avoid using the wrong 'this' from Handlebars
    this.envHelper = this.envHelper.bind(this);
    this.pageActiveHelper = this.pageActiveHelper.bind(this);
    this.pageNumberHelper = this.pageNumberHelper.bind(this);
    this.pageSkipHelper = this.pageSkipHelper.bind(this);
  }

  envHelper(type, options) {
    this.options = options;
    return this.comparatorUtil(this.env.is(type));
  }

  pageActiveHelper(page, options) {
    this.options = options;
    const { currPage } = this.options.data.root.pagination;
    console.log({ page, currPage })
    return this.comparatorUtil(page && page === currPage);
  }

  pageNumberHelper(pages, options) {
    this.options = options;
    const { pageBuffer } = this.constants;
    const { currPage } = this.options.data.root.pagination;
    const start = (currPage - Math.ceil(pageBuffer / 2));
    const stop = ((currPage + Math.ceil(pageBuffer / 2)) - 1);
    return this.getPagesUtil(start, stop, pages).map((page) => this.options.fn({
      // enusres the skip string gets rendered by Handlebars
      page: page === this.constants.skip ? page : pages[page - 1],
    })).join('');
  }

  pageSkipHelper(pageNumber, options) {
    this.options = options;
    return this.comparatorUtil(pageNumber === this.constants.skip);
  }

  comparatorUtil(expression) {
    return expression ? this.options.fn(this.hbs) : this.options.inverse(this.hbs);
  }

  /** Returns a formatted segment from an array without overflowing:
   *  E.g. "1 ... 20, 21, 22, 23, 24, 25"
   */
  getPagesUtil(start, stop, arr) {
    const first = arr[0];
    const last = arr[arr.length - 1];
    const leftSkip = start > 1;
    const rightSkip = stop < arr.length - 1;
    const overflowLeft = start > 0 && stop > arr.length;
    const overflowRight = start < 0 && stop < arr.length;
    if (overflowLeft) {
      return this.getPagesUtil(start - 1, stop - 1, arr);
    }
    if (overflowRight) {
      return this.getPagesUtil(start + 1, stop + 1, arr);
    }

    const slice = arr.slice(start, stop);
    if (slice.length === arr.length || slice.length <= 2) {
      return arr;
    }
    if (leftSkip && rightSkip) {
      return [first, this.constants.skip, ...slice, this.constants.skip, last];
    }
    if (rightSkip) {
      return [...slice, this.constants.skip, last];
    }
    if (leftSkip) {
      return [first, this.constants.skip, ...slice];
    }
    return slice;
  }
}

module.exports = HandlebarsHelpers;
