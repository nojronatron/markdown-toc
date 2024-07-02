const assert = require('assert');
const findTopHeading = require('../../extension-functions/find-top-heading');

describe('findTopHeading tests', () => {
  it('should return the correct first level heading using standard heading style in a markdown document', () => {
    // Test case 1
    const markdown1 = '# Heading 1\n## Heading 2\n### Heading 3';
    const expected1 = 'Heading 1';
    assert.strictEqual(findTopHeading(markdown1), { line: 0, text: expected1, isHash: true, isToc: false});

    // Test case 2
    const markdown2 = '## Heading 2\n### Heading 3\n# Heading 4';
    const expected2 = 'Heading 4';
    assert.strictEqual(findTopHeading(markdown2), { line: 2, text: expected2, isHash: true, isToc: false});

    // Test case 3
    const markdown3 = '### Heading 3\n# Heading 4\n## Heading 5';
    const expected3 = 'Heading 4';
    assert.strictEqual(findTopHeading(markdown3), { line: 2, text: expected3, isHash: true, isToc: false});
  });

  it('should return the correct first level heading using alternate heading style in a markdown document', ()=> {
    // Test case 1
    const markdown1 = 'Heading 1\n=\n\nHeading 2\n-\n\nHeading 3\n-\n\n';
    const expected1 = 'Heading 1';
    assert.strictEqual(findTopHeading(markdown1), { line: 0, text: expected1, isHash: false, isToc: false});

    // Test case 2
    const markdown2 = 'text text text\n\ntext text\ntext\n\nHeading 1\n=\n\ntext\n\ntext\n-\n\n';
    const expected2 = 'Heading 1';
    assert.strictEqual(findTopHeading(markdown2), { line: 5, text: expected2, isHash: false, isToc: false});

    // Test case 3
    const markdown3 = 'Heading 1\n-\n\nHeading 2\n-\nHeading 3\n=\n\ntext\n';
    const expected3 = 'Heading 3';
    assert.strictEqual(findTopHeading(markdown3), { line: 5, text: expected3, isHash: false, isToc: false});
  });

  it('should not find a first level heading if one does not exist in the markdown', () => {
    const expected = { line: -1, text: '', isHash: true, isToc: false };

    const markdown1 = 'Heading 1\n-\n\ntext\n\nHeading2\n--\n\ntext\n\n';
    assert.strictEqual(findTopHeading(markdown1), expected);

    const markdown2 = '## Heading 1\ntext\n## Heading2\ntext\n\n## Heading 3\n\ntext\n\n\n';
    assert.strictEqual(findTopHeading(markdown2), expected);

    const markdown3 = '';
    assert.strictEqual(findTopHeading(markdown3), expected);
  });
});