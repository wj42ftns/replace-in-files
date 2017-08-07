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
    test('checkAvailabilityRequiredFields', () => {
      const Validator = require('../../lib/Validator.js');
      const config = require('../../lib/config.json');
      config.Validator.requiredOptions = ['foo', 'bar'];
      Validator.checkAvailabilityRequiredField = fn();
      const options = {
        foo: '1',
        bar: '2',
        test: '3',
      };

      Validator.checkAvailabilityRequiredFields(options);

      expect(Validator.checkAvailabilityRequiredField).toHaveBeenCalledTimes(2);
      expect(Validator.checkAvailabilityRequiredField).toHaveBeenCalledWith(options.foo, 'foo');
      expect(Validator.checkAvailabilityRequiredField).toHaveBeenCalledWith(options.bar, 'bar');
    });
    describe('checkAvailabilityRequiredField', () => {
      test('pass 1', () => {
        const Validator = require('../../lib/Validator.js');
        const value = 'exist';
        const key = 'FieldName';

        Validator.checkAvailabilityRequiredField(value, key);
      });
      test('pass 2', () => {
        const Validator = require('../../lib/Validator.js');
        const value = true;
        const key = 'FieldName';

        Validator.checkAvailabilityRequiredField(value, key);
      });
      test('pass 3', () => {
        const Validator = require('../../lib/Validator.js');
        const value = null;
        const key = 'FieldName';

        Validator.checkAvailabilityRequiredField(value, key);
      });
      test('pass 4', () => {
        const Validator = require('../../lib/Validator.js');
        const value = '';
        const key = 'FieldName';

        Validator.checkAvailabilityRequiredField(value, key);
      });
      test('throw', () => {
        const Validator = require('../../lib/Validator.js');
        const value = undefined;
        const key = 'FieldName';

        expect(() => Validator.checkAvailabilityRequiredField(value, key))
          .toThrow('option — "FieldName" is required!');
      });
    });
  });
});
