const co = require('co');

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

// console.warn = () => null;

global.pFn = result => jest.fn(() => Promise.resolve(result));
global.fn = result => jest.fn(() => result);

global.genTest = (title, handler) => {
  test(title, (done) => {
    co(function* () {
      yield handler();
      done();
    }).catch(done.fail);
  });
};
