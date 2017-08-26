const fs = require('fs');
const co = require('co');
const chalk = require('chalk');

exports.fs = {};
exports.fs.writeFile = function (file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, exports.finishPromise(resolve, reject));
  }).catch(exports.handleError);
};
exports.fs.readFile = function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', exports.finishPromise(resolve, reject));
  }).catch(exports.handleError);
};


exports.handleError = function (err) {
  exports.error(err);
};

exports.finishPromise = function (resolve, reject) {
  return (error, data) => {
    if (error) {
      reject(error);
    }

    resolve(data);
  };
};

exports.log = function (message) {
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
  return Promise.resolve(co(function* () {
    return yield func(options);
  }).catch(exports.handleError));
};
