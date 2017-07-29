const _ = require('lodash');

class Validator {
  static checkAvailabilityRequiredFields(options) {
    const { regexpPathToFiles, regexp } = options;

    if (!regexpPathToFiles) {
      throw new Error('option — "regexpPathToFiles" is required!');
    }
    if (!regexp) {
      throw new Error('option — "regexp" is required!');
    }
  }

  static checkTypes(options) {
    const {
      regexpPathToFiles,
      optionsForRegexpPathToFiles,
      regexp,
      replaceFunction,
    } = options;

    if (!_.isArray(regexpPathToFiles) && !_.isString(regexpPathToFiles)) {
      throw new Error('option — "regexpPathToFiles" should be: String or Array');
    }

    if (!_.isRegExp(regexp) && !_.isString(regexp)) {
      throw new Error('option — "regexp" should be: Regexp or String');
    }

    if (optionsForRegexpPathToFiles && !_.isObject(optionsForRegexpPathToFiles)) {
      throw new Error('option — "optionsForRegexpPathToFiles" should be: Object');
    }

    if (replaceFunction && !_.isFunction(replaceFunction) && !_.isString(replaceFunction)) {
      throw new Error('option — "replaceFunction" should be: Function or String');
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
