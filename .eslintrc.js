module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/ban-ts-comment": 0,
  },
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module",
  },
};
