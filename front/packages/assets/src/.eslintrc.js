module.exports = {
  extends: ["@repo/eslint-config"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
};
