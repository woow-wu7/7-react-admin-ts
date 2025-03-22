const ageWebpack: number = 20;

// 1
// ts报错: 找不到名称“module”。是否需要安装 Node.js 的类型定义? 请尝试运行 `npm i --save-dev @types/node`

// 2
// 打包报错: TS18002: The 'files' list in config file 'tsconfig.json' is empty.
// 解决: 跟目录运行 tsc --init 生成一个 tsconfig.json 文件
module.exports = {
  ageWebpack,
};
