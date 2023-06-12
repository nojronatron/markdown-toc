const { expect } = require('@jest/globals');
const starterFunction = require('../../extension-functions/starter-function');

describe('starterFunction', () => {
  test('should return true', () => {
    expect(starterFunction()).toBe(true);
  });
});
