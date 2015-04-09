/* global atom */

require('source-map-support').install();
var SourceCode = require('castborg').SourceCode;
var Instrumenter = require('ast-logger').Instrumenter;

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
      'javascript-refactoring:instrumentAllFunctions': (function(_this) {
        return function() {
          return _this.instrumentAllFunctions();
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

  instrumentAllFunctions: function() {
    var sourceCode, new_code;
    // parse all code from current file
    // parse current code to AST with recast
    sourceCode = new SourceCode({ code: this._getCurrentText() });

    // insert instrumentation
    new_code = Instrumenter.instrumentAllFunctions(sourceCode);

    // get function on cursor position
    var cursor = this._getCurrentCursor();
    // var cursor_line = cursor.row + 1;
    // var cursor_column = cursor.column + 1;
    // var function_node_ast = astSearcher.searchFunctionOnLocation(cursor_line, cursor_column);
    // if (!function_node_ast) {
    //   return;
    // }
    // insert console on current function body

    // set new text
    var editor = atom.workspace.getActiveTextEditor();
    editor.setText(new_code);

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
