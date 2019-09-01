const { ADD_REPLACE_IN_FILES_OPTIONS } = require('../../lib/constants');

describe('lib/helpers.js', () => {
  test('handleError', () => {
    const helpers = require('../../lib/helpers.js');
    const err = 'err';
    expect(() => helpers.handleError(err)).toThrow(err);
  });
  test('fs', () => {
    const helpers = require('../../lib/helpers.js');
    const {
      readFile,
      stat,
      writeFile
    } = require('fs');

    jest.mock('es6-promisify');
    const { promisify } = require('es6-promisify');

    expect(Object.keys(helpers.fs)).toEqual([
      'readFile',
      'stat',
      'writeFile'
    ]);

    expect(promisify).toHaveBeenCalledTimes(3);
    expect(promisify).toHaveBeenCalledWith(readFile);
    expect(promisify).toHaveBeenCalledWith(stat);
    expect(promisify).toHaveBeenCalledWith(writeFile);
  });
  describe('co', () => {
    test('resolve', (done) => {
      const helpers = require('../../lib/helpers.js');
      const resolveMsg = 'resolveMsg';
      const options = 'options';

      const pFunc = (opt) => new Promise((resolve) => {
        expect(opt).toBe(options);
        setTimeout(() => resolve(resolveMsg));
      });
      helpers.co(pFunc, options).then((result) => {
        expect(result).toBe(resolveMsg);
        done();
      });
    });
    test('reject 1', (done) => {
      const helpers = require('../../lib/helpers.js');
      helpers.handleError = fn();
      const rejectMsg = 'rejectMsg';
      const options = 'options';

      const pFunc = (opt) => new Promise((resolve, reject) => {
        expect(opt).toBe(options);
        setTimeout(() => reject(rejectMsg));
      });

      helpers.co(pFunc, options).then(() => {
        expect(helpers.handleError).toHaveBeenCalledTimes(1);
        expect(helpers.handleError).toHaveBeenCalledWith(rejectMsg);

        done();
      });
    });
    test('reject 2', (done) => {
      const helpers = require('../../lib/helpers.js');
      const rejectMsg = 'rejectMsg';
      const options = 'options';

      const pFunc = (opt) => new Promise((resolve, reject) => {
        expect(opt).toBe(options);
        setTimeout(() => reject(rejectMsg));
      });

      helpers.co(pFunc, options).catch((err) => {
        expect(err.message).toBe(rejectMsg);
        done();
      });
    });
    genTest('gen resolve', function* () {
      const helpers = require('../../lib/helpers.js');
      const resolveMsg = 'resolveMsg';
      const options = 'options';
      const pFunc = (opt) => new Promise((resolve) => {
        expect(opt).toBe(options);
        setTimeout(() => resolve(resolveMsg));
      });

      const result = yield helpers.co(pFunc, options);

      expect(result).toBe(resolveMsg);
    });
    genTest('gen reject', function* () {
      const helpers = require('../../lib/helpers.js');
      const rejectMsg = 'rejectMsg';
      const options = 'options';
      const pFunc = (opt) => new Promise((resolve, reject) => {
        expect(opt).toBe(options);
        setTimeout(() => reject(rejectMsg));
      });

      try {
        yield helpers.co(pFunc, options);
      } catch (err) {
        expect(err.message).toBe(rejectMsg);
      }
    });
  });
  genTest('delay', function* () {
    const helpers = require('../../lib/helpers.js');

    let error;
    try {
      yield helpers.delay();
    } catch (err) {
      error = err;
    }
    expect(error).toBeUndefined();
  });
  describe('pipe', () => {
    test('1', () => {
      const helpers = require('../../lib/helpers.js');
      helpers.eventEmitter.emit = fn();

      const srcResult = {};
      const options = 'options';
      const result = helpers.pipe(srcResult, options);

      expect(helpers.eventEmitter.emit).toHaveBeenCalledTimes(1);
      expect(helpers.eventEmitter.emit).toHaveBeenCalledWith(ADD_REPLACE_IN_FILES_OPTIONS, options);

      expect(result.pipe).toBeFunc();
    });
    test('2', () => {
      const helpers = require('../../lib/helpers.js');
      helpers.eventEmitter.emit = fn();

      const srcResult = {};
      const options = 'options';
      const options2 = 'options2';
      const preResult = helpers.pipe(srcResult, options);
      const result = preResult.pipe(options2);
      expect(helpers.eventEmitter.emit).toHaveBeenCalledTimes(2);
      expect(helpers.eventEmitter.emit).toHaveBeenCalledWith(ADD_REPLACE_IN_FILES_OPTIONS, options);
      expect(helpers.eventEmitter.emit)
        .toHaveBeenCalledWith(ADD_REPLACE_IN_FILES_OPTIONS, options2);

      expect(result.pipe).toBeFunc();
    });
    test('3', () => {
      const helpers = require('../../lib/helpers.js');
      helpers.eventEmitter.emit = fn();

      const srcResult = {};
      const options = 'options';
      const options2 = 'options2';
      const options3 = 'options3';
      const options4 = 'options4';
      const options5 = 'options5';
      const result = helpers.pipe(srcResult, options)
        .pipe(options2)
        .pipe(options3)
        .pipe(options4)
        .pipe(options5);

      expect(helpers.eventEmitter.emit).toHaveBeenCalledTimes(5);
      expect(helpers.eventEmitter.emit).toHaveBeenCalledWith(ADD_REPLACE_IN_FILES_OPTIONS, options);
      expect(helpers.eventEmitter.emit)
        .toHaveBeenCalledWith(ADD_REPLACE_IN_FILES_OPTIONS, options2);
      expect(helpers.eventEmitter.emit)
        .toHaveBeenCalledWith(ADD_REPLACE_IN_FILES_OPTIONS, options3);
      expect(helpers.eventEmitter.emit)
        .toHaveBeenCalledWith(ADD_REPLACE_IN_FILES_OPTIONS, options4);
      expect(helpers.eventEmitter.emit)
        .toHaveBeenCalledWith(ADD_REPLACE_IN_FILES_OPTIONS, options5);

      expect(result.pipe).toBeFunc();
    });
  });
});
