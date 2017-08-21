/* eslint-disable global-require */

describe('lib/Logger.js', () => {
  test('constructor', () => {
    const Logger = require('../../lib/Logger.js');
    const options = 'options';

    const logger = new Logger(options);

    expect(logger.options).toBe(options);
    expect(logger._changedFiles).toEqual({});
  });
  test('set changedFiles', () => {
    const Logger = require('../../lib/Logger.js');

    const logger = new Logger();
    logger.changedFiles = 'path1';
    logger.changedFiles = 'path1';
    logger.changedFiles = 'path1';
    logger.changedFiles = 'path2';
    logger.changedFiles = 'path3';
    const result = logger._changedFiles;

    expect(result).toEqual({
      path1: 3,
      path2: 1,
      path3: 1,
    });
  });
  test('get changedFiles', () => {
    const Logger = require('../../lib/Logger.js');

    const logger = new Logger();
    logger._changedFiles = {
      path1: 3,
      path2: 1,
      path3: 1,
    };

    const result = logger.changedFiles;

    expect(result).toEqual(logger._changedFiles);
  });
  test('get changedPaths', () => {
    const Logger = require('../../lib/Logger.js');

    const logger = new Logger();
    logger._changedFiles = {
      path1: 3,
      path2: 1,
      path3: 1,
    };

    const result = logger.changedPaths;

    expect(result).toEqual([
      'path1',
      'path2',
      'path3',
    ]);
  });
});
