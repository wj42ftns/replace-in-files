const _ = require('lodash');
const config = require('./config.json');

class Configurator {
  static prepareFindFilesConfig({ files, optionsForFiles: srcptionsForFiles }) {
    let optionsForFiles = config.Configurator.defaultOptionsForFiles;
    if (srcptionsForFiles) {
      optionsForFiles = _.assign(
        optionsForFiles,
        srcptionsForFiles
      );
    }

    return {
      files,
      optionsForFiles
    };
  }

  static prepareReplaceConfig({ from, to, encoding = config.Configurator.defaultEncoding }) {
    return { from, to, encoding };
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
