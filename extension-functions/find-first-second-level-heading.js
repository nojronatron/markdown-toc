const vscode = require('vscode');

/**
 * Find the first occurrence of a second level heading in the document.
 * @returns Number The line number of the first 2nd Level Heading of the page.
 * @param {vscode.TextEditor} editor The active text editor.
 */
module.exports = function findFirstSecondLevelHeading(editor, topHeading) {
  let firstSecondLevelHeading = 0;
  for (let idx = topHeading + 1; idx < editor.document.lineCount; idx++) {
    const line = editor.document.lineAt(idx);

    // exit out if an existing Table of Contents is found.
    if (line.text.startsWith('## Table of Contents')) {
      firstSecondLevelHeading = -1;
      break;
    }

    if (line.text.startsWith('## ')) {
      firstSecondLevelHeading = idx;
      break;
    }
  }
  return firstSecondLevelHeading;
};
