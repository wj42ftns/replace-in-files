const _ = require('lodash');
const config = require('./config.json');

class Configurator {
  static prepareFindFilesConfig(options) {
    let optionsForFiles = config.Configurator.defaultOptionsForFiles;
    if (options.optionsForFiles) {
      optionsForFiles = _.merge(
        optionsForFiles,
        options.optionsForFiles
      );
    }

    const findFilesOptions = {
      files: options.files,
      optionsForFiles
    };

    return findFilesOptions;
  }

  static prepareReplaceConfig(options) {
    const {
      from,
      to,
      encoding = config.Configurator.defaultEncoding
    } = options;

    const replaceOptions = {
      from,
      to,
      encoding
    };

    return replaceOptions;
  }

  constructor(options) {
    this.options = options;

    this.findFilesOptions = null;
    this.loggerOptions = null;
    this.replaceOptions = null;
  }

  run() {
    const configs = {
      findFilesOptions: Configurator.prepareFindFilesConfig(this.options),
      // loggerOptions: this.loggerOptions,
      replaceOptions: Configurator.prepareReplaceConfig(this.options),
    };

    return configs;
  }
}

module.exports = Configurator;
