// var JavascriptRefactoring;
//
// JavascriptRefactoring = require('../lib/javascript-refactoring');
//
// describe("JavascriptRefactoring", function() {
//   var activationPromise, workspaceElement, _ref;
//
//   beforeEach(function() {
//     workspaceElement = atom.views.getView(atom.workspace);
//     return activationPromise = atom.packages.activatePackage('javascript-refactoring');
//   });
//
//   describe("when the javascript-refactoring:insertConsoleArguments event is triggered", function() {
//     it("hides and shows the modal panel", function() {
//       expect(workspaceElement.querySelector('.javascript-refactoring')).not.toExist();
//       atom.commands.dispatch(workspaceElement, 'javascript-refactoring:insertConsoleArguments');
//       waitsForPromise(function() {
//         return activationPromise;
//       });
//       return runs(function() {
//         var jsRefactoringElement, jsRefactoringPanel;
//         expect(workspaceElement.querySelector('.javascript-refactoring')).toExist();
//         jsRefactoringElement = workspaceElement.querySelector('.javascript-refactoring');
//         expect(jsRefactoringElement).toExist();
//         jsRefactoringPanel = atom.workspace.panelForItem(jsRefactoringElement);
//         expect(jsRefactoringPanel.isVisible()).toBe(true);
//         atom.commands.dispatch(workspaceElement, 'javascript-refactoring:insertConsoleArguments');
//         return expect(jsRefactoringPanel.isVisible()).toBe(false);
//       });
//     });
//     it("hides and shows the view", function() {
//       jasmine.attachToDOM(workspaceElement);
//       expect(workspaceElement.querySelector('.javascript-refactoring')).not.toExist();
//       atom.commands.dispatch(workspaceElement, 'javascript-refactoring:insertConsoleArguments');
//       waitsForPromise(function() {
//         return activationPromise;
//       });
//       return runs(function() {
//         var jsRefactoringElement;
//         jsRefactoringElement = workspaceElement.querySelector('.javascript-refactoring');
//         expect(jsRefactoringElement).toBeVisible();
//         atom.commands.dispatch(workspaceElement, 'javascript-refactoring:insertConsoleArguments');
//         return expect(jsRefactoringElement).not.toBeVisible();
//       });
//     });
//   });
// });
