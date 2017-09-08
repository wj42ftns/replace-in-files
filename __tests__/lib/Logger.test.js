/* eslint-disable global-require */

describe('lib/Logger.js', () => {
  test('constructor', () => {
    const Logger = require('../../lib/Logger.js');
    const options = 'options';

    const logger = new Logger(options);

    expect(logger.options).toBe(options);
    expect(logger._countOfMatchesByPaths).toEqual({});
  });
  test('set countOfMatchesByPaths', () => {
    const Logger = require('../../lib/Logger.js');

    const logger = new Logger();
    logger.countOfMatchesByPaths = 'path1';
    logger.countOfMatchesByPaths = 'path1';
    logger.countOfMatchesByPaths = 'path1';
    logger.countOfMatchesByPaths = 'path2';
    logger.countOfMatchesByPaths = 'path3';
    const result = logger._countOfMatchesByPaths;

    expect(result).toEqual({
      path1: 3,
      path2: 1,
      path3: 1,
    });
  });
  test('get countOfMatchesByPaths', () => {
    const Logger = require('../../lib/Logger.js');

    const logger = new Logger();
    logger._countOfMatchesByPaths = {
      path1: 3,
      path2: 1,
      path3: 1,
    };

    const result = logger.countOfMatchesByPaths;

    expect(result).toEqual(logger._countOfMatchesByPaths);
  });
  test('get paths', () => {
    const Logger = require('../../lib/Logger.js');

    const logger = new Logger();
    logger._countOfMatchesByPaths = {
      path1: 3,
      path2: 1,
      path3: 1,
    };

    const result = logger.paths;

    expect(result).toEqual([
      'path1',
      'path2',
      'path3',
    ]);
  });
});
