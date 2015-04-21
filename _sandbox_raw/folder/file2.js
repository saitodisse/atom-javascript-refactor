module.exports = {
  sum_inner: function(a, b) {
    return require('debug-print').debug({ name: 'sum_inner', arguments: arguments, line: {original_line: 2}, return_data: (a + b) }, __filename);
  }
};
