module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  setupFiles: [
    '<rootDir>/jest/setup.ts',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/__mocks__'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/',
    '<rootDir>/jest/',
  ],
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@screens(.*)$': '<rootDir>/src/screens$1',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@navigators(.*)$': '<rootDir>/src/navigators$1',
    '^@assets(.*)$': '<rootDir>/src/assets$1',
    '^@helpers(.*)$': '<rootDir>/src/helpers$1',
    '^@types(.*)$': '<rootDir>/src/types$1',
  },
  testEnvironment: 'node',
};
