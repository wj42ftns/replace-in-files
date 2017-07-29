const _ = require('lodash');

class Validator {
  static checkAvailabilityRequiredFields(options) {
    const { files, from } = options;

    if (!files) {
      throw new Error('option — "files" is required!');
    }
    if (!from) {
      throw new Error('option — "from" is required!');
    }
  }

  static checkTypes(options) {
    const {
      files,
      optionsForFiles,
      from,
      to,
    } = options;

    if (!_.isArray(files) && !_.isString(files)) {
      throw new Error('option — "files" should be: String or Array');
    }

    if (!_.isRegExp(from) && !_.isString(from)) {
      throw new Error('option — "from" should be: Regexp or String');
    }

    if (optionsForFiles && !_.isObject(optionsForFiles)) {
      throw new Error('option — "optionsForFiles" should be: Object');
    }

    if (to && !_.isFunction(to) && !_.isString(to)) {
      throw new Error('option — "to" should be: Function or String');
    }
  }

  constructor(options) {
    this.options = options;
  }

  run() {
    Validator.checkAvailabilityRequiredFields(this.options);
    Validator.checkTypes(this.options);
  }
}

module.exports = Validator;
