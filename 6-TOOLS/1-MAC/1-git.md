# GIT

### (1) git 安装

```
git 下载
- 下载: mac 在终端中输入 git 后会自动下载 git
- 验证是否下载完毕: git --version 验证是否安装完毕

git 设置用户名和密码
- git config --global user.name "xxx"(输入你的用户名)
- git config --global user.email "yyy"(输入你的邮箱)
- git config --global user.password "yyy"(输入你的邮箱)

git 查看用户名和密码
- git config user.name
- git config user.password
- git config user.email

git 查看配置信息 ( 包括用户名和密码 )
- git config --list
```

### (2) ssh-keygen

```
ssh-keygen
- ssh-keygen -t rsa -C "woow.wu7@gmail.com"
- 根据生成的路径提示进行操作
  - 默认路径有可能是 /Users/电脑用户名/.ssh/id_rsa
  - 默认路径有可能是 /var/root/.ssh/id_rsa.pub // 如果是 sudo ssh-keygen -t rsa -C "woow.wu7@gmail.com" 就会是这个路径
  - 查看文件内容 sudo cat /var/root/.ssh/id_rsa.pub
```

### (3) git clone the specific branch 克隆特定的分支

```
git clone -b 分支名 仓库地址
// git clone -b develop xxxxxxx
```

### (4) 报错 ssh: connect to host github.com port 22: Connection timed out

```
1. 定位在: 默认路径 /Users/电脑用户名/.ssh 文件夹中
2. 新建一个 config 文件: vim config
3. config 文件内容如下
Host github.com
User 注册github的邮箱
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443
4. ssh -T git@github.com 如果出现 Are you sure want to continue connecting(yes/no) yes
```
