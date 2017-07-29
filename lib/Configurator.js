const _ = require('lodash');

class Configurator {
  constructor(options) {
    this.options = options;

    this.findFilesConfig = null;
    this.loggerConfig = null;
    this.fsConfig = null;
    this.replaceConfig = null;

    this.defaultEncoding = 'utf8';
    this.defaultOptionsForFiles = {
      ignore: [
        '**/node_modules/**',
      ],
      nodir: true,
    };
  }

  prepareFindFilesConfig(options) {
    let optionsForFiles = this.defaultOptionsForFiles;
    if (options.optionsForFiles) {
      optionsForFiles = _.merge(
        this.defaultOptionsForFiles,
        options.optionsForFiles
      );
    }

    const findFilesConfig = {
      files: options.files,
      optionsForFiles
    };

    return findFilesConfig;
  }

  prepareReplaceConfig() {
    const {
      from,
      to,
      encoding = this.defaultEncoding
    } = this.options;

    const replaceConfig = {
      from,
      to,
      encoding
    };

    return replaceConfig;
  }

  run() {
    const configs = {
      findFilesConfig: this.prepareFindFilesConfig(this.options),
      // loggerConfig: this.loggerConfig,
      replaceConfig: this.prepareReplaceConfig(this.options),
    };

    return configs;
  }
}

module.exports = Configurator;
