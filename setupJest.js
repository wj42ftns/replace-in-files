const co = require('co');

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

// console.warn = () => null;

global.pFn = (result) => jest.fn(() => Promise.resolve(result));
global.epFn = (msg) => jest.fn(() => Promise.reject(new Error(msg)));
global.fn = (result) => jest.fn(() => result);
global.efn = (msg) => jest.fn(() => {
  throw new Error(msg);
});

global.genTest = (title, handler) => {
  test(title, asyncCoTest.bind(null, handler));
};

expect.extend({
  toBeObj(received) {
    const isObject = typeof received === 'object' && received !== null;
    const message = isObject
      ? `expected ${received} not to be object`
      : `expected ${received} to be object`;

    return {
      message: () => message,
      pass: isObject
    };
  },
  toBeFunc(received) {
    const isFunction = typeof received === 'function';
    const message = isFunction
      ? `expected ${received} not to be function`
      : `expected ${received} to be function`;

    return {
      message: () => message,
      pass: isFunction
    };
  },
  toBeArr(received) {
    const isArray = Array.isArray(received);
    const message = isArray
      ? `expected ${received} not to be array`
      : `expected ${received} to be array`;

    return {
      message: () => message,
      pass: isArray
    };
  }
});

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
