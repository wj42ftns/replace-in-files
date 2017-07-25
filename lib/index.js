const helpers = require('./helpers');
const validateOptions = require('./validateOptions');
const prepareOptions = require('./prepareOptions');
const getPathsToFiles = require('./getPathsToFiles');
const replaceInFiles = require('./replaceInFiles');

function* replace(srcOptions) {
  validateOptions(srcOptions);
  const options = prepareOptions(srcOptions);
  const paths = yield getPathsToFiles(options);
  yield replaceInFiles(paths, options);
}

function coReplace(options) {
  return helpers.co(replace, options);
}

module.exports = coReplace;
