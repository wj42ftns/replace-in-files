# replace-in-files
Replace text in one or more files or globs. Works asynchronously with promises.

[![npm version](https://img.shields.io/npm/v/replace-in-files.svg)](https://www.npmjs.com/package/replace-in-files)
[![dependencies Status](https://david-dm.org/wj42ftns/replace-in-files/status.svg)](https://david-dm.org/wj42ftns/replace-in-files)
[![Build Status](https://travis-ci.org/wj42ftns/replace-in-files.svg?branch=master)](https://travis-ci.org/wj42ftns/replace-in-files)
[![Coverage Status](https://coveralls.io/repos/github/wj42ftns/replace-in-files/badge.svg)](https://coveralls.io/github/wj42ftns/replace-in-files)

## Installation
```shell
# Using npm
npm install replace-in-files

# Using yarn
yarn add replace-in-files
```

## Usage

### Specify options

```js
const replaceInFiles = require('replace-in-files');

const options = {
  // See more: https://www.npmjs.com/package/globby
  // Single file or glob
  files: 'path/to/file',
  // Multiple files or globs
  files: [
    'path/to/file',
    'path/to/other/file',
    'path/to/files/*.html',
    'another/**/*.path',
  ],


  // See more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
  // Replacement
  from: /foo/g,  // string or regex
  to: 'bar', // string or fn  (fn: carrying last argument - path to replaced file)


  // See more: https://www.npmjs.com/package/glob
  optionsForFiles: { // default
    "ignore": [
      "**/node_modules/**"
    ]
  }


  // format: `${fileName}-${year}-${month}-${day}_${hour}:${minute}:${second}.{fileExtension}`
  //            fileName-2017-11-01_21:29:55.js
  // date of createFile old file or last modificate (if not find create date)
  saveOldFile: false // default


  //Character encoding for reading/writing files
  encoding: 'utf8',  // default


  shouldSkipBinaryFiles: true, // default
  onlyFindPathsWithoutReplace: false // default
  returnPaths: true // default
  returnCountOfMatchesByPaths: true // default
};
```

### Replacing multiple occurrences
Please note that the value specified in the `from` parameter is passed straight to the native [String replace method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace). As such, if you pass a string as the `from` parameter, it will _only replace the first occurrence_.

To replace multiple occurrences at once, you must use a regular expression for the `from` parameter with the global flag enabled, e.g. `/foo/g`.

### Asynchronous replacement with promises

```js
const replaceInFiles = require('replace-in-files');

// ...

replaceInFiles(options)
  .then(({ changedFiles, countOfMatchesByPaths }) => {
    console.log('Modified files:', changedFiles);
    console.log('Count of matches by paths:', countOfMatchesByPaths);
    console.log('was called with:', replaceInFilesOptions);
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
```

### Asynchronous replacement with co yield

```js
const replaceInFiles = require('replace-in-files');
const co = require('co');

// ...

co(function* () {
  const {
    changedFiles,
    countOfMatchesByPaths,
    replaceInFilesOptions
  } = yield replaceInFiles(options);
  console.log('Modified files:', changedFiles);
  console.log('Count of matches by paths:', countOfMatchesByPaths);
  console.log('was called with:', replaceInFilesOptions);
}).catch((error) => {
  console.log('Error occurred:', error);
});
```

### Asynchronous replacement with async await (node 8+)

```js
const replaceInFiles = require('replace-in-files');

// ...

async function main() {
  try {
    const {
      changedFiles,
      countOfMatchesByPaths,
      replaceInFilesOptions
    } = await replaceInFiles(options);
    console.log('Modified files:', changedFiles);
    console.log('Count of matches by paths:', countOfMatchesByPaths);
    console.log('was called with:', replaceInFilesOptions);
  } catch (error) {
    console.log('Error occurred:', error);
  }
}

main();
```

## Sequentially replacement

use .pipe  - will be replaced with only files found at first replacement

.pipe supported only: { from, to } (the other options will be received from options in the first replacement)

```js
const replaceInFiles = require('replace-in-files');

// ...

async function main() {
  try {
    const {
      changedFiles,
      countOfMatchesByPaths,
      replaceInFilesOptions
    } = await replaceInFiles(options)
      .pipe({ from: 'foo', to: 'bar' })
      .pipe({ from: 'first', to: 'second' })
      .pipe({ from: /const/g, to: () => 'var' });
    console.log('Modified files:', changedFiles);
    console.log('Count of matches by paths:', countOfMatchesByPaths);
    console.log('was called with:', replaceInFilesOptions);
  } catch (error) {
    console.log('Error occurred:', error);
  }
}

main();
```


### Return value

The return value of the library is an object with: countOfMatchesByPaths and paths

For example:

```js
const replaceInFiles = require('replace-in-files');

const data = replaceInFiles({
  files: 'path/to/files/*.html',
  from: 'a',
  to: 'b',
});

// data could like:
{
  countOfMatchesByPaths: [
    {
      'path/to/files/file1.html': 5,
      'path/to/files/file3.html': 1,
      'path/to/files/file5.html': 3
    }
  ],
  paths: [
    'path/to/files/file1.html',
    'path/to/files/file3.html',
    'path/to/files/file5.html',
  ],
  replaceInFilesOptions: [
    {
      files: 'path/to/files/*.html',
      from: 'a',
      to: 'b',
    }
  ]
}

// if empty:
{
  countOfMatchesByPaths: [
    {}
  ],
  paths: []
}

// if used 2 .pipe
{
  countOfMatchesByPaths: [
    {
      'path/to/files/file1.html': 5,
      'path/to/files/file3.html': 1,
      'path/to/files/file5.html': 3
    },
    {
      'path/to/files/file5.html': 4
    },
    {
      'path/to/files/file1.html': 2,
      'path/to/files/file5.html': 4
    }
  ],
  paths: [
    'path/to/files/file1.html',
    'path/to/files/file3.html',
    'path/to/files/file5.html',
  ],
  replaceInFilesOptions: [
    {
      files: 'path/to/files/*.html',
      from: 'a',
      to: 'b',
    },
    {
      from: 'c',
      to: 'd',
    },
    {
      from: 'e',
      to: 'f',
    }
  ]
}

```

## Version information
Replace in files requires Node 8 or higher. (v.2.0.0 +) - potentially still supported node 6, but in pipeline eslint required node 8
Replace in files requires Node 6 or higher. (v.1.1.4)

## License
(MIT License)
