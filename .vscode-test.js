const { defineConfig } = require('@vscode/test-cli');

module.exports = defineConfig([{ 
  files: '**/suite/*.test.js',
  version: 'insiders',
}]);