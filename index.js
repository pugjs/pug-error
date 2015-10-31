'use strict';

module.exports = makeError;
function makeError(code, message, options) {
  var line = options.line;
  var column = options.column;
  var filename = options.filename;
  var src = options.src;
  var location = line + (column ? ':' + column : '');
  var fullMessage = (filename || 'Jade') + ':' + location + ': ' + message;
  if (src) {
    var lines = src.split('\n');
    var start = Math.max(line - 3, 0);
    var end = Math.min(lines.length, line + 3);
    // Error context
    var context = lines.slice(start, end).map(function(text, i){
      var curr = i + start + 1;
      return (curr == line ? '  > ' : '    ')
        + curr
        + '| '
        + text;
    }).join('\n');
    fullMessage += '\n' + context + '\n';
  }
  var err = new Error(fullMessage);
  err.code = 'JADE:' + code;
  err.msg = message;
  err.line = line;
  err.column = column;
  err.filename = filename;
  err.src = src;
  err.toJSON = function () {
    return {
      code: this.code,
      msg: this.msg,
      line: this.line,
      column: this.column,
      filename: this.filename
    };
  };
  return err;
}
