const _ = require('lodash');
const config = require('./config.json');

class Configurator {
  static prepareFindFilesConfig({ files, optionsForFiles: srcOptionsForFiles }) {
    let optionsForFiles = config.Configurator.defaultOptionsForFiles;
    if (srcOptionsForFiles) {
      optionsForFiles = _.assign(optionsForFiles, srcOptionsForFiles);
    }
    optionsForFiles = _.assign(optionsForFiles, { nodir: true });

    return {
      files,
      optionsForFiles
    };
  }

  static prepareReplaceConfig({
    from,
    to,
    replaceFileOnlyIfMatchRegxpInFile = null,
    shouldSkipBinaryFiles = config.Configurator.shouldSkipBinaryFiles,
    encoding = config.Configurator.defaultEncoding,
    onlyFindPathsWithoutReplace = config.Configurator.defaultOnlyFindPathsWithoutReplace,
    saveOldFile = config.Configurator.defaultSaveOldFile,
  }) {
    const onlyFind = to ? onlyFindPathsWithoutReplace : true;

    return {
      from,
      to,
      shouldSkipBinaryFiles,
      encoding,
      onlyFindPathsWithoutReplace: onlyFind,
      replaceFileOnlyIfMatchRegxpInFile,
      saveOldFile: onlyFind ? false : saveOldFile,
      step: 0, // in ReplaceInFiles.pipesHandlerActions reassigned
    };
  }

  static prepareLoggerConfig({
    returnCountOfMatchesByPaths = config.Configurator.defaultReturnCountOfMatchesByPaths,
    returnReplaceInFilesOptions = config.Configurator.defaultReplaceInFilesOptions,
    returnPaths = config.Configurator.defaultReturnPaths
  }) {
    return {
      returnCountOfMatchesByPaths,
      returnReplaceInFilesOptions,
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
