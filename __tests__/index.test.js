/* eslint-disable global-require */

const fs = require('fs-extra');
const resolve = require('path').resolve;

const testFile1 = resolve('examples/before/testFile1.js');

describe('outer work replace-in-files', () => {
  describe('testFile1', () => {
    genTest('"from" - Regexp and to" - Function', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/testOptions.js');
      yield fs.copy(testFile1, files);

      const from = /const/g;
      function to() {
        return 'var';
      }

      const result = yield replaceInFiles({
        files,
        from,
        to,
      });

      const fsResult = yield fs.readFile(files, 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testOptions.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(2);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testOptions.js')]).toBe(7);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/testOptions.js'));
    });
    genTest('"to" - String', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/testOptions.js');
      yield fs.copy(testFile1, files);

      const from = /const/g;
      const to = 'var';

      const result = yield replaceInFiles({
        files,
        from,
        to,
      });

      const fsResult = yield fs.readFile(files, 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testOptions.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(2);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testOptions.js')]).toBe(7);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/testOptions.js'));
    });
    genTest('"to" - undefined', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/testOptions.js');
      yield fs.copy(testFile1, files);

      const from = /const/g;

      const result = yield replaceInFiles({
        files,
        from,
      });

      const fsResult = yield fs.readFile(resolve('examples/generatedAfter/testOptions.js'), 'utf8');
      const expectedResult = yield fs.readFile(testFile1, 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(2);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testOptions.js')]).toBe(7);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/testOptions.js'));
    });
    genTest('"to" - exist and has option onlyFindPathsWithoutReplace', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/testOptions.js');
      yield fs.copy(testFile1, files);

      const from = /const/g;
      const to = 'var';
      const onlyFindPathsWithoutReplace = true;

      const result = yield replaceInFiles({
        files,
        from,
        to,
        onlyFindPathsWithoutReplace,
      });

      const fsResult = yield fs.readFile(resolve('examples/generatedAfter/testOptions.js'), 'utf8');
      const expectedResult = yield fs.readFile(testFile1, 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(2);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testOptions.js')]).toBe(7);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/testOptions.js'));
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

      const fsResult = yield fs.readFile(files, 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/fromIsString.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
    });
    genTest('"from" - String - with onlyFindPathsWithoutReplace option', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/fromIsString.js');
      yield fs.copy(testFile1, files);

      const from = 'const';
      const to = 'var';
      const onlyFindPathsWithoutReplace = true;

      const result = yield replaceInFiles({
        files,
        from,
        to,
        onlyFindPathsWithoutReplace,
      });

      const fsResult = yield fs.readFile(resolve('examples/generatedAfter/fromIsString.js'), 'utf8');
      const expectedResult = yield fs.readFile(testFile1, 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(2);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/fromIsString.js')]).toBe(7);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/fromIsString.js'));
    });
    genTest('"files" - Array', function* () {
      const replaceInFiles = require('../index.js');
      const files = [
        resolve('examples/generatedAfter/testOptions.js')
      ];
      yield fs.copy(testFile1, files[0]);

      const from = /const/g;
      const to = 'var';

      const result = yield replaceInFiles({
        files,
        from,
        to,
      });

      const fsResult = yield fs.readFile(files[0], 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testOptions.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(2);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testOptions.js')]).toBe(7);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/testOptions.js'));
    });
    genTest('"replaceFileOnlyIfMatchRegxpInFile" - if regexp', function* () {
      const replaceInFiles = require('../index.js');
      const files = [
        resolve('examples/generatedAfter/testOptions.js')
      ];
      yield fs.copy(testFile1, files[0]);

      const from = /const/g;
      const to = 'var';
      const replaceFileOnlyIfMatchRegxpInFile = /const log = {};/;

      const result = yield replaceInFiles({
        files,
        from,
        to,
        replaceFileOnlyIfMatchRegxpInFile,
      });

      const fsResult = yield fs.readFile(files[0], 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testOptions.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(2);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testOptions.js')]).toBe(7);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/testOptions.js'));
    });
    genTest('"replaceFileOnlyIfMatchRegxpInFile" - if string', function* () {
      const replaceInFiles = require('../index.js');
      const files = [
        resolve('examples/generatedAfter/testOptions.js')
      ];
      yield fs.copy(testFile1, files[0]);

      const from = /const/g;
      const to = 'var';
      const replaceFileOnlyIfMatchRegxpInFile = 'const log = {};';

      const result = yield replaceInFiles({
        files,
        from,
        to,
        replaceFileOnlyIfMatchRegxpInFile,
      });

      const fsResult = yield fs.readFile(files[0], 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testOptions.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(2);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testOptions.js')]).toBe(7);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/testOptions.js'));
    });
  });
});
