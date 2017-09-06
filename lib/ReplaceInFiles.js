const _ = require('lodash');
const globby = require('globby');
const Validator = require('./Validator');
const Configurator = require('./Configurator');
const Finder = require('./Finder');
const Patcher = require('./Patcher');
const Logger = require('./Logger');
const helpers = require('./helpers');

const fs = helpers.fs;

class ReplaceInFiles {
  static* getPathsToFiles({ files, optionsForFiles }) {
    const paths = yield globby(files, optionsForFiles);
    return paths;
  }

  static* handlerActions(replaceOptions, pathsToFiles, logger) {
    yield _.map(pathsToFiles, path => ReplaceInFiles.handlerAction(
      replaceOptions,
      path,
      logger
    ));
  }

  static* handlerAction(
    { from, to, onlyFindPathsWithoutReplace, replaceFileOnlyIfMatchRegxInFile: regexp, encoding },
    path,
    logger
  ) {
    const data = yield fs.readFile(path, encoding);

    if (onlyFindPathsWithoutReplace) {
      ReplaceInFiles.findMatches({ path, data, from }, logger);
      return;
    }


    const isReplaceFile = _.some([
      !regexp,
      regexp && Finder.isFindRegxInString(data, regexp)
    ], Boolean);

    if (isReplaceFile) {
      yield ReplaceInFiles.replaceMatches({ path, data, from, to }, logger);
    }
  }

  static findMatches({ path, data, from }, logger) {
    new Finder({ path, data, from }, logger).run();
  }

  static* replaceMatches({ path, data, from, to }, logger) {
    const updated = new Patcher({ path, data, from, to }, logger).run();
    yield fs.writeFile(path, updated);
  }

  constructor(options) {
    this.options = options;
    this.logger = null;
  }

  validateOptions() {
    new Validator(this.options).run();
  }

  setConfings() {
    const configs = new Configurator(this.options).run();
    return configs;
  }

  * run() {
    this.validateOptions();

    const {
      findFilesOptions,
      loggerOptions,
      replaceOptions,
    } = this.setConfings();

    this.logger = new Logger(loggerOptions);

    const pathsToFiles = yield ReplaceInFiles.getPathsToFiles(findFilesOptions);
    yield ReplaceInFiles.handlerActions(replaceOptions, pathsToFiles, this.logger);

    return this.logger.changedPaths;
  }
}

module.exports = ReplaceInFiles;
