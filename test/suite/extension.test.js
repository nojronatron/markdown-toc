const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const findFirstSecondLevelHeading = require('../../extension-functions/find-first-second-level-heading');
const findTopHeading = require('../../extension-functions/find-top-heading');

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

  test('Find the top heading', () => {
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
});
