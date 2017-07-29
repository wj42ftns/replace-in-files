/* eslint-disable global-require */

const fs = require('fs-extra');
const resolve = require('path').resolve;

const testFile1 = resolve('examples/before/testFile1.js');

describe('replace-in-files', () => {
  describe('simpleStringReplace', () => {
    genTest('test work - simple string replace', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/simpleStringReplace.js');
      yield fs.copy(testFile1, files);

      const from = /const/g;
      function to() {
        return 'var';
      }

      yield replaceInFiles({
        files,
        from,
        to,
      });

      const result = yield fs.readFile(files, 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/simpleStringReplace.js'), 'utf8');
      expect(result).toBe(expectedResult);
    });
  });
});
