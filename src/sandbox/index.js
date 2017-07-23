const loopback = require('loopback');  //eslint-disable-line

const log = {};
const Log = loopback.getModel('Log');
const updated1 = Log.create(log);

console.log('|42| ->    updated1', updated1);

  const file = {};  //eslint-disable-line
  const File = loopback.getModel('File');  //eslint-disable-line
  File.create(file);  //eslint-disable-line
