const co = require('co');
const chalk = require('chalk');

exports.handleError = handleError;
function handleError(err) {
  exports.error(err);
}

// exports.finishPromise = finishPromise;
// function finishPromise(resolve, reject) {
//   return (error, data) => {
//     if (error) {
//       reject(error);
//     }
//
//     resolve(data);
//   };
// }
//
// exports.pWriteFile = function pWriteFile(file, data) {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(file, data, finishPromise(resolve, reject));
//   }).catch(handleError);
// };

exports.log = function log(message) {
  console.log(message);
};
exports.error = function (message) {
  const error = chalk.bold.red;
  console.error(error(message));
};
exports.warning = function (message) {
  const warning = chalk.keyword('orange');
  console.warn(warning(message));
};

exports.co = function (func, options) {
  co(function* () {
    yield func(options);
  }).catch(handleError);
};
