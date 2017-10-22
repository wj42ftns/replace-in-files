module.exports = {
    "extends": "airbnb-base",
    "rules": {
      "no-use-before-define": ["error", { "functions": false }],
      "no-plusplus": "off",
      "func-names": "off",
      "comma-dangle": "off",
      "no-underscore-dangle": "off",
      "max-len": ["error", 100, { "ignoreComments": true, "ignoreStrings": true, "ignoreTemplateLiterals": true }]
    },
    "overrides": [
      {
        "files": [ "*.test.js"],
        "rules": {
          "global-require": "off",
        }
      }
    ],
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
      "epFn": true,
      "fn": true,
      "efn": true,
      "genTest": true
    }
};
