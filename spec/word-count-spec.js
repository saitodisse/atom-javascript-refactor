var WordCount;

WordCount = require('../lib/word-count');

describe("WordCount", function() {
  var activationPromise, workspaceElement, _ref;
  _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];

  beforeEach(function() {
    workspaceElement = atom.views.getView(atom.workspace);
    return activationPromise = atom.packages.activatePackage('word-count');
  });

  describe("when the word-count:toggle event is triggered", function() {
    it("hides and shows the modal panel", function() {
      expect(workspaceElement.querySelector('.word-count')).not.toExist();
      atom.commands.dispatch(workspaceElement, 'word-count:toggle');
      waitsForPromise(function() {
        return activationPromise;
      });
      return runs(function() {
        var wordCountElement, wordCountPanel;
        expect(workspaceElement.querySelector('.word-count')).toExist();
        wordCountElement = workspaceElement.querySelector('.word-count');
        expect(wordCountElement).toExist();
        wordCountPanel = atom.workspace.panelForItem(wordCountElement);
        expect(wordCountPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'word-count:toggle');
        return expect(wordCountPanel.isVisible()).toBe(false);
      });
    });
    it("hides and shows the view", function() {
      jasmine.attachToDOM(workspaceElement);
      expect(workspaceElement.querySelector('.word-count')).not.toExist();
      atom.commands.dispatch(workspaceElement, 'word-count:toggle');
      waitsForPromise(function() {
        return activationPromise;
      });
      return runs(function() {
        var wordCountElement;
        wordCountElement = workspaceElement.querySelector('.word-count');
        expect(wordCountElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'word-count:toggle');
        return expect(wordCountElement).not.toBeVisible();
      });
    });
  });
});
