/**
 * Function creates and returns a String representation of a table of contents.
 * @param {String} capturedDocument The document text captured from the first second level heading to the end of the document.
 * @returns String The table of contents.
 */
module.exports = function createTOC(capturedDocument) {
  let result = '';

  const capturedL2Headings = capturedDocument.match(/^#{2}\s(?:.+)+$/gm);

  if (!capturedL2Headings || capturedL2Headings.Length == 0) {
    return result;
  }

  let tocContents = '## Table of Contents\n\n';

  capturedL2Headings.forEach((item) => {
    // Extract the level2 heading text
    const titleOnly = `${item.substring(3)}`;
    // strip-out characters that cause link fragments to fail
    const cleanedTitle = titleOnly.replaceAll(
      /(?:[!@$%^&*\(\)\[\]\{\}\:';\.,~`+=\\"\|\/?])/g,
      ''
    );
    // trim any starting or trailing whitespace
    const trimmedTitle = cleanedTitle.trim();
    // Create the kebab-case version of the title
    const loweredKebabCase = trimmedTitle.toLowerCase().replace(/\s/g, '-');
    // Create the TOC entry
    const tocEntry = `- [${titleOnly}](#${loweredKebabCase})\n`;
    // Add to the tocContents string
    tocContents += tocEntry;
  });

  tocContents += '\n';
  return tocContents;
};
