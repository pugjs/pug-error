# jade-error

Standard error objects for jade.  This module is intended for use by the lexer, parser, loader, linker, code-generator and any plugins.

[![Build Status](https://img.shields.io/travis/jadejs/jade-error/master.svg)](https://travis-ci.org/jadejs/jade-error)
[![Dependency Status](https://img.shields.io/gemnasium/jadejs/jade-error.svg)](https://gemnasium.com/jadejs/jade-error)
[![NPM version](https://img.shields.io/npm/v/jade-error.svg)](https://www.npmjs.org/package/jade-error)

## Installation

    npm install jade-error

## Usage

```js
var error = require('jade-error');
```

### `error(code, message, options)`

Create a Jade error object.

`code` is a required unique code for the error type that can be used to pinpoint a certain error.

`message` is a human-readable explanation of the error.

`options` can contain any of the following properties:

- `filename`: the name of the file causing the error
- `line`: the offending line
- `column`: the offending column
- `src`: the Jade source, if available, for pretty-printing the error context

The resulting error object is a simple Error object with additional properties given in the arguments.

**Caveat:** the `message` argument is stored in `err.msg`, not `err.message`, which is occupied with a better-formatted message.

```js
var error = require('jade-error');

var err = error('MY_CODE', 'My message', {line: 3, filename: 'myfile', src: 'foo\nbar\nbaz\nbash\nbing'});
// { code: 'JADE:MY_CODE',
//   msg: 'My message',
//   line: 3,
//   column: undefined,
//   filename: 'myfile',
//   src: 'foo\nbar\nbaz\nbash\nbing',
//   message: 'myfile:3\n    1| foo\n    2| bar\n  > 3| baz\n    4| bash\n    5| bing\n\nMy message' }

throw err;
```

### `error.extend(origErr, addition)`

Extend an existing Jade error with additional information.

This is useful when you get an error from a Jade module that has no knowledge of certain properties (a common example would be `src`) and you would like to add that additional information to the formatted error message.

```js
var origErr = error('MY_CODE', 'My message', {line: 3, filename: 'myfile'});
// { code: 'JADE:MY_CODE',
//   msg: 'My message',
//   line: 3,
//   column: undefined,
//   filename: 'myfile',
//   src: undefined,
//   message: 'myfile:3\n\nMy message' }

var newErr = error.extend(origErr, {src: 'foo\nbar\nbaz\nbash\nbing'});
// { code: 'JADE:MY_CODE',
//   msg: 'My message',
//   line: 3,
//   column: undefined,
//   filename: 'myfile',
//   src: 'foo\nbar\nbaz\nbash\nbing',
//   message: 'myfile:3\n    1| foo\n    2| bar\n  > 3| baz\n    4| bash\n    5| bing\n\nMy message' }
```

## License

  MIT
