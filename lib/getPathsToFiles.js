const helpers = require('./helpers');
const globby = require('globby');
const chalk = require('chalk');

function* getPathsToFiles({ regexpPathToFiles, optionsForRegexpPathToFiles }) {
  const paths = yield globby(regexpPathToFiles, optionsForRegexpPathToFiles);

  logFindedPaths(paths.length);

  return paths;
}

function logFindedPaths(pathsLength) {
  return pathsLength
    ? helpers.log(`finded: ${chalk.cyan(pathsLength)} paths`)
    : helpers.warning(`finded: ${pathsLength} paths`);
}

module.exports = getPathsToFiles;
