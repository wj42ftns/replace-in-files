const {
  ADD_REPLACE_IN_FILES_OPTIONS,
  CHANGE_FILE,
  FIND_MATCHES,
} = require('../../lib/constants');

describe('lib/Logger.js', () => {
  test('constructor', () => {
    const Logger = require('../../lib/Logger.js');
    const addReplaceInFilesOptions = 'addReplaceInFilesOptions';
    Logger.prototype.addReplaceInFilesOptions = {
      bind: () => addReplaceInFilesOptions
    };
    const setCount = 'setCount';
    Logger.prototype.setCount = {
      bind: () => setCount
    };
    const incrementCountByPath = 'incrementCountByPath';
    Logger.prototype.incrementCountByPath = {
      bind: () => incrementCountByPath
    };

    const loggerOptions = 'loggerOptions';
    const replaceInFilesMainOptions = 'replaceInFilesMainOptions';

    const logger = new Logger({ loggerOptions, replaceInFilesMainOptions });

    expect(logger.options).toBe(loggerOptions);
    expect(logger.replaceInFilesMainOptions).toBe(replaceInFilesMainOptions);
    expect(logger.countOfMatchesByPaths).toEqual([]);
    expect(logger.replaceInFilesOptions).toEqual([]);


    expect(logger.addReplaceInFilesOptions).toBe(addReplaceInFilesOptions);
    expect(logger.setCount).toBe(setCount);
    expect(logger.incrementCountByPath).toBe(incrementCountByPath);
  });
  test('setEventListeners', () => {
    const Logger = require('../../lib/Logger.js');
    const helpers = require('../../lib/helpers');
    helpers.eventEmitter.on = fn();

    const mocThis = {
      addReplaceInFilesOptions: 'addReplaceInFilesOptions',
      incrementCountByPath: 'incrementCountByPath',
      setCount: 'setCount'
    };
    const logger = new Logger({});
    logger.setEventListeners.call(mocThis);

    expect(helpers.eventEmitter.on).toHaveBeenCalledTimes(3);
    expect(helpers.eventEmitter.on)
      .toHaveBeenCalledWith(ADD_REPLACE_IN_FILES_OPTIONS, mocThis.addReplaceInFilesOptions);
    expect(helpers.eventEmitter.on).toHaveBeenCalledWith(CHANGE_FILE, mocThis.incrementCountByPath);
    expect(helpers.eventEmitter.on).toHaveBeenCalledWith(FIND_MATCHES, mocThis.setCount);
  });
  test('removeEventListeners', () => {
    const Logger = require('../../lib/Logger.js');
    const helpers = require('../../lib/helpers');
    helpers.eventEmitter.removeListener = fn();

    const mocThis = {
      addReplaceInFilesOptions: 'addReplaceInFilesOptions',
      incrementCountByPath: 'incrementCountByPath',
      setCount: 'setCount'
    };
    const logger = new Logger({});
    logger.removeEventListeners.call(mocThis);

    expect(helpers.eventEmitter.removeListener).toHaveBeenCalledTimes(3);
    expect(helpers.eventEmitter.removeListener)
      .toHaveBeenCalledWith(ADD_REPLACE_IN_FILES_OPTIONS, mocThis.addReplaceInFilesOptions);
    expect(helpers.eventEmitter.removeListener)
      .toHaveBeenCalledWith(CHANGE_FILE, mocThis.incrementCountByPath);
    expect(helpers.eventEmitter.removeListener)
      .toHaveBeenCalledWith(FIND_MATCHES, mocThis.setCount);
  });
  test('get paths', () => {
    const Logger = require('../../lib/Logger.js');

    const logger = new Logger({});
    const mocThis = {
      countOfMatchesByPaths: [
        {
          path1: 3,
          path2: 1,
          path3: 1,
        }
      ]
    };

    const result = logger.getPaths.call(mocThis);

    expect(result).toEqual([
      'path1',
      'path2',
      'path3',
    ]);
  });
  test('getCountOfMatchesByPaths', () => {
    const Logger = require('../../lib/Logger.js');

    const logger = new Logger({});
    const mocThis = {
      countOfMatchesByPaths: [
        {
          path1: 3,
          path2: 1,
          path3: 1,
        }
      ]
    };

    const result = logger.getCountOfMatchesByPaths.call(mocThis);

    expect(result).toEqual(mocThis.countOfMatchesByPaths);
  });
  test('getReplaceInFilesOptions', () => {
    const Logger = require('../../lib/Logger.js');

    const logger = new Logger({});
    const mocThis = {
      replaceInFilesOptions: [
        {
          foo1: 3,
          bar1: 1,
        },
        {
          foo2: 32,
          bar2: 12,
        },
        {
          foo3: 6,
          bar3: 56,
        },
      ]
    };

    const result = logger.getReplaceInFilesOptions.call(mocThis);

    expect(result).toEqual(mocThis.replaceInFilesOptions);
  });
  describe('getResult', () => {
    test('1', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger({});
      logger.options = {
        returnPaths: true,
        returnCountOfMatchesByPaths: true
      };
      logger.countOfMatchesByPaths = [
        {
          path1: 3,
          path2: 1,
          path3: 1,
        }
      ];

      const result = logger.getResult();

      expect(result).toEqual({
        countOfMatchesByPaths: [
          {
            path1: 3,
            path2: 1,
            path3: 1,
          }
        ],
        paths: [
          'path1',
          'path2',
          'path3',
        ]
      });
    });
    test('2', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger({});
      logger.options = {
        returnPaths: true,
        returnCountOfMatchesByPaths: false
      };
      logger.countOfMatchesByPaths = [
        {
          path1: 3,
          path2: 1,
          path3: 1,
        }
      ];

      const result = logger.getResult();

      expect(result).toEqual({
        paths: [
          'path1',
          'path2',
          'path3',
        ]
      });
    });
    test('3', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger({});
      logger.options = {
        returnPaths: false,
        returnCountOfMatchesByPaths: true
      };
      logger.countOfMatchesByPaths = [
        {
          path1: 3,
          path2: 1,
          path3: 1,
        }
      ];

      const result = logger.getResult();

      expect(result).toEqual({
        countOfMatchesByPaths: [
          {
            path1: 3,
            path2: 1,
            path3: 1,
          }
        ]
      });
    });
    test('4', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger({});
      logger.options = {
        returnPaths: false,
        returnCountOfMatchesByPaths: false
      };
      logger.countOfMatchesByPaths = [
        {
          path1: 3,
          path2: 1,
          path3: 1,
        }
      ];

      const result = logger.getResult();

      expect(result).toEqual({});
    });
  });
  describe('setCountOfMatchesByPathsLength', () => {
    test('1', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger({});

      const length = 4;

      logger.setCountOfMatchesByPathsLength(length);
      expect(logger.countOfMatchesByPaths).toEqual([{}, {}, {}, {}]);
    });
    test('2', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger({});
      logger.countOfMatchesByPaths = [
        { foo: 'bar' }
      ];
      const length = 4;

      logger.setCountOfMatchesByPathsLength(length);
      expect(logger.countOfMatchesByPaths).toEqual([{ foo: 'bar' }, {}, {}, {}]);
    });
    test('3', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger({});
      logger.countOfMatchesByPaths = [
        { foo: 'bar' }
      ];
      const length = 1;

      logger.setCountOfMatchesByPathsLength(length);
      expect(logger.countOfMatchesByPaths).toEqual([{ foo: 'bar' }]);
    });
  });
  test('setCount', () => {
    const Logger = require('../../lib/Logger.js');

    const logger = new Logger({});
    logger.countOfMatchesByPaths = [
      {
        path1: 3,
        path2: 1,
        path3: 1,
      }
    ];

    const path = [0, 'foo'];
    const count = 42;
    logger.setCount(path, count);

    expect(logger.countOfMatchesByPaths).toEqual([
      {
        path1: 3,
        path2: 1,
        path3: 1,
        foo: 42
      }
    ]);
  });
  describe('addReplaceInFilesOptions', () => {
    test('1', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger({});

      const options = 'options';
      logger.addReplaceInFilesOptions(options);

      expect(logger.replaceInFilesOptions).toEqual([options]);
    });
    test('2', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger({});

      logger.replaceInFilesOptions = ['foo', 'bar'];
      const options = 'options';
      logger.addReplaceInFilesOptions(options);

      expect(logger.replaceInFilesOptions).toEqual(['foo', 'bar', options]);
    });
  });
  describe('incrementCountByPath', () => {
    test('1', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger({});
      logger.countOfMatchesByPaths = [
        {
          path1: 3,
          path2: 1,
          path3: 1,
        }
      ];
      logger.incrementCountByPath('0.path1');
      expect(logger.countOfMatchesByPaths).toEqual([
        {
          path1: 4,
          path2: 1,
          path3: 1,
        }
      ]);
    });
    test('2', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger({});
      logger.countOfMatchesByPaths = [
        {
          path1: 3,
          path2: 1,
          path3: 1,
        }
      ];
      logger.incrementCountByPath('0.path4');
      expect(logger.countOfMatchesByPaths).toEqual([
        {
          path1: 3,
          path2: 1,
          path3: 1,
          path4: 1,
        }
      ]);
    });
    test('run', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger({});
      logger.setEventListeners = fn();
      logger.run();

      expect(logger.setEventListeners).toHaveBeenCalledTimes(1);
      expect(logger.setEventListeners).toHaveBeenCalledWith();
    });
  });
});
