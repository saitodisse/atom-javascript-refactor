/* global atom */

var AstLogger = require('ast-logger');
var CompositeDisposable;
var JavascriptRefactoring;

CompositeDisposable = require('atom').CompositeDisposable;

module.exports = JavascriptRefactoring = {

  jsRefactoringView: null,

  modalPanel: null,

  subscriptions: null,

  activate: function(/* state */) {
    this.subscriptions = new CompositeDisposable();
    return this.subscriptions.add(atom.commands.add('atom-workspace', {
      'javascript-refactoring:insertConsoleArguments': (function(_this) {
        return function() {
          return _this.insertConsoleArguments();
        };
      })(this)
    }));
  },

  deactivate: function() {
    this.subscriptions.dispose();
  },

  serialize: function() {
    return {};
  },

  insertConsoleArguments: function() {
    var astSearcher = new AstLogger();

    // parse all code from current file
    try {
      astSearcher.original_code = this._getCurrentText();
    } catch (err) {
      console.error('error on parsing code:');
      console.error(err);
    }

    // get function on cursor position
    var cursor = this._getCurrentCursor();
    var cursor_line = cursor.row + 1;
    var cursor_column = cursor.column + 1;
    var function_node_ast = astSearcher.searchFunctionOnLocation(cursor_line, cursor_column);
    if (!function_node_ast) {
      return;
    }

    // insert console on current function body
    astSearcher.instrumentInsertConsoleLogArgumentsBeforeFunction(function_node_ast);

    // set new text
    var editor = atom.workspace.getActiveTextEditor();
    editor.setText(astSearcher.code);

    editor.setCursorBufferPosition(cursor);
  },

  _getCurrentCursor: function() {
    var editor = atom.workspace.getActiveTextEditor();
    return editor.getSelectedBufferRange().start;
  },

  _getCurrentText: function() {
    var editor = atom.workspace.getActiveTextEditor();
    return editor.getText();
  }

};
