const co = require('co');

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

// console.warn = () => null;

global.pFn = result => jest.fn(() => Promise.resolve(result));
global.fn = result => jest.fn(() => result);

global.genTest = (title, handler) => {
  test(title, asyncCoTest.bind(null, handler));
};

global.genTest.skip = (title, handler) => {
  test.skip(title, asyncCoTest.bind(null, handler));
};

global.genTest.only = (title, handler) => {
  test.only(title, asyncCoTest.bind(null, handler));
};

function asyncCoTest(handler, done) {
  co(function* () {
    yield handler();
    done();
  }).catch(done.fail);
}
