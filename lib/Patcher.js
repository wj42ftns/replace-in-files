const _ = require('lodash');
const helpers = require('./helpers');
const { CHANGE_FILE } = require('./constants');

class Patcher {
  static prepareReplaceFunction({ to, path, step }) {
    if (_.isFunction(to)) {
      return (...args) => {
        helpers.eventEmitter.emit(CHANGE_FILE, [step, path]);

        return to(...args, path);
      };
    }


    return () => {
      helpers.eventEmitter.emit(CHANGE_FILE, [step, path]);

      return to;
    };
  }

  static replace({ from, data }, preparedReplaceFunction) {
    const updated = data.replace(from, preparedReplaceFunction);
    return updated;
  }

  constructor(options) {
    this.options = options;
  }

  run() {
    const preparedReplaceFunction = Patcher.prepareReplaceFunction(this.options);

    return Patcher.replace(this.options, preparedReplaceFunction);
  }
}

module.exports = Patcher;
