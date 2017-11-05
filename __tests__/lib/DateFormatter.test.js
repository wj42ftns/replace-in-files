const MockDate = require('mockdate');

describe('lib/DateFormatter.js', () => {
  test('constructor', () => {
    const DateFormatter = require('../../lib/DateFormatter.js');
    const options = 'options';

    const dateFormatter = new DateFormatter(options);

    expect(dateFormatter.options).toBe(options);
  });
  test('run', () => {
    const DateFormatter = require('../../lib/DateFormatter.js');
    const formatedDate = 'formatedDate';
    DateFormatter.formating = fn(formatedDate);

    const data = 'data';
    const options = { data };
    const mocThis = { options };

    const dateFormatter = new DateFormatter();
    dateFormatter.run.call(mocThis);

    expect(DateFormatter.formating).toHaveBeenCalledTimes(1);
    expect(DateFormatter.formating).toHaveBeenCalledWith({ data });
  });
  test('formatSameLength', () => {
    const DateFormatter = require('../../lib/DateFormatter.js');

    let result;
    result = DateFormatter.formatSameLength('1');
    expect(result).toBe('01');
    result = DateFormatter.formatSameLength('2');
    expect(result).toBe('02');
    result = DateFormatter.formatSameLength('3');
    expect(result).toBe('03');
    result = DateFormatter.formatSameLength('4');
    expect(result).toBe('04');
    result = DateFormatter.formatSameLength('5');
    expect(result).toBe('05');
    result = DateFormatter.formatSameLength('6');
    expect(result).toBe('06');
    result = DateFormatter.formatSameLength('7');
    expect(result).toBe('07');
    result = DateFormatter.formatSameLength('8');
    expect(result).toBe('08');
    result = DateFormatter.formatSameLength('9');
    expect(result).toBe('09');
    result = DateFormatter.formatSameLength('10');
    expect(result).toBe('10');
    result = DateFormatter.formatSameLength('23');
    expect(result).toBe('23');
    result = DateFormatter.formatSameLength('31');
    expect(result).toBe('31');
  });
  describe('formating', () => {
    test('1', () => {
      const DateFormatter = require('../../lib/DateFormatter.js');
      MockDate.set('Thu May 08 2042 15:16:23 GMT');
      const mocDate = new Date();

      const result = DateFormatter.formating({ date: mocDate });
      expect(result).toBe('2042-05-08_15:16:23');
    });
    test('2', () => {
      const DateFormatter = require('../../lib/DateFormatter.js');
      MockDate.set('Thu May 08 2042 15:16:23 GMT+0300');
      const mocDate = new Date();

      const result = DateFormatter.formating({ date: mocDate });
      expect(result).toBe('2042-05-08_12:16:23');
    });
  });
  test('formating', () => {

  });
});
