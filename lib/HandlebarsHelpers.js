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
    this.isSelected = this.isSelected.bind(this);
    this.pageActiveHelper = this.pageActiveHelper.bind(this);
    this.pageNumberHelper = this.pageNumberHelper.bind(this);
    this.pageSkipHelper = this.pageSkipHelper.bind(this);
  }

  envHelper(type, options) {
    this.options = options;
    return this.comparatorUtil(this.env.is(type));
  }

  isSelected(type, options) {
    this.options = options;
    return type === this.options.data.root.page.sort ? 'selected' : '';
  }

  pageActiveHelper(page, options) {
    this.options = options;
    const { currPage } = this.options.data.root.pagination;
    return this.comparatorUtil(page && page === currPage);
  }

  pageNumberHelper(pages, options) {
    this.options = options;
    const { pageBuffer } = this.constants;
    const { currPage } = this.options.data.root.pagination;
    const start = (currPage - Math.ceil(pageBuffer / 2));
    const stop = ((currPage + Math.ceil(pageBuffer / 2)) - 1);
    return this.getPagesUtil(start, stop, currPage, pages).map((page) => this.options.fn({
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
  getPagesUtil(start, stop, currPage, arr) {
    const { skip } = this.constants;
    const overflowLeft = start < 0 && stop < arr.length;
    const overflowRight = start > 0 && stop > arr.length;
    if (overflowLeft) {
      return this.getPagesUtil(start + 1, stop + 1, currPage, arr);
    }
    if (overflowRight) {
      return this.getPagesUtil(start - 1, stop - 1, currPage, arr);
    }
    const pages = arr.slice(start, stop);
    // just return the arr when its a small amount of pages to handle
    if (arr.length === pages.length || arr.length < this.constants.pageBuffer) {
      return arr;
    }
    // prepend first page when not present in the slice
    if (pages[0] !== arr[0]) {
      pages.unshift(arr[0]);
    }
    // append last page when not present in slice
    if (pages[pages.length - 1] !== arr[arr.length - 1]) {
      pages.push(arr[arr.length - 1]);
    }
    // insert skip character after first page
    if (pages[0] + 1 !== pages[1]) {
      pages.splice(1, 0, skip);
    }
    // insert skip character before last page
    if (pages[pages.length - 1] - 1 !== pages[pages.length - 2]) {
      pages.splice(pages.length - 1, 0, skip);
    }
    return pages;
  }
}

module.exports = HandlebarsHelpers;
