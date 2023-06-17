/**
 * Method to find the top heading of the page.
 * @param {vscode.TextEditor.document} document The active text editor.
 * @returns Number The line number of the top 1st Level Heading of the page.
 */
module.exports = function findTopHeading(document) {
  let topHeading = 0;
  for (let i = 0; i < document.lineCount; i++) {
    const line = document.lineAt(i);
    if (line.text.startsWith('# ')) {
      topHeading = i;
      break;
    }
  }
  return topHeading;
};
