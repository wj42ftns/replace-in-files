/* eslint-disable */
var loopback = require('loopback');

var log = {};
var Log = loopback.getModel('Log');
var updated1 = Log.create(log);

console.log(updated1);

var file = {};
var File = loopback.getModel('File');
var updated2 = File.create(file);

console.log(updated2);
