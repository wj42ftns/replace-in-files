const _ = require('lodash');
const helpers = require('./helpers');
const { FIND_MATCHES } = require('./constants');

class Finder {
  static isFindRegxInString(string, regexp) {
    return string.search(regexp) !== -1;
  }

  static findMatches(string, regexp) {
    const exactlyRegexp = _.isRegExp(regexp) ? regexp : new RegExp(regexp, 'g');

    return string.match(exactlyRegexp);
  }

  constructor(options) {
    this.options = options;
  }

  run() {
    const {
      data,
      from,
      path,
      step,
    } = this.options;

    if (Finder.isFindRegxInString(data, from)) {
      const matches = Finder.findMatches(data, from);
      helpers.eventEmitter.emit(FIND_MATCHES, [step, path], matches.length);
    }
  }
}

module.exports = Finder;
