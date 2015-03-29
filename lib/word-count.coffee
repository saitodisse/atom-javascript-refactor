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
    console.log 'toggle'
    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      editor = atom.workspace.getActiveTextEditor()
      words = editor.getText().split(/\s+/).length
      @wordCountView.setCount(words)
      @modalPanel.show()
