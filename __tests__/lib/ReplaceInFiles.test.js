/* eslint-disable global-require */

describe('lib/ReplaceInFiles.js', () => {
  test('constructor', () => {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
    const options = 'options';

    const replaceInFiles = new ReplaceInFiles(options);

    expect(replaceInFiles.options).toBe(options);
    expect(replaceInFiles.logger).toBeNull();
  });
  genTest('run', function* () {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
    const findFilesOptions = 'findFilesOptions';
    const loggerOptions = 'loggerOptions';
    const replaceOptions = 'replaceOptions';
    const pathsToFiles = 'pathsToFiles';
    const paths = 'paths';

    const replaceInFiles = new ReplaceInFiles();
    replaceInFiles.logger = 'logger';
    replaceInFiles.validateOptions = fn();
    replaceInFiles.setConfings = fn({
      findFilesOptions,
      loggerOptions,
      replaceOptions,
    });

    const Logger = require('../../lib/Logger');
    const logger = new Logger(loggerOptions);

    ReplaceInFiles.replaceInFiles = pFn(paths);
    ReplaceInFiles.getPathsToFiles = pFn(pathsToFiles);

    const result = yield replaceInFiles.run();

    expect(replaceInFiles.validateOptions).toHaveBeenCalledTimes(1);
    expect(replaceInFiles.validateOptions).toHaveBeenCalledWith();

    expect(replaceInFiles.setConfings).toHaveBeenCalledTimes(1);
    expect(replaceInFiles.setConfings).toHaveBeenCalledWith();


    expect(ReplaceInFiles.getPathsToFiles).toHaveBeenCalledTimes(1);
    expect(ReplaceInFiles.getPathsToFiles).toHaveBeenCalledWith(findFilesOptions);

    expect(ReplaceInFiles.replaceInFiles).toHaveBeenCalledTimes(1);
    expect(ReplaceInFiles.replaceInFiles)
      .toHaveBeenCalledWith(replaceOptions, pathsToFiles, logger);

    expect(result).toBe(paths);
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
  genTest('run', function* () {
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
});
