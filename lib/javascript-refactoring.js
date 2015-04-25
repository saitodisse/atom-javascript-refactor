/* global atom */

require('source-map-support').install();
var SourceCode = require('castborg').SourceCode;
var Instrumenter = require('log-my-code').Instrumenter;

var CompositeDisposable;
var JavascriptRefactoring;

CompositeDisposable = require('atom').CompositeDisposable;

module.exports = JavascriptRefactoring = {

  jsRefactoringView: null,

  modalPanel: null,

  subscriptions: null,

  activate: function(/* state */) {
    this.subscriptions = new CompositeDisposable();

    var instrumentAllFunctions_command = atom.commands.add('atom-workspace', {
      'javascript-refactoring:instrumentAllFunctions': function() {
        return this.instrumentAllFunctions();
      }.bind(this)
    });
    this.subscriptions.add(instrumentAllFunctions_command);

    var addConsoleLogNextLine_command = atom.commands.add('atom-workspace', {
      'javascript-refactoring:addConsoleLogNextLine': function() {
        return this.addConsoleLogNextLine();
      }.bind(this)
    });
    this.subscriptions.add(addConsoleLogNextLine_command);

    var removeAllInsertedDebugs_command = atom.commands.add('atom-workspace', {
      'javascript-refactoring:removeAllInsertedDebugs': function() {
        return this.removeAllInsertedDebugs();
      }.bind(this)
    });
    this.subscriptions.add(removeAllInsertedDebugs_command);

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

  // Adds a simple console.log with selection
  // If there is no selection, selectes the current word
  //   and use this selection
  addConsoleLogNextLine: function () {
    var editor = atom.workspace.getActiveTextEditor();

    // copy selection to memory
    var selected_text = editor.getSelectedText();

    // if there is not selection, get word selection
    if (!selected_text || selected_text.length === 0) {
      editor.selectWordsContainingCursors();
    }
    selected_text = editor.getSelectedText();

    // go to end of current line
    editor.moveToEndOfLine();

    // new line
    editor.insertText("\n");
    editor.insertText("/**/ console.log('\\n>>---------\\n " + selected_text + ":\\n', \/" + "*-inserted-debug-*\/");
    editor.insertText("\n");
    editor.insertText("/**/             " + selected_text + " , '\\n>>---------\\n'); " + "\/" + "*-inserted-debug-*\/");
  },

  //
  // Search and replace all lines that contains "*-inserted-debug-*"
  // obs: do not execute this here (lol)
  //
  removeAllInsertedDebugs: function () {
    var editor = atom.workspace.getActiveTextEditor();
    editor.scan(/^.*\*-inserted-debug-\*.*$\n/g, function (result) {
      result.replace('');
    });
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
