const MockDate = require('mockdate');

MockDate.set('Thu May 08 2042 15:16:23 GMT+0300');
const mocDate = new Date();

describe('lib/ReplaceInFiles.js', () => {
  test('constructor', () => {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
    const options = 'options';

    const replaceInFiles = new ReplaceInFiles(options);

    expect(replaceInFiles.options).toBe(options);
  });
  genTest('run', function* () {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
    const findFilesOptions = 'findFilesOptions';
    const loggerOptions = {
      returnCountOfMatchesByPaths: true,
      returnPaths: true,
    };
    const replaceOptions = 'replaceOptions';
    const pathsToFiles = 'pathsToFiles';
    const paths = 'paths';

    const replaceInFiles = new ReplaceInFiles();
    replaceInFiles.validateOptions = fn();
    replaceInFiles.setConfings = fn({
      findFilesOptions,
      loggerOptions,
      replaceOptions,
    });

    jest.mock('../../lib/Logger');
    const loggerResult = 'loggerResult';
    const logger = {
      getResult: fn(loggerResult),
      run: fn(),
    };
    const Logger = require('../../lib/Logger').mockImplementation(() => logger);

    ReplaceInFiles.handlerActions = pFn(paths);
    ReplaceInFiles.getPathsToFiles = pFn(pathsToFiles);

    const result = yield replaceInFiles.run();

    expect(replaceInFiles.validateOptions).toHaveBeenCalledTimes(1);
    expect(replaceInFiles.validateOptions).toHaveBeenCalledWith();

    expect(replaceInFiles.setConfings).toHaveBeenCalledTimes(1);
    expect(replaceInFiles.setConfings).toHaveBeenCalledWith();

    expect(Logger).toHaveBeenCalledTimes(1);
    expect(Logger).toHaveBeenCalledWith(loggerOptions);

    expect(logger.run).toHaveBeenCalledTimes(1);
    expect(logger.run).toHaveBeenCalledWith();

    expect(logger.getResult).toHaveBeenCalledTimes(1);
    expect(logger.getResult).toHaveBeenCalledWith();


    expect(ReplaceInFiles.getPathsToFiles).toHaveBeenCalledTimes(1);
    expect(ReplaceInFiles.getPathsToFiles).toHaveBeenCalledWith(findFilesOptions);

    expect(ReplaceInFiles.handlerActions).toHaveBeenCalledTimes(1);
    expect(ReplaceInFiles.handlerActions).toHaveBeenCalledWith(replaceOptions, pathsToFiles);

    expect(result).toBe(loggerResult);
  });
  test('validateOptions', () => {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');

    jest.mock('../../lib/Validator');
    const moc = { run: fn() };
    const Validator = require('../../lib/Validator')
      .mockImplementation(() => moc);

    const options = 'options';
    const mocThis = { options };
    const replaceInFiles = new ReplaceInFiles();
    replaceInFiles.validateOptions.call(mocThis);

    expect(Validator).toHaveBeenCalledTimes(1);
    expect(Validator).toHaveBeenCalledWith(options);

    expect(moc.run).toHaveBeenCalledTimes(1);
    expect(moc.run).toHaveBeenCalledWith();
  });
  test('setConfings', () => {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');

    jest.mock('../../lib/Configurator');
    const configs = 'configs';
    const moc = { run: fn(configs) };
    const Configurator = require('../../lib/Configurator')
      .mockImplementation(() => moc);

    const options = 'options';
    const mocThis = { options };
    const replaceInFiles = new ReplaceInFiles();
    const result = replaceInFiles.setConfings.call(mocThis);

    expect(Configurator).toHaveBeenCalledTimes(1);
    expect(Configurator).toHaveBeenCalledWith(options);

    expect(moc.run).toHaveBeenCalledTimes(1);
    expect(moc.run).toHaveBeenCalledWith();

    expect(result).toBe(configs);
  });
  genTest('getPathsToFiles', function* () {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
    const paths = 'paths';
    jest.mock('globby');
    const globby = require('globby')
      .mockImplementation(() => Promise.resolve(paths));

    const files = 'files';
    const optionsForFiles = 'optionsForFiles';

    const result = yield ReplaceInFiles.getPathsToFiles({ files, optionsForFiles });

    expect(globby).toHaveBeenCalledTimes(1);
    expect(globby).toHaveBeenCalledWith(files, optionsForFiles);


    expect(result).toBe(paths);
  });
  genTest('handlerActions', function* () {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
    ReplaceInFiles.handlerAction = fn();

    const replaceOptions = 'replaceOptions';
    const pathsToFiles = [1, 2];
    const paths = 'paths';
    const logger = {
      paths
    };

    yield ReplaceInFiles.handlerActions(replaceOptions, pathsToFiles, logger);

    expect(ReplaceInFiles.handlerAction).toHaveBeenCalledTimes(2);
    expect(ReplaceInFiles.handlerAction).toHaveBeenCalledWith(
      replaceOptions,
      pathsToFiles[0],
      logger
    );
    expect(ReplaceInFiles.handlerAction).toHaveBeenCalledWith(
      replaceOptions,
      pathsToFiles[1],
      logger
    );
  });
  describe('handlerAction', () => {
    genTest('1', function* () {
      const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
      ReplaceInFiles.findMatches = fn();
      ReplaceInFiles.replaceMatches = pFn();
      const Finder = require('../../lib/Finder');
      Finder.isFindRegxInString = fn(true);
      const helpers = require('../../lib/helpers');
      const data = 'data';
      helpers.fs.readFile = pFn(data);

      const from = 'from';
      const to = 'to';
      const onlyFindPathsWithoutReplace = true;
      const replaceFileOnlyIfMatchRegxpInFile = 'replaceFileOnlyIfMatchRegxpInFile';
      const encoding = 'encoding';
      const saveOldFile = 'saveOldFile';

      const replaceOptions = {
        from,
        to,
        onlyFindPathsWithoutReplace,
        replaceFileOnlyIfMatchRegxpInFile,
        encoding,
        saveOldFile,
      };

      const path = 'path';
      const logger = 'logger';

      yield ReplaceInFiles.handlerAction(replaceOptions, path, logger);

      expect(helpers.fs.readFile).toHaveBeenCalledTimes(1);
      expect(helpers.fs.readFile).toHaveBeenCalledWith(path, encoding);

      expect(ReplaceInFiles.findMatches).toHaveBeenCalledTimes(1);
      expect(ReplaceInFiles.findMatches).toHaveBeenCalledWith({ path, data, from }, logger);

      expect(Finder.isFindRegxInString).toHaveBeenCalledTimes(0);
      expect(ReplaceInFiles.replaceMatches).toHaveBeenCalledTimes(0);
    });
    genTest('2', function* () {
      const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
      ReplaceInFiles.findMatches = fn();
      ReplaceInFiles.replaceMatches = pFn();
      const Finder = require('../../lib/Finder');
      Finder.isFindRegxInString = fn(true);
      const helpers = require('../../lib/helpers');
      const data = 'data';
      helpers.fs.readFile = pFn(data);

      const from = 'from';
      const to = 'to';
      const onlyFindPathsWithoutReplace = false;
      const replaceFileOnlyIfMatchRegxpInFile = 'replaceFileOnlyIfMatchRegxpInFile';
      const encoding = 'encoding';
      const saveOldFile = 'saveOldFile';

      const replaceOptions = {
        from,
        to,
        onlyFindPathsWithoutReplace,
        replaceFileOnlyIfMatchRegxpInFile,
        encoding,
        saveOldFile
      };

      const path = 'path';
      const logger = 'logger';

      yield ReplaceInFiles.handlerAction(replaceOptions, path, logger);

      expect(helpers.fs.readFile).toHaveBeenCalledTimes(1);
      expect(helpers.fs.readFile).toHaveBeenCalledWith(path, encoding);

      expect(ReplaceInFiles.findMatches).toHaveBeenCalledTimes(0);

      expect(Finder.isFindRegxInString).toHaveBeenCalledTimes(1);
      expect(Finder.isFindRegxInString)
        .toHaveBeenCalledWith(data, replaceFileOnlyIfMatchRegxpInFile);

      expect(ReplaceInFiles.replaceMatches).toHaveBeenCalledTimes(1);
      expect(ReplaceInFiles.replaceMatches)
        .toHaveBeenCalledWith({ path, data, from, to, saveOldFile }, logger);
    });
    genTest('3', function* () {
      const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
      ReplaceInFiles.findMatches = fn();
      ReplaceInFiles.replaceMatches = pFn();
      const Finder = require('../../lib/Finder');
      Finder.isFindRegxInString = fn(false);
      const helpers = require('../../lib/helpers');
      const data = 'data';
      helpers.fs.readFile = pFn(data);

      const from = 'from';
      const to = 'to';
      const onlyFindPathsWithoutReplace = false;
      const replaceFileOnlyIfMatchRegxpInFile = 'replaceFileOnlyIfMatchRegxpInFile';
      const encoding = 'encoding';
      const saveOldFile = 'saveOldFile';

      const replaceOptions = {
        from,
        to,
        onlyFindPathsWithoutReplace,
        replaceFileOnlyIfMatchRegxpInFile,
        encoding,
        saveOldFile,
      };

      const path = 'path';
      const logger = 'logger';

      yield ReplaceInFiles.handlerAction(replaceOptions, path, logger);

      expect(helpers.fs.readFile).toHaveBeenCalledTimes(1);
      expect(helpers.fs.readFile).toHaveBeenCalledWith(path, encoding);

      expect(ReplaceInFiles.findMatches).toHaveBeenCalledTimes(0);

      expect(Finder.isFindRegxInString).toHaveBeenCalledTimes(1);
      expect(Finder.isFindRegxInString)
        .toHaveBeenCalledWith(data, replaceFileOnlyIfMatchRegxpInFile);

      expect(ReplaceInFiles.replaceMatches).toHaveBeenCalledTimes(0);
    });
    genTest('4', function* () {
      const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
      ReplaceInFiles.findMatches = fn();
      ReplaceInFiles.replaceMatches = pFn();
      const Finder = require('../../lib/Finder');
      Finder.isFindRegxInString = fn(true);
      const helpers = require('../../lib/helpers');
      const data = 'data';
      helpers.fs.readFile = pFn(data);

      const from = 'from';
      const to = 'to';
      const onlyFindPathsWithoutReplace = false;
      const replaceFileOnlyIfMatchRegxpInFile = null;
      const encoding = 'encoding';
      const saveOldFile = 'saveOldFile';

      const replaceOptions = {
        from,
        to,
        onlyFindPathsWithoutReplace,
        replaceFileOnlyIfMatchRegxpInFile,
        encoding,
        saveOldFile,
      };

      const path = 'path';
      const logger = 'logger';

      yield ReplaceInFiles.handlerAction(replaceOptions, path, logger);

      expect(helpers.fs.readFile).toHaveBeenCalledTimes(1);
      expect(helpers.fs.readFile).toHaveBeenCalledWith(path, encoding);

      expect(ReplaceInFiles.findMatches).toHaveBeenCalledTimes(0);

      expect(Finder.isFindRegxInString).toHaveBeenCalledTimes(0);
      expect(ReplaceInFiles.replaceMatches).toHaveBeenCalledTimes(1);
      expect(ReplaceInFiles.replaceMatches)
        .toHaveBeenCalledWith({ path, data, from, to, saveOldFile }, logger);
    });
  });
  test('findMatches', () => {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');

    const path = 'path';
    const data = 'data';
    const from = 'from';
    const settings = { path, data, from };
    const logger = 'logger';

    jest.mock('../../lib/Finder');
    const paths = 'paths';
    const moc = { run: fn(paths) };
    const Finder = require('../../lib/Finder')
      .mockImplementation(() => moc);


    ReplaceInFiles.findMatches(settings, logger);

    expect(Finder).toHaveBeenCalledTimes(1);
    expect(Finder).toHaveBeenCalledWith(settings, logger);

    expect(moc.run).toHaveBeenCalledTimes(1);
    expect(moc.run).toHaveBeenCalledWith();
  });
  describe('replaceMatches', () => {
    genTest('1', function* () {
      const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
      ReplaceInFiles.saveOldFile = pFn();

      const path = 'path';
      const data = 'data';
      const from = 'from';
      const to = 'to';
      const saveOldFile = true;
      const settings = { path, data, from, to, saveOldFile };
      const logger = 'logger';

      jest.mock('../../lib/Patcher');
      const updated = 'updated';
      const moc = { run: fn(updated) };
      const Patcher = require('../../lib/Patcher')
        .mockImplementation(() => moc);
      const helpers = require('../../lib/helpers');
      helpers.fs.writeFile = pFn();


      yield ReplaceInFiles.replaceMatches(settings, logger);

      expect(Patcher).toHaveBeenCalledTimes(1);
      expect(Patcher).toHaveBeenCalledWith({ path, data, from, to }, logger);

      expect(moc.run).toHaveBeenCalledTimes(1);
      expect(moc.run).toHaveBeenCalledWith();

      expect(ReplaceInFiles.saveOldFile).toHaveBeenCalledTimes(1);
      expect(ReplaceInFiles.saveOldFile).toHaveBeenCalledWith({ path, data });

      expect(helpers.fs.writeFile).toHaveBeenCalledTimes(1);
      expect(helpers.fs.writeFile).toHaveBeenCalledWith(path, updated);
    });
    genTest('2', function* () {
      const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
      ReplaceInFiles.saveOldFile = pFn();

      const path = 'path';
      const data = 'data';
      const from = 'from';
      const to = 'to';
      const saveOldFile = false;
      const settings = { path, data, from, to, saveOldFile };
      const logger = 'logger';

      jest.mock('../../lib/Patcher');
      const updated = 'updated';
      const moc = { run: fn(updated) };
      const Patcher = require('../../lib/Patcher')
        .mockImplementation(() => moc);
      const helpers = require('../../lib/helpers');
      helpers.fs.writeFile = pFn();


      yield ReplaceInFiles.replaceMatches(settings, logger);

      expect(Patcher).toHaveBeenCalledTimes(1);
      expect(Patcher).toHaveBeenCalledWith({ path, data, from, to }, logger);

      expect(moc.run).toHaveBeenCalledTimes(1);
      expect(moc.run).toHaveBeenCalledWith();

      expect(ReplaceInFiles.saveOldFile).toHaveBeenCalledTimes(0);

      expect(helpers.fs.writeFile).toHaveBeenCalledTimes(1);
      expect(helpers.fs.writeFile).toHaveBeenCalledWith(path, updated);
    });
  });
  genTest('saveOldFile', function* () {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
    const path = '/home/lib/Patcher.js';
    const data = 'data';

    const helpers = require('../../lib/helpers');
    helpers.fs.writeFile = pFn();
    const birthtime = 42;
    const ctime = 79;
    helpers.fs.stat = pFn({ birthtime, ctime });
    const oldFilePath = 'oldFilePath';
    ReplaceInFiles.getOldFilePath = fn(oldFilePath);

    yield ReplaceInFiles.saveOldFile({ path, data });

    expect(helpers.fs.stat).toHaveBeenCalledTimes(1);
    expect(helpers.fs.stat).toHaveBeenCalledWith(path);

    expect(ReplaceInFiles.getOldFilePath).toHaveBeenCalledTimes(1);
    expect(ReplaceInFiles.getOldFilePath).toHaveBeenCalledWith({ path, birthtime, ctime });

    expect(helpers.fs.writeFile).toHaveBeenCalledTimes(1);
    expect(helpers.fs.writeFile).toHaveBeenCalledWith(oldFilePath, data);
  });
  describe('getOldFilePath', () => {
    test('1', () => {
      const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
      const path = '/home/lib/Patcher.js';
      const birthtime = 42;
      const ctime = 79;

      const postfix = 'postfix';
      jest.mock('../../lib/DateFormatter');
      const moc = { run: fn(postfix) };
      const DateFormatter = require('../../lib/DateFormatter').mockImplementation(() => moc);

      const result = ReplaceInFiles.getOldFilePath({ path, birthtime, ctime });

      expect(DateFormatter).toHaveBeenCalledTimes(1);
      expect(DateFormatter).toHaveBeenCalledWith({ date: birthtime });

      expect(moc.run).toHaveBeenCalledTimes(1);
      expect(moc.run).toHaveBeenCalledWith();

      expect(result).toBe('/home/lib/Patcher-postfix.js');
    });
    test('2', () => {
      const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
      const path = '/home/lib/fileWithoutExtension';
      const birthtime = undefined;
      const ctime = 79;

      const postfix = 'postfix';
      jest.mock('../../lib/DateFormatter');
      const moc = { run: fn(postfix) };
      const DateFormatter = require('../../lib/DateFormatter').mockImplementation(() => moc);

      const result = ReplaceInFiles.getOldFilePath({ path, birthtime, ctime });

      expect(DateFormatter).toHaveBeenCalledTimes(1);
      expect(DateFormatter).toHaveBeenCalledWith({ date: ctime });

      expect(moc.run).toHaveBeenCalledTimes(1);
      expect(moc.run).toHaveBeenCalledWith();

      expect(result).toBe('/home/lib/fileWithoutExtension-postfix');
    });
    test('3', () => {
      const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
      const path = '/home/my-lib_extra/readme42.md';
      const birthtime = undefined;
      const ctime = undefined;

      const postfix = 'postfix';
      jest.mock('../../lib/DateFormatter');
      const moc = { run: fn(postfix) };
      const DateFormatter = require('../../lib/DateFormatter').mockImplementation(() => moc);

      const result = ReplaceInFiles.getOldFilePath({ path, birthtime, ctime });

      expect(DateFormatter).toHaveBeenCalledTimes(1);
      expect(DateFormatter).toHaveBeenCalledWith({ date: mocDate });

      expect(moc.run).toHaveBeenCalledTimes(1);
      expect(moc.run).toHaveBeenCalledWith();

      expect(result).toBe('/home/my-lib_extra/readme42-postfix.md');
    });
  });
});
