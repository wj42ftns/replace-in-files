const fs = require('fs');
const glob = require('glob');

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

exports.pGlob = function pGlob(regPath, opt) {
  return new Promise((resolve, reject) => {
    glob(regPath, opt, finishPromise(resolve, reject));
  }).catch(handleError);
};

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
