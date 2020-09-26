const MockDate = require('mockdate');

MockDate.set('Thu May 08 2042 15:16:23 GMT+0300');
const mocDate = new Date();

describe('lib/ReplaceInFiles.js', () => {
  test('constructor', () => {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
    const options = 'options';

    const replaceInFiles = new ReplaceInFiles(options);

    expect(replaceInFiles.options).toBe(options);

    expect(replaceInFiles.loggerOptions).toBeNull();
    expect(replaceInFiles.findFilesOptions).toBeNull();
    expect(replaceInFiles.replaceOptions).toBeNull();
    expect(replaceInFiles.pipeReplaceOptions).toBeNull();
  });
  genTest('run', function* () {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
    const pathsToFiles = 'pathsToFiles';
    const paths = 'paths';

    const replaceInFiles = new ReplaceInFiles();
    replaceInFiles.initSettings = pFn();
    const loggerResult = 'loggerResult';
    const logger = {
      getResult: fn(loggerResult),
    };
    replaceInFiles.logger = logger;
    replaceInFiles.findFilesOptions = 'findFilesOptions';
    replaceInFiles.replaceOptions = 'replaceOptions';
    replaceInFiles.pipeReplaceOptions = 'pipeReplaceOptions';

    ReplaceInFiles.handlerActions = pFn(paths);
    ReplaceInFiles.getPathsToFiles = pFn(pathsToFiles);
    ReplaceInFiles.pipesHandlerActions = pFn();

    const result = yield replaceInFiles.run();

    expect(replaceInFiles.initSettings).toHaveBeenCalledTimes(1);
    expect(replaceInFiles.initSettings).toHaveBeenCalledWith();

    expect(logger.getResult).toHaveBeenCalledTimes(1);
    expect(logger.getResult).toHaveBeenCalledWith();

    expect(ReplaceInFiles.getPathsToFiles).toHaveBeenCalledTimes(1);
    expect(ReplaceInFiles.getPathsToFiles).toHaveBeenCalledWith(replaceInFiles.findFilesOptions);

    expect(ReplaceInFiles.handlerActions).toHaveBeenCalledTimes(1);
    expect(ReplaceInFiles.handlerActions)
      .toHaveBeenCalledWith(replaceInFiles.replaceOptions, pathsToFiles);

    expect(ReplaceInFiles.pipesHandlerActions).toHaveBeenCalledTimes(1);
    expect(ReplaceInFiles.pipesHandlerActions).toHaveBeenCalledWith({
      mainReplaceOptions: replaceInFiles.replaceOptions,
      pathsToFiles,
      pipeReplaceOptions: replaceInFiles.pipeReplaceOptions,
    });

    expect(result).toBe(loggerResult);
  });
  genTest('initSettings', function* () {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
    const loggerOptions = {
      returnCountOfMatchesByPaths: true,
      returnPaths: true,
    };
    const helpers = require('../../lib/helpers');
    helpers.delay = pFn();

    const replaceInFiles = new ReplaceInFiles();
    replaceInFiles.options = 'replaceInFilesMainOptions';
    replaceInFiles.loggerOptions = loggerOptions;
    replaceInFiles.validateOptions = fn();
    replaceInFiles.setConfings = fn();

    jest.mock('../../lib/Logger');
    const allOptions = ['1', '2', '3', '4', '5'];
    const logger = {
      run: fn(),
      getReplaceInFilesOptions: fn(allOptions),
      setCountOfMatchesByPathsLength: fn(),
    };
    const Logger = require('../../lib/Logger').mockImplementation(() => logger);

    yield replaceInFiles.initSettings();

    expect(replaceInFiles.validateOptions).toHaveBeenCalledTimes(1);
    expect(replaceInFiles.validateOptions).toHaveBeenCalledWith();

    expect(replaceInFiles.setConfings).toHaveBeenCalledTimes(1);
    expect(replaceInFiles.setConfings).toHaveBeenCalledWith();

    expect(Logger).toHaveBeenCalledTimes(1);
    expect(Logger).toHaveBeenCalledWith({
      loggerOptions,
      replaceInFilesMainOptions: replaceInFiles.options
    });

    expect(logger.run).toHaveBeenCalledTimes(1);
    expect(logger.run).toHaveBeenCalledWith();

    expect(helpers.delay).toHaveBeenCalledTimes(1);
    expect(helpers.delay).toHaveBeenCalledWith();

    expect(logger.getReplaceInFilesOptions).toHaveBeenCalledTimes(1);
    expect(logger.getReplaceInFilesOptions).toHaveBeenCalledWith();

    expect(replaceInFiles.pipeReplaceOptions).toEqual(['2', '3', '4', '5']);

    expect(logger.setCountOfMatchesByPathsLength).toHaveBeenCalledTimes(1);
    expect(logger.setCountOfMatchesByPathsLength).toHaveBeenCalledWith(allOptions.length);
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
    const configs = {
      findFilesOptions: 'findFilesOptions',
      loggerOptions: 'loggerOptions',
      replaceOptions: 'replaceOptions',
    };
    const moc = { run: fn(configs) };
    const Configurator = require('../../lib/Configurator')
      .mockImplementation(() => moc);

    const replaceInFiles = new ReplaceInFiles();
    replaceInFiles.options = 'options';
    replaceInFiles.setConfings();

    expect(Configurator).toHaveBeenCalledTimes(1);
    expect(Configurator).toHaveBeenCalledWith(replaceInFiles.options);

    expect(moc.run).toHaveBeenCalledTimes(1);
    expect(moc.run).toHaveBeenCalledWith();

    expect(replaceInFiles.findFilesOptions).toBe(configs.findFilesOptions);
    expect(replaceInFiles.loggerOptions).toBe(configs.loggerOptions);
    expect(replaceInFiles.replaceOptions).toBe(configs.replaceOptions);
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
  describe('pipesHandlerActions', () => {
    genTest('1', function* () {
      const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
      ReplaceInFiles.handlerActions = pFn();

      const mainReplaceOptions = { foo: 'bar' };
      const pathsToFiles = [1, 2];
      const pipeReplaceOptions = [
        { from: 'from1', to: 'to1' },
        { from: 'from2', to: 'to2' },
        { from: 'from3', to: 'to3' },
        { from: 'from4', to: 'to4' },
      ];

      yield ReplaceInFiles.pipesHandlerActions({
        mainReplaceOptions,
        pathsToFiles,
        pipeReplaceOptions,
      });

      expect(ReplaceInFiles.handlerActions).toHaveBeenCalledTimes(4);
      expect(ReplaceInFiles.handlerActions).toHaveBeenCalledWith(
        {
          foo: 'bar',
          from: 'from1',
          to: 'to1',
          step: 1
        },
        pathsToFiles
      );
      expect(ReplaceInFiles.handlerActions).toHaveBeenCalledWith(
        {
          foo: 'bar',
          from: 'from2',
          to: 'to2',
          step: 2
        },
        pathsToFiles
      );
      expect(ReplaceInFiles.handlerActions).toHaveBeenCalledWith(
        {
          foo: 'bar',
          from: 'from3',
          to: 'to3',
          step: 3
        },
        pathsToFiles
      );
      expect(ReplaceInFiles.handlerActions).toHaveBeenCalledWith(
        {
          foo: 'bar',
          from: 'from4',
          to: 'to4',
          step: 4
        },
        pathsToFiles
      );
    });
    genTest('2', function* () {
      const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
      ReplaceInFiles.handlerActions = pFn();

      const mainReplaceOptions = { foo: 'bar' };
      const pathsToFiles = [1, 2];
      const pipeReplaceOptions = [];

      yield ReplaceInFiles.pipesHandlerActions({
        mainReplaceOptions,
        pathsToFiles,
        pipeReplaceOptions,
      });

      expect(ReplaceInFiles.handlerActions).toHaveBeenCalledTimes(0);
    });
  });
  genTest('handlerActions', function* () {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
    ReplaceInFiles.handlerAction = fn();

    const replaceOptions = 'replaceOptions';
    const pathsToFiles = [1, 2];

    yield ReplaceInFiles.handlerActions(replaceOptions, pathsToFiles);

    expect(ReplaceInFiles.handlerAction).toHaveBeenCalledTimes(2);
    expect(ReplaceInFiles.handlerAction).toHaveBeenCalledWith(
      replaceOptions,
      pathsToFiles[0]
    );
    expect(ReplaceInFiles.handlerAction).toHaveBeenCalledWith(
      replaceOptions,
      pathsToFiles[1]
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
      const step = 'step';

      const replaceOptions = {
        from,
        to,
        onlyFindPathsWithoutReplace,
        replaceFileOnlyIfMatchRegxpInFile,
        encoding,
        saveOldFile,
        step,
      };

      const path = 'path';

      yield ReplaceInFiles.handlerAction(replaceOptions, path);

      expect(helpers.fs.readFile).toHaveBeenCalledTimes(1);
      expect(helpers.fs.readFile).toHaveBeenCalledWith(path, encoding);

      expect(ReplaceInFiles.findMatches).toHaveBeenCalledTimes(1);
      expect(ReplaceInFiles.findMatches).toHaveBeenCalledWith({
        data,
        from,
        path,
        step,
      });

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
      const step = 'step';

      const replaceOptions = {
        from,
        to,
        onlyFindPathsWithoutReplace,
        replaceFileOnlyIfMatchRegxpInFile,
        encoding,
        saveOldFile,
        step,
      };

      const path = 'path';

      yield ReplaceInFiles.handlerAction(replaceOptions, path);

      expect(helpers.fs.readFile).toHaveBeenCalledTimes(1);
      expect(helpers.fs.readFile).toHaveBeenCalledWith(path, encoding);

      expect(ReplaceInFiles.findMatches).toHaveBeenCalledTimes(0);

      expect(Finder.isFindRegxInString).toHaveBeenCalledTimes(1);
      expect(Finder.isFindRegxInString)
        .toHaveBeenCalledWith(data, replaceFileOnlyIfMatchRegxpInFile);

      expect(ReplaceInFiles.replaceMatches).toHaveBeenCalledTimes(1);
      expect(ReplaceInFiles.replaceMatches).toHaveBeenCalledWith({
        data,
        encoding,
        from,
        path,
        saveOldFile,
        step,
        to,
      });
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
      const step = 'step';

      const replaceOptions = {
        from,
        to,
        onlyFindPathsWithoutReplace,
        replaceFileOnlyIfMatchRegxpInFile,
        encoding,
        saveOldFile,
        step,
      };

      const path = 'path';

      yield ReplaceInFiles.handlerAction(replaceOptions, path);

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
      const step = 'step';

      const replaceOptions = {
        from,
        to,
        onlyFindPathsWithoutReplace,
        replaceFileOnlyIfMatchRegxpInFile,
        encoding,
        saveOldFile,
        step,
      };

      const path = 'path';

      yield ReplaceInFiles.handlerAction(replaceOptions, path);

      expect(helpers.fs.readFile).toHaveBeenCalledTimes(1);
      expect(helpers.fs.readFile).toHaveBeenCalledWith(path, encoding);

      expect(ReplaceInFiles.findMatches).toHaveBeenCalledTimes(0);

      expect(Finder.isFindRegxInString).toHaveBeenCalledTimes(0);
      expect(ReplaceInFiles.replaceMatches).toHaveBeenCalledTimes(1);
      expect(ReplaceInFiles.replaceMatches).toHaveBeenCalledWith({
        data,
        encoding,
        from,
        path,
        saveOldFile,
        step,
        to,
      });
    });
  });
  test('findMatches', () => {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');

    const path = 'path';
    const data = 'data';
    const from = 'from';
    const step = 'step';
    const settings = {
      data,
      from,
      path,
      step,
    };

    jest.mock('../../lib/Finder');
    const paths = 'paths';
    const moc = { run: fn(paths) };
    const Finder = require('../../lib/Finder')
      .mockImplementation(() => moc);

    ReplaceInFiles.findMatches(settings);

    expect(Finder).toHaveBeenCalledTimes(1);
    expect(Finder).toHaveBeenCalledWith(settings);

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
      const step = 0;
      const encoding = 'encoding';
      const settings = {
        data,
        encoding,
        from,
        path,
        saveOldFile,
        step,
        to,
      };

      jest.mock('../../lib/Patcher');
      const updated = 'updated';
      const moc = { run: fn(updated) };
      const Patcher = require('../../lib/Patcher')
        .mockImplementation(() => moc);
      const helpers = require('../../lib/helpers');
      helpers.fs.writeFile = pFn();

      yield ReplaceInFiles.replaceMatches(settings);

      expect(Patcher).toHaveBeenCalledTimes(1);
      expect(Patcher).toHaveBeenCalledWith({
        data,
        from,
        path,
        step,
        to,
      });

      expect(moc.run).toHaveBeenCalledTimes(1);
      expect(moc.run).toHaveBeenCalledWith();

      expect(ReplaceInFiles.saveOldFile).toHaveBeenCalledTimes(1);
      expect(ReplaceInFiles.saveOldFile).toHaveBeenCalledWith({ path, data });

      expect(helpers.fs.writeFile).toHaveBeenCalledTimes(1);
      expect(helpers.fs.writeFile).toHaveBeenCalledWith(path, updated, encoding);
    });
    genTest('2', function* () {
      const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
      ReplaceInFiles.saveOldFile = pFn();

      const path = 'path';
      const data = 'data';
      const from = 'from';
      const to = 'to';
      const saveOldFile = false;
      const step = 0;
      const encoding = 'encoding';
      const settings = {
        data,
        encoding,
        from,
        path,
        saveOldFile,
        step,
        to,
      };

      jest.mock('../../lib/Patcher');
      const updated = 'updated';
      const moc = { run: fn(updated) };
      const Patcher = require('../../lib/Patcher')
        .mockImplementation(() => moc);
      const helpers = require('../../lib/helpers');
      helpers.fs.writeFile = pFn();

      yield ReplaceInFiles.replaceMatches(settings);

      expect(Patcher).toHaveBeenCalledTimes(1);
      expect(Patcher).toHaveBeenCalledWith({
        data,
        from,
        path,
        step,
        to,
      });

      expect(moc.run).toHaveBeenCalledTimes(1);
      expect(moc.run).toHaveBeenCalledWith();

      expect(ReplaceInFiles.saveOldFile).toHaveBeenCalledTimes(0);

      expect(helpers.fs.writeFile).toHaveBeenCalledTimes(1);
      expect(helpers.fs.writeFile).toHaveBeenCalledWith(path, updated, encoding);
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
