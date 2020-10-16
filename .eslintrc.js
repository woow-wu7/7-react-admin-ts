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
    "react-hooks/exhaustive-deps": "warn",
    // "tabWidth": 2, // tab缩进大小,默认为2
    // "no-unused-vars": 2, //禁止出现未使用过的变量
    // "no-redeclare": 2, //禁止多次声明同一变量
    // 'no-use-before-define': 2, //禁止在变量定义之前使用它们
  },
}
/* eslint-disable */