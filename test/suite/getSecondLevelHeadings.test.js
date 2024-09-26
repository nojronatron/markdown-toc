const assert = require('assert');
const { getSecondLevelHeading, getHash2LH, getDash2LH } = require('../../extension-functions/get-second-level-heading');

suite('getSecondLevelHeading Module tests', () => {
  // standard line constants for the getSecondLevelHeading function tests
  const standardLine1 = '# Top Level Heading\n';
  const standardLine2 = '## Level 2 Heading\n';
  const standardLine3 = '### Level 3 Heading\n';

  const lineMsg = 'Line number does not match.';
  const textMsg = 'Text does not match.';
  const isHashMsg = 'isHash does not match.';
  const isClosedAtxMsg = 'isClosedAtx does not match.';
  const isTocMsg = 'isToc does not match.';

  test('getSecondLevelHeading returns correct object when standard style L1 heading is passed-in', () => {
    const expectedStandard1 = { line: -1, text: '# Top Level Heading\n', isHash: true, isClosedAtx: false, isToc: false }; // the newline character is included in the text
    const actualResult1 = getSecondLevelHeading(standardLine1, 0, ' ', true, false);
    assert.strictEqual(actualResult1.line, expectedStandard1.line, lineMsg);
    assert.strictEqual(actualResult1.text, expectedStandard1.text, textMsg);
    assert.strictEqual(actualResult1.isHash, expectedStandard1.isHash, isHashMsg);
    assert.strictEqual(actualResult1.isClosedAtx, false, isClosedAtxMsg);
    assert.strictEqual(actualResult1.isToc, expectedStandard1.isToc, isTocMsg);
  });

  test('getSecondLevelHeading returns correct object when standard style L2 heading is passed-in BRAVO', () => {
    const expectedStandard2 = { line: 4, text: 'Level 2 Heading', isHash: true, isToc: false };
    const actualresult2 = getSecondLevelHeading(standardLine2, 4, '', true);
    assert.strictEqual(actualresult2.line, expectedStandard2.line, lineMsg);
    assert.strictEqual(actualresult2.text, expectedStandard2.text, textMsg);
    assert.strictEqual(actualresult2.isHash, expectedStandard2.isHash, isHashMsg);
    assert.strictEqual(actualresult2.isToc, expectedStandard2.isToc, isTocMsg);
  });

  test('getSecondLevelHeading returns correct object when standard style L2 heading is passed-in CHARLIE', () => {
    const expectedStandard3 = { line: -1, text: '### Level 3 Heading\n', isHash: true, isToc: false };
    const actualResult3 = getSecondLevelHeading(standardLine3, 8, ' ', true);
    assert.strictEqual(actualResult3.line, expectedStandard3.line, lineMsg);
    assert.strictEqual(actualResult3.text, expectedStandard3.text, textMsg);
    assert.strictEqual(actualResult3.isHash, expectedStandard3.isHash, isHashMsg);
    assert.strictEqual(actualResult3.isToc, expectedStandard3.isToc, isTocMsg);
  });

  test('getSecondLevelHeading returns correct object when standard style L2 heading is passed-in DELTA', () => {
    const expectedStandard4 = { line: -1, text: ' ', isHash: true, isToc: false };
    const actualResult4 = getSecondLevelHeading(' ', 8, standardLine2, true);
    assert.strictEqual(actualResult4.line, expectedStandard4.line, lineMsg);
    assert.strictEqual(actualResult4.text, expectedStandard4.text, textMsg);
    assert.strictEqual(actualResult4.isHash, expectedStandard4.isHash, isHashMsg);
    assert.strictEqual(actualResult4.isToc, expectedStandard4.isToc, isTocMsg);
  });

  test('getSecondLevelHeading returns correct object when alternate style L2 heading is passed-in', () => {
    const alternateLine1 = 'Top Level Heading\n';
    const alternateLine1b = '=';
    const alternateLine2 = 'Level 2 Heading\n';
    const alternateLine2b = '-';
    const alternateLine3 = 'Level 3 Heading\n';
    const alternateLine3b = '';
    const alternateLongLine = '----------------';
    const alternateDashedLine = '- --';

    // isHash is set to true by default, getSecondLevelHeading sets isHash to true even when no 2LH is found and line is set to -1
    const expectedAlt1 = { line: -1, text: 'Top Level Heading\n', isHash: false, isToc: false };
    const actualResult1 = getSecondLevelHeading(alternateLine1, 0, alternateLine1b, false);
    assert.strictEqual(actualResult1.line, expectedAlt1.line, 'line number does not match.');
    assert.strictEqual(actualResult1.text, expectedAlt1.text, 'Text does not match.');
    assert.strictEqual(actualResult1.isHash, expectedAlt1.isHash, 'isHash does not match.');
    assert.strictEqual(actualResult1.isToc, expectedAlt1.isToc, 'isToc does not match.');

    const expectedAlt2 = { line: 5, text: 'Level 2 Heading', isHash: false, isToc: false };
    const actualResult2 = getSecondLevelHeading(alternateLine2, 5, alternateLine2b, false);
    assert.strictEqual(actualResult2.line, expectedAlt2.line);
    assert.strictEqual(actualResult2.text, expectedAlt2.text);
    assert.strictEqual(actualResult2.isHash, expectedAlt2.isHash);
    assert.strictEqual(actualResult2.isToc, expectedAlt2.isToc);

    const expectedAlt3 = { line: -1, text: 'Level 3 Heading\n', isHash: false, isToc: false };
    const actualResult3 = getSecondLevelHeading(alternateLine3, 10, alternateLine3b, false);
    assert.strictEqual(actualResult3.line, expectedAlt3.line);
    assert.strictEqual(actualResult3.text, expectedAlt3.text);
    assert.strictEqual(actualResult3.isHash, expectedAlt3.isHash);
    assert.strictEqual(actualResult3.isToc, expectedAlt3.isToc);

    const expectedAlt4 = { line: 0, text: 'Level 2 Heading', isHash: false, isToc: false };
    const actualResult4 = getSecondLevelHeading(alternateLine2, 0, alternateLongLine, false);
    assert.strictEqual(actualResult4.line, expectedAlt4.line);
    assert.strictEqual(actualResult4.text, expectedAlt4.text);
    assert.strictEqual(actualResult4.isHash, expectedAlt4.isHash);
    assert.strictEqual(actualResult4.isToc, expectedAlt4.isToc);

    const expectedAlt5 = { line: 10, text: 'Level 2 Heading', isHash: false, isToc: false };
    const actualResult5 = getSecondLevelHeading(alternateLine2, 10, alternateDashedLine, false);
    assert.strictEqual(actualResult5.line, expectedAlt5.line, 'line number does not match.');
    assert.strictEqual(actualResult5.text, expectedAlt5.text, 'Text does not match.');
    assert.strictEqual(actualResult5.isHash, expectedAlt5.isHash, 'isHash does not match.');
    assert.strictEqual(actualResult5.isToc, expectedAlt5.isToc, 'isToc does not match.');
  });
});

