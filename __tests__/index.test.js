/* eslint-disable global-require */

const fs = require('fs-extra');
const { resolve } = require('path');

const testFile1 = resolve('examples/before/testFile1.js');
const testFile2 = resolve('examples/before/testFile2.js');

describe('outer work replace-in-files', () => {
  describe('testFile1', () => {
    genTest('"from" - Regexp and "to" - Function', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/testOptions.js');
      yield fs.copy(testFile1, files);

      const from = /const/g;
      function to() {
        return 'var';
      }

      const options = {
        files,
        from,
        to,
      };
      const result = yield replaceInFiles(options);

      const fsResult = yield fs.readFile(files, 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testOptions.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(3);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testOptions.js')]).toBe(7);
      expect(result.replaceInFilesOptions).toEqual([options]);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/testOptions.js'));
    });
    genTest('"from" - Regexp and "to" - Function with inserts', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/testReplaceFunctionWithInserts.js');
      yield fs.copy(testFile1, files);

      const from = /(const log = )({)(});/g;
      function to(match, p1, p2, p3) {
        return `${p1}${p2} foo: 'bar' ${p3};`;
      }

      const options = {
        files,
        from,
        to,
      };
      const result = yield replaceInFiles(options);

      const fsResult = yield fs.readFile(files, 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testReplaceFunctionWithInserts.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(3);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testReplaceFunctionWithInserts.js')]).toBe(1);
      expect(result.replaceInFilesOptions).toEqual([options]);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/testReplaceFunctionWithInserts.js'));
    });
    genTest('"from" - Regexp and "to" - String with inserts', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/testReplaceFunctionWithInserts.js');
      yield fs.copy(testFile1, files);

      const from = /(const log = )({)(});/g;
      const to = "$1$2 foo: 'bar' $3;";

      const options = {
        files,
        from,
        to,
      };
      const result = yield replaceInFiles(options);

      const fsResult = yield fs.readFile(files, 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testReplaceFunctionWithInserts.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(3);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testReplaceFunctionWithInserts.js')]).toBe(1);
      expect(result.replaceInFilesOptions).toEqual([options]);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/testReplaceFunctionWithInserts.js'));
    });
    genTest('"to" - String', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/testOptions.js');
      yield fs.copy(testFile1, files);

      const from = /const/g;
      const to = 'var';

      const options = {
        files,
        from,
        to,
      };
      const result = yield replaceInFiles(options);

      const fsResult = yield fs.readFile(files, 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testOptions.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(3);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testOptions.js')]).toBe(7);
      expect(result.replaceInFilesOptions).toEqual([options]);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/testOptions.js'));
    });
    genTest('"to" - undefined', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/testOptions.js');
      yield fs.copy(testFile1, files);

      const from = /const/g;

      const options = {
        files,
        from,
      };
      const result = yield replaceInFiles(options);

      const fsResult = yield fs.readFile(resolve('examples/generatedAfter/testOptions.js'), 'utf8');
      const expectedResult = yield fs.readFile(testFile1, 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(3);
      expect(result.replaceInFilesOptions).toEqual([options]);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testOptions.js')]).toBe(7);
      expect(result.replaceInFilesOptions).toEqual([options]);
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

      const options = {
        files,
        from,
        to,
        onlyFindPathsWithoutReplace,
      };
      const result = yield replaceInFiles(options);

      const fsResult = yield fs.readFile(resolve('examples/generatedAfter/testOptions.js'), 'utf8');
      const expectedResult = yield fs.readFile(testFile1, 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(3);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testOptions.js')]).toBe(7);
      expect(result.replaceInFilesOptions).toEqual([options]);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/testOptions.js'));
    });
    genTest('"from" - String', function* () {
      const replaceInFiles = require('../index.js');
      const files = resolve('examples/generatedAfter/fromIsString.js');
      yield fs.copy(testFile1, files);

      const from = 'const';
      const to = 'var';

      const options = {
        files,
        from,
        to,
      };
      yield replaceInFiles(options);

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

      const options = {
        files,
        from,
        to,
        onlyFindPathsWithoutReplace,
      };
      const result = yield replaceInFiles(options);

      const fsResult = yield fs.readFile(resolve('examples/generatedAfter/fromIsString.js'), 'utf8');
      const expectedResult = yield fs.readFile(testFile1, 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(3);
      expect(result.replaceInFilesOptions).toEqual([options]);
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

      const options = {
        files,
        from,
        to,
      };
      const result = yield replaceInFiles(options);

      const fsResult = yield fs.readFile(files[0], 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testOptions.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(3);
      expect(result.replaceInFilesOptions).toEqual([options]);
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

      const options = {
        files,
        from,
        to,
        replaceFileOnlyIfMatchRegxpInFile,
      };
      const result = yield replaceInFiles(options);

      const fsResult = yield fs.readFile(files[0], 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testOptions.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(3);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testOptions.js')]).toBe(7);
      expect(result.replaceInFilesOptions).toEqual([options]);
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

      const options = {
        files,
        from,
        to,
        replaceFileOnlyIfMatchRegxpInFile,
      };
      const result = yield replaceInFiles(options);

      const fsResult = yield fs.readFile(files[0], 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testOptions.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(3);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testOptions.js')]).toBe(7);
      expect(result.replaceInFilesOptions).toEqual([options]);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/testOptions.js'));
    });
  });
  describe('testFile2', () => {
    genTest('sequentially replaces', function* () {
      const replaceInFiles = require('../index.js');
      const files = [
        resolve('examples/generatedAfter/testSequentially.js')
      ];
      yield fs.copy(testFile2, files[0]);

      const mainSettings = {
        files,
        from: 'log',
        to: 'myLog',
      };

      const result = yield replaceInFiles(mainSettings)
        .pipe({ from: 'file', to: 'myFile' })
        .pipe({ from: 'created2', to: 'test42' })
        .pipe({ from: 'created1', to: 'test79' })
        .pipe({ from: 'console.log(created2);', to: 'alert("worked!")' })
        .pipe({ from: /test/g, to: 'TEST' });

      const fsResult = yield fs.readFile(files[0], 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testSequentially.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(3);
      expect(result.replaceInFilesOptions).toEqual([
        mainSettings,
        { from: 'file', to: 'myFile' },
        { from: 'created2', to: 'test42' },
        { from: 'created1', to: 'test79' },
        { from: 'console.log(created2);', to: 'alert("worked!")' },
        { from: /test/g, to: 'TEST' }
      ]);
      expect(result.countOfMatchesByPaths[0][resolve('examples/generatedAfter/testSequentially.js')]).toBe(1);
      expect(result.countOfMatchesByPaths[1][resolve('examples/generatedAfter/testSequentially.js')]).toBe(1);
      expect(result.countOfMatchesByPaths[2][resolve('examples/generatedAfter/testSequentially.js')]).toBe(1);
      expect(result.countOfMatchesByPaths[3][resolve('examples/generatedAfter/testSequentially.js')]).toBe(1);
      expect(result.countOfMatchesByPaths[4][resolve('examples/generatedAfter/testSequentially.js')]).toBe(1);
      expect(result.countOfMatchesByPaths[5][resolve('examples/generatedAfter/testSequentially.js')]).toBe(2);
      expect(result.paths.length).toBe(1);
      expect(result.paths[0]).toBe(resolve('examples/generatedAfter/testSequentially.js'));
    });
    genTest('sequentially replaces if not replaces in first iteration', function* () {
      const replaceInFiles = require('../index.js');
      const files = [
        resolve('examples/generatedAfter/testCreatePathsInSequentially.js')
      ];
      yield fs.copy(testFile2, files[0]);

      const mainSettings = {
        files,
        from: 'SHOULD_NOT_FIND_THIS_STRING',
        to: 'myNewString (should not replace)',
      };

      const result = yield replaceInFiles(mainSettings)
        .pipe({ from: 'file', to: 'myFile' })
        .pipe({ from: 'created2', to: 'test42' })
        .pipe({ from: 'created1', to: 'test79' })
        .pipe({ from: 'console.log(created2);', to: 'alert("worked!")' })
        .pipe({ from: /test/g, to: 'TEST' });

      const fsResult = yield fs.readFile(files[0], 'utf8');
      const expectedResult = yield fs.readFile(resolve('examples/after/testCreatePathsInSequentially.js'), 'utf8');
      expect(fsResult).toBe(expectedResult);
      expect(result).toBeObj();
      expect(Object.keys(result).length).toBe(3);
      expect(result.replaceInFilesOptions).toEqual([
        mainSettings,
        { from: 'file', to: 'myFile' },
        { from: 'created2', to: 'test42' },
        { from: 'created1', to: 'test79' },
        { from: 'console.log(created2);', to: 'alert("worked!")' },
        { from: /test/g, to: 'TEST' }
      ]);
      expect(result.countOfMatchesByPaths[0]).toEqual({});
      expect(result.countOfMatchesByPaths[1][resolve('examples/generatedAfter/testCreatePathsInSequentially.js')]).toBe(1);
      expect(result.countOfMatchesByPaths[2][resolve('examples/generatedAfter/testCreatePathsInSequentially.js')]).toBe(1);
      expect(result.countOfMatchesByPaths[3][resolve('examples/generatedAfter/testCreatePathsInSequentially.js')]).toBe(1);
      expect(result.countOfMatchesByPaths[4][resolve('examples/generatedAfter/testCreatePathsInSequentially.js')]).toBe(1);
      expect(result.countOfMatchesByPaths[5][resolve('examples/generatedAfter/testCreatePathsInSequentially.js')]).toBe(2);
      expect(result.paths.length).toBe(1);
      expect(result.paths).toEqual([resolve('examples/generatedAfter/testCreatePathsInSequentially.js')]);
    });
  });
});
