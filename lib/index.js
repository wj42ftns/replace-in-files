const co = require('co');
const helpers = require('./helpers');
const replaceInFiles = require('./replaceInFiles.js');

function replace(options) {
  co(function* () {
    // validateOptions(options);
    // const preparedOptions = prepareOptions(options);
    // const pathToFiles = getPathToFiles();
    yield replaceInFiles(options);
  }).catch(helpers.handleError);
}

module.exports = replace;
