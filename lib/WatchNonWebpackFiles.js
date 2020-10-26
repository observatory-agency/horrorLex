const watch = require('../constants/watch');

/**
 * Trigger a compile after saving files outside the bundle entries
 */
class WatchNonWebpackFiles {
  constructor() {
    this.watch = watch;
    this.name = 'Watch Non Webpack Files';
    this.handleCompilation = this.handleCompilation.bind(this);
  }

  apply(compiler) {
    compiler.hooks.afterCompile.tap(this.name, this.handleCompilation);
  }

  handleCompilation(compilation) {
    this.watch.forEach((path) => compilation.contextDependencies.add(path));
  }
}

module.exports = WatchNonWebpackFiles;
