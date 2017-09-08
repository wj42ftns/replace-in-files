const _ = require('lodash');

class Logger {
  constructor(options) {
    this.options = options;

    this._countOfMatchesByPaths = {};
  }

  get paths() {
    return _.map(this._countOfMatchesByPaths, (count, path) => path);
  }

  get countOfMatchesByPaths() {
    return this._countOfMatchesByPaths;
  }

  set countOfMatchesByPaths(value) {
    return _.isObject(value)
      ? this.setCount(value)
      : this.incrementCountByPath(value);
  }

  get result() {
    const mapFn = (value, key) => {
      const methodName = _.lowerFirst(key.replace('return', ''));
      return value && [methodName, this[methodName]];
    };

    return _
      .chain(this.options)
      .map(mapFn)
      .compact()
      .fromPairs()
      .value();
  }

  setCount(obj) { // { path: count }
    _.assign(this._countOfMatchesByPaths, obj);
  }

  incrementCountByPath(path) {
    this._countOfMatchesByPaths[path] = this._countOfMatchesByPaths[path]
      ? ++this._countOfMatchesByPaths[path]
      : 1;
  }
}

module.exports = Logger;
