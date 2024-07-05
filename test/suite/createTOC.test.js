const assert = require('assert');
const createTOC = require('../../extension-functions/create-toc');

suite('createTOC Module tests', () => {
  test('createTOC generates a table of contents based on an array of headings and the standard heading style character', () => {
    const hashTocHeading = '## Table of Contents\n\n';
    const useHashCharacter = true;

    const headings1a = {line: 4, text: 'First 2H Heading', isHash: useHashCharacter, isToc: false };
    const headings1b = {line: 8, text: 'Second 2H Heading', isHash: useHashCharacter, isToc: false };
    const headings1c = {line: 12, text: 'Third 2H Heading', isHash: useHashCharacter, isToc: false };

    const expectedToc1 = hashTocHeading + '- [First 2H Heading](#first-2h-heading)\n- [Second 2H Heading](#second-2h-heading)\n- [Third 2H Heading](#third-2h-heading)\n\n';

    const arrayOfHeadings1 = [headings1a, headings1b, headings1c];
    const actualToc1 = createTOC(arrayOfHeadings1);

    assert.strictEqual(actualToc1, expectedToc1);
  });

  test('createTOC generates a table of contents based on an array of headings and the alternate heading style character', ()=>{
    const dashTocHeading = 'Table of Contents\n-----------------\n\n';
    const useHashCharacter = false; // use dash character

    const headings1a = {line: 5, text: 'First 2H Heading', isHash: useHashCharacter, isToc: false };
    const headings1b = {line: 10, text: 'Second 2H Heading', isHash: useHashCharacter, isToc: false };
    const headings1c = {line: 15, text: 'Third 2H Heading', isHash: useHashCharacter, isToc: false };

    const expectedToc1 = dashTocHeading + '- [First 2H Heading](#first-2h-heading)\n- [Second 2H Heading](#second-2h-heading)\n- [Third 2H Heading](#third-2h-heading)\n\n';

    const arrayOfHeadings1 = [headings1a, headings1b, headings1c];
    const actualToc1 = createTOC(arrayOfHeadings1);

    assert.strictEqual(actualToc1, expectedToc1);
  });
});
