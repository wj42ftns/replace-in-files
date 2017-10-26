const _ = require('lodash');
const helpers = require('./helpers');
const {
  CHANGE_FILE,
  FIND_MATCHES
} = require('./constants');

class Logger {
  constructor(options) {
    this.options = options;

    this.setCount = this.setCount.bind(this);
    this.incrementCountByPath = this.incrementCountByPath.bind(this);

    this.countOfMatchesByPaths = {};
  }

  setEventListeners() {
    helpers.eventEmitter.on(CHANGE_FILE, this.incrementCountByPath);
    helpers.eventEmitter.on(FIND_MATCHES, this.setCount);
  }

  removeEventListeners() {
    helpers.eventEmitter.removeListener(CHANGE_FILE, this.incrementCountByPath);
    helpers.eventEmitter.removeListener(FIND_MATCHES, this.setCount);
  }

  getPaths() {
    return _.map(this.countOfMatchesByPaths, (count, path) => path);
  }

  getCountOfMatchesByPaths() {
    return this.countOfMatchesByPaths;
  }

  getResult() {
    const getValues = (value, key) => {
      const keyName = _.lowerFirst(key.replace('return', ''));
      const methodName = key.replace('return', 'get');
      return value && [keyName, this[methodName]()];
    };

    const result = _
      .chain(this.options)
      .map(getValues)
      .compact()
      .fromPairs()
      .value();


    this.removeEventListeners();
    return result;
  }

  setCount(obj) { // { path: count }
    _.assign(this.countOfMatchesByPaths, obj);
  }

  incrementCountByPath(path) {
    this.countOfMatchesByPaths[path] = this.countOfMatchesByPaths[path]
      ? ++this.countOfMatchesByPaths[path]
      : 1;
  }

  run() {
    this.setEventListeners();
  }
}

module.exports = Logger;
