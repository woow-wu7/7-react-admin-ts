##### Ideal

##### (1) Java / Download and Install

- [java-11](https://www.oracle.com/java/technologies/downloads/#java11-mac) // 滚动到最底部
- [java-11-tutorial](https://javaziliao.com/post/931.html)
- [下载时需要登陆官网](https://signon.oracle.com/signin)
-
- [maven-official-website](https://maven.apache.org/download.cgi)
- [maven-config](https://juejin.cn/post/6927306093970325517#heading-8)
- [maven-install-tutorial](https://developer.aliyun.com/article/1148476)
-
- [idea](https://www.jetbrains.com/zh-cn/idea/download/?section=mac)

```
1
Verify whether the java 11 is installed.
$ java -version
```

##### (1) Maven / Download and Setting

- [maven-official-website](https://maven.apache.org/download.cgi)
- [maven-config](https://juejin.cn/post/6927306093970325517#heading-8)
- [maven-install-tutorial](https://developer.aliyun.com/article/1148476)

```
1
download maven
- https://maven.apache.org/download.cgi




2
decompress and change
- 下载解压后需要配置maven，即修改 D:\javaconfig\apache-maven-3.6.3\conf\setings.xml 文件
- 注意：是修改这个文件 apache-maven-3.6.3\conf\setings.xml
- 需要修改三个地方

1 <localRepository></localRepository>
  - 本地仓库，设置为自己本地的文件夹中，这样本地有jar包时就不用每次去下载
  - maven项目创建好后，需要jar包，先从本地仓库找，没找到再去中央仓库或私服中去下载
2 <mirrors><mirror></mirror></mirrors>
  - 镜像
  - 配置国内镜像，加快下载速度
3 <profiles><profile></profile></profiles>
  - 让maven指定jdk1.8来进行编译

- 具体配置如下

<localRepository>
  /Users/xiawu/work/plugins/maven-local-repository
</localRepository>

<mirrors>
  <mirror>
    <id>alimaven</id>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    <mirrorOf>central</mirrorOf>
  </mirror>
</mirrors>

在settings.xml文件中，可以通过设置maven-compiler-plugin插件的版本来指定编译目标版本为Java 11。这通常是在<profiles>部分添加一个新的profile来实现的：
<profiles>
  <profile>
    <id>java-11</id>
    <properties>
      <maven.compiler.source>11</maven.compiler.source>
      <maven.compiler.target>11</maven.compiler.target>
      <maven.compiler.compilerVersion>11</maven.compiler.compilerVersion>
    </properties>
  </profile>
</profiles>
然后，在<activeProfiles>标签内激活这个profile：
<activeProfiles>
  <activeProfile>java-11</activeProfile>
</activeProfiles>




3
config environment variables
- 1. vi ~/.bash_profile
- 2. add the following code in the '.bash_profile' file:
- 3. Pay attention: the path should be the same as the one you set in the settings.xml file.
export MAVEN_HOME=/Users/xiawu/work/plugins/apache-maven-3.9.9
export PATH=$PATH:$MAVEN_HOME/bin


4
refresh the config
$ source ~/.bash_profile


5
input the command to verify whether the maven is installed successfully.
$ mvn -v


6
if the step 5 is successful, go next to config idea
- setting -> Build Execution Deployment -> Build Tools -> Maven
- 1. Maven home path: /Users/xiawu/work/plugins/apache-maven-3.9.9
- 2. User setting file: /Users/xiawu/work/plugins/apache-maven-3.9.9/conf/settings.xml
```

##### (1) Mysql / Download and Install

- [jump](file:///Users/xiawu/work/personal/frontend/8-penetrate/2-BACKEND/2-MYSQL/mysql.md)
- [official-website](https://www.mysql.com/downloads/)
- [tutorial](https://blog.csdn.net/liaowenxiong/article/details/131465103)

```
1
click the link at the bottom of the page to download
- 1. MySQL Community (GPL) Downloads »
- 2. MySQL Community Server
- 3. Select the version of MySQL
- 4. macOS 14 (ARM, 64-bit), DMG Archive


2
Set environment variable. After installing, then to config.
- cd /etc/paths.d
- vim .bash_profile
- // if the command is readonly, we should run this command: $ sudo vim .bash_profile

3
add the following contents.
- export PATH=$PATH:/usr/local/mysql/bin
- export PATH=$PATH:/usr/local/mysql/support-files
- // if the command is readonly, we should run this command: $ sudo vim .bash_profile


4
run the following command
- source ./.bash_profile


5
test
- mysql --version
```

##### (1) Navicat / Download and Install

```
1. Download and Install
- 1. Baidu online disk: 1-MAC/1-Navicat Premium 16.0.6汉化版.dmg
- 2. Installation tutorial: https://www.qinchao.site/kaifagongju/24.html
- 3. 先安装navicat, 弹窗报错时，再右键点击 ( 已破损修复 ) 弹出 terminal.
```

##### ------- ------- ------- ------- ------- ------- -------

##### ------- ------- ------- ------- ------- ------- -------

##### (1) Redis / Download and Install

```
1
Install homebrew

(一) What's the homebrew?
- 1. Homebrew is a package manager for MacOS.
- 2. It can easily install various software.

(二)
- 1. https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh
- 2. Access the link above to copy the code and then save it in a file named 'homebrew-installer.sh'

(三)
- 1. $ /bin/bash homebrew-installer.sh
- 2. execute the command above to install homebrew.

(四)
- 1. $ (echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/xiawu/.zprofile
- 2. eval "$(/opt/homebrew/bin/brew shellenv)"
- 3. Run these two commands above in your terminal to add Homebrew to your PATH.

(五)
- 1. $ brew --version
- 2. How to verify whether 'homebrew' is installed successfully? run the command above in bash terminal.

(六)
- 1. $ brew install redis
- 2. install redis

(七)
- 1. automatic: $ brew services start redis
- 1. manual: $ redis-server /opt/homebrew/etc/redis.conf
- 2. start redis

(八)
- 1. $ redis-cli ping
- 2. How to verify whether 'redis' is started successfully? run the command above in bash terminal.
- 3. You will get the value 'PONG'
// - or $ redis-cli ping
// - or $ redis-server

(九)
- 1. $ brew services info redis
- 2. check the status, you will get like this above.
redis (homebrew.mxcl.redis)
Running: ✔
Loaded: ✔
Schedulable: ✘
User: xiawu
PID: 13169

(十)
- start: $ brew services start redis
- stop: $ brew services stop redis

------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- -------
------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- -------

(十一) 重要重要重要!!!
配置redis密码: 找到redis配置文件路径
- 1. 输入命令: $ redis-cli INFO
- 2. 找到: config_file ------ ( config_file:/opt/homebrew/etc/redis.conf )
- 3. 输入命令: $ vim /opt/homebrew/etc/redis.conf
- 4. 最底部添加: requirepass yourpassword
- 5. 重启: $ brew services restart redis

(十二) 当你设置了密码后，用命令行终端时，输入 redis-cli 后
- 你需要输入 AUTH yourPassword
- 之后就可以使用 redis 了

(十三) AnotherRedisDesktopManager 客户端管理软件来管理 redis
- 1. official website: https://github.com/qishibo/AnotherRedisDesktopManager/releases
- 2. 输入 host port password 即可

(十四) 如何权限不够，可以用一下命令来设置比较高的权限
- 确保 /var/run 目录有正确的权限
- $ sudo chmod 777 /var/run


(十五) How to use redis

15.1
string
// $ set name 'woow_wu7'
// $ get name
// $ del name
// $ mget name age --------------- 同时获取 name age
// $ exists key ------------------ 检查key是否存在
// $ keys * ---------------------- 查看所有键
// $ flushall -------------------- 删除数据库中所有的键
// 不支持中文，如果想要支持中文，可以使用 $ redis-cli --raw


15.2
list => 链表 (相当于数据那样的数据) -- 【 元素可重复 】
$ lpush key value1 value2 在key所关联的list的头部 ( 插入 ) 所有value值
$ rpush key value1 value2 在key所关联的list的头部 ( 插入 ) 所有value值
$ lrange key start end 获取key链表中从start到end的元素的值，start、end可 为负数，若为-1则表示链表尾部的元素
$ lpushx key value 当key存在时才leftpush，如果不加x不存在时会新建
$ lpop key 返回并弹出指定的key关联的链表中的第一个元素，即头部元素


15.3
set => 是数组加链表 ------------------【 元素不能重复 】
sadd key value1 value2 向set中添加数据，如果该key的值已有则不会 重复添加 l`
smembers key 获取set中所有的成员
scard key 获取set中成员的数量
srem key member1、member2 删除set中指定的成员


15.4
zset
zset中的每一个成员都会有一个分 数(score)与之关联，Redis正是通过分数来为集合中的成员进行从小到大的排序
zadd key score member score2 member2 将所有成员以及该成员的 分数存放到sorted-set中


15.5
hash => 键值对，【 适合用来存 - 对象 】
Redis中的Hashes类型可以看成具有String Key和String Value的map容器，所以适合存储值是对象的信息，比如 username
hset key fild value 为指定的key设定field/value对（键值对）
hgetall key 获取key中的所有filed-vaule

```

##### (1) Redis / App Software / AnotherRedisDesktopManager

```
AnotherRedisDesktopManager

- official website: https://github.com/qishibo/AnotherRedisDesktopManager/releases
- 输入 host port password 即可
```

##### (1) Redis / Common Commands

```
1
$ ps axu | grep redis ------------- view process.

2
$ redis-cli shutdown -------------- turn off redis.

3
$ brew services info redis ------- check the status
```

##### (1) Redis / Usage / string list set zset hash

```
(一) 重要重要重要!!!
配置redis: 找到redis配置文件路径
- 1. 输入命令: $ redis-cli INFO
- 2. 找到: config_file ------ ( config_file:/opt/homebrew/etc/redis.conf )
- 3. 输入命令: $ vim /opt/homebrew/etc/redis.conf
- 4. 添加: requirepass yourpassword
- 5. 重启: $ brew services restart redis

(二) 当你设置了密码后，用命令行终端时，输入 redis-cli 后
- 你需要输入 AUTH yourPassword
- 之后就可以使用 redis 了

(三) AnotherRedisDesktopManager 客户端管理软件来管理 redis
- 1. official website: https://github.com/qishibo/AnotherRedisDesktopManager/releases
- 2. 输入 host port password 即可

1
string
// $ set name 'woow_wu7'
// $ get name
// $ del name
// $ mget name age --------------- 同时获取 name age
// $ exists key ------------------ 检查key是否存在
// $ keys * ---------------------- 查看所有键
// $ flushall -------------------- 删除数据库中所有的键
// 不支持中文，如果想要支持中文，可以使用 $ redis-cli --raw


2
list => 链表 (相当于数据那样的数据) -- 【 元素可重复 】
$ lpush key value1 value2 在key所关联的list的头部 ( 插入 ) 所有value值
$ rpush key value1 value2 在key所关联的list的头部 ( 插入 ) 所有value值
$ lrange key start end 获取key链表中从start到end的元素的值，start、end可 为负数，若为-1则表示链表尾部的元素
$ lpushx key value 当key存在时才leftpush，如果不加x不存在时会新建
$ lpop key 返回并弹出指定的key关联的链表中的第一个元素，即头部元素


3
set => 是数组加链表 ------------------【 元素不能重复 】
sadd key value1 value2 向set中添加数据，如果该key的值已有则不会 重复添加 l`
smembers key 获取set中所有的成员
scard key 获取set中成员的数量
srem key member1、member2 删除set中指定的成员


4
zset
zset中的每一个成员都会有一个分 数(score)与之关联，Redis正是通过分数来为集合中的成员进行从小到大的排序
zadd key score member score2 member2 将所有成员以及该成员的 分数存放到sorted-set中


5
hash => 键值对，【 适合用来存 - 对象 】
Redis中的Hashes类型可以看成具有String Key和String Value的map容器，所以适合存储值是对象的信息，比如 username
hset key fild value 为指定的key设定field/value对（键值对）
hgetall key 获取key中的所有filed-vaule
```

##### (1) Redis / SpringBoot uses Redis

- [implement a little function](https://juejin.cn/post/6933224825200574478#heading-26)

```java
1
maven
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>


2
application.properties 或 application.yml
spring:
  redis:
    host: localhost
    port: 6379
    password: xxxx


3
RedisConfig
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
@Configuration
public class RedisConfig {
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new StringRedisSerializer());
        return template;
    }
}


4
service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
@Service
public class RedisService {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public void setValue(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public String getValue(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }

    public void deleteKey(String key) {
        redisTemplate.delete(key);
    }
}


5
RedisController
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/redis")
public class RedisController {
    @Autowired
    private RedisService redisService;

    @PostMapping("/set")
    public String setValue(@RequestParam String key, @RequestParam String value) {
        redisService.setValue(key, value);
        return "Value set successfully";
    }

    @GetMapping("/get")
    public String getValue(@RequestParam String key) {
        return redisService.getValue(key);
    }

    @DeleteMapping("/delete")
    public String deleteKey(@RequestParam String key) {
        redisService.deleteKey(key);
        return "Key deleted successfully";
    }
}
```

##### ------- ------- ------- ------- ------- ------- -------

##### ------- ------- ------- ------- ------- ------- -------

##### (2) SpringBoot / 目录最佳实践 / 用到的 Maven 各种依赖

##### 2.1 SpringBoot / 目录最佳实践 [目录最佳实践]

```go 2.1 目录最佳实践
src
├── main
│   └── java
│       └── com.example.demo
│           ├── controller
│           ├── service
│           ├── dao/repository
│           ├── model/entity/dto
│           ├── config
│           ├── interceptor
│           └── utils
│           └── jpa
│               └── entity
│               └── repository



1
Entity:
  - 和数据库一一对应
DTO:
  - [Data Transfer Object. 数据传输对象]
  - 数据简化: DTO 可以包含比实体类更少的属性，只包含必要的字段，从而简化数据传输
  - 数据聚合: DTO 可以包含来自多个实体类的数据，用于聚合不同来源的信息


2
DAO:
  - [Data Access Object. 数据访问对象]
  - DAO接口: interface UserDao
  - DAO实现类: UserDaoImpl implements UserDao
  - Class => implements => interface
// DAO 接口
// - interface
public interface UserDao {
  User findById(Long id);
  List<User> findAll();
  void save(User user);
  void delete(Long id);
}
// DAO 实现类
// - implements
// - @Repository
@Repository
public class UserDaoImpl implements UserDao {
  @Override
  public User findById(Long id) {}
  @Override
  public List<User> findAll() {}
  ...
}


3
// Repository
// - extends
Repository:
  - 继承接口: Repository 通常是一个继承自 CrudRepository 或 JpaRepository 等接口的接口
  - 自动实现: Spring Data 会自动生成 Repository 接口中声明的方法实现，不需要编写具体的实现代码
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  List<User> findByUsername(String username); // Spring Data 自动提供实现
}


4
PO（Persistent Object，持久化对象）--------------- 与数据库中的表结构相对应的对象，通常包含与数据库表字段对应的属性，以及用于数据库操作的方法，如保存、更新、删除等
VO（Value Object，值对象）------------------------ 在不同的系统层之间传递数据，在表示层（如网页、客户端界面）展示数
BO（Business Object，业务对象）-------------------- 将复杂的业务逻辑封装在 BO 中，使业务逻辑与其他层（如表示层、数据访问层）分离
-
DAO（Data Access Object，数据访问对象）------------- repository
DTO（Data Transfer Object，数据传输对象）
-
POJO（Plain Old Java Object，简单传统的 Java 对象）-- 可以在不同的项目和环境中复用，提高代码的可重用性
```

##### 2.2 SpringBoot / Maven Dependencies / 用到的 Maven 各种依赖

- [用到的 Maven 各种依赖-work-link](file:///Users/xiawu/work/personal/frontend/8-penetrate/2-BACKEND/1-JAVA/2-maven-dependencies.md)
- [用到的 Maven 各种依赖-self-link](file:///Users/xiawu/work/personal/front-end/8-penetrate/2-BACKEND/1-JAVA/2-maven-dependencies.md)
- [SpringBoot 所有知识点-self-link](file:///Users/xiawu/work/personal/front-end/8-penetrate/2-BACKEND/1-JAVA/3-annotation-and-knowledges.md)

##### ------- ------- ------- ------- ------- ------- -------

##### ------- ------- ------- ------- ------- ------- -------

##### (3) IDEA / A detailed tutorial about configuring JAVA 11 with IDEA.

```
步骤1: 下载并安装IntelliJ IDEA
访问官方网站(https://www.jetbrains.com/idea/)下载最新版本的IntelliJ IDEA。
根据您的操作系统选择合适的安装程序。
运行安装程序,按照向导步骤完成安装。

步骤2: 安装Java
确保您的系统上已安装Java Development Kit(JDK)。
如果尚未安装,请从Oracle官网(http://www.oracle.com/java/technologies/javase-jdk11-downloads.html)下载并安装Java 11或更高版本。

步骤3: 配置IntelliJ IDEA
启动IntelliJ IDEA。
点击"File"菜单,选择"Project Structure"(或按快捷键 Ctrl+Alt+S)。
在弹出的对话框中,点击"Project"选项卡。
在"Project SDK"下拉菜单中,确保已选择正确的Java版本(例如"Java 11")。
如果所需的Java版本不在列表中,点击"New..."按钮,浏览到Java安装目录选择所需版本。
设置"Project language level"为与Java版本匹配的语言级别(例如"11"对应Java 11)。
点击"Apply",然后再次点击"OK"确认设置。

步骤4: 创建新Java项目
点击"File"菜单,选择"New" > "Project"。
在左侧选择"Java",右侧选择"Java SDK 11"作为项目SDK(根据实际情况调整版本号)。
选择所需的项目模板和设置。
点击"Next"继续配置项目详情。
完成所有设置后,点击"Finish"创建项目。

步骤5: 验证Java设置
打开刚创建的Java项目。
创建新的Java类或打开现有类。
在代码编辑器中,您现在可以开始使用Java 11的特性。

步骤6: 配置编译器设置
点击"File"菜单,选择"Settings"(Windows/Linux)或"IntelliJ IDEA" > "Preferences"(macOS)。
在搜索栏中输入"Compiler"。
在"Java Compiler"部分,确保"Target bytecode version"设置为与您的Java版本匹配(例如"11"对应Java 11)。

步骤7: 运行和调试
您可以像其他Java代码一样运行和调试Java 11代码。
创建运行/调试配置时,确保选择"JRE"为"Use project JDK (Java 11)"。
通过这些步骤,您应该能够在IntelliJ IDEA中成功设置和使用Java 11。这个过程允许您利用最新的Java功能和改进,在您的项目中充分发挥Java 11的优势。
```

##### (3) IDEA / Plugins

- [tutorial](https://cloud.tencent.com/developer/article/2433153)

```All Plugins
1
日志颜色: Grep Console
- 安装 Grep Console 后
- 在 左侧设置中菜单中找到 / 其他设置 / Grep Console
- 同时在 运行面板左侧 有Grep-Console的图标，可以进行详细设置

Java代码格式规范：CheckStyle
自动生成序列图插件：SequenceDiagram
快捷键提示工具：Key promoter X
代码注解插件： Lombok
代码生成工具：CodeMaker
代码质量检查工具：SonarLint
单元测试测试生成工具：JUnitGenerator
Mybatis 工具：Free Mybatis plugin
JSON转领域对象工具：GsonFormat
字符串工具：String Manipulation
Redis可视化：Iedis
K8s工具：Kubernetes
彩虹颜色括号：Rainbow Brackets
阿里代码规约检测：Alibaba Java Coding Guidelines
```

```
1
新建时，在 spring boot 面板上的 【 Server URL 】换成阿里云的地址 【 https://start.aliyun.com 】
```

##### (3) IDEA / 【【 Shortcut Keys 】】[Shortcut-Keys]

```
1
Option + Enter
- 显示意向动作和快速修复代码

2
Command + Option + B 跳转到实现
Command + Option + L 代码格式化

3
Control + Option + O 优化 import

4
Command + E
- 显示最近访问过的文件

5
Command 1 ～ 0
- 各种工具栏工具

6
Command + Shift + F 全局查找
Command + Shift + A 打开 Actions 窗口


Command + [ 上一步
Command + ] 下一步
Command + P 方法参数提示

Command + Option + B 跳转到实现
Command + Option + L 代码格式化

Control + Option + O 优化 import
Control + Option + I 自动缩进线

sout System.out.println()
```

##### (3) IDEA / 文件和菜单不联动

```
文件和菜单不联动？
- 点击: 菜单栏的 [三个点] 菜单
- 选择: Behavior / Always select opened file.
```

##### (3) IDEA / ERROR / don't have java 11 options

- [tutorial](https://blog.csdn.net/zhangfuping123456789/article/details/138729360)

##### ------- ------- ------- ------- ------- ------- -------

##### ------- ------- ------- ------- ------- ------- -------

##### (4) Mysql / 常用命令

```
1.
重启mysql
- systemctl restart mysqld
- 扩展:
  - 问题: 遇到问题，当我们输入 mysql -u root -p 并输入密码后报错
  - 报错: ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)
  - 分析: 出现 access denied 报错，有几种可能性
    - 1. mysql停止服务了，没有启动 ------- systemctl restart mysqld 重启即可
    - 2. root用户密码错误 --------------- (using password: YES) 表示密码错误

2.
链接数据库: mysql -u root -p
退出数据库: quit;
退出数据库(容器): exit

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

##### ------- ------- ------- ------- ------- ------- -------

##### ------- ------- ------- ------- ------- ------- -------

##### (5) Docker / 部署 mysql

- docker 安装 mysql 并访问 https://juejin.cn/post/6892390655126241287#heading-4
- docker 部署 mysql https://juejin.cn/post/6844904099024994312#heading-27

##### (5) Hot Update

- [我的博客-热更新](https://juejin.cn/post/6929145638898794503#heading-18)

```
1
maven
<!-- spring-boot-devtools 从新构建 -->
<!--实现重新构建，快捷键：command + f9 则可以重新构建，不需要在重新run-->
<!-- 要实现热更新还需要设置两个地方，具体见我的博客 -->
<!-- 博客地址：https://juejin.cn/post/6929145638898794503 -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
  <scope>runtime</scope>
  <optional>true</optional>
</dependency>


2
IDEA setting
setting => Build,Execution,Deployment => Compiler => 勾上Build project automaticallly

3
Command + shift + A 调出 action

4
在 action 中搜索 Registry

5
在 Registry 中勾选 compiler.autoMake.allow.when.app.running
```
