const co = require('co');
const fs = require('fs');
const promisify = require('es6-promisify');

exports.co = function (func, options) {
  return Promise.resolve(co(function* () {
    return yield func(options);
  }).catch(exports.handleError));
};

exports.fs = {
  writeFile: promisify(fs.writeFile),
  readFile: promisify(fs.readFile),
  stat: promisify(fs.stat),
};

exports.handleError = function (err) {
  throw new Error(err);
};
