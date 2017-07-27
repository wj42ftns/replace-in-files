const _ = require('lodash');
const chalk = require('chalk');
const helpers = require('./helpers');
const fs = require('fs-extra');

function* replaceInFiles(paths, { regexp, replaceFunction }) {
  const logs = {};
  yield _.map(paths, path => replaceInFile(path, regexp, replaceFunction, logs));
  showReplacedResult(logs);
}

function* replaceInFile(path, regexp, replaceFunction, accumulateLogs) {
  const data = yield fs.readFile(path, 'utf8');

  const updated = patch(path, data, regexp, replaceFunction, accumulateLogs);

  yield fs.writeFile(path, updated);
}

function patch(path, data, regexp, replaceFunction, accumulateLogs) {
  const preparedReplaceFunction = prepareReplaceFunction(replaceFunction, path, accumulateLogs);
  const updated = data.replace(regexp, preparedReplaceFunction);
  return updated;
}

function prepareReplaceFunction(replaceFunction, path, accumulateLogs) {
  return (...args) => {
    // eslint-disable-next-line no-param-reassign
    accumulateLogs[path] = accumulateLogs[path] ? ++accumulateLogs[path] : 1;

    return replaceFunction(...args, path);
  };
}

function showReplacedResult(logs) {
  const logsLength = Object.keys(logs).length;
  helpers.log('\nlogs of replaces:');

  if (logsLength) {
    _.forEach(logs, (countOfReplace, path) => (
      helpers.log(`${chalk.cyan(path)}    |    ${chalk.green(countOfReplace)}`)
    ));
  } else {
    helpers.warning('without replaces');
  }
}

module.exports = replaceInFiles;
