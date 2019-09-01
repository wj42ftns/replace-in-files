const co = require('co');
const fs = require('fs');
const { promisify } = require('es6-promisify');
const { EventEmitter } = require('events');

const { ADD_REPLACE_IN_FILES_OPTIONS } = require('./constants');

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

exports.pipe = function (result, options) {
  exports.eventEmitter.emit(ADD_REPLACE_IN_FILES_OPTIONS, options);

  return Object.assign(result, { pipe: (nextOptions) => exports.pipe(result, nextOptions) });
};

exports.delay = () => Promise.resolve();
