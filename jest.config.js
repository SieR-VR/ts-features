/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  useStderr: true,
  globals: {
    'ts-jest': {
      compiler: "ttypescript",
      tsconfig: "tsconfig.json"
    },
  }
};