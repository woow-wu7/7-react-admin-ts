##### Redis

##### (1) Redis Download and Install

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

##### (2) Redis Application / AnotherRedisDesktopManager

```
AnotherRedisDesktopManager

- official website: https://github.com/qishibo/AnotherRedisDesktopManager/releases
- 输入 host port password 即可
```

##### (3) Common Commands

```
1
$ ps axu | grep redis ------------- view process.

2
$ redis-cli shutdown -------------- turn off redis.

3
$ brew services info redis ------- check the status
```

##### ------- ------- ------- ------- ------- ------- -------

##### ------- ------- ------- ------- ------- ------- -------

##### (4) **【 Redis Usage - string list set zset hash 】**

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

##### (5) Redis / SpringBoot uses Redis

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
