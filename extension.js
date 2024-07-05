const vscode = require('vscode');
const findTopHeading = require('./extension-functions/find-top-heading');
const {getSecondLevelHeading, findExistingStyleCharacter} = require('./extension-functions/get-second-level-heading');
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
      let topHeading = { line: -1, text: '', isHash: true, isToc: false };

      if (editor && editor.document.languageId === 'markdown') {
        // 1. Find the top heading of the page and store in a plain 
        // obj with parameters Text, Line Number, and Hash true/false.
        topHeading = findTopHeading(editor.document.getText());

        if (topHeading.line < 0) {
          vscode.window.showWarningMessage(
            'No top level headings found.'
          );

          // 2. determine whether to use hash or dash for headings style
          let foundCharacter = findExistingStyleCharacter(editor.document.getText());
          
          switch (foundCharacter) {
            case '#':
              topHeading.isHash = true;
              break;
            case '-':
              topHeading.isHash = false;
              break;
            default:
              vscode.window.showWarningMessage(
                'No heading style found. Add a heading and try again.'
              );
              return null;
          }
        }

        // Check if there is enough content to add a TOC
        if (editor.document.lineCount <= topHeading.line + 3) {
          vscode.window.showWarningMessage(
            'Add more content below first level and try again.'
          );
          
          return null;
        }

        // 3. iterate over the document to find and store all second level headings
        const secondLevelHeadings = [];
        let start = topHeading.line > -1 ? topHeading.line + 3 : 1;
        for (let idx = start; idx < editor.document.lineCount; idx++) {
          let firstLine = editor.document.lineAt(idx-1).text;
          let secondLine = editor.document.lineAt(idx).text;
          const headingObject = getSecondLevelHeading(firstLine, idx-1, secondLine, topHeading.isHash);

          if (headingObject.isToc) {
            // do no harm to existing document and allow user to make changes
            vscode.window.showWarningMessage('Table of Contents already exists.');
            return null;
          }

          if (headingObject.line !== -1) {
            // add the heading object to the array
            secondLevelHeadings.push(headingObject);
          }
        }

        // no second level headings? no table of contents to create
        if (secondLevelHeadings.length < 1) {
          vscode.window.showWarningMessage(
            'No second level headings to reference.'
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
