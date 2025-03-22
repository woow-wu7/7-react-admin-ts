##### Mysql

##### Links

- [Mysql](../2-MYSQL/mysql.md)
- [Idea](../../6-TOOLS/3-IDEA/1-IDEA.md)
- [JPA](./4-JPA.md)
-
- [SpringBoot 所有知识点-self-link](/3-annotation-and-knowledges.md)
- [2-maven-dependencies-所有注解和知识点-点这里-work-link](/2-maven-dependencies.md)
- Swagger3
- Jackson
- Redis
- JPA
- Mybatis
- SpringBootStartTest

##### (一) Mysql / Download and Install

- [official-website](https://www.mysql.com/downloads/)
- [tutorial](https://blog.csdn.net/liaowenxiong/article/details/131465103)

```java - Mysql / Download and Install
1
Click the link at the bottom of the page to download.
- 1. MySQL Community (GPL) Downloads »
- 2. MySQL Community Server
- 3. Select the version of MySQL
- 4. macOS 14 (ARM, 64-bit), DMG Archive
// [Official Website]: https://www.mysql.com/downloads/
// -- official 官方的 adj
// -- office 办公室 n
// -- community 社会 社会
// -- archive 档案n 归档v 存档v
// TIPS: Pay attention to the pronunciation of the word 'official'. [official-官方的-adj]
// TIPS: Pay attention to the pronunciation of the word 'archive'. [archive-档案-n/存档-v]


2
Set environment variable. After installing, then to config.
- cd /etc/paths.d
- vim .bash_profile
// if the command is readonly, we should run this command: $ sudo vim .bash_profile

3
add the following contents.
- export PATH=$PATH:/usr/local/mysql/bin
- export PATH=$PATH:/usr/local/mysql/support-files
// if the command is readonly, we should run this command: $ sudo vim .bash_profile


4
run the following command
- source ./.bash_profile


5
test
- mysql --version
```

##### (二) Mysql / Common Commands

```java - Mysql / Common Commands
1.
重启mysql
- systemctl restart mysql
- 扩展:
  - 问题: 遇到问题，当我们输入 mysql -u root -p 并输入密码后报错
  - 报错: ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)
  - 分析: 出现 access denied 报错，有几种可能性
    - 1. mysql停止服务了，没有启动 ------- systemctl restart mysqld 重启即可
    - 2. root用户密码错误 --------------- (using password: YES) 表示密码错误

2.
链接数据库: mysql -u root -p
退出数据库: quit;
退出数据库(容器): exit;

3.
查看所有数据库: show databases;
使用数据库: use xxx;
当前正在使用的数据库: select database();
查看当前数据库中的表: show tables;
创建数据库: create database xxx;
删除数据库: drop database xxx;

4.
向mysql的某个数据库中导入 ( .sql ) 文件
- source 数据库表的.sql文件路径
- // source F:\workSpace\coldchain.sql
```

##### (三) Mysql / Query Statement 查询语句

```java - Mysql / Query Statement 查询语句
1
SELECT * FROM musics WHERE id IN (1,3)
// "name" "singer"  "album" "date"  "id"
// "七里香"  "周杰伦" "无与伦比"  "2/9/2024 23:59:47" "1"
// "夜曲" "周杰伦" "范特西" "6/10/2024 09:20:36"  "3"

2
```
