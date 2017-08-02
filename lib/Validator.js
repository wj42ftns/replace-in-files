const _ = require('lodash');

class Validator {
  static checkAvailabilityRequiredFields(options) {
    const requiredOptions = [
      'files',
      'from'
    ];

    _.forEach(requiredOptions, (field) => {
      Validator.checkAvailabilityRequiredField(options[field], field);
    });
  }

  static checkAvailabilityRequiredField(value, key) {
    if (_.isUndefined(value)) {
      throw new Error(`option — "${key}" is required!`);
    }
  }

  static checkTypes(options) {
    const {
      files,
      optionsForFiles,
      from,
      to,
      defaultEncoding,
    } = options;

    Validator.checkType({
      option: files,
      optionName: 'files',
      checks: ['isArray', 'isString']
    });

    Validator.checkType({
      option: from,
      optionName: 'from',
      checks: ['isRegExp', 'isString']
    });

    Validator.checkType({
      option: optionsForFiles,
      optionName: 'optionsForFiles',
      checks: ['isObject']
    });

    Validator.checkType({
      option: to,
      optionName: 'to',
      checks: ['isFunction', 'isString']
    });

    Validator.checkType({
      option: defaultEncoding,
      optionName: 'defaultEncoding',
      checks: ['isString', 'isNull']
    });
  }

  static checkType(options) {
    const {
      option,
      optionName,
      checks,
    } = options;

    const errorMessage = `option — "${optionName}" should be: ${checks.map(item => item.slice(2)).join(' or ')}`;
    const isPass = _.some(checks, check => _.isUndefined(option) || _[check](option));

    if (!isPass) {
      throw new Error(errorMessage);
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
