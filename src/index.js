const _ = require('lodash'); // eslint-disable-line no-unused-vars
const replaceInFiles = require('./replaceInFiles.js').default;

const regexpPathToFiles = '/home/wj42/work/training/replace-in-files/src/sandbox/index.js';
const optionsForRegexpPathToFiles = {};

const regexp = /const/g;

function replaceFunction(
  match,
  p1,
  p2,
  p3,
  p4,
  offset,
  file,
  pathToFile
) {
  // console.log('|42| ->    match', match);
  // console.log('|42| ->    p1', p1);
  // console.log('|42| ->    p2', p2);
  // console.log('|42| ->    p3', p3);
  // console.log('|42| ->    p4', p4);
  // console.log('|42| ->    offset', offset);
  // console.log('|42| ->    file', file);
  // console.log('|42| ->    pathToFile', pathToFile);
  return 'var';
}


replaceInFiles({
  regexpPathToFiles,
  optionsForRegexpPathToFiles,
  regexp,
  replaceFunction,
});
