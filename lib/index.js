const helpers = require('./helpers');
const ReplaceInFiles = require('./ReplaceInFiles');

wrapper.init = function* init(options) {
  const paths = yield new ReplaceInFiles(options).run();
  console.log('|42| ->    paths', paths);
  return paths;
};


function wrapper(options) {
  return helpers.co(wrapper.init, options);
}

module.exports = wrapper;
