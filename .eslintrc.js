module.exports = {
    "extends": "airbnb-base",
    "rules": {
      "no-use-before-define": ["error", { "functions": false }],
      "no-plusplus": "off",
      "comma-dangle": "off",
    },
    "globals": {
      "describe": true,
      "before": true,
      "beforeAll": true,
      "afterAll": true,
      "after": true,
      "afterEach": true,
      "beforeEach": true,
      "test": true,
      "expect": true,
      "jest": true,
      "jasmine": true,
      "pFn": true,
      "fn": true,
      "genTest": true
    }
};
