const { getTitleOnly, 
         getLoweredKebabCase, 
         getLinkFragment } = require('./process-headings');

/**
 * Generates a table of contents (TOC) based on the captured level 2 headings.
 *
 * @param {Array<{line, text, isHash}>} capturedL2Headings - An array of captured level 2 headings.
 * @returns {string} The generated table of contents.
 */
module.exports = function createTOC(capturedL2Headings) {
  let tableOfContentsHeading = 'Table of Contents';
  let tocString = '';
  let tocPrefix = '';
  let tocSuffix = '';

  if (capturedL2Headings[0].isHash) {
    tocPrefix = `## `;
    
    if (capturedL2Headings[0].isClosedAtx) {
      tocSuffix = ` ##`;
    }
  } else {
    tocSuffix = `\n-----------------`;
  }

  tocString = `${tocPrefix}${tableOfContentsHeading}${tocSuffix}\n\n`;

  capturedL2Headings.forEach((item) => {
    // call external modules to do this work
    const titleOnly = getTitleOnly(item.text);
    const loweredKebabCase = getLoweredKebabCase(titleOnly);
    const linkFragment = getLinkFragment(titleOnly, loweredKebabCase);
    tocString += linkFragment;
  });

  // be kind, leave a blank line after the table of contents
  tocString += '\n';
  return tocString;
};
