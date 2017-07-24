const _ = require('lodash');
const helpers = require('./helpers');

const defaultOptionsForRegexpPathToFiles = {
  ignore: [
    '**/node_modules/**',
  ],
  nodir: true,
};

function* replaceInFiles(option) {
  const {
    regexpPathToFiles,
    optionsForRegexpPathToFiles,
    regexp,
    replaceFunction,
  } = option;

  const options = _.merge(defaultOptionsForRegexpPathToFiles, optionsForRegexpPathToFiles);

  const paths = yield helpers.pGlob(regexpPathToFiles, options);
  helpers.log(`finded: ${paths.length} paths`);

  yield prepareToRewrite(paths, regexp, replaceFunction, option);
}

function* replaceInFile(path, option) {
  const {
    regexp,
    replaceFunction,
  } = option;
  const data = yield helpers.pReadFile(path);

  const updated = getPreparedToRewrite(path, data, regexp, replaceFunction);

  yield helpers.pWriteFile(path, updated);
}

function getPreparedToRewrite(path, data, regexp, replaceFunction) {
  const updated = data.replace(regexp, replaceFunction);
  return updated;
}

function* prepareToRewrite(paths, regexp, replaceFunction, option) {
  const preparedToWrite = yield _.map(paths, path => replaceInFile(path, option));

  return preparedToWrite;
}

module.exports = replaceInFiles;
