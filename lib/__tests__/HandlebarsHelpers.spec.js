const HandlebarsHelpers = require('../HandlebarsHelpers');

describe('HandlebarsHelpers', () => {
  let hbsMock;
  let optionsMock;
  beforeEach(() => {
    hbsMock = jest.fn();
    optionsMock = {
      fn: jest.fn(({ page }) => page),
      inverse: jest.fn((a) => a),
      data: { root: { results: { page: { curr: 5, sort: 'author' } } } },
    };
  });

  describe('constructor', () => {
    it('should return an instance of HandlebarsHelpers', () => {
      expect(new HandlebarsHelpers(hbsMock)).toBeInstanceOf(HandlebarsHelpers);
    });
  });

  describe('env', () => {
    let hbsHelper;
    beforeEach(() => {
      hbsHelper = new HandlebarsHelpers(hbsMock);
    });
    it('should call options.fn', () => {
      hbsHelper.env('development', optionsMock);
      expect(optionsMock.fn).toHaveBeenCalled();
    });
    it('should call options.inverse', () => {
      hbsHelper.env('production', optionsMock);
      expect(optionsMock.inverse).toHaveBeenCalled();
    });
  });

  describe('ifEqual', () => {
    let hbsHelper;
    beforeEach(() => {
      hbsHelper = new HandlebarsHelpers(hbsMock);
    });
    it('should call options.fn when true', () => {
      hbsHelper.ifEqual(1, 1, optionsMock);
      expect(optionsMock.fn).toHaveBeenCalled();
    });
    it('should call options.inverse when false', () => {
      hbsHelper.ifEqual(0, 1, optionsMock);
      expect(optionsMock.inverse).toHaveBeenCalled();
    });
  });

  describe('isUrl', () => {
    let hbsHelper;
    beforeEach(() => {
      hbsHelper = new HandlebarsHelpers(hbsMock);
    });
    it('should call options.fn when true', () => {
      hbsHelper.isUrl('https://horrorlex.com', optionsMock);
      expect(optionsMock.fn).toHaveBeenCalled();
    });
    it('should call options.inverse when false', () => {
      hbsHelper.isUrl('not a url', optionsMock);
      expect(optionsMock.inverse).toHaveBeenCalled();
    });
  });

  describe('isSeleted', () => {
    let hbsHelper;
    beforeEach(() => {
      hbsHelper = new HandlebarsHelpers(hbsMock);
    });
    it('should return a string of "selected', () => {
      const selected = hbsHelper.isSelected('author', optionsMock);
      expect(selected).toBe('selected');
    });
    it('should return an empty string', () => {
      const selected = hbsHelper.isSelected('title', optionsMock);
      expect(selected).toBe('');
    });
  });

  describe('italicizeMLA8', () => {
    let hbsHelper;
    beforeEach(() => {
      hbsHelper = new HandlebarsHelpers(hbsMock);
    });
    it('should return a string with HTML markup', () => {
      const citation = 'This is my citation with a Title';
      const title = 'Title';
      const italicizedMLA8 = hbsHelper.italicizeMLA8(citation, title);
      expect(italicizedMLA8).toMatchSnapshot();
    });
  });

  describe('pageActive', () => {
    it('should call options.fn', () => {
      new HandlebarsHelpers(hbsMock).pageActive(5, optionsMock);
      expect(optionsMock.fn).toHaveBeenCalled();
    });
    it('should call options.inverse', () => {
      new HandlebarsHelpers(hbsMock).pageActive(6, optionsMock);
      expect(optionsMock.inverse).toHaveBeenCalled();
    });
  });

  describe('pageNumber', () => {
    describe('when handling many pages', () => {
      it('should a string with appropriate page numbers and skip characters', () => {
        const pages = Array.from({ length: 20 }, (a, i) => i + 1);
        const helper = new HandlebarsHelpers(hbsMock).pageNumber(pages, optionsMock);
        expect(helper).toMatchSnapshot();
      });
    });
    describe('when the current page is the first page', () => {
      beforeEach(() => {
        optionsMock.data.root.results.page.curr = 1;
      });
      it('should a string with appropriate page numbers and skip characters', () => {
        const pages = Array.from({ length: 20 }, (a, i) => i + 1);
        const helper = new HandlebarsHelpers(hbsMock).pageNumber(pages, optionsMock);
        expect(helper).toMatchSnapshot();
      });
    });
    describe('when the current page is the last page', () => {
      beforeEach(() => {
        optionsMock.data.root.results.page.curr = 20;
      });
      it('should a string with appropriate page numbers and skip characters', () => {
        const pages = Array.from({ length: 20 }, (a, i) => i + 1);
        const helper = new HandlebarsHelpers(hbsMock).pageNumber(pages, optionsMock);
        expect(helper).toMatchSnapshot();
      });
    });
    describe('when handling 3 pages', () => {
      it('should a string with appropriate page numbers and skip characters', () => {
        const pages = Array.from({ length: 3 }, (a, i) => i + 1);
        const helper = new HandlebarsHelpers(hbsMock).pageNumber(pages, optionsMock);
        expect(helper).toMatchSnapshot();
      });
    });
    describe('when handling 1 page', () => {
      it('should a string with appropriate page numbers and skip characters', () => {
        const pages = Array.from({ length: 1 }, (a, i) => i + 1);
        const helper = new HandlebarsHelpers(hbsMock).pageNumber(pages, optionsMock);
        expect(helper).toMatchSnapshot();
      });
    });
  });

  describe('pageSkip', () => {
    it('should call options.fn', () => {
      new HandlebarsHelpers(hbsMock).pageSkip('...', optionsMock);
      expect(optionsMock.fn).toHaveBeenCalled();
    });
    it('should call options.inverse', () => {
      new HandlebarsHelpers(hbsMock).pageSkip(1, optionsMock);
      expect(optionsMock.inverse).toHaveBeenCalled();
    });
  });
});
