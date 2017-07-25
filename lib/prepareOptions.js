const _ = require('lodash');

const defaultOptionsForRegexpPathToFiles = {
  ignore: [
    '**/node_modules/**',
  ],
  nodir: true,
};

function prepareOptions(options) {
  const optionsForRegexpPathToFiles = _.merge(
    defaultOptionsForRegexpPathToFiles,
    options.optionsForRegexpPathToFiles
  );

  return _.assign({}, options, { optionsForRegexpPathToFiles });
}


module.exports = prepareOptions;
