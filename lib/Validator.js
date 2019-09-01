const _ = require('lodash');
const config = require('./config.json');
const helpers = require('./helpers');

class Validator {
  static checkAvailabilityRequiredFields(options) {
    _.forEach(config.Validator.requiredOptions, (field) => {
      Validator.checkAvailabilityRequiredField(options[field], field);
    });
  }

  static checkAvailabilityRequiredField(value, key) {
    if (_.isUndefined(value)) {
      throw new Error(`option — "${key}" is required!`);
    }
  }

  static checkTypes(options) {
    _.forEach(config.Validator.checkTypes, (item) => {
      const preparedCheckTypeOptions = _.assign(item, { option: options[item.optionName] });
      Validator.checkType(preparedCheckTypeOptions);
    });
  }

  static checkType(options) {
    const {
      option,
      optionName,
      checks,
    } = options;

    const errorMessage = `option — "${optionName}" should be: ${checks.map((item) => item.slice(2)).join(' or ')}`;
    const isPass = _.some(checks, (check) => _.isUndefined(option) || _[check](option));

    if (!isPass) {
      helpers.handleError(errorMessage);
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
