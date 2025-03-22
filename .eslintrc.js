module.exports = {
  root: false,
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  // parser: "vue-eslint-parser",
  rules: {
    "no-alert": 0, // 禁止使用 alert

    // "no-console": "error", // 禁止使用 console
    "no-console": "off", // 禁止使用 console
  },
};
