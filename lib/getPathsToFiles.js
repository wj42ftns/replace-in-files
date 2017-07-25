const helpers = require('./helpers');

function* getPathsToFiles({ regexpPathToFiles, optionsForRegexpPathToFiles }) {
  const paths = yield helpers.pGlob(regexpPathToFiles, optionsForRegexpPathToFiles);
  helpers.log(`finded: ${paths.length} paths`);

  return paths;
}

module.exports = getPathsToFiles;
