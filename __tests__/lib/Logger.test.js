const {
  CHANGE_FILE,
  FIND_MATCHES
} = require('../../lib/constants');

describe('lib/Logger.js', () => {
  test('constructor', () => {
    const Logger = require('../../lib/Logger.js');
    const setCount = 'setCount';
    Logger.prototype.setCount = {
      bind: () => setCount
    };
    const incrementCountByPath = 'incrementCountByPath';
    Logger.prototype.incrementCountByPath = {
      bind: () => incrementCountByPath
    };

    const options = 'options';

    const logger = new Logger(options);

    expect(logger.options).toBe(options);
    expect(logger.countOfMatchesByPaths).toEqual({});


    expect(logger.setCount).toBe(setCount);
    expect(logger.incrementCountByPath).toBe(incrementCountByPath);
  });
  test('setEventListeners', () => {
    const Logger = require('../../lib/Logger.js');
    const helpers = require('../../lib/helpers');
    helpers.eventEmitter.on = fn();

    const mocThis = {
      incrementCountByPath: 'incrementCountByPath',
      setCount: 'setCount'
    };
    const logger = new Logger();
    logger.setEventListeners.call(mocThis);

    expect(helpers.eventEmitter.on).toHaveBeenCalledTimes(2);
    expect(helpers.eventEmitter.on).toHaveBeenCalledWith(CHANGE_FILE, mocThis.incrementCountByPath);
    expect(helpers.eventEmitter.on).toHaveBeenCalledWith(FIND_MATCHES, mocThis.setCount);
  });
  test('removeEventListeners', () => {
    const Logger = require('../../lib/Logger.js');
    const helpers = require('../../lib/helpers');
    helpers.eventEmitter.removeListener = fn();

    const mocThis = {
      incrementCountByPath: 'incrementCountByPath',
      setCount: 'setCount'
    };
    const logger = new Logger();
    logger.removeEventListeners.call(mocThis);

    expect(helpers.eventEmitter.removeListener).toHaveBeenCalledTimes(2);
    expect(helpers.eventEmitter.removeListener)
      .toHaveBeenCalledWith(CHANGE_FILE, mocThis.incrementCountByPath);
    expect(helpers.eventEmitter.removeListener)
      .toHaveBeenCalledWith(FIND_MATCHES, mocThis.setCount);
  });
  test('get paths', () => {
    const Logger = require('../../lib/Logger.js');

    const logger = new Logger();
    const mocThis = {
      countOfMatchesByPaths: {
        path1: 3,
        path2: 1,
        path3: 1,
      }
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

    const logger = new Logger();
    const mocThis = {
      countOfMatchesByPaths: {
        path1: 3,
        path2: 1,
        path3: 1,
      }
    };

    const result = logger.getCountOfMatchesByPaths.call(mocThis);

    expect(result).toEqual([
      mocThis.countOfMatchesByPaths
    ]);
  });
  describe('getResult', () => {
    test('1', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger();
      logger.options = {
        returnPaths: true,
        returnCountOfMatchesByPaths: true
      };
      logger.countOfMatchesByPaths = {
        path1: 3,
        path2: 1,
        path3: 1,
      };

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

      const logger = new Logger();
      logger.options = {
        returnPaths: true,
        returnCountOfMatchesByPaths: false
      };
      logger.countOfMatchesByPaths = {
        path1: 3,
        path2: 1,
        path3: 1,
      };

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

      const logger = new Logger();
      logger.options = {
        returnPaths: false,
        returnCountOfMatchesByPaths: true
      };
      logger.countOfMatchesByPaths = {
        path1: 3,
        path2: 1,
        path3: 1,
      };

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

      const logger = new Logger();
      logger.options = {
        returnPaths: false,
        returnCountOfMatchesByPaths: false
      };
      logger.countOfMatchesByPaths = {
        path1: 3,
        path2: 1,
        path3: 1,
      };

      const result = logger.getResult();

      expect(result).toEqual({});
    });
  });
  test('setCount', () => {
    const Logger = require('../../lib/Logger.js');

    const logger = new Logger();
    logger.countOfMatchesByPaths = {
      path1: 3,
      path2: 1,
      path3: 1,
    };

    const obj = {
      foo: 42,
      bar: 79
    };
    logger.setCount(obj);

    expect(logger.countOfMatchesByPaths).toEqual({
      path1: 3,
      path2: 1,
      path3: 1,
      foo: 42,
      bar: 79
    });
  });
  describe('incrementCountByPath', () => {
    test('1', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger();
      logger.countOfMatchesByPaths = {
        path1: 3,
        path2: 1,
        path3: 1,
      };
      logger.incrementCountByPath('path1');
      expect(logger.countOfMatchesByPaths).toEqual({
        path1: 4,
        path2: 1,
        path3: 1,
      });
    });
    test('2', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger();
      logger.countOfMatchesByPaths = {
        path1: 3,
        path2: 1,
        path3: 1,
      };
      logger.incrementCountByPath('path4');
      expect(logger.countOfMatchesByPaths).toEqual({
        path1: 3,
        path2: 1,
        path3: 1,
        path4: 1,
      });
    });
    test('run', () => {
      const Logger = require('../../lib/Logger.js');

      const logger = new Logger();
      logger.setEventListeners = fn();
      logger.run();

      expect(logger.setEventListeners).toHaveBeenCalledTimes(1);
      expect(logger.setEventListeners).toHaveBeenCalledWith();
    });
  });
});
