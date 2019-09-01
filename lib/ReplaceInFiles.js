const nodePath = require('path');
const _ = require('lodash');
const globby = require('globby');
const { getEncoding } = require('istextorbinary');

const Validator = require('./Validator');
const Configurator = require('./Configurator');
const Finder = require('./Finder');
const Patcher = require('./Patcher');
const Logger = require('./Logger');
const DateFormatter = require('./DateFormatter');
const helpers = require('./helpers');

const { fs } = helpers;

class ReplaceInFiles {
  static* getPathsToFiles({ files, optionsForFiles }) {
    const paths = yield globby(files, optionsForFiles);
    return paths;
  }

  static* pipesHandlerActions({
    mainReplaceOptions,
    pathsToFiles,
    pipeReplaceOptions,
  }) {
    for (let i = 0, step = 1; i < pipeReplaceOptions.length; i++, step++) {
      const srcReplaceOptions = pipeReplaceOptions[i];
      const replaceOptions = _.assign(
        {},
        mainReplaceOptions,
        srcReplaceOptions,
        { step }
      );
      yield ReplaceInFiles.handlerActions(replaceOptions, pathsToFiles);
    }
  }

  static* handlerActions(replaceOptions, pathsToFiles) {
    yield _.map(pathsToFiles, (path) => ReplaceInFiles.handlerAction(
      replaceOptions,
      path
    ));
  }

  static* handlerAction(
    replaceOptions,
    path
  ) {
    const {
      shouldSkipBinaryFiles,
      encoding,
      from,
      onlyFindPathsWithoutReplace,
      replaceFileOnlyIfMatchRegxpInFile: regexp,
      to,
      saveOldFile,
      step,
    } = replaceOptions;
    const data = yield fs.readFile(path, encoding);

    if (shouldSkipBinaryFiles && getEncoding(data) === 'binary') {
      return;
    }

    if (onlyFindPathsWithoutReplace) {
      ReplaceInFiles.findMatches({
        data,
        from,
        path,
        step,
      });
      return;
    }


    const isReplaceFile = _.some([
      regexp === null,
      regexp !== null && Finder.isFindRegxInString(data, regexp)
    ], Boolean);

    if (isReplaceFile) {
      yield ReplaceInFiles.replaceMatches({
        data,
        encoding,
        from,
        path,
        saveOldFile,
        step,
        to,
      });
    }
  }

  static findMatches({
    data,
    from,
    path,
    step,
  }) {
    new Finder({
      data,
      from,
      path,
      step,
    }).run();
  }

  static getOldFilePath({ path, birthtime, ctime }) {
    const ext = nodePath.extname(path) || '';
    const startExt = -ext.length || path.length;
    const date = birthtime || ctime || new Date();
    const postfix = new DateFormatter({ date }).run();
    const oldFilePath = `${path.slice(0, startExt)}-${postfix}${ext}`;

    return oldFilePath;
  }

  static* saveOldFile({ path, data }) {
    const { birthtime, ctime } = yield fs.stat(path);
    const oldFilePath = ReplaceInFiles.getOldFilePath({ path, birthtime, ctime });


    yield fs.writeFile(oldFilePath, data);
  }

  static* replaceMatches({
    data,
    encoding,
    from,
    path,
    saveOldFile,
    step,
    to,
  }) {
    if (saveOldFile) {
      yield ReplaceInFiles.saveOldFile({ path, data });
    }

    const updated = new Patcher({
      data,
      from,
      path,
      step,
      to,
    }).run();

    yield fs.writeFile(path, updated, encoding);
  }

  constructor(options) {
    this.options = options;

    this.logger = null;
    this.loggerOptions = null;
    this.findFilesOptions = null;
    this.replaceOptions = null;
    this.pipeReplaceOptions = null;
  }

  validateOptions() {
    new Validator(this.options).run();
  }

  setConfings() {
    const {
      findFilesOptions,
      loggerOptions,
      replaceOptions,
    } = new Configurator(this.options).run();

    this.findFilesOptions = findFilesOptions;
    this.loggerOptions = loggerOptions;
    this.replaceOptions = replaceOptions;
  }

  * initSettings() {
    this.validateOptions();
    this.setConfings();

    this.logger = new Logger({
      loggerOptions: this.loggerOptions,
      replaceInFilesMainOptions: this.options
    });
    this.logger.run();

    yield helpers.delay();
    const allOptions = this.logger.getReplaceInFilesOptions();
    this.pipeReplaceOptions = allOptions.slice(1);
    this.logger.setCountOfMatchesByPathsLength(allOptions.length);
  }

  * run() {
    yield this.initSettings();

    const pathsToFiles = yield ReplaceInFiles.getPathsToFiles(this.findFilesOptions);
    yield ReplaceInFiles.handlerActions(this.replaceOptions, pathsToFiles);
    yield ReplaceInFiles.pipesHandlerActions({
      mainReplaceOptions: this.replaceOptions,
      pathsToFiles,
      pipeReplaceOptions: this.pipeReplaceOptions,
    });

    return this.logger.getResult();
  }
}

module.exports = ReplaceInFiles;
