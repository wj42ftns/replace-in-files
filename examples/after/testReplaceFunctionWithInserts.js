/* eslint-disable */
const loopback = require('loopback');

const log = { foo: 'bar' };
const Log = loopback.getModel('Log');
const updated1 = Log.create(log);

console.log(updated1);

const file = {};
const File = loopback.getModel('File');
const updated2 = File.create(file);

console.log(updated2);
