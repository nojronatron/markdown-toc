/**
 * Returns an object with the line number, text, and whether the heading is a hash or dash.
 * If no heading is found, the object line number will be -1.
 * @param string firstLine: The first line of text. 
 * @param number fileLineIdx: The line number of the first line of text.
 * @param string secondLine: The second line of text.
 * @param boolean isHash: True if the heading is a hash, false if it is a dash character.
 * @returns object { line: number, headingText: string, isHash: boolean }
 */
module.exports = function getSecondLevelHeading(firstLine, firstLineIdx, secondLine, isHash = true) {
  if (isHash) {
    if (firstLine.startsWith('## ')) {
        if (secondLine.length === 0
            || secondLine.match(/^(?:[a-zA-Z0-9_] *?)+$/m)) {
              const firstLineText = firstLine.substring(2, firstLine.length).trim();
          return { 
            line: firstLineIdx, headingText: firstLineText, isHash: true
        };
      }
    }
  }
  else {
    if (secondLine.startsWith('-')
        && firstLine.match(/^(?:[a-zA-Z0-9_] *?)+$/m)) {
          return { 
            line: firstLineIdx, headingText: firstLine, isHash: false
          };      
      }
    }

  return { line: -1, headingText: '', isHash: false, };
}
