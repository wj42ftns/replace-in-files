const _ = require('lodash'); // eslint-disable-line no-unused-vars
const replaceInFiles = require('../index.js');

const files = [
  '/home/wj42/work/training/replace-in-files/src/sandbox/index.js'
];
const optionsForFiles = {};

const from = / *const (.*) = loopback\.getModel\((.*)\);.*\s *const (.*) = \1.create\((.*)\);.*/gm;

function to(
  match,
  p1,
  p2,
  p3,
  p4,
  offset,
  file,
  pathToFile
) {
  console.log('|42| ->    match', match);
  console.log('|42| ->    p1', p1);
  console.log('|42| ->    p2', p2);
  console.log('|42| ->    p3', p3);
  console.log('|42| ->    p4', p4);
  console.log('|42| ->    offset', offset);
  console.log('|42| ->    file', file);
  console.log('|42| ->    pathToFile', pathToFile);
  return `const ${p3} = createModel(${p2}, ${p4});`;
}


replaceInFiles({
  files,
  optionsForFiles,
  from,
  to,
});
