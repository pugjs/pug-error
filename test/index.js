'use strict';

var assert = require('assert');
var test = require('testit');
var error = require('../');

test('with a source', function () {
  test('and a filename', function () {
    var err = error('MY_CODE', 'My message', {line: 3, filename: 'myfile', src: 'foo\nbar\nbaz\nbash\nbing'});
    assert(err.message === 'myfile:3\n    1| foo\n    2| bar\n  > 3| baz\n    4| bash\n    5| bing\n\nMy message');
    assert(err.code === 'JADE:MY_CODE');
    assert(err.msg === 'My message');
    assert(err.line === 3);
    assert(err.filename === 'myfile');
    assert(err.src === 'foo\nbar\nbaz\nbash\nbing');
  });
  test('and no filename', function () {
    var err = error('MY_CODE', 'My message', {line: 3, src: 'foo\nbar\nbaz\nbash\nbing'});
    assert(err.message === 'Jade:3\n    1| foo\n    2| bar\n  > 3| baz\n    4| bash\n    5| bing\n\nMy message');
    assert(err.code === 'JADE:MY_CODE');
    assert(err.msg === 'My message');
    assert(err.line === 3);
    assert(err.filename === undefined);
    assert(err.src === 'foo\nbar\nbaz\nbash\nbing');
  });
});

test('without source', function () {
  test('and with a filename', function () {
    var err = error('MY_CODE', 'My message', {line: 3, filename: 'myfile'});
    assert(err.message === 'myfile:3\n\nMy message');
    assert(err.code === 'JADE:MY_CODE');
    assert(err.msg === 'My message');
    assert(err.line === 3);
    assert(err.filename === 'myfile');
    assert(err.src === undefined);
  });
  test('and with no filename', function () {
    var err = error('MY_CODE', 'My message', {line: 3});
    assert(err.message === 'Jade:3\n\nMy message');
    assert(err.code === 'JADE:MY_CODE');
    assert(err.msg === 'My message');
    assert(err.line === 3);
    assert(err.filename === undefined);
    assert(err.src === undefined);
  });
});

test('with column', function () {
  test('and with a filename', function () {
    var err = error('MY_CODE', 'My message', {line: 3, column: 1, filename: 'myfile'});
    assert(err.message === 'myfile:3:1\n\nMy message');
    assert(err.code === 'JADE:MY_CODE');
    assert(err.msg === 'My message');
    assert(err.line === 3);
    assert(err.filename === 'myfile');
    assert(err.src === undefined);
  });
  test('and with no filename', function () {
    var err = error('MY_CODE', 'My message', {line: 3, column: 1});
    assert(err.message === 'Jade:3:1\n\nMy message');
    assert(err.code === 'JADE:MY_CODE');
    assert(err.msg === 'My message');
    assert(err.line === 3);
    assert(err.filename === undefined);
    assert(err.src === undefined);
  });
});
