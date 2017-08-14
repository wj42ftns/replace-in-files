/* eslint-disable global-require */

describe('lib/Patcher.js', () => {
  test('constructor', () => {
    const Patcher = require('../../lib/Patcher.js');
    const options = 'options';
    const logger = 'logger';

    const patcher = new Patcher(options, logger);

    expect(patcher.options).toBe(options);
    expect(patcher.logger).toBe(logger);
  });
  test('run', () => {
    const Patcher = require('../../lib/Patcher.js');
    const preparedReplaceFunction = () => 'preparedReplaceFunction';
    Patcher.prepareReplaceFunction = fn(preparedReplaceFunction);
    const mocResult = 'mocResult';
    Patcher.replace = fn(mocResult);
    const options = 'options';
    const logger = 'logger';
    const mocThis = { options, logger };

    const patcher = new Patcher();
    const result = patcher.run.call(mocThis);

    expect(Patcher.prepareReplaceFunction).toHaveBeenCalledTimes(1);
    expect(Patcher.prepareReplaceFunction).toHaveBeenCalledWith(options, logger);

    expect(Patcher.replace).toHaveBeenCalledTimes(1);
    expect(Patcher.replace).toHaveBeenCalledWith(options, preparedReplaceFunction);

    expect(result).toBe(mocResult);
  });
  // @TODO prepareReplaceFunction
  test('replace', () => {
    const Patcher = require('../../lib/Patcher.js');
    const preparedReplaceFunction = () => 'preparedReplaceFunction';
    const updated = 'updated';
    const options = {
      from: 'from',
      data: {
        replace: fn(updated)
      }
    };
    const result = Patcher.replace(options, preparedReplaceFunction);

    expect(options.data.replace).toHaveBeenCalledTimes(1);
    expect(options.data.replace).toHaveBeenCalledWith(options.from, preparedReplaceFunction);

    expect(result).toBe(updated);
  });
});
