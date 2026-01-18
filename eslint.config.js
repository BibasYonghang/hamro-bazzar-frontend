/** eslint.config.js */
export default [
  {
    files: ["*.js", "*.jsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
    rules: {
      semi: ["error", "always"],
      "no-console": "off",
    },
  },
];
