const _ = require('lodash');

class Configurator {
  static prepareFindFilesConfig(options) {
    const defaultOptionsForFiles = {
      ignore: [
        '**/node_modules/**',
      ],
      nodir: true,
    };

    let optionsForFiles = defaultOptionsForFiles;
    if (options.optionsForFiles) {
      optionsForFiles = _.merge(
        defaultOptionsForFiles,
        options.optionsForFiles
      );
    }

    const findFilesConfig = {
      files: options.files,
      optionsForFiles
    };

    return findFilesConfig;
  }

  constructor(options) {
    this.options = options;

    this.findFilesConfig = null;
    this.logConfig = null;
    this.fsConfig = null;
    this.replaceConfig = null;
  }

  prepareReplaceConfig() {
    // _.pick(this.options, [
    //   ''
    // ]);

    return this.options;
  }

  run() {
    const configs = {
      findFilesConfig: Configurator.prepareFindFilesConfig(this.options),
      // logConfig: this.logConfig,
      // fsConfig: this.fsConfig,
      replaceConfig: this.prepareReplaceConfig(this.options),
    };

    return configs;
  }
}

module.exports = Configurator;
