module.exports = {
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  extends: ["plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module",
  },
};
