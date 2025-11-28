/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest", // tells Jest to use ts-jest
  testEnvironment: "node", // for Node.js environment
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest", // transforms TypeScript files
  },
  testMatch: ["**/tests/**/*.test.ts"], // match your test files
};
