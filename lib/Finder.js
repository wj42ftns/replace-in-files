const _ = require('lodash');

class Finder {
  static isFindRegxInString(string, regexp) {
    return string.search(regexp) !== -1;
  }

  static findMatches(string, regexp) {
    const exactlyRegexp = _.isRegExp(regexp) ? regexp : new RegExp(regexp, 'g');

    return string.match(exactlyRegexp);
  }

  constructor(options, logger) {
    this.options = options;
    this.logger = logger;
  }

  run() {
    const { from, path, data } = this.options;
    if (Finder.isFindRegxInString(data, from)) {
      const matches = Finder.findMatches(data, from);
      // eslint-disable-next-line no-param-reassign
      this.logger.countOfMatchesByPaths = { [path]: matches.length };
    }
  }
}

module.exports = Finder;
