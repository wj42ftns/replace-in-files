const helpers = require('./helpers');
const globby = require('globby');

function* getPathsToFiles({ regexpPathToFiles, optionsForRegexpPathToFiles }) {
  const paths = yield globby(regexpPathToFiles, optionsForRegexpPathToFiles);
  helpers.log(`finded: ${paths.length} paths`);

  return paths;
}

module.exports = getPathsToFiles;
