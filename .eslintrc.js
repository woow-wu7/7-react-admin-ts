/* eslint-disable */
module.exports = {
  "env": {
    "es6": true, // 在开发环境，启用es6语法，包括全局变量
    "node": true,
    "browser": true
  },
  "parser": "babel-eslint", // 解析器
  "parserOptions": { // 解析器选项
    "ecmaVersion": 6, // 启用es6语法，不包括全局变量
    "sourceType": "module",
    "ecmaFeatures": { //额外的语言特性
      "jsx": true // 启用jsx语法
    }
  },
  "plugins": [
    // ...
    "react-hooks"
  ],
  rules: {
    'no-console': 'off', // 可以console
    'no-debugger': 'off',
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
}
/* eslint-disable */