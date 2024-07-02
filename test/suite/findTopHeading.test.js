const assert = require('assert');
const findTopHeading = require('../../extension-functions/find-top-heading');

suite('findTopHeading tests', () => {
  test('should return the correct first level heading using standard heading style in a markdown document', () => {
    const markdown = '# Heading 1\n## Heading 2\n### Heading 3\n';
    const expected = { line: 0, text: '# Heading 1', isHash: true, isToc: false };
    const actual = findTopHeading(markdown);
    assert.strictEqual(actual.line, expected.line);
    assert.strictEqual(actual.text, expected.text);
    assert.strictEqual(actual.isHash, expected.isHash);
    assert.strictEqual(actual.isToc, expected.isToc);
  });

  test('should return correct first level standard heading even if not before child headings', ()=> {
    const markdown = '## Heading 1\n### Heading 2\n# Heading 3\ntext\n';
    const expected =  { line: 2, text: '# Heading 3', isHash: true, isToc: false };
    const actual = findTopHeading(markdown);
    assert.strictEqual(actual.line, expected.line);
    assert.strictEqual(actual.text, expected.text);
    assert.strictEqual(actual.isHash, expected.isHash);
    assert.strictEqual(actual.isToc, expected.isToc);
  });

  test('should return correct first level standard heading even when between child headings', ()=> {
    const markdown = '### Heading 1\n# Heading 2\n## Heading 3\n';
    const expected =  { line: 1, text: '# Heading 2', isHash: true, isToc: false };
    const actual = findTopHeading(markdown);
    assert.strictEqual(actual.line, expected.line);
    assert.strictEqual(actual.text, expected.text);
    assert.strictEqual(actual.isHash, expected.isHash);
    assert.strictEqual(actual.isToc, expected.isToc);
  });

  test('should return the correct H1 at top of a markdown document using alternate heading style', ()=> {
    const markdown = 'Heading 1\n=\n\nHeading 2\n-\n\nHeading 3\n-\n\n';
    const expected = {line: 1, text: 'Heading 1', isHash: false, isToc: false };
    const actual = findTopHeading(markdown);
    assert.strictEqual(actual.line, expected.line);
    assert.strictEqual(actual.text, expected.text);
    assert.strictEqual(actual.isHash, expected.isHash);
    assert.strictEqual(actual.isToc, expected.isToc);
  });

  test('should return the correct H1 near middle of a markdown document using alternate heading style', ()=> {
    const markdown = 'text text text\n\ntext text\ntext\n\nHeading 1\n=\n\ntext\n\ntext\n-\n\n';
    // note: findTopHeading uses trim() which removes whitespaces and line-end characters
    const expected = { line: 4, text: 'Heading 1', isHash: false, isToc: false };
    const actual = findTopHeading(markdown);
    assert.strictEqual(actual.line, expected.line);
    assert.strictEqual(actual.text, expected.text);
    assert.strictEqual(actual.isHash, expected.isHash);
    assert.strictEqual(actual.isToc, expected.isToc);
  });

  test('should return the correct H1 near the end of a markdown document using alternate heading style',()=>{
    const markdown = 'Heading 1\n-\n\nHeading 2\n-\nHeading 3\n=\n\ntext\n';
    const expected = {line: 5, text: 'Heading 3', isHash: false, isToc: false };
    const actual = findTopHeading(markdown);
    assert.strictEqual(actual.line, expected.line);
    assert.strictEqual(actual.text, expected.text);
    assert.strictEqual(actual.isHash, expected.isHash);
    assert.strictEqual(actual.isToc, expected.isToc);
  });

  test('should not find a first level heading if one does not exist in the markdown', () => {
    const expected = { line: -1, text: '', isHash: true, isToc: false };
    const markdown1 = 'Heading 1\n-\n\ntext\n\nHeading2\n--\n\ntext\n\n';
    const actual1 = findTopHeading(markdown1);

    assert.strictEqual(actual1.line, expected.line);
    assert.strictEqual(actual1.text, expected.text);
    assert.strictEqual(actual1.isHash, expected.isHash);
    assert.strictEqual(actual1.isToc, expected.isToc);

    const markdown2 = '## Heading 1\ntext\n## Heading2\ntext\n\n## Heading 3\n\ntext\n\n\n';
    const actual2 = findTopHeading(markdown2);

    assert.strictEqual(actual2.line, expected.line);
    assert.strictEqual(actual2.text, expected.text);
    assert.strictEqual(actual2.isHash, expected.isHash);
    assert.strictEqual(actual2.isToc, expected.isToc);

    const markdown3 = '';
    const actual3 = findTopHeading(markdown3);
    assert.strictEqual(actual3.line, expected.line);
    assert.strictEqual(actual3.text, expected.text);
    assert.strictEqual(actual3.isHash, expected.isHash);
    assert.strictEqual(actual3.isToc, expected.isToc);
  });
});