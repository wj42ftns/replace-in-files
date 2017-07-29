// const _ = require('lodash');
// const chalk = require('chalk');
// const helpers = require('./helpers');
const prepareOptions = require('./prepareOptions');
const getPathsToFiles = require('./getPathsToFiles');
const replaceInFiles = require('./replaceInFiles');
const Validator = require('./Validator');

class ReplaceInFiles {
  constructor(options) {
    this.options = options;
    this.findConfig = null;
    this.logConfig = null;
    this.fsConfig = null;

    this.replaceConfig = null;
  }

  validateOptions() {
    new Validator(this.options).run();
  }

  setConfings() {
    this.replaceConfig = prepareOptions(this.options);
  }

  getPathsToFiles() {
    return getPathsToFiles(this.replaceConfig);
  }

  replaceInFiles(pathsToFiles) {
    return replaceInFiles(pathsToFiles, this.replaceConfig);
  }

  * run() {
    this.validateOptions();
    this.setConfings();
    const pathsToFiles = yield this.getPathsToFiles();
    yield this.replaceInFiles(pathsToFiles);

    return 'test42';
  }
}

module.exports = ReplaceInFiles;
