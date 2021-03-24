const WatchNonWebpackFiles = require('../WatchNonWebpackFiles');

describe('WatchNonWebpackFiles', () => {
  describe('#apply', () => {
    const compiler = { hooks: { afterCompile: { tap: jest.fn() } } };
    it('should call "compiler.hooks.afterCompile.tap"', () => {
      const watcher = new WatchNonWebpackFiles();
      watcher.apply(compiler);
      expect(compiler.hooks.afterCompile.tap)
        .toBeCalledWith(watcher.name, watcher.handleCompilation);
    });
  });
  describe('#handleCompilation', () => {
    const compilation = { contextDependencies: { add: jest.fn() } };
    it('should call "compilation.contextDependencies.add" per item in watch array', () => {
      const filesToWatch = ['./dir', './test'];
      const watcher = new WatchNonWebpackFiles();
      watcher.watch = filesToWatch;
      watcher.handleCompilation(compilation);
      expect(compilation.contextDependencies.add)
        .toHaveBeenCalledTimes(2);
    });
  });
});
