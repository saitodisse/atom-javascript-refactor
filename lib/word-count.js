var CompositeDisposable, WordCount, WordCountView;

WordCountView = require('./word-count-view');
CompositeDisposable = require('atom').CompositeDisposable;

module.exports = WordCount = {

  wordCountView: null,

  modalPanel: null,

  subscriptions: null,

  activate: function(state) {
    this.wordCountView = new WordCountView(state.wordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.wordCountView.getElement(),
      visible: false
    });
    this.subscriptions = new CompositeDisposable;
    return this.subscriptions.add(atom.commands.add('atom-workspace', {
      'word-count:toggle': (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this)
    }));
  },

  deactivate: function() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    return this.wordCountView.destroy();
  },

  serialize: function() {
    return {
      wordCountViewState: this.wordCountView.serialize()
    };
  },

  toggle: function() {
    if (this.modalPanel.isVisible()) {
      return this.hide();
    } else {
      return this.show();
    }
  },

  hide: function() {
    this.disposableItem && this.disposableItem.dispose();
    return this.modalPanel.hide();
  },

  calculate: function() {
    var words;
    words = this.getCurrentText().split(/\s+/).length;
    return this.wordCountView.setCount(words);
  },

  show: function() {
    var editor = atom.workspace.getActiveTextEditor();

    if (!editor) {
      return;
    }

    this.calculate();
    this.modalPanel.show();
    if (this.disposableItem === void 0 ||
        this.disposableItem.disposed) {
      return this.disposableItem = editor.onDidChangeSelectionRange((function(_this) {
        return function() {
          return _this.calculate();
        };
      })(this));
    }
  },

  getCurrentText: function() {
    var editor, selection, text;
    editor = atom.workspace.getActiveTextEditor();

    if (!editor) {
      return '';
    }

    selection = editor.getSelectedText();
    text = editor.getText();
    return selection || text;
  }
};
