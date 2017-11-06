const { CHANGE_FILE } = require('../../lib/constants');

describe('lib/Patcher.js', () => {
  test('constructor', () => {
    const Patcher = require('../../lib/Patcher.js');
    const options = 'options';

    const patcher = new Patcher(options);

    expect(patcher.options).toBe(options);
  });
  test('run', () => {
    const Patcher = require('../../lib/Patcher.js');
    const preparedReplaceFunction = () => 'preparedReplaceFunction';
    Patcher.prepareReplaceFunction = fn(preparedReplaceFunction);
    const mocResult = 'mocResult';
    Patcher.replace = fn(mocResult);
    const options = 'options';
    const mocThis = { options };

    const patcher = new Patcher();
    const result = patcher.run.call(mocThis);

    expect(Patcher.prepareReplaceFunction).toHaveBeenCalledTimes(1);
    expect(Patcher.prepareReplaceFunction).toHaveBeenCalledWith(options);

    expect(Patcher.replace).toHaveBeenCalledTimes(1);
    expect(Patcher.replace).toHaveBeenCalledWith(options, preparedReplaceFunction);

    expect(result).toBe(mocResult);
  });
  describe('prepareReplaceFunction', () => {
    test('to is not function', () => {
      const Patcher = require('../../lib/Patcher.js');
      jest.mock('../../lib/helpers');
      const helpers = require('../../lib/helpers');
      helpers.eventEmitter.emit = fn();
      const path = 'path';
      const step = 'step';
      const to = 'string';
      const options = {
        to,
        path,
        step,
      };

      const result = Patcher.prepareReplaceFunction(options)();

      expect(helpers.eventEmitter.emit).toHaveBeenCalledTimes(1);
      expect(helpers.eventEmitter.emit).toHaveBeenCalledWith(CHANGE_FILE, [step, path]);

      expect(result).toBe(to);
    });
    test('to is function', () => {
      const Patcher = require('../../lib/Patcher.js');
      jest.mock('../../lib/helpers');
      const helpers = require('../../lib/helpers');
      helpers.eventEmitter.emit = fn();
      const path = 'path';
      const step = 'step';
      const mocResult = 'mocResult';
      const to = fn(mocResult);
      const options = {
        to,
        path,
        step,
      };
      const arg1 = 'arg1';
      const arg2 = 'arg2';

      const result = Patcher.prepareReplaceFunction(options)(arg1, arg2);

      expect(to).toHaveBeenCalledTimes(1);
      expect(to).toHaveBeenCalledWith(arg1, arg2, path);
      expect(helpers.eventEmitter.emit).toHaveBeenCalledTimes(1);
      expect(helpers.eventEmitter.emit).toHaveBeenCalledWith(CHANGE_FILE, [step, path]);
      expect(result).toBe(mocResult);
    });
  });
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
