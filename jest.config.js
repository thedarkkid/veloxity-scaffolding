module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^core/(.*)$': '<rootDir>/src/core/$1',
    "^models/(.*)$": '<rootDir>/src/models/$1',
    "^helpers/(.*)$": '<rootDir>/src/core/helpers/$1',
    "^sandbox/(.*)$": '<rootDir>/src/tests/sandbox/$1',
    "^routes/(.*)$": '<rootDir>/src/routes/$1',
    "^views/(.*)$": '<rootDir>/src/views/$1',
    "^http/(.*)$": '<rootDir>/src/http/$1',
    "^_http_/(.*)$": '<rootDir>/src/core/@loaders/http/$1',
    "^_models_": '<rootDir>/src/core/@loaders/models/index',
    "^_helpers_": '<rootDir>/src/core/@loaders/helpers/index',
    "^_routes_/(.*)$": '<rootDir>/src/core/@loaders/routes/$1'
  },

};