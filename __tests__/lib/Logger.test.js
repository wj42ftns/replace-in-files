/* eslint-disable global-require */

describe('lib/Logger.js', () => {
  test('constructor', () => {
    const Logger = require('../../lib/Logger.js');
    const options = 'options';
    const logger = 'logger';

    const patcher = new Logger(options, logger);

    expect(patcher.options).toBe(options);
    expect(patcher._changedFiles).toEqual({});
  });
  test('set changedFiles', () => {
    const Logger = require('../../lib/Logger.js');

    const patcher = new Logger();
    patcher.changedFiles = 'path1';
    patcher.changedFiles = 'path1';
    patcher.changedFiles = 'path1';
    patcher.changedFiles = 'path2';
    patcher.changedFiles = 'path3';
    const result = patcher._changedFiles;

    expect(result).toEqual({
      path1: 3,
      path2: 1,
      path3: 1,
    });
  });
  test('get changedFiles', () => {
    const Logger = require('../../lib/Logger.js');

    const patcher = new Logger();
    patcher._changedFiles = {
      path1: 3,
      path2: 1,
      path3: 1,
    };

    const result = patcher.changedFiles;

    expect(result).toEqual(patcher._changedFiles);
  });
  test('get changedPaths', () => {
    const Logger = require('../../lib/Logger.js');

    const patcher = new Logger();
    patcher._changedFiles = {
      path1: 3,
      path2: 1,
      path3: 1,
    };

    const result = patcher.changedPaths;

    expect(result).toEqual([
      'path1',
      'path2',
      'path3',
    ]);
  });
});
