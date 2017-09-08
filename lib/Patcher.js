const { isFunction } = require('lodash');

class Patcher {
  static prepareReplaceFunction({ to, path }, logger) {
    if (isFunction(to)) {
      return (...args) => {
        // eslint-disable-next-line no-param-reassign
        logger.countOfMatchesByPaths = path;

        return to(...args, path);
      };
    }


    return () => {
      // eslint-disable-next-line no-param-reassign
      logger.countOfMatchesByPaths = path;

      return to;
    };
  }

  static replace({ from, data }, preparedReplaceFunction) {
    const updated = data.replace(from, preparedReplaceFunction);
    return updated;
  }

  constructor(options, logger) {
    this.options = options;
    this.logger = logger;
  }

  run() {
    const preparedReplaceFunction = Patcher.prepareReplaceFunction(this.options, this.logger);

    return Patcher.replace(this.options, preparedReplaceFunction);
  }
}

module.exports = Patcher;
