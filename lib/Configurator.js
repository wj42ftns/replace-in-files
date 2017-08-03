const _ = require('lodash');
const config = require('./config.json');

class Configurator {
  constructor(options) {
    this.options = options;

    this.findFilesOptions = null;
    this.loggerOptions = null;
    this.replaceOptions = null;
  }

  prepareFindFilesConfig(options) {
    let optionsForFiles = this.defaultOptionsForFiles;
    if (options.optionsForFiles) {
      optionsForFiles = _.merge(
        config.Configurator.defaultOptionsForFiles,
        options.optionsForFiles
      );
    }

    const findFilesOptions = {
      files: options.files,
      optionsForFiles
    };

    return findFilesOptions;
  }

  prepareReplaceConfig() {
    const {
      from,
      to,
      encoding = config.Configurator.defaultEncoding
    } = this.options;

    const replaceOptions = {
      from,
      to,
      encoding
    };

    return replaceOptions;
  }

  run() {
    const configs = {
      findFilesOptions: this.prepareFindFilesConfig(this.options),
      // loggerOptions: this.loggerOptions,
      replaceOptions: this.prepareReplaceConfig(this.options),
    };

    return configs;
  }
}

module.exports = Configurator;
