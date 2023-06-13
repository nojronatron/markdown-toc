const { expect } = require('@jest/globals');
const path = require('path');

const functionsRoot = path.resolve(__dirname, '../../extension-functions');
const createTOC = require(path.resolve(functionsRoot, 'create-toc.js'));

describe('unit test extension functions', () => {
  let helloWorld =
    '# First Heading\n\n## Second Heading\n\n## Third Heading\n\n### Bad Heading\n';
  let helloWorldToc =
    '## Table of Contents\n\n- [Second Heading](#second-heading)\n- [Third Heading](#third-heading)\n';
  let noHeadings =
    'First Heading\n\nSecond Heading\n\nThird Heading\n\nBad Heading\n';
  let noHeadingsToc = '';

  test('Creates TOC with valid ## headings', () => {
    expect(createTOC(helloWorld)).toMatch(helloWorldToc);
  });

  test('Does NOT create TOC without ## headings', () => {
    expect(createTOC(noHeadings)).toMatch(noHeadingsToc);
  });
});
