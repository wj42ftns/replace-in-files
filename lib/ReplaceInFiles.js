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

  static* replaceInFiles(replaceOptions, pathsToFiles, logger) {
    yield _.map(pathsToFiles, path => ReplaceInFiles.replaceInFile(
      replaceOptions,
      path,
      logger
    ));

    return logger.changedPaths;
  }

  static* replaceInFile(
    { from, to, onlyFindPathsWithoutReplace, replaceFileOnlyIfMatchRegxInFile: regexp, encoding },
    path,
    logger
  ) {
    const data = yield fs.readFile(path, encoding);

    if (onlyFindPathsWithoutReplace) {
      new Finder({ path, data, from }, logger).run();
    } else {
      const isReplaceFile = _.some([
        !regexp,
        regexp && Finder.isFindRegxInString(data, regexp)
      ], Boolean);

      if (isReplaceFile) {
        const updated = new Patcher({ path, data, from, to }, logger).run();
        yield fs.writeFile(path, updated);
      }
    }
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
    const paths = yield ReplaceInFiles.replaceInFiles(replaceOptions, pathsToFiles, this.logger);

    return paths;
  }
}

module.exports = ReplaceInFiles;
