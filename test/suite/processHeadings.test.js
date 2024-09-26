const assert = require('assert');
const {
  getTitleOnly,
  getLoweredKebabCase,
  getLinkFragment
} = require('../../extension-functions/process-headings');

suite('process-headings module tests', () => {
  // global variables: input headings
  const firstOpenAtxHeading = '## First 2H Heading';
  const firstClosedAtxHeading = '## First 2H Heading ##';

  const secondOpenAtxHeading = '## Second  2H  Heading';
  const secondClosedAtxHeading = '## Second  2H  Heading ##';

  const thirdOpenAtxHeading = '## Third   2H   Heading  ';
  const thirdClosedAtxHeading = '## Third   2H   Heading  ##';

  const dotNetOpenAtxHeading = '## Dotnet.net';
  const dotNetClosedAtxHeading = '## Dotnet.net ##';

  const itemsToDosOpenAtxHeading = '## Items / Todos';
  const itemsToDosClosedAtxHeading = '## Items / Todos ##';

  const aspnetCoreOpenAtxHeading = '## Aspnetcore, Blazor';
  const aspnetCoreClosedAtxHeading = '## Aspnetcore, Blazor ##';

  const underscoreLowerCaseCharOpenAtxHeading = '## Underscore_lowercase Character';
  const underscoreLowerCaseCharClosedAtxHeading = '## Underscore_lowercase Character ##';

  const illegalCharactersOpenAtxHeading = '## Illegal _ - < > Characters';
  const illegalCharactersClosedAtxHeading = '## Illegal _ - < > Characters ##';

  // global variables: expected heading texts without heading characters or illegal characters
  const expectedFirstHeading = 'First 2H Heading';
  const expectedSecondHeading = 'Second  2H  Heading';
  const expectedThirdHeading = 'Third   2H   Heading  ';
  const expectedDotNetHeading = 'Dotnet.net';
  const expectedItemsTodosHeading = 'Items / Todos';
  const expectedAspnetCoreHeading = 'Aspnetcore, Blazor';
  const expectedUnderscoreLowerCaseChar = 'Underscore_lowercase Character';
  const expectedIllegalCharactersHeading = 'Illegal _ -   Characters';

  // global variables: expected lowered-kebab-case headings
  const expectedFirstLoweredKebabHeading = 'first-2h-heading';
  const expectedSecondLoweredKebabHeading = 'second--2h--heading';
  const expectedThirdLoweredKebabHeading = 'third---2h---heading';
  const expectedDotnetNetLoweredKebabHeading = 'dotnetnet';
  const expectedItemsTodosLoweredKebabHeading = 'items--todos';
  const expectedAspnetCoreLoweredKebabHeading = 'aspnetcore-blazor';
  const expectedUnderscoreLoweredKebabCaseChar = 'underscore_lowercase-character';
  const expectedIllegalCharactersLoweredKebab = 'illegal-_-----characters';

  // global variables: expected table of content entries
  const expectedFirstTocResult = '- [First 2H Heading](#first-2h-heading)\n';
  const expectedSecondTocResult = '- [Second  2H  Heading](#second--2h--heading)\n';
  const expectedThirdTocResult = '- [Third   2H   Heading  ](#third---2h---heading)\n';
  const expectedDotnetNetTocResult = '- [Dotnet.net](#dotnetnet)\n';
  const expectedItemsTodosTocResult = '- [Items / Todos](#items--todos)\n';
  const expectedAspnetCoreTocResult = '- [Aspnetcore, Blazor](#aspnetcore-blazor)\n';
  const expectedUnderscoreLowerCharTocResult = '- [Underscore_lowercase Character](#underscore_lowercase-character)\n';
  const expectedIllegalCharsTocResult = '- [Illegal Characters](#illegal-_-----characters)\n';

  test('Get title only from a string of text', () => {
    assert.strictEqual(getTitleOnly(firstOpenAtxHeading), firstOpenAtxHeading, 'firstOpenAtxHeading title does not match.');
    assert.strictEqual(getTitleOnly(firstClosedAtxHeading), firstClosedAtxHeading,  'firstClosedAtxHeading title does not match.');
    assert.strictEqual(getTitleOnly(secondOpenAtxHeading), secondOpenAtxHeading, 'secondOpenAtxHeading title does not match.');
    assert.strictEqual(getTitleOnly(secondClosedAtxHeading), secondClosedAtxHeading, 'secondClosedAtxHeading title does not match.');
    assert.strictEqual(getTitleOnly(thirdOpenAtxHeading), thirdOpenAtxHeading.trim(), 'thirdOpenAtxHeading title does not match.');
    assert.strictEqual(getTitleOnly(thirdClosedAtxHeading), thirdClosedAtxHeading, 'thirdClosedAtxHeading title does not match.');
    assert.strictEqual(getTitleOnly(dotNetOpenAtxHeading), '## ' + expectedDotNetHeading, 'dotNetOpenAtxHeading with leading ## does not match.');
    assert.strictEqual(getTitleOnly(dotNetClosedAtxHeading), '## ' + expectedDotNetHeading + ' ##', 'dotNetClosedAtxHeading with leading and trailing ## does not match.');
    assert.strictEqual(getTitleOnly(itemsToDosOpenAtxHeading), '## ' + expectedItemsTodosHeading, 'The title should be ## Items / Todos');
    assert.strictEqual(getTitleOnly(itemsToDosClosedAtxHeading), '## ' + expectedItemsTodosHeading + ' ##', 'The title should be ## Items / Todos ##');
    assert.strictEqual(getTitleOnly(aspnetCoreOpenAtxHeading), '## ' + expectedAspnetCoreHeading, 'The title should be ## Aspnetcore, Blazor');
    assert.strictEqual(getTitleOnly(aspnetCoreClosedAtxHeading), '## ' + expectedAspnetCoreHeading + ' ##', 'The title should be ## Aspnetcore, Blazor ##');
    assert.strictEqual(getTitleOnly(underscoreLowerCaseCharOpenAtxHeading), '## ' + expectedUnderscoreLowerCaseChar, 'The title should be ## Underscore_lowercase Character');
    assert.strictEqual(getTitleOnly(underscoreLowerCaseCharClosedAtxHeading), '## ' + expectedUnderscoreLowerCaseChar + ' ##', 'The title should be ## Underscore_lowercase Character ##');
    assert.strictEqual(getTitleOnly(illegalCharactersOpenAtxHeading), '## ' + expectedIllegalCharactersHeading, 'The title should be ## Illegal Characters');
    assert.strictEqual(getTitleOnly(illegalCharactersClosedAtxHeading), '## ' + expectedIllegalCharactersHeading + ' ##', 'The title should be ## Illegal Characters ##');
  });

  test('Get lower-kebab-case version of input text', () => {
    assert.strictEqual(getLoweredKebabCase(expectedFirstHeading), expectedFirstLoweredKebabHeading);
    assert.strictEqual(getLoweredKebabCase(expectedSecondHeading), expectedSecondLoweredKebabHeading);
    assert.strictEqual(getLoweredKebabCase(expectedThirdHeading), expectedThirdLoweredKebabHeading);
    assert.strictEqual(getLoweredKebabCase(expectedDotNetHeading), expectedDotnetNetLoweredKebabHeading);
    assert.strictEqual(getLoweredKebabCase(expectedItemsTodosHeading), expectedItemsTodosLoweredKebabHeading);
    assert.strictEqual(getLoweredKebabCase(expectedAspnetCoreHeading), expectedAspnetCoreLoweredKebabHeading);
    assert.strictEqual(getLoweredKebabCase(expectedUnderscoreLowerCaseChar), expectedUnderscoreLoweredKebabCaseChar);
    assert.strictEqual(getLoweredKebabCase(expectedIllegalCharactersHeading), expectedIllegalCharactersLoweredKebab);
  });

  test('Get valid link fragment from a title string and a lowered-kebab-case string', () => {
    assert.strictEqual(getLinkFragment(expectedFirstHeading, expectedFirstLoweredKebabHeading), expectedFirstTocResult);
    assert.strictEqual(getLinkFragment(expectedSecondHeading, expectedSecondLoweredKebabHeading), expectedSecondTocResult);
    assert.strictEqual(getLinkFragment(expectedThirdHeading, expectedThirdLoweredKebabHeading), expectedThirdTocResult, 'Third ToC Fragment does not match (missing the trailing spaces?)');
    assert.strictEqual(getLinkFragment(expectedDotNetHeading, expectedDotnetNetLoweredKebabHeading), expectedDotnetNetTocResult);
    assert.strictEqual(getLinkFragment(expectedItemsTodosHeading, expectedItemsTodosLoweredKebabHeading), expectedItemsTodosTocResult);
    assert.strictEqual(getLinkFragment(expectedAspnetCoreHeading, expectedAspnetCoreLoweredKebabHeading), expectedAspnetCoreTocResult);
    assert.strictEqual(getLinkFragment(expectedUnderscoreLowerCaseChar, expectedUnderscoreLoweredKebabCaseChar), expectedUnderscoreLowerCharTocResult);
    assert.notStrictEqual(getLinkFragment(expectedIllegalCharactersHeading, expectedIllegalCharactersLoweredKebab), expectedIllegalCharsTocResult, 'Illegal characters are stripped from the title and/or link fragment but should not be.');
  });

  test('Parens should not break link frag anchorings', () => {
    // remember: CreateToc will have the getHash2LH or getDash2LH title versions which do not include leading or trailing characters
    // regex to match the link fragment
    const regex = /\- \[Parentheses \( \)\]\(#parentheses\-\-\)/g;

    const parensOpenAtxHeading = 'Parentheses ( )';
    const expectedOpenAtxParensHeading = 'Parentheses ( )';

    const parensClosedAtxHeading = 'Parentheses ( )';
    const expectedClosedAtxParensHeading = 'Parentheses ( )';

    const parensNextLineHeading = 'Parentheses ( )';
    const expectedNextLineParensHeading = 'Parentheses ( )';

    const expectedParensLoweredKebabHeading = 'parentheses--';
    const expectedParensTocResult = '- [Parentheses ( )](#parentheses--)';

    assert.strictEqual(getTitleOnly(parensOpenAtxHeading), expectedOpenAtxParensHeading, 'The OpenAtx title should be Parentheses ( )');
    assert.strictEqual(getLoweredKebabCase(expectedOpenAtxParensHeading), expectedParensLoweredKebabHeading, 'The OpenAtx lowered-kebab-case should be parentheses--');
    const actualOpenAtxLinkFragment = getLinkFragment(expectedOpenAtxParensHeading, expectedParensLoweredKebabHeading);
    assert.ok(actualOpenAtxLinkFragment.match(regex), 'The OpenAtx link fragment should be - [Parentheses ( )](#parentheses--)');

    assert.strictEqual(getTitleOnly(parensClosedAtxHeading), expectedClosedAtxParensHeading, 'The ClosedAtx title should be Parentheses ( )');
    assert.strictEqual(getLoweredKebabCase(expectedClosedAtxParensHeading), expectedParensLoweredKebabHeading, 'The ClosedAtx lowered-kebab-case should be parentheses--');
    const actualClosedAtxLinkFragment = getLinkFragment(expectedClosedAtxParensHeading, expectedParensLoweredKebabHeading);
    assert.ok(actualClosedAtxLinkFragment.match(regex), 'The ClosedAtx link fragment should be - [Parentheses ( )](#parentheses--)');

    assert.strictEqual(getTitleOnly(parensNextLineHeading), expectedNextLineParensHeading, 'The NextLine title should be Parentheses ( )');
    assert.strictEqual(getLoweredKebabCase(expectedNextLineParensHeading), expectedParensLoweredKebabHeading, 'The NextLine lowered-kebab-case should be parentheses--');
    const actualNextLineLinkFragment = getLinkFragment(expectedNextLineParensHeading, expectedParensLoweredKebabHeading);
    assert.ok(actualNextLineLinkFragment.match(regex), expectedParensTocResult, 'The NextLine link fragment should be - [Parentheses ( )](#parentheses--)');
  });

});
