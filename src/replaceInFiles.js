const co = require('co');
const _ = require('lodash');
const helpers = require('./libs/helpers');

const defaultOptionsForRegexpPathToFiles = {
  ignore: [
    '**/node_modules/**',
  ],
  nodir: true,
};

exports.default = function replaceInFiles({
  regexpPathToFiles,
  optionsForRegexpPathToFiles,
  regexp,
  replaceFunction,
}) {
  co(function* () {
    const options = _.merge(defaultOptionsForRegexpPathToFiles, optionsForRegexpPathToFiles);

    const paths = yield helpers.pGlob(regexpPathToFiles, options);
    helpers.log(`finded: ${paths.length} paths`);

    const preparedToWrite = yield prepareToRewrite(paths, regexp, replaceFunction);

    yield _.map(preparedToWrite, item => helpers.pWriteFile(item.path, item.changedData));
  }).catch(helpers.handleError);
};


function getPreparedToRewrite({ path, data }, regexp, replaceFunction) {
  const changedData = data.replace(regexp, replaceFunction);
  return {
    path,
    changedData,
  };
}

function curryGetPreparedToRewrite(regexp, replaceFunction, matchLogs) {
  return (item) => {
    const path = item[0];
    const data = item[1];

    const replaceFunctionWithLogging = decorateReplaceFunction(replaceFunction, matchLogs, path);

    return getPreparedToRewrite({ path, data }, regexp, replaceFunctionWithLogging);
  };
}

function* prepareToRewrite(paths, regexp, replaceFunction) {
  const datasets = yield _.map(paths, path => helpers.pReadFile(path));
  const zipped = _.zip(paths, datasets);

  const matchLogs = {};
  const curredGetPreparedToRewrite = curryGetPreparedToRewrite(regexp, replaceFunction, matchLogs);
  const preparedToWrite = _.map(zipped, curredGetPreparedToRewrite);

  showMatchLogs(matchLogs);

  return preparedToWrite;
}

function decorateReplaceFunction(replaceFunction, matchLogs, path) {
  return (...args) => {
    // eslint-disable-next-line no-param-reassign
    matchLogs[path] = matchLogs[path] ? ++matchLogs[path] : 1;
    return replaceFunction(...args);
  };
}

function showMatchLogs(matchLogs) {
  _.forEach(matchLogs, (value, key) => {
    helpers.log(`${key}  :  ${value} matches`);
  });
}
