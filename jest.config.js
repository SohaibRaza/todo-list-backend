module.exports = {
  // The root of your project directory
  roots: ['./src'],

  // Use TypeScript for test files
  preset: 'ts-jest',

  // Test file patterns
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Mocking assets such as CSS and images
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/path/to/file-mock.js',
  },

  // Clear mocks between test runs
  clearMocks: true,

  // Coverage report settings
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
};
