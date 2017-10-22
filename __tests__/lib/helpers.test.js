/* eslint-disable global-require */

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
    const promisify = require('es6-promisify');

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

      const pFunc = opt => new Promise((resolve) => {
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

      const pFunc = opt => new Promise((resolve, reject) => {
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

      const pFunc = opt => new Promise((resolve, reject) => {
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
      const pFunc = opt => new Promise((resolve) => {
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
      const pFunc = opt => new Promise((resolve, reject) => {
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
});
