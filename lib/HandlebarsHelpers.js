const Env = require('./Env');

class HandlebarsHelpers {
  constructor(handlebars) {
    this.hbs = handlebars;
    this.constants = {
      italics: { open: '<i>', close: '</i>' },
      pageBuffer: 5,
      skip: '...',
    };
    this.env = this.env.bind(this);
    this.italicizeMLA8 = this.italicizeMLA8.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.pageActive = this.pageActive.bind(this);
    this.pageNumber = this.pageNumber.bind(this);
    this.pageSkip = this.pageSkip.bind(this);
    this.uriEncode = this.uriEncode.bind(this);
  }

  env(type, options) {
    this.options = options;
    return this.comparatorUtil(Env.is(type));
  }

  ifEqual(a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
  }

  isUrl(href, options) {
    let validUrl;
    try {
      validUrl = new URL(href);
    } catch (e) {
      validUrl = false;
    }
    return validUrl ? options.fn(this) : options.inverse(this);
  }

  isSelected(type, options) {
    this.options = options;
    return type === this.options.data.root.results.page.sort ? 'selected' : '';
  }

  italicizeMLA8(citation, title, options) {
    this.options = options;
    const { italics } = this.constants;
    const [citationStart, citationEnd] = citation.split(title);
    return `${citationStart}${italics.open}${title}${italics.close}${citationEnd}`;
  }

  pageActive(page, options) {
    this.options = options;
    const { curr } = this.options.data.root.results.page;
    return this.comparatorUtil(page && page === curr);
  }

  pageNumber(pages, options) {
    this.options = options;
    const { pageBuffer } = this.constants;
    const { curr } = this.options.data.root.results.page;
    const start = (curr - Math.ceil(pageBuffer / 2));
    const stop = ((curr + Math.ceil(pageBuffer / 2)) - 1);
    return this.getPagesUtil(start, stop, curr, pages)
      .map((page) => this.options.fn({
        // enusres the skip string gets rendered by Handlebars
        page: page === this.constants.skip ? page : pages[page - 1],
      })).join('');
  }

  pageSkip(pageNumber, options) {
    this.options = options;
    return this.comparatorUtil(pageNumber === this.constants.skip);
  }

  uriEncode(string, options) {
    this.options = options;
    return encodeURIComponent(string);
  }

  // private methods
  comparatorUtil(expression) {
    return expression ? this.options.fn(this.hbs) : this.options.inverse(this.hbs);
  }

  /** Returns a formatted segment from an array without overflowing:
   *  E.g. "1 ... 20, 21, 22, 23, 24, 25"
   */
  getPagesUtil(start, stop, curr, arr) {
    const { skip } = this.constants;
    const overflowLeft = start < 0 && stop < arr.length;
    const overflowRight = start > 0 && stop > arr.length;
    if (overflowLeft) {
      return this.getPagesUtil(start + 1, stop + 1, curr, arr);
    }
    if (overflowRight) {
      return this.getPagesUtil(start - 1, stop - 1, curr, arr);
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
