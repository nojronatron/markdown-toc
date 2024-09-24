const getTitleOnly = require('./process-headings').getTitleOnly;

/**
 * Retrieves the second level heading information from the given lines of text and heading style.
 * @param {string} firstLine - The first line of text.
 * @param {number} firstLineIdx - The index of the first line.
 * @param {string} secondLine - The second line of text.
 * @param {boolean} isHash - Indicates whether the heading uses normal style ('##') or alternate style ('-').
 * @param {boolean} isClosedAtx - Indicates whether the heading uses closed ATX style (using '#' character(s) at end of heading line).
 * @returns {object} - An object containing the heading information.
 * @property {number} line - The line index of the heading.
 * @property {string} text - The text of the heading.
 * @property {boolean} isHash - Indicates whether the heading uses normal style ('##') or alternate style ('-').
 * @property {boolean} isClosedAtx - Indicates whether the heading uses closed ATX style (using '#' character(s) at end of heading line).
 * @property {boolean} isToc - Indicates whether the heading is a table of contents.
 */
function getSecondLevelHeading(firstLine, firstLineIdx, secondLine, isHash, isClosedAtx) {
  // firstLIne: string of text, firstLineIdx: Line Num of text, secondLine: string of text, isHash: '#' (true) or '-' (false) is used, isClosedAtx: ' #' (true) or '' (false) is used

  // clean title of all illegal characters
  let cleanedFirstLine = getTitleOnly(firstLine);

  if (isTableOfContents(cleanedFirstLine)) {
    return {
      line: firstLineIdx,
      text: cleanedFirstLine,
      isHash: isHash,
      isClosedAtx: isClosedAtx,
      isToc: true,
    };
  }

  if (isHash) {
    return getHash2LH(firstLine, firstLineIdx, secondLine);
  }

  if (!isHash && !isClosedAtx) {
    return getDash2LH(firstLine, firstLineIdx, secondLine);
  }

  // no matches so the line of text is something else
  return { 
    line: -1, 
    text: cleanedFirstLine, 
    isHash: isHash, 
    isClosedAtx: isClosedAtx, 
    isToc: false 
  };
}

/**
 * Check if the first line contains the text 'Table of Contents'.
 * @param {string} firstLine the text of the first line
 * @returns {boolean} true if the first line contains the text 'Table of Contents'
 */
function isTableOfContents(firstLine) {
  // if 'table of contents' is found the matcher returns an array, otherwise null
  return firstLine.match(/^.*?(?:Table of Contents).*?$/) !== null;
}

/**
 * Get the second level heading details when using open ATX style headings.
 * @param {string} firstLine 
 * @param {number} firstLineIdx 
 * @param {string} secondLine 
 * @returns {object} {line, text, isHash, isClosedAtx, isToc}
 */
function getHash2LH(firstLine, firstLineIdx) {
  // This function will not consistently find L2 headings if either line begins with a space

  const resultObj = {
    line: -1,
    text: firstLine,
    isHash: false,
    isClosedAtx: false,
    isToc: false,
  };

  // check for open ATX style
  if (firstLine.startsWith('## ')) {
    resultObj.isHash = true;

    // exclude leading hash character(s) from future substring
    let newStartIdx = 0;
    while(firstLine[newStartIdx] === '#' && newStartIdx < firstLine.length) {
        newStartIdx++;
    }

    // check for closed ATX style
    let newEndIdx = firstLine.length - 1;

    if (firstLine.substring(firstLine.length - 1) === '#') {
      resultObj.isClosedAtx = true;

      // exclude trailing hash character(s) from future substring
      while(firstLine[newEndIdx] === '#' && newEndIdx >= newStartIdx) {
        newEndIdx--;
      };
    }

    // in JS substring() method use end index not length, and end idx is exclusive
    const firstLineTextOnly = firstLine.substring(newStartIdx, ++newEndIdx).trim();
    resultObj.line = firstLineIdx;
    resultObj.text = firstLineTextOnly;
    return resultObj;
  }

  return {
    line: -1,
    text: firstLine,
    isHash: true,
    isClosedAtx: false,
    isToc: false,
  };
}

/**
 * Get the second level heading information when using alternate style headings.
 * @param {string} firstLine 
 * @param {number} firstLineIdx 
 * @param {string} secondLine 
 * @returns {object} {line, text, isHash, isClosedAtx, isToc}
 */
function getDash2LH(firstLine, firstLineIdx, secondLine) {
  const returnObj = {
    line: -1,
    text: firstLine,
    isHash: false,
    isClosedAtx: false,
    isToc: false,
  };

  // check for a dash style heading in line 2
  if (secondLine.startsWith('-')) {
    // check for text in line 1 and clean it up for future use
    if (firstLine.match(/^(?:[a-zA-Z0-9_] *?)+$/m)) {
      const firstLineText = firstLine.trim();
      returnObj.line = firstLineIdx;
      returnObj.text = firstLineText;
    }
  }

  return returnObj;
}

module.exports = {
  getSecondLevelHeading,
  getHash2LH,
  getDash2LH,
};
