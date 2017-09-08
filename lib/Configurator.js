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

  static prepareReplaceConfig({
    from,
    to,
    replaceFileOnlyIfMatchRegxInFile,
    encoding = config.Configurator.defaultEncoding,
    onlyFindPathsWithoutReplace = !to,
  }) {
    return {
      from,
      to,
      encoding,
      onlyFindPathsWithoutReplace,
      replaceFileOnlyIfMatchRegxInFile
    };
  }

  static prepareLoggerConfig({
    returnCountOfMatchesByPaths = config.Configurator.defaultReturnCountOfMatchesByPaths,
    returnPaths = config.Configurator.defaultReturnPaths
  }) {
    return {
      returnCountOfMatchesByPaths,
      returnPaths,
    };
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
      loggerOptions: Configurator.prepareLoggerConfig(this.options),
      replaceOptions: Configurator.prepareReplaceConfig(this.options),
    };

    return configs;
  }
}

module.exports = Configurator;
