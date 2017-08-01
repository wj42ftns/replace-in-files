const loopback = require('loopback');  //eslint-disable-line

const log = {};
const updated1 = createModel('Log', log);

console.log('|42| ->    updated1', updated1);

  const file = {};  //eslint-disable-line
  const File = loopback.getModel('File');  //eslint-disable-line
  File.create(file);  //eslint-disable-line
