class Finder {
  static isFindRegxInString(string, regexp) {
    return string.search(regexp) !== -1;
  }

  constructor(options, logger) {
    this.options = options;
    this.logger = logger;
  }

  run() {
    const { from, path, data } = this.options;
    if (Finder.isFindRegxInString(data, from)) {
      // eslint-disable-next-line no-param-reassign
      this.logger.changedFiles = path;
    }
  }
}

module.exports = Finder;
