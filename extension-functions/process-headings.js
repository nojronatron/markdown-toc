/**
 * Extracts the level2 heading text and removes '<', '>', and ':' characters.
 * 
 * @param {string} itemText - The input text to process.
 * @returns {string} The processed and trimmed title.
 */
const getTitleOnly = function(itemText) {
// Extract the level2 heading text
if (itemText.length < 1) {
    return 'No Heading Text';
  }

  const cleanedItemText = itemText.replaceAll(/<|>|:/g, '');
  const trimmedTitle = cleanedItemText.trim();
  return trimmedTitle;
}

/**
 * Removes illegal characters and returns the Heading Text to lower-kebab-case string.
 *
 * @param {string} itemText - The input Heading Text.
 * @returns {string} The lower-kebab-case string.
 */
const getLoweredKebabCase = function(itemText) {
  // Remove illegal characters, replace spaces with dashes, and convert the input text to lower-kebab-case
  const cleanedItemText = itemText.replaceAll(/(?:[#!@\$%\^&*'";,~`\.\+=\(\)\[\]\{\}\<\>\:\\\|\/\?])/g, '');
  const trimmedItemText = cleanedItemText.trim();
  const loweredcase = trimmedItemText.toLowerCase();
  const loweredKebabCase = loweredcase.replaceAll(/\s/g, '-');
  return loweredKebabCase;
}

/**
 * Generates a link fragment for a given title and lowered kebab case string.
 *
 * @param {string} titleOnlyString - The title of the link.
 * @param {string} loweredKebabCaseString - The lowered kebab case string used as the link fragment.
 * @returns {string} The generated link fragment.
 */
const getLinkFragment = function(titleOnlyString, loweredKebabCaseString) {
  // Concatenate the strings Title and LoweredKebabCase to a valid link fragment
  const linkFragment = `- [${titleOnlyString}](#${loweredKebabCaseString})\n`;
  return linkFragment;
}

module.exports = {
  getTitleOnly,
  getLoweredKebabCase,
  getLinkFragment
}
