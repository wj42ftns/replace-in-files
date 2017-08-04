/* eslint-disable global-require */

describe('lib/Validator.js', () => {
  describe('testFile1', () => {
    test('constructor', () => {
      const Validator = require('../../lib/Validator.js');
      const options = 'options';

      const validator = new Validator(options);

      expect(validator.options).toBe(options);
    });
    test('run', () => {
      const Validator = require('../../lib/Validator.js');
      Validator.checkAvailabilityRequiredFields = fn();
      Validator.checkTypes = fn();
      const options = 'options';
      const mocThis = { options };

      const validator = new Validator();
      validator.run.call(mocThis);

      expect(Validator.checkAvailabilityRequiredFields).toHaveBeenCalledTimes(1);
      expect(Validator.checkAvailabilityRequiredFields).toHaveBeenCalledWith(options);

      expect(Validator.checkTypes).toHaveBeenCalledTimes(1);
      expect(Validator.checkTypes).toHaveBeenCalledWith(options);
    });
    // genTest('module.exports workflow', function* () {
    //   const wrapper = require('../../lib/Validator.js');
    //
    //   jest.mock('../../lib/ReplaceInFiles');
    //   const ReplaceInFiles = require('../../lib/ReplaceInFiles');
    //   const paths = 'paths';
    //   const moc = { run: pFn(paths) };
    //   ReplaceInFiles.mockImplementation(() => moc);
    //
    //   const options = 'options';
    //   const result = yield wrapper.init(options);
    //
    // expect(ReplaceInFiles).toHaveBeenCalledTimes(1);
    // expect(ReplaceInFiles).toHaveBeenCalledWith(options);
    //
    // expect(moc.run).toHaveBeenCalledTimes(1);
    // expect(moc.run).toHaveBeenCalledWith();
    //
    //   expect(result).toBe(paths);
    // });
  });
});
