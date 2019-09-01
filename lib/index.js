const helpers = require('./helpers');
const ReplaceInFiles = require('./ReplaceInFiles');

wrapper.init = function* init(options) {
  return yield new ReplaceInFiles(options).run();
};

function wrapper(options) {
  const result = helpers.co(wrapper.init, options);
  result.pipe = (nextOptions) => helpers.pipe(result, nextOptions);

  return result;
}

module.exports = wrapper;
