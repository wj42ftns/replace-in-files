/* eslint-disable global-require */

const fs = require('fs-extra');
const resolve = require('path').resolve;

const testFile1 = resolve('examples/before/testFile1.js');

describe('replace-in-files', () => {
  describe('testFile1', () => {
    genTest('"from" - Regexp and to" - Function', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/testOptions.js');
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
      const expectedResult = yield fs.readFile(resolve('examples/after/testOptions.js'), 'utf8');
      expect(result).toBe(expectedResult);
    });
    genTest('"to" - String', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/testOptions.js');
      yield fs.copy(testFile1, files);

      const from = /const/g;
      const to = 'var';

      yield replaceInFiles({
        files,
        from,
        to,
      });

      const result = yield fs.readFile(files, 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testOptions.js'), 'utf8');
      expect(result).toBe(expectedResult);
    });
    genTest('"from" - String', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/fromIsString.js');
      yield fs.copy(testFile1, files);

      const from = 'const';
      const to = 'var';

      yield replaceInFiles({
        files,
        from,
        to,
      });

      const result = yield fs.readFile(files, 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/fromIsString.js'), 'utf8');
      expect(result).toBe(expectedResult);
    });
    genTest('"files" - Array', function* () {
      const replaceInFiles = require('../index.js');
      const files = [
        resolve('examples/generatedAfter/testOptions.js')
      ];
      yield fs.copy(testFile1, files[0]);

      const from = /const/g;
      const to = 'var';

      yield replaceInFiles({
        files,
        from,
        to,
      });

      const result = yield fs.readFile(files[0], 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testOptions.js'), 'utf8');
      expect(result).toBe(expectedResult);
    });
  });
});
