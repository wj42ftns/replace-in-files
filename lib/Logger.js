const _ = require('lodash');

class Logger {
  constructor(options) {
    this.options = options;

    this._changedFiles = {};
  }

  get changedPaths() {
    return _.map(this._changedFiles, (count, path) => path);
  }

  get changedFiles() {
    return this._changedFiles;
  }

  set changedFiles(value) {
    this._changedFiles[value] = this._changedFiles[value]
      ? ++this._changedFiles[value]
      : 1;
  }
}

module.exports = Logger;
