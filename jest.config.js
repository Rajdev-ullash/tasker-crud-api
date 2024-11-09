/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  forceExit: true,
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  // clearMocks:true,
};
