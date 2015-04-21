var inner = require('./folder/file2.js');

function sum(a, b) {
  return require('debug-print').debug({ name: 'sum', arguments: arguments, line: {original_line: 3}, return_data: (a + b) }, __filename);
}

var times = function (options) {
  return require('debug-print').debug({ name: 'times', arguments: arguments, line: {original_line: 7}, return_data: ({
    result: options.a * options.b
  }) }, __filename);
};

// RUN async
var total = 0;

total = total + sum(1, 1);
setTimeout(function () {
  total = total + times({a: 1, b: 2}).result;
  setTimeout(function () {
    total = total + inner.sum_inner(0, 2);
    // TOTAL
    console.log('total:', total);
    return require('debug-print').debug({ name: 'anonymous', arguments: arguments, line: {original_line: 17}, return_data: ('VOID') }, __filename);
  }, 200);
  return require('debug-print').debug({ name: 'anonymous', arguments: arguments, line: {original_line: 15}, return_data: ('VOID') }, __filename);
}, 200);
total = total + inner.sum_inner(-4, 6);
