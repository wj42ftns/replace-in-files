const _ = require('lodash');
const globby = require('globby');
const Validator = require('./Validator');
const Configurator = require('./Configurator');
const Patcher = require('./Patcher');
const Logger = require('./Logger');
const helpers = require('./helpers');

const fs = helpers.fs;

class ReplaceInFiles {
  static* getPathsToFiles({ files, optionsForFiles }) {
    const paths = yield globby(files, optionsForFiles);
    return paths;
  }

  static* replaceInFiles(replaceConfig, pathsToFiles, logger) {
    yield _.map(pathsToFiles, path => ReplaceInFiles.replaceInFile(
      replaceConfig,
      path,
      logger
    ));

    return logger.changedPaths;
  }

  static* replaceInFile({ from, to, encoding }, path, logger) {
    const data = yield fs.readFile(path, encoding);
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
      findFilesConfig,
      loggerConfig,
      replaceConfig,
    } = this.setConfings();

    this.logger = new Logger(loggerConfig);

    const pathsToFiles = yield ReplaceInFiles.getPathsToFiles(findFilesConfig);
    const paths = yield ReplaceInFiles.replaceInFiles(replaceConfig, pathsToFiles, this.logger);

    return paths;
  }
}

module.exports = ReplaceInFiles;
