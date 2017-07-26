const fs = require('fs');
const co = require('co');

exports.handleError = handleError;
function handleError(error) {
  console.error(error);
}

exports.finishPromise = finishPromise;
function finishPromise(resolve, reject) {
  return (error, data) => {
    if (error) {
      reject(error);
    }

    resolve(data);
  };
}

exports.pReadFile = function pReadFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', finishPromise(resolve, reject));
  }).catch(handleError);
};

exports.pWriteFile = function pWriteFile(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, finishPromise(resolve, reject));
  }).catch(handleError);
};

exports.log = function log(message) {
  console.log(message);
};

exports.co = function (func, options) {
  co(function* () {
    yield func(options);
  }).catch(handleError);
};
