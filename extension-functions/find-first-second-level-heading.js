/**
 * Find the first occurrence of a second level heading in the document.
 * @param {vscode.TextEditor.document} document The active text editor.
 * @param topHeading The line number of the top level heading of the page.
 * @returns Number The line number of the first 2nd Level Heading of the page.
 */
module.exports = function findFirstSecondLevelHeading(document, topHeading) {
  let firstSecondLevelHeading = 0;

  // iterate through document line-by-line starting after
  // the top heading, searching for the first second level heading
  for (let idx = topHeading + 1; idx < document.lineCount; idx++) {
    const line = document.lineAt(idx);

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
