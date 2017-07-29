// const _ = require('lodash');
// const chalk = require('chalk');
// const helpers = require('./helpers');
//
// const fs = helpers.fs;
//
// function* replaceInFiles(paths, { from, to }) {
//   const logs = {};
//   yield _.map(paths, path => replaceInFile(path, from, to, logs));
//   showReplacedResult(logs);
// }
//
// function* replaceInFile(path, from, to, accumulateLogs) {
//   const data = yield fs.readFile(path, 'utf8');
//
//   const updated = patch(path, data, from, to, accumulateLogs);
//
//   yield fs.writeFile(path, updated);
// }
//
// function patch(path, data, from, to, accumulateLogs) {
//   const preparedReplaceFunction = prepareReplaceFunction(to, path, accumulateLogs);
//   const updated = data.replace(from, preparedReplaceFunction);
//   return updated;
// }
//
// function prepareReplaceFunction(to, path, accumulateLogs) {
//   return (...args) => {
//     // eslint-disable-next-line no-param-reassign
//     accumulateLogs[path] = accumulateLogs[path] ? ++accumulateLogs[path] : 1;
//
//     return to(...args, path);
//   };
// }
//
// function showReplacedResult(logs) {
//   const logsLength = Object.keys(logs).length;
//   helpers.log('\nlogs of replaces:');
//
//   if (logsLength) {
//     _.forEach(logs, (countOfReplace, path) => (
//       helpers.log(`${chalk.cyan(path)}    |    ${chalk.green(countOfReplace)}`)
//     ));
//   } else {
//     helpers.warning('without replaces');
//   }
// }
//
// module.exports = replaceInFiles;
