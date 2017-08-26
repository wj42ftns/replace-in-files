/* eslint-disable global-require */

describe('lib/ReplaceInFiles.js', () => {
  test.only('constructor', () => {
    const ReplaceInFiles = require('../../lib/ReplaceInFiles.js');
    const options = 'options';

    const replaceInFiles = new ReplaceInFiles(options);

    expect(replaceInFiles.options).toBe(options);
    expect(replaceInFiles.logger).toBeNull();
  });
  genTest.only('run', function* () {
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
});
