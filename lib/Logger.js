const _ = require('lodash');
const helpers = require('./helpers');
const {
  ADD_REPLACE_IN_FILES_OPTIONS,
  CHANGE_FILE,
  FIND_MATCHES,
} = require('./constants');

class Logger {
  constructor({ loggerOptions, replaceInFilesMainOptions }) {
    this.options = loggerOptions;
    this.replaceInFilesMainOptions = replaceInFilesMainOptions;

    this.addReplaceInFilesOptions = this.addReplaceInFilesOptions.bind(this);
    this.setCount = this.setCount.bind(this);
    this.incrementCountByPath = this.incrementCountByPath.bind(this);

    this.countOfMatchesByPaths = [];
    this.replaceInFilesOptions = [];
  }

  setEventListeners() {
    helpers.eventEmitter.on(ADD_REPLACE_IN_FILES_OPTIONS, this.addReplaceInFilesOptions);
    helpers.eventEmitter.on(CHANGE_FILE, this.incrementCountByPath);
    helpers.eventEmitter.on(FIND_MATCHES, this.setCount);
  }

  removeEventListeners() {
    helpers.eventEmitter.removeListener(
      ADD_REPLACE_IN_FILES_OPTIONS,
      this.addReplaceInFilesOptions
    );
    helpers.eventEmitter.removeListener(CHANGE_FILE, this.incrementCountByPath);
    helpers.eventEmitter.removeListener(FIND_MATCHES, this.setCount);
  }

  getPaths() {
    const getAllChangedPaths = (paths) => _.map(paths, (count, path) => path);
    return _
      .chain(this.countOfMatchesByPaths)
      .flatMap(getAllChangedPaths)
      .uniq()
      .value();
  }

  getCountOfMatchesByPaths() {
    return this.countOfMatchesByPaths;
  }

  getReplaceInFilesOptions() {
    return this.replaceInFilesOptions;
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

  setCountOfMatchesByPathsLength(length) {
    const currentLength = this.countOfMatchesByPaths.length;
    const needAdd = length - currentLength;
    Array.from({ length: needAdd }).forEach(() => {
      this.countOfMatchesByPaths = [...this.countOfMatchesByPaths, {}];
    });
  }

  setCount(path, count) {
    _.set(this.countOfMatchesByPaths, path, count);
  }

  addReplaceInFilesOptions(options) {
    this.replaceInFilesOptions = [...this.replaceInFilesOptions, options];
  }

  incrementCountByPath(path) {
    const updated = _.get(this.countOfMatchesByPaths, path, 0) + 1;
    _.set(this.countOfMatchesByPaths, path, updated);
  }

  run() {
    this.setEventListeners();
    helpers.eventEmitter.emit(ADD_REPLACE_IN_FILES_OPTIONS, this.replaceInFilesMainOptions);
  }
}

module.exports = Logger;
