const helpers = require('./helpers');
const ReplaceInFiles = require('./ReplaceInFiles');

function* init(options) {
  const paths = yield new ReplaceInFiles(options).run();
  console.log('|42| ->    paths', paths);
  return paths;
}


module.exports = options => helpers.co(init, options);
