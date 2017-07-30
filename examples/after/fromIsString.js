/* eslint-disable */
var loopback = require('loopback');

const log = {};
const Log = loopback.getModel('Log');
const updated1 = Log.create(log);

console.log(updated1);

const file = {};
const File = loopback.getModel('File');
const updated2 = File.create(file);

console.log(updated2);
