const co = require('co');
const fs = require('fs');
const promisify = require('es6-promisify');
const EventEmitter = require('events').EventEmitter;

exports.co = function (func, options) {
  return Promise.resolve(co(function* () {
    return yield func(options);
  }).catch(exports.handleError));
};

exports.fs = {
  readFile: promisify(fs.readFile),
  stat: promisify(fs.stat),
  writeFile: promisify(fs.writeFile),
};

exports.handleError = function (err) {
  throw new Error(err);
};

exports.eventEmitter = new EventEmitter();