suite('getHash2LH Function Tests', () => {
  test('Standard style L2 heading line, text, and isHash true', () => {
    const firstLine1 = '## Heading 1';
    const secondLine1 = '';
    const firstLineIdx1 = 2;
    // the standard heading style text will always be trimmed to just the text, no hashmarks
    const expected1 = { line: 2, text: 'Heading 1', isHash: true, isToc: false };

    const actual1 = getHash2LH(firstLine1, firstLineIdx1, secondLine1);
    assert.strictEqual(actual1.line, expected1.line);
    assert.strictEqual(actual1.text, expected1.text);
    assert.strictEqual(actual1.isHash, expected1.isHash);
    assert.strictEqual(actual1.isToc, expected1.isToc);
  });

  test('Standard style L2 heading line, text, and isHash true even if second line is not empty', () => {
    const firstLine2 = '## Heading 2\n';
    const secondLine2 = 'text\n';
    const firstLineIdx2 = 4;
    const expected2 = { line: 4, text: 'Heading 2', isHash: true, isToc: false };

    const actual2 = getHash2LH(firstLine2, firstLineIdx2, secondLine2);
    assert.strictEqual(actual2.line, expected2.line);
    assert.strictEqual(actual2.text, expected2.text);
    assert.strictEqual(actual2.isHash, expected2.isHash);
    assert.strictEqual(actual2.isToc, expected2.isToc);
  });

  test('Standard style L2 heading line, text, and isHash true even if firstLine has space and secondLine has newline char', () => {
    const firstLine3 = '## Heading 3 \n';
    const secondLine3 = 'text\n';
    const firstLineIdx3 = 6;
    const expected3 = { line: 6, text: 'Heading 3', isHash: true, isToc: false };

    const actual3 = getHash2LH(firstLine3, firstLineIdx3, secondLine3);
    assert.strictEqual(actual3.line, expected3.line);
    assert.strictEqual(actual3.text, expected3.text);
    assert.strictEqual(actual3.isHash, expected3.isHash);
    assert.strictEqual(actual3.isToc, expected3.isToc);
  });

  test('Standard style L2 heading line, text, and isHash true even if firstLine contains string Table of Contents and secondLine is empty', () => {
    const firstLine4 = '## Table of Contents';
    const secondLine4 = ' ';
    const firstLineIdx4 = 4;
    const expected4 = { line: 4, text: 'Table of Contents', isHash: true, isToc: false };

    const actual4 = getHash2LH(firstLine4, firstLineIdx4, secondLine4);
    assert.strictEqual(actual4.line, expected4.line, 'line number does not match.');
    assert.strictEqual(actual4.text, expected4.text, 'Text does not match.');
    assert.strictEqual(actual4.isHash, expected4.isHash, 'isHash does not match.');
    assert.strictEqual(actual4.isToc, expected4.isToc, 'isToc does not match.');
  });

  test('Missing standard style heading characters returns correct line, text, isHash, isClosedAtx, and isToc', () => {
    const firstLine5 = 'Heading 5';
    const secondLine5 = '';
    const firstLineIdx5 = 0;
    const expected5 = { line: -1, text: 'Heading 5', isHash: true, isClosedAtx: false, isToc: false };

    const actual5 = getHash2LH(firstLine5, firstLineIdx5, secondLine5);
    assert.strictEqual(actual5.line, expected5.line, 'line number does not match.');
    assert.strictEqual(actual5.text, expected5.text, 'Text does not match.');
    assert.strictEqual(actual5.isHash, expected5.isHash, 'isHash does not match.');
    assert.strictEqual(actual5.isToc, expected5.isToc, 'isToc does not match.');
  });
});

