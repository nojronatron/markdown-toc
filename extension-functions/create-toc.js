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
  let tableOfContentsHeading = 'Table of Contents\n';
  let tableOfContentsString = '';

  if (capturedL2Headings[0].isHash) {
    tableOfContentsString = `## ${tableOfContentsHeading}\n`;  
  } else {
    tableOfContentsString = `${tableOfContentsHeading}-----------------\n\n`;
  }
  
  capturedL2Headings.forEach((item) => {
    // call external modules to do this work
    const titleOnly = getTitleOnly(item.text);
    const loweredKebabCase = getLoweredKebabCase(titleOnly);
    const linkFragment = getLinkFragment(titleOnly, loweredKebabCase);
    tableOfContentsString += linkFragment;
  });

  // be kind, leave a blank line after the table of contents
  tableOfContentsString += '\n';
  return tableOfContentsString;
};
