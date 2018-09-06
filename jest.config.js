module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: './coverage/',
  coveragePathIgnorePatterns: ['/node_modules/', 'jest.setup.js'],
  restoreMocks: true,
  setupFiles: ['./jest.setup.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
