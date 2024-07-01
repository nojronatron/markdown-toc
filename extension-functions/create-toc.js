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
    // Extract the level2 heading text, removing
    // characters not allowed in link fragments
    const titleOnly = item.text.replaceAll(/(?:[!@$%^&*\(\)\[\]\{\}\:';\.,~`+=\\"\|\/?])/g, '')
                               .trim();
    // Convert the heading text to kebab case
    const loweredKebabCase = item.text.toLowerCase()
                                      .replace(/\s/g, '-');
    // compose the link fragement title and anchor element
    const linkFragment = `- [${titleOnly}](#${loweredKebabCase})\n`;
    // append the link fragment to the table of contents string
    tableOfContentsString += linkFragment;
  });

  // be kind, leave a blank line after the table of contents
  tableOfContentsString += '\n';
  return tableOfContentsString;
};
