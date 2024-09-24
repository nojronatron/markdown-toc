const vscode = require('vscode');
const findTopHeading = require('./extension-functions/find-top-heading');
const {getSecondLevelHeading} = require('./extension-functions/get-second-level-heading');
const createTOC = require('./extension-functions/create-toc');

/**
 * Activates the extension and executes custom extension code in a child async function.
 * @param {vscode.ExtensionContext} context 
 * @returns {void}
 */
function activate(context) {
  console.log('Markdown TOC is now active!');

  let disposable = vscode.commands.registerCommand(
    'markdown-toc.createTOC',
    async function () {
      const firstCharacter = 0;
      const editor = vscode.window.activeTextEditor;
      let topHeading = { line: -1, text: '', isHash: true, isClosedAtx: false, isToc: false };

      if (editor && editor.document.languageId === 'markdown') {

        if (editor.document.lineCount < 2)
        {
          vscode.window.showWarningMessage('Add headings to the document and try again.');
          return null;
        }

        // 1. Find the top heading of the page, store in an object
        // 2. determine whether to use hash (openAtx or ClosedAtx) or dash (alternate) headings style
        topHeading = findTopHeading(editor.document.getText());

        if (!topHeading.line === -1) {
          vscode.window.showWarningMessage(
            'No top level headings found.'
          );

          return null;
        }

        // Check if there is enough content to add a TOC
        if (editor.document.lineCount <= topHeading.line + 3) {
          vscode.window.showWarningMessage(
            'Add more content below first level heading and try again.'
          );
          
          return null;
        }

        // 3. iterate over the document to find and store all second level headings
        const secondLevelHeadings = [];
        let start = topHeading.line > -1 ? topHeading.line + 3 : 1;

        for (let idx = start; idx < editor.document.lineCount; idx++) {
          let firstLine = editor.document.lineAt(idx-1).text;
          let secondLine = editor.document.lineAt(idx).text;
          const headingObject = getSecondLevelHeading(firstLine, idx-1, secondLine, topHeading.isHash, topHeading.isClosedAtx);

          if (headingObject.isToc) {
            // do no harm to existing document and allow user to make changes
            vscode.window.showWarningMessage('Table of Contents already exists.');
            return null;
          }
          
          if (headingObject.line !== -1) {
            // add the heading object to the array if line is not -1
            secondLevelHeadings.push(headingObject);
          }
        }

        // no second level headings? no table of contents to create, give control back to user without editing
        if (secondLevelHeadings.length < 1) {
          vscode.window.showWarningMessage(
            'No second level headings found.'
          );
          return null;
        }

        // 4. Create the TOC as a string.
        let tableOfContents = createTOC(secondLevelHeadings);

        // 5. Insert the TOC after top level1 content and before first existing H2 block
        const edit = new vscode.WorkspaceEdit();
        edit.insert(
          editor.document.uri,
          new vscode.Position(secondLevelHeadings[0].line, firstCharacter),
          tableOfContents
        );

        // apply the changes
        await vscode.workspace.applyEdit(edit);
        
        vscode.window.showInformationMessage('TOC created.');
      } else {
        vscode.window.showWarningMessage('No Markdown file is currently open.');
      }
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
