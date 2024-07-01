/**
 * Retrieves the second level heading information from the given lines of text and heading style.
 * @param {string} firstLine - The first line of text.
 * @param {number} firstLineIdx - The index of the first line.
 * @param {string} secondLine - The second line of text.
 * @param {boolean} [normalStyle=true] - Indicates whether the heading is in normal style (using '##') or alternative style (using '-').
 * @returns {object} - An object containing the heading information.
 * @property {number} line - The line index of the heading.
 * @property {string} text - The text of the heading.
 * @property {boolean} isHash - Indicates whether the heading is in normal style (using '##') or alternative style (using '-').
 * @property {boolean} isToc - Indicates whether the heading is a table of contents.
 */
function getSecondLevelHeading(firstLine, firstLineIdx, secondLine, normalStyle = true) {
  if (normalStyle) {
    return getHash2LH(firstLine, firstLineIdx, secondLine);
  }
  if (!normalStyle) {
    return getDash2LH(firstLine, firstLineIdx, secondLine);
  }

  // no matches so the line of text is something else
  return { line: -1, text: firstLine, isHash: normalStyle, isToc: false };
}

/**
 * Get the second level heading information when using standard style headings.
 * @param {string} firstLine 
 * @param {number} firstLineIdx 
 * @param {string} secondLine 
 * @returns {object} {line, text, isHash, isToc}
 */
function getHash2LH(firstLine, firstLineIdx, secondLine) {
  if (firstLine.startsWith('## ')) {
    if (firstLine.match(/^(?:## Table of Contents)\s*?$/m)) {
      // do not count an existing table of contents
      return {
        line: firstLineIdx,
        text: firstLine,
        isHash: true,
        isToc: true,
      }
    }

    if (secondLine.length === 0
        || secondLine.match(/^(?:[a-zA-Z0-9_] *?)+$/m)) {
      const firstLineText = firstLine.substring(2, firstLine.length).trim();
      return {
        line: firstLineIdx,
        text: firstLineText,
        isHash: true,
        isToc: false,
      };
    }
  }

  return {
    line: -1,
    text: firstLine,
    isHash: true,
    isToc: false,
  };
}

/**
 * Get the second level heading information when using alternate style headings.
 * @param {string} firstLine 
 * @param {number} firstLineIdx 
 * @param {string} secondLine 
 * @returns {object} {line, text, isHash, isToc}
 */
function getDash2LH(firstLine, firstLineIdx, secondLine) {
  if (secondLine.startsWith('-')) {
    if (firstLine.match(/^(?:Table of Contents)\s*?$/m)) {
      // do not count an existing table of contents
      return {
        line: firstLineIdx,
        text: firstLine,
        isHash: false,
        isToc: true,
      }
    }
  
    if (firstLine.match(/^(?:[a-zA-Z0-9_] *?)+$/m)) {
      return {
        line: firstLineIdx,
        text: firstLine,
        isHash: false,
        isToc: false,
      };
    }
  }

  return {
    line: -1,
    text: firstLine,
    isHash: true,
    isToc: false,
  };
}

/**
 * Iterate through a string document level two headings to find the existing style character.
 * @param {string} document 
 * @returns {string} '#' or '-' or '' if not found
 */
function findExistingStyleCharacter(document) {
  // let startIdx = 0;
  // let lineIdx = 0;
  let newlineCharIdx = document.indexOf('\n');
  let previousText = '';

  while (newlineCharIdx > -1) {
    let currentText = document.substring(0, newlineCharIdx).trim();

    if (currentText.startsWith('## ')) {
      return '#';
    }

    if (currentText.startsWith('-')
        && previousText.match(/^(?:[a-zA-Z0-9_] *?)+$/m)) {
      return '-';
    }

    // lineIdx++;
    previousText = currentText;
    document = document.substring(newlineCharIdx).trim();
    newlineCharIdx = document.indexOf('\n');
  }

  return '';
}

module.exports = {
  getSecondLevelHeading,
  getHash2LH,
  getDash2LH,
  findExistingStyleCharacter,
};
