/* eslint-disable global-require */

const fs = require('fs-extra');
const resolve = require('path').resolve;

const testFile1 = resolve('examples/before/testFile1.js');

describe('replace-in-files', () => {
  describe('simpleStringReplace', () => {
    genTest('test work - simple string replace', function* () {
      const replaceInFiles = require('../index.js');
      const regexpPathToFiles = resolve('examples/generatedAfter/simpleStringReplace.js');
      yield fs.copy(testFile1, regexpPathToFiles);

      const optionsForRegexpPathToFiles = {};
      const regexp = /const/g;
      function replaceFunction() {
        return 'var';
      }

      yield replaceInFiles({
        regexpPathToFiles,
        optionsForRegexpPathToFiles,
        regexp,
        replaceFunction,
      });

      const result = yield fs.readFile(regexpPathToFiles, 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/simpleStringReplace.js'), 'utf8');
      expect(result).toBe(expectedResult);
    });
  });
});
