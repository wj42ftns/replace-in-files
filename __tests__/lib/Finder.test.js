const { FIND_MATCHES } = require('../../lib/constants');

describe('lib/Finder.js', () => {
  test('constructor', () => {
    const Finder = require('../../lib/Finder.js');
    const options = 'options';

    const finder = new Finder(options);
    expect(finder.options).toBe(options);
  });
  describe('run', () => {
    test('if Finder.isFindRegxInString return true', () => {
      const Finder = require('../../lib/Finder.js');

      Finder.isFindRegxInString = fn(true);
      const matches = ['const', 'const'];
      Finder.findMatches = fn(matches);
      const from = 'from';
      const path = 'path';
      const data = 'data';
      const options = {
        from,
        path,
        data
      };
      const mocThis = { options };

      const helpers = require('../../lib/helpers');
      helpers.eventEmitter.emit = fn();

      const finder = new Finder();
      finder.run.call(mocThis);

      expect(Finder.isFindRegxInString).toHaveBeenCalledTimes(1);
      expect(Finder.isFindRegxInString).toHaveBeenCalledWith(data, from);

      expect(helpers.eventEmitter.emit).toHaveBeenCalledTimes(1);
      expect(helpers.eventEmitter.emit)
        .toHaveBeenCalledWith(FIND_MATCHES, { [path]: matches.length });
    });
    test('if Finder.isFindRegxInString return false', () => {
      const Finder = require('../../lib/Finder.js');

      Finder.isFindRegxInString = fn(false);
      const from = 'from';
      const path = 'path';
      const data = 'data';
      const options = {
        from,
        path,
        data
      };
      const logger = {};
      const mocThis = { options, logger };

      const finder = new Finder();
      finder.run.call(mocThis);

      expect(Finder.isFindRegxInString).toHaveBeenCalledTimes(1);
      expect(Finder.isFindRegxInString).toHaveBeenCalledWith(data, from);

      expect(logger.countOfMatchesByPaths).toBeUndefined();
    });
  });
  describe('isFindRegxInString', () => {
    test('should return true if regexp', () => {
      const Finder = require('../../lib/Finder.js');
      const result = Finder.isFindRegxInString('test1 test2 test3', /test1/);

      expect(result).toBeTruthy();
    });
    test('should return false if regexp', () => {
      const Finder = require('../../lib/Finder.js');
      const result = Finder.isFindRegxInString('test1 test2 test3', /test4/);

      expect(result).toBeFalsy();
    });
    test('should return true if regexp - string', () => {
      const Finder = require('../../lib/Finder.js');
      const result = Finder.isFindRegxInString('test1 test2 test3', 'test1');

      expect(result).toBeTruthy();
    });
    test('should return false if regexp - string', () => {
      const Finder = require('../../lib/Finder.js');
      const result = Finder.isFindRegxInString('test1 test2 test3', 'test4');

      expect(result).toBeFalsy();
    });
  });
  describe('findMatches', () => {
    test('should return true if regexp', () => {
      const Finder = require('../../lib/Finder.js');
      const result = Finder.findMatches('test1 test2 test1 test3', /test1|test2/g);

      expect(result).toEqual(['test1', 'test2', 'test1']);
    });
    test('should return true if regexp - string', () => {
      const Finder = require('../../lib/Finder.js');
      const result = Finder.findMatches('test1 test2 test1 test3', 'test1');

      expect(result).toEqual(['test1', 'test1']);
    });
  });
});
