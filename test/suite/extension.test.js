const assert = require('assert');

const vscode = require('vscode');
const createTOC = require('../../extension-functions/create-toc');
const findFirstSecondLevelHeading = require('../../extension-functions/find-top-heading');

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('Finds alternate second level heading character = (equals sign)', ()=>{
    let testDocText = '- First Heading\n\n= Second Heading\n\n== Invalid Heading\n\n= Another Second Heading\n';
    let document = {
      lineCount: 8,
      lineAt: function (idx) {
        return {
          text: testDocText.split('\n')[idx],
        };
      },
    };

    let topHeading = 0;
    let expected = 2; // total second level headings using equals signs
    let actual = findFirstSecondLevelHeading(document, topHeading);
    assert.strictEqual(actual, expected);
  });

  test('Finds first second level heading', () => {
    let testDocText =
      '# First Heading\n \n## Second Heading\n \n## Third Heading\n \n### Bad Heading\n';
    let document = {
      lineCount: 7,
      lineAt: function (idx) {
        return {
          text: testDocText.split('\n')[idx],
        };
      },
    };

    let topHeading = 0; // vscode api document line numbers are zero-based
    let expected = 2;
    let actual = findFirstSecondLevelHeading(document, topHeading);
    assert.strictEqual(actual, expected);
  });

  test('CreateTOC creates a TOC with valid ## headings', () => {
    let testDocText =
      '# First Heading\n\n## Second Heading\n\n## Third Heading\n\n### Bad Heading\n';
    let expected =
      '## Table of Contents\n\n- [Second Heading](#second-heading)\n- [Third Heading](#third-heading)\n\n';
    let actual = createTOC(testDocText);
    assert.strictEqual(actual, expected);
  });

  test('CreateToc does NOT create a TOC without ## headings', () => {
    let testDocText =
      'First Heading\n\nSecond Heading\n\nThird Heading\n\nBad Heading\n';
    let expected = '';
    let actual = createToc(testDocText);
    assert.strictEqual(actual, expected);
  });

  test('CreateToc creates valid TOC entries not link fragments', () => {
    const expectedResultDashes =
      '## Table of Contents\n\n- [Second - Heading](#second---heading)\n- [Third -- Heading](#third----heading)\n- [Fourth-- Heading](#fourth---heading)\n\n';

    const dashedItem =
      '# First Heading\n\n## Second - Heading\n\n## Third -- Heading\n\n## Fourth-- Heading\n';
    assert.strictEqual(
      createToc(dashedItem),
      expectedResultDashes,
      'dashedItem headings.'
    );

    const expectedResultColons =
      '## Table of Contents\n\n- [Second : Heading](#second--heading)\n- [Third :: Heading](#third--heading)\n- [Fourth:: Heading](#fourth-heading)\n\n';
    const colonItem =
      '# First Heading\n\n## Second : Heading\n\n## Third :: Heading\n\n## Fourth:: Heading\n';
    assert.strictEqual(
      createToc(colonItem),
      expectedResultColons,
      'colonItem headings.'
    );

    const expectedResultCommas =
      '## Table of Contents\n\n- [Second , Heading](#second--heading)\n- [Third ,, Heading](#third--heading)\n- [Fourth,, Heading](#fourth-heading)\n\n';
    const commaItem =
      '# First Heading\n\n## Second , Heading\n\n## Third ,, Heading\n\n## Fourth,, Heading\n';
    assert.strictEqual(
      createToc(commaItem),
      expectedResultCommas,
      'commaItem headings.'
    );

    const expectedResultPeriods =
      '## Table of Contents\n\n- [Second .Heading](#second-heading)\n- [Third .. Heading](#third--heading)\n- [Fourth. . .Heading](#fourth--heading)\n\n';
    const periodItem =
      '# First Heading\n\n## Second .Heading\n\n## Third .. Heading\n\n## Fourth. . .Heading\n';
    assert.strictEqual(
      createToc(periodItem),
      expectedResultPeriods,
      'periodItem headings.'
    );

    const expectedResultGarbage1 =
      '## Table of Contents\n\n- [Second ,.;:[]{}!@$%^&*() Heading](#second--heading)\n\n';
    const garbageItem1 =
      '# First Heading\n\n## Second ,.;:[]{}!@$%^&*() Heading\n';
    assert.strictEqual(
      createToc(garbageItem1),
      expectedResultGarbage1,
      'garbageItem1 headings.'
    );

    const expectedResultGarbage2 =
      '## Table of Contents\n\n- [Second ,.;:[]-{}!@$%^&*() Heading](#second---heading)\n\n';
    const garbageItem2 =
      '# First Heading\n\n## Second ,.;:[]-{}!@$%^&*() Heading\n';
    assert.strictEqual(
      createToc(garbageItem2),
      expectedResultGarbage2,
      'garbageItem2 headings.'
    );
  });
});
