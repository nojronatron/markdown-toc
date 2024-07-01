const vscode = require('vscode');

/**
 * Method to find the top heading of the page.
 * @param {vscode.TextEditor.document} document The active text editor.
 * @returns Number The line number of the top 1st Level Heading of the page.
 */
module.exports = function findTopHeading(document) {
  const topHeading = { line: -1, text: '', isHash: true };

  for (let idx = 1; idx < document.lineCount; idx++) {
    const firstLine = document.lineAt(idx-1);
    const secondLine = document.lineAt(idx);

    if (firstLine.text.startsWith('# ')) {
      // not linting, just finding the first standard heading style
      topHeading.line = idx-1;
      topHeading.text = firstLine.text;
      topHeading.isHash = true;
      break;
    }
    if (secondLine.text.startsWith('=')
        && firstLine.text.match(/^(?:[a-zA-Z0-9_] *?)+$/m)) {
      // not linting, just finding first nextline heading
      // style which requires checking two adjacent lines
      topHeading.line = idx;
      topHeading.text = firstLine.text;
      topHeading.isHash = false
      break;
    }
  }

  return topHeading;
};
