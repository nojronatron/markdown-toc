/**
 * Finds the top level one heading (H1) in a given markdown document.
 *
 * @param {string} document - The document to search for the top heading.
 * @returns {Object} - An object representing the result of processing.
 * @property {number} line - The line number of the top heading.
 * @property {string} text - The text of the top heading.
 * @property {boolean} isHash - Indicates whether the top heading is in normal style (using '##') or alternative style (using '=').
 * @property {boolean} isToc - Indicates whether the top heading is a table of contents.
 */
module.exports = function findTopHeading(document) {
  const resultObj = { line: -1, text: '', isHash: false, isClosedAtx: false, isToc: false };
  let lineIdx = 0;
  // 1. get index of first newline character
  let newlineCharIdx = document.indexOf('\n');
  let previousText = '';

  // 2. continue until index of newline character is -1
  while (newlineCharIdx > -1) {
    // 3. substring from startIdx to index of newline character
    let currentText = document.substring(0, newlineCharIdx).trim();

    // 4. check if substring is an open or closed ATX style heading
    if (currentText.startsWith('# ')) {
      resultObj.line = lineIdx;
      resultObj.text = currentText;
      resultObj.isHash = true;
      resultObj.isClosedAtx = false;
      resultObj.isToc = false;

    // 4a. if substring starts with '# ' and ends with ' #' return an updated resultObj
      if (currentText.endsWith(' #')) {
        resultObj.isClosedAtx = true;
      }

    // 4b. if substring starts with '# ' return an updated resultObj
      return resultObj;
    }

    // 5. if substring starts with '=' and previous line has text return an updated resultObj
    if (currentText .startsWith('=')) {
      if (previousText.match(/^(?:[a-zA-Z0-9_] *?)+$/m)) {
          resultObj.line = lineIdx;
          resultObj.text = previousText;
          resultObj.isHash = false;
          resultObj.isClosedAtx = false;
          resultObj.isToc = false;
          return resultObj;
      }
    }

    // 5. if not, increment index to idx of newline character and repeat from step 1
    lineIdx++;
    // store the currentText as previous value for alternate heading style detection
    previousText = currentText;
    // remove currentText from document to navigate forward
    document = document.substring(newlineCharIdx).trim();
    // reset newlineCharIdx to new index of newline character
    newlineCharIdx = document.indexOf('\n');
  }

  // 2. if no newline character return resultObj
  return resultObj;
};
