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

    if (_.isString(to) && /\$\d+/.test(to)) {
      return (match, ...rest) => {
        helpers.eventEmitter.emit(CHANGE_FILE, [step, path]);
        const withoutOffsetAndStringArguments = 2;
        const groupsInArgs = [
          ...rest.slice(0, -withoutOffsetAndStringArguments)
        ];
        const allUsedGroups = [...to.matchAll(/\$\d+/g)].map(([value]) => Number(value.slice(1)));
        const maxGroup = Math.max(...allUsedGroups);
        const preparedGroupArgs = [
          ...groupsInArgs,
          Array.from({ length: maxGroup - groupsInArgs.length }).map(
            (unused, index) => `$${index + 1}`
          )
        ].reduce(
          (accum, current, index) => ({
            ...accum,
            [`$${index + 1}`]: current
          }),
          {}
        );

        return to.replace(
          /\$\d+/g,
          (insert) => preparedGroupArgs[insert] || insert
        );
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
