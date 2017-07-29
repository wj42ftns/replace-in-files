// const _ = require('lodash');
// const chalk = require('chalk');
// const helpers = require('./helpers');
const globby = require('globby');
const replaceInFiles = require('./replaceInFiles');
const Validator = require('./Validator');
const Configurator = require('./Configurator');

class ReplaceInFiles {
  static* getPathsToFiles({ files, optionsForFiles }) {
    const paths = yield globby(files, optionsForFiles);

    return paths;
  }

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
    const {
      findFilesConfig,
      logConfig,
      fsConfig,
      replaceConfig,
    } = new Configurator(this.options).run();

    this.findFilesConfig = findFilesConfig;
    this.logConfig = logConfig;
    this.fsConfig = fsConfig;
    this.replaceConfig = replaceConfig;
  }

  replaceInFiles(pathsToFiles) {
    return replaceInFiles(pathsToFiles, this.replaceConfig);
  }

  * run() {
    this.validateOptions();
    this.setConfings();
    const pathsToFiles = yield ReplaceInFiles.getPathsToFiles(this.findFilesConfig);
    yield this.replaceInFiles(pathsToFiles);

    return 'test42';
  }
}

module.exports = ReplaceInFiles;
