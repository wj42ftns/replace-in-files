const _ = require('lodash');

class DateFormatter {
  static formating({ date }) {
    const year = date.getFullYear();
    const [month, day, hour, minute, second] = _.map([
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ], DateFormatter.formatSameLength);

    return `${year}-${month}-${day}_${hour}:${minute}:${second}`;
  }

  static formatSameLength(number) {
    return number.toString().replace(/^([0-9])$/, '0$1'); // 4 => 04;
  }

  constructor(options) {
    this.options = options;
  }

  run() {
    return DateFormatter.formating(this.options);
  }
}

module.exports = DateFormatter;