suite('getDash2LH Function Tests', () => {
  test('Alternate style L2 heading with following line of same-number dash characters returns correct line, text, isHash, and isToc', () => {
    const firstLine1 = 'Heading 1';
    const secondLine1 = '---------';
    const firstLineIdx1 = 0;
    const expected1 = { line: 0, text: 'Heading 1', isHash: false, isToc: false };

    const actual1 = getDash2LH(firstLine1, firstLineIdx1, secondLine1);
    assert.strictEqual(actual1.line, expected1.line, 'line number does not match.');
    assert.strictEqual(actual1.text, expected1.text, 'Text does not match.');
    assert.strictEqual(actual1.isHash, expected1.isHash, 'isHash does not match.');
    assert.strictEqual(actual1.isToc, expected1.isToc, 'isToc does not match.');
  });
  
  test('Alternate style L2 heading with single dash character returns correct line, text, isHash, and isToc', ()=>{
    const firstLine2 = 'Heading 2';
    const secondLine2 = '-';
    const firstLineIdx2 = 0;
    const expected2 = { line: 0, text: 'Heading 2', isHash: false, isToc: false };

    const actual2 = getDash2LH(firstLine2, firstLineIdx2, secondLine2);
    assert.strictEqual(actual2.line, expected2.line, 'line number does not match.');
    assert.strictEqual(actual2.text, expected2.text, 'Text does not match.');
    assert.strictEqual(actual2.isHash, expected2.isHash, 'isHash does not match.');
    assert.strictEqual(actual2.isToc, expected2.isToc, 'isToc does not match.');
  });

  test('Missing alternate style heading characters returns correct line, text, isHash, isClosedAtx, and isToc', () => {
    const firstLine3 = 'Heading 3';
    const secondLine3 = '';
    const firstLineIdx3 = 0;
    const expected3 = { line: -1, text: 'Heading 3', isHash: false, isClosedAtx: false, isToc: false };

    const actual3 = getDash2LH(firstLine3, firstLineIdx3, secondLine3);
    assert.strictEqual(actual3.line, expected3.line, 'line number does not match.');
    assert.strictEqual(actual3.text, expected3.text, 'Text does not match.');
    assert.strictEqual(actual3.isHash, expected3.isHash, 'isHash does not match.');
    assert.strictEqual(actual3.isToc, expected3.isToc, 'isToc does not match.');
  });

  test('getDash2LH returns alternate style L2 heading line 2, correct Text, and second line dash character', () => {
    const firstLine1 = 'Heading 1';
    const firstLineIdx1 = 2;
    const secondLine1 = '-';
    // the standard heading style text will always be trimmed to just the text, no hashmarks
    const expected1 = { line: 2, text: 'Heading 1', isHash: false, isClosedAtx: false, isToc: false };

    const actual1 = getDash2LH(firstLine1, firstLineIdx1, secondLine1);
    assert.strictEqual(actual1.line, expected1.line);
    assert.strictEqual(actual1.text, expected1.text);
    assert.strictEqual(actual1.isHash, expected1.isHash);
    assert.strictEqual(actual1.isToc, expected1.isToc);
  });

  test('getDash2LH returns alternate style L2 heading line 4, correct Text, and second line dash character', () => {
    const firstLine2 = 'Heading 2\n';
    const secondLine2 = '---------';
    const firstLineIdx2 = 4;
    const expected2 = { line: 4, text: 'Heading 2', isHash: false, isToc: false };

    const actual2 = getDash2LH(firstLine2, firstLineIdx2, secondLine2);
    assert.strictEqual(actual2.line, expected2.line);
    assert.strictEqual(actual2.text, expected2.text);
    assert.strictEqual(actual2.isHash, expected2.isHash);
    assert.strictEqual(actual2.isToc, expected2.isToc);
  });

  test('getDash2LH returns alternate style L2 heading line 6, correct Text, and second line dash character', () => {
    const firstLine3 = 'Heading 3';
    const secondLine3 = '------- -\n';
    const firstLineIdx3 = 6;
    const expected3 = { line: 6, text: 'Heading 3', isHash: false, isToc: false };

    const actual3 = getDash2LH(firstLine3, firstLineIdx3, secondLine3);
    assert.strictEqual(actual3.line, expected3.line);
    assert.strictEqual(actual3.text, expected3.text);
    assert.strictEqual(actual3.isHash, expected3.isHash);
    assert.strictEqual(actual3.isToc, expected3.isToc);
  });

  test('getDash2LH returns alternate style L2 heading line 5, correct Text, and second line dash even if string is Table of Contents', () => {
    const firstLine4 = 'Table of Contents\n';
    const secondLine4 = '-----------------\n';
    const firstLineIdx4 = 5;
    const expected4 = { line: 5, text: 'Table of Contents', isHash: false, isClosedAtx: false, isToc: false };

    const actual4 = getDash2LH(firstLine4, firstLineIdx4, secondLine4);
    assert.strictEqual(actual4.line, expected4.line);
    assert.strictEqual(actual4.text, expected4.text);
    assert.strictEqual(actual4.isHash, expected4.isHash);
    assert.strictEqual(actual4.isToc, expected4.isToc);
  });
});
