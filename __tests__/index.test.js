/* eslint-disable global-require */

const fs = require('fs-extra');
const resolve = require('path').resolve;


describe('replace-in-files', () => {
  genTest('test work - simple string replace', function* () {
    const replaceInFiles = require('../index.js');

    const regexpPathToFiles = resolve('examples/after/simpleStringReplace.js');
    yield fs.copy(
      resolve('examples/before/simpleStringReplace.js'),
      regexpPathToFiles
    );


    const optionsForRegexpPathToFiles = {};

    const regexp = /const/g;

    function replaceFunction() {
      return 'var';
    }


    replaceInFiles({
      regexpPathToFiles,
      optionsForRegexpPathToFiles,
      regexp,
      replaceFunction,
    });
  });
});
