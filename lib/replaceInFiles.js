const _ = require('lodash');
const helpers = require('./helpers');

function* replaceInFiles(paths, { regexp, replaceFunction }) {
  yield _.map(paths, path => replaceInFile(path, regexp, replaceFunction));
}

function* replaceInFile(path, regexp, replaceFunction) {
  const data = yield helpers.pReadFile(path);
  const updated = patch(path, data, regexp, replaceFunction);
  yield helpers.pWriteFile(path, updated);
}

function patch(path, data, regexp, replaceFunction) {
  const updated = data.replace(regexp, replaceFunction);
  return updated;
}

module.exports = replaceInFiles;
