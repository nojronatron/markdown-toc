/**
 * Method to find the top heading of the page.
 * @returns Number The line number of the top 1st Level Heading of the page.
 * @param {vscode.TextEditor} editor The active text editor.
 */
module.exports = function findTopHeading(editor) {
  let topHeading = 0;
  for (let i = 0; i < editor.document.lineCount; i++) {
    const line = editor.document.lineAt(i);
    if (line.text.startsWith('# ')) {
      topHeading = i;
      break;
    }
  }
  return topHeading;
};
