##### NVM

- [Official-Website](https://github.com/nvm-sh/nvm)

##### (1) NVM 作用

- 在同一台机器上管理多个 Node.js 版本

##### (2) NVM 安装

```
1
安装 Homebrew
- https://juejin.cn/post/7021884469166473230

2
安装 nvm
- https://juejin.cn/post/7083026831263137800
- https://www.xuhao.club/skill/homebrew-nvm-install/


3
Detailed process.
- 1. $ brew --version. ------------------------------> enter the command to verify whether the Homebrew was installed successfully.
- 2. $ brew install nvm
- 3. $ mkdir ~/.nvm
- 4. $vim ~/.bash_profile // 在.bash_profile文件中添加一下两段代码
      - export NVM_DIR=~/.nvm
      - source $(brew --prefix nvm)/nvm.sh
- 5. $ source ~/.bash_profile


4
command
- 查看NVM是否安装成功: nvm --version
- 查看远程有哪些node版本可以安装: nvm list-remote
- 详见 (3) 常用命令
```

##### (3) 常用命令

```
常用命令
---

nvm list
nvm list-remote // ---------------- 查看远程有哪些有效的 node 版本可以安装
nvm ls
nmv ls-remote // ------------------ 简写

nvm install v18 // ---------------- 安装 18 版版
nvm install 18 // ----------------- 安装 18 版版
nvm install node // --------------- 安装最新的 Node.js 版本
nvm uninstall <node 版本号/别名> // - 删除

nvm use v16.20.1 // --------------- 使用
nvm use alias // ------------------ 可以使用别名来切换

nvm current // -------------------- 查看当前使用的node版本

nvm alias default <node版本号> // -- 指定别名 全局默认版本
nvm alias 别名 x.x.x // ------------ 指定别名版本
nmv alias old 16.6 // ------------- 指定别名old为版本v16.6
nvm unalias 别名 x.x.x // --------- 删除别名

nvm unload // --------------------- 卸载nvm
```

##### 如果一时半会解决不了新开 zsh 版本变化的情况

```
可以指定全局默认版本来解决
- nvm alias default node版本号
- 这样新开的zsh，全局就是指定的版本号
```
