const _ = require('lodash');

const requiredOptions = [
  'regexpPathToFiles',
  'regexp',
  'replaceFunction',
];

function validateOptions(options) {
  checkAvailabilityRequiredFields(options);
  checkTypes(options);
}

function checkAvailabilityRequiredFields(options) {
  _.forEach(requiredOptions, (field) => {
    if (!options[field]) {
      throw new Error(`option — "${field}" is required!`);
    }
  });
}

function checkTypes({
  regexpPathToFiles,
  optionsForRegexpPathToFiles,
  regexp,
  replaceFunction,
}) {
  if (!_.isArray(regexpPathToFiles) && !_.isString(regexpPathToFiles)) {
    throw new Error('option — "regexpPathToFiles" should be: String');
  }

  if (!_.isObject(optionsForRegexpPathToFiles)) {
    throw new Error('option — "optionsForRegexpPathToFiles" should be: Object');
  }

  if (!_.isRegExp(regexp) && !_.isString(regexp)) {
    throw new Error('option — "regexp" should be: Regexp or String');
  }

  if (!_.isFunction(replaceFunction) && !_.isString(replaceFunction)) {
    throw new Error('option — "replaceFunction" should be: Function or String');
  }
}


module.exports = validateOptions;
