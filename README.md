### commitlint husky
- [官网](https://github.com/conventional-changelog/commitlint)
- 安装
  - npm install --save-dev @commitlint/config-conventional @commitlint/cli
  - npm install --save-dev husky
- 新建
  - 新建 `commitlint.config.js` 注意是js文件，不能是ts，或者`.commitlintrc.json`等，添加扩展'@commitlint/config-conventional'
  - 新建.huskyrc文件或者在package.json中配置husky选项