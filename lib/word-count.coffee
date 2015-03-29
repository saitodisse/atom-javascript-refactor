WordCountView = require './word-count-view'
{CompositeDisposable} = require 'atom'

module.exports = WordCount =
  wordCountView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @wordCountView = new WordCountView(state.wordCountViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @wordCountView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'word-count:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @wordCountView.destroy()

  serialize: ->
    wordCountViewState: @wordCountView.serialize()

  toggle: ->
    if @modalPanel.isVisible()
      @hide()
    else
      @show()

  hide: ->
    @dispose_onDidChangeSelectionRange.dispose()
    @modalPanel.hide()

  calculate: ->
    words = @getCurrentText().split(/\s+/).length
    @wordCountView.setCount(words)

  show: ->
    @calculate()
    @modalPanel.show()

    # attach onDidChangeSelectionRange
    if (@dispose_onDidChangeSelectionRange == undefined ||
        @dispose_onDidChangeSelectionRange.disposed)
      editor = atom.workspace.getActiveTextEditor()
      @dispose_onDidChangeSelectionRange = editor.onDidChangeSelectionRange =>
        @calculate()

  getCurrentText: ->
    editor = atom.workspace.getActiveTextEditor()
    selection = editor.getSelectedText()
    text = editor.getText()
    selection || text
