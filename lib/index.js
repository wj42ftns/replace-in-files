const helpers = require('./helpers');
const ReplaceInFiles = require('./ReplaceInFiles');

wrapper.init = function* init(options) {
  return yield new ReplaceInFiles(options).run();
};


function wrapper(options) {
  return helpers.co(wrapper.init, options);
}

module.exports = wrapper;
