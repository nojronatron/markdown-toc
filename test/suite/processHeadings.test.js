const assert = require('assert');
const {
  getTitleOnly,
  getLoweredKebabCase,
  getLinkFragment
} = require('../../extension-functions/process-headings');

suite('process-headings module tests', () => {
  // global variables: input headings
  const firstHeading = 'First 2H Heading';
  const secondHeading = 'Second  2H  Heading';
  const thirdHeading = 'Third   2H   Heading  ';
  const dotNetHeading = 'Dotnet.net';
  const itemsTodosHeading = 'Items / Todos';
  const aspnetCoreHeading = 'Aspnetcore, Blazor';
  const underscoreLowerCaseChar = 'Underscore_lowercase Character';
  const illegalCharacters = 'Illegal _ - < > Characters';

  // global variables: expected title only headings
  const expectedFirstHeading = firstHeading;
  const expectedSecondHeading = secondHeading;
  const expectedThirdHeading = thirdHeading;
  const expectedDotNetHeading = dotNetHeading;
  const expectedItemsTodosHeading = itemsTodosHeading;
  const expectedAspnetCoreHeading = aspnetCoreHeading;
  const expectedUnderscoreLowerCaseChar = underscoreLowerCaseChar;
  const expectedIllegalCharactersHeading = 'Illegal _ -   Characters';

  // global variables: expected lowered-kebab-case headings
  const expectedFirstLoweredKebabHeading = 'first-2h-heading';
  const expectedSecondLoweredKebabHeading = 'second--2h--heading';
  const expectedThirdLoweredKebabHeading = 'third---2h---heading';
  const expectedDotnetNetLoweredKebabHeading = 'dotnetnet';
  const expectedItemsTodosLoweredKebabHeading = 'items--todos';
  const expectedAspnetCoreLoweredKebabHeading = 'aspnetcore-blazor';
  const expectedUnderscoreLoweredKebabCaseChar = 'underscore_lowercase-character'; // common failed test
  const expectedIllegalCharactersLoweredKebab = 'illegal-_-----characters';

  // global variables: expected table of content entries
  const expectedFirstTocResult = '- [First 2H Heading](#first-2h-heading)\n';
  const expectedSecondTocResult = '- [Second  2H  Heading](#second--2h--heading)\n';
  const expectedThirdTocResult = '- [Third   2H   Heading](#third---2h---heading)\n';
  const expectedDotnetNetTocResult = '- [Dotnet.net](#dotnetnet)\n';
  const expectedItemsTodosTocResult = '- [Items / Todos](#items--todos)\n';
  const expectedAspnetCoreTocResult = '- [Aspnetcore, Blazor](#aspnetcore-blazor)\n';
  const expectedUnderscoreLowerCharTocResult = '- [Underscore_lowercase Character](#underscore_lowercase-character)\n';
  const expectedIllegalCharsTocResult = '- [Illegal Characters](#illegal-_-----characters)\n';

  test('Get title only from a string of text', () => {
    assert.strictEqual(getTitleOnly(dotNetHeading), expectedDotNetHeading);
    assert.strictEqual(getTitleOnly(itemsTodosHeading), expectedItemsTodosHeading);
    assert.strictEqual(getTitleOnly(aspnetCoreHeading), expectedAspnetCoreHeading);
    assert.strictEqual(getTitleOnly(underscoreLowerCaseChar), expectedUnderscoreLowerCaseChar);
    assert.strictEqual(getTitleOnly(illegalCharacters), expectedIllegalCharactersHeading);
  });

  test('Get lower-kebab-case version of input text', () => {
    assert.strictEqual(getLoweredKebabCase(firstHeading), expectedFirstLoweredKebabHeading);
    assert.strictEqual(getLoweredKebabCase(secondHeading), expectedSecondLoweredKebabHeading);
    assert.strictEqual(getLoweredKebabCase(thirdHeading), expectedThirdLoweredKebabHeading);
    assert.strictEqual(getLoweredKebabCase(dotNetHeading), expectedDotnetNetLoweredKebabHeading);
    assert.strictEqual(getLoweredKebabCase(itemsTodosHeading), expectedItemsTodosLoweredKebabHeading);
    assert.strictEqual(getLoweredKebabCase(aspnetCoreHeading), expectedAspnetCoreLoweredKebabHeading);
    assert.strictEqual(getLoweredKebabCase(underscoreLowerCaseChar), expectedUnderscoreLoweredKebabCaseChar);
    assert.strictEqual(getLoweredKebabCase(illegalCharacters), expectedIllegalCharactersLoweredKebab);
  });

  test('Get valid link fragment from a title string and a lowered-kebab-case string', () => {
    test('Get valid link fragment from a title string and a lowered-kebab-case string', () => {
      assert.strictEqual(getLinkFragment(expectedFirstHeading, expectedFirstLoweredKebabHeading), expectedFirstTocResult);
      assert.strictEqual(getLinkFragment(expectedSecondHeading, expectedSecondLoweredKebabHeading), expectedSecondTocResult);
      assert.strictEqual(getLinkFragment(expectedThirdHeading, expectedThirdLoweredKebabHeading), expectedThirdTocResult);
      assert.strictEqual(getLinkFragment(expectedDotNetHeading, expectedDotnetNetLoweredKebabHeading), expectedDotnetNetTocResult);
      assert.strictEqual(getLinkFragment(expectedItemsTodosHeading, expectedItemsTodosLoweredKebabHeading), expectedItemsTodosTocResult);
      assert.strictEqual(getLinkFragment(expectedAspnetCoreHeading, expectedAspnetCoreLoweredKebabHeading), expectedAspnetCoreTocResult);
      assert.strictEqual(getLinkFragment(expectedUnderscoreLowerCaseChar, expectedUnderscoreLoweredKebabCaseChar), expectedUnderscoreLowerCharTocResult);
      assert.strictEqual(getLinkFragment(expectedIllegalCharactersHeading, expectedIllegalCharactersLoweredKebab), expectedIllegalCharsTocResult);
    });
  });
});
