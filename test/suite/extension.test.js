const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const findFirstSecondLevelHeading = require('../../extension-functions/find-first-second-level-heading');
const findTopHeading = require('../../extension-functions/find-top-heading');
const createTOC = require('../../extension-functions/create-toc');

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

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

  test('Finds the top heading', () => {
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

    let expected = 0;
    let actual = findTopHeading(document, expected);
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

  test('CreateTOC does NOT create a TOC without ## headings', () => {
    let testDocText =
      'First Heading\n\nSecond Heading\n\nThird Heading\n\nBad Heading\n';
    let expected = '';
    let actual = createTOC(testDocText);
    assert.strictEqual(actual, expected);
  });

  test('CreateTOC creates valid TOC entries not link fragments', () => {
    const expectedResultDashes =
      '## Table of Contents\n\n- [Second - Heading](#second---heading)\n- [Third -- Heading](#third----heading)\n- [Fourth-- Heading](#fourth---heading)\n\n';

    const dashedItem =
      '# First Heading\n\n## Second - Heading\n\n## Third -- Heading\n\n## Fourth-- Heading\n';
    assert.strictEqual(
      createTOC(dashedItem),
      expectedResultDashes,
      'dashedItem headings.'
    );

    const expectedResultColons =
      '## Table of Contents\n\n- [Second : Heading](#second--heading)\n- [Third :: Heading](#third--heading)\n- [Fourth:: Heading](#fourth-heading)\n\n';
    const colonItem =
      '# First Heading\n\n## Second : Heading\n\n## Third :: Heading\n\n## Fourth:: Heading\n';
    assert.strictEqual(
      createTOC(colonItem),
      expectedResultColons,
      'colonItem headings.'
    );

    const expectedResultCommas =
      '## Table of Contents\n\n- [Second , Heading](#second--heading)\n- [Third ,, Heading](#third--heading)\n- [Fourth,, Heading](#fourth-heading)\n\n';
    const commaItem =
      '# First Heading\n\n## Second , Heading\n\n## Third ,, Heading\n\n## Fourth,, Heading\n';
    assert.strictEqual(
      createTOC(commaItem),
      expectedResultCommas,
      'commaItem headings.'
    );

    const expectedResultPeriods =
      '## Table of Contents\n\n- [Second .Heading](#second-heading)\n- [Third .. Heading](#third--heading)\n- [Fourth. . .Heading](#fourth--heading)\n\n';
    const periodItem =
      '# First Heading\n\n## Second .Heading\n\n## Third .. Heading\n\n## Fourth. . .Heading\n';
    assert.strictEqual(
      createTOC(periodItem),
      expectedResultPeriods,
      'periodItem headings.'
    );

    const expectedResultGarbage1 =
      '## Table of Contents\n\n- [Second ,.;:[]{}!@$%^&*() Heading](#second--heading)\n\n';
    const garbageItem1 =
      '# First Heading\n\n## Second ,.;:[]{}!@$%^&*() Heading\n';
    assert.strictEqual(
      createTOC(garbageItem1),
      expectedResultGarbage1,
      'garbageItem1 headings.'
    );

    const expectedResultGarbage2 =
      '## Table of Contents\n\n- [Second ,.;:[]-{}!@$%^&*() Heading](#second---heading)\n\n';
    const garbageItem2 =
      '# First Heading\n\n## Second ,.;:[]-{}!@$%^&*() Heading\n';
    assert.strictEqual(
      createTOC(garbageItem2),
      expectedResultGarbage2,
      'garbageItem2 headings.'
    );
  });
});
