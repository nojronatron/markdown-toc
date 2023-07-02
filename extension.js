const vscode = require('vscode');
const findTopHeading = require('./extension-functions/find-top-heading');
const findFirstSecondLevelHeading = require('./extension-functions/find-first-second-level-heading');
const createTOC = require('./extension-functions/create-toc');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Markdown TOC is now active!');

  let disposable = vscode.commands.registerCommand(
    'markdown-toc.createTOC',
    async function () {
      const firstCharacter = 0;
      const editor = vscode.window.activeTextEditor;

      if (editor && editor.document.languageId === 'markdown') {
        // 1. Find the top heading of the page.
        let topHeading = findTopHeading(editor.document);

        // 2. Find the first occurrence of a second level heading in the document. If there is no second level heading, then the TOC is not needed.
        let firstSecondLevelHeading = findFirstSecondLevelHeading(
          editor.document,
          topHeading
        );

        // avoid overwriting or including an existing table of contents.
        if (firstSecondLevelHeading === -1) {
          vscode.window.showWarningMessage('TOC already exists.');
          return null;
        }

        // avoid making a table of contents if there are no second level headings.
        if (firstSecondLevelHeading === 0) {
          vscode.window.showWarningMessage(
            'No second level heading found. TOC not created.'
          );
          return null;
        }

        // 3. Create the TOC as a string.
        const capturedDocument = editor.document.getText(
          new vscode.Range(
            firstSecondLevelHeading,
            firstCharacter,
            editor.document.lineCount,
            firstCharacter
          )
        );

        let tableOfContents = createTOC(capturedDocument);

        // 4. Insert the TOC at the top of the document.
        const edit = new vscode.WorkspaceEdit();
        edit.insert(
          editor.document.uri,
          new vscode.Position(firstSecondLevelHeading, firstCharacter),
          tableOfContents
        );
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
