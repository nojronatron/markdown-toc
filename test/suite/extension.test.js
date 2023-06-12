const assert = require('assert');
const createTOC = require('../extension-functions/create-toc');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  let helloWorld =
    '# First Heading\n\n## Second Heading\n\n## Third Heading\n\n### Bad Heading\n';
  let helloWorldToc =
    '# First Heading\n\n## Table of Contents\n\n- [Second Heading](#second-heading)\n- [Third Heading](#third-heading)\n\n## Second Heading\n\n## Third Heading\n\n### Bad Heading\n';

  let noHeadings =
    'First Heading\n\nSecond Heading\n\nThird Heading\n\nBad Heading\n';
  let noHeadingsToc = '';

  test('Create TOC', () => {
    assert.strictEqual(createTOC(helloWorld), helloWorldToc);
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });
});
