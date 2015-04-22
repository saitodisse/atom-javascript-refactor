var inner = require('./folder/file2.js');

function sum(a, b) {
  return a + b;
}

var times = function (options) {
  return { result: options.a * options.b };
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
  }, 200);
}, 200);
total = total + inner.sum_inner(-4, 6);
