const HandlebarsHelpers = require('./HandlebarsHelpers');

describe('HandlebarsHelpers', () => {
  let hbsMock;
  let optionsMock;
  beforeEach(() => {
    hbsMock = jest.fn();
    optionsMock = {
      fn: jest.fn(({ page }) => page),
      inverse: jest.fn((a) => a),
      data: {
        root: {
          page: {
            curr: 5,
          },
        },
      },
    };
  });

  describe('constructor', () => {
    it('should return an instance of HandlebarsHelpers', () => {
      expect(new HandlebarsHelpers(hbsMock)).toBeInstanceOf(HandlebarsHelpers);
    });
  });

  describe('envHelper', () => {
    it('should call options.fn', () => {
      new HandlebarsHelpers(hbsMock).envHelper('development', optionsMock);
      expect(optionsMock.fn).toHaveBeenCalled();
    });
    it('should call options.inverse', () => {
      new HandlebarsHelpers(hbsMock).envHelper('production', optionsMock);
      expect(optionsMock.inverse).toHaveBeenCalled();
    });
  });

  describe('pageActiveHelper', () => {
    it('should call options.fn', () => {
      new HandlebarsHelpers(hbsMock).pageActiveHelper(5, optionsMock);
      expect(optionsMock.fn).toHaveBeenCalled();
    });
    it('should call options.inverse', () => {
      new HandlebarsHelpers(hbsMock).pageActiveHelper(6, optionsMock);
      expect(optionsMock.inverse).toHaveBeenCalled();
    });
  });

  describe('pageNumberHelper', () => {
    describe('when handling many pages', () => {
      it('should a string with appropriate page numbers and skip characters', () => {
        const pages = Array.from({ length: 20 }, (a, i) => i + 1);
        const helper = new HandlebarsHelpers(hbsMock).pageNumberHelper(pages, optionsMock);
        expect(helper).toMatchSnapshot();
      });
    });
    describe('when the current page is the first page', () => {
      beforeEach(() => {
        optionsMock.data.root.page.curr = 1;
      });
      it('should a string with appropriate page numbers and skip characters', () => {
        const pages = Array.from({ length: 20 }, (a, i) => i + 1);
        const helper = new HandlebarsHelpers(hbsMock).pageNumberHelper(pages, optionsMock);
        expect(helper).toMatchSnapshot();
      });
    });
    describe('when the current page is the last page', () => {
      beforeEach(() => {
        optionsMock.data.root.page.curr = 20;
      });
      it('should a string with appropriate page numbers and skip characters', () => {
        const pages = Array.from({ length: 20 }, (a, i) => i + 1);
        const helper = new HandlebarsHelpers(hbsMock).pageNumberHelper(pages, optionsMock);
        expect(helper).toMatchSnapshot();
      });
    });
    describe('when handling 3 pages', () => {
      it('should a string with appropriate page numbers and skip characters', () => {
        const pages = Array.from({ length: 3 }, (a, i) => i + 1);
        const helper = new HandlebarsHelpers(hbsMock).pageNumberHelper(pages, optionsMock);
        expect(helper).toMatchSnapshot();
      });
    });
    describe('when handling 1 page', () => {
      it('should a string with appropriate page numbers and skip characters', () => {
        const pages = Array.from({ length: 1 }, (a, i) => i + 1);
        const helper = new HandlebarsHelpers(hbsMock).pageNumberHelper(pages, optionsMock);
        expect(helper).toMatchSnapshot();
      });
    });
  });

  describe('pageSkipHelper', () => {
    it('should call options.fn', () => {
      new HandlebarsHelpers(hbsMock).pageSkipHelper('...', optionsMock);
      expect(optionsMock.fn).toHaveBeenCalled();
    });
    it('should call options.inverse', () => {
      new HandlebarsHelpers(hbsMock).pageSkipHelper(1, optionsMock);
      expect(optionsMock.inverse).toHaveBeenCalled();
    });
  });
});
