##### Mavens Dependencies

##### (1) Swagger3 / specification 3 / swagger3 / oOpenAPI 3

- [swapper-official-website](https://swagger.io/docs/specification/about/)
- [各注解说明地址](https://editor.swagger.io/?_gl=1*1zyvee*_gcl_au*NjM3NDU4MDczLjE3MjU2ODMwNDE.)
- [本项目关于 Swagger3 注解例子](file:///Users/xiawu/work/personal/frontend/8-penetrate/2-BACKEND/1-JAVA/3-annotation-and-knowledges.md)

##### 1.1 Swagger3 / install and configuration

```java swagger install and configuration 123
1
add maven
 <dependency>
  <groupId>org.springdoc</groupId>
  <artifactId>springdoc-openapi-ui</artifactId>
  <version>1.6.10</version> <!-- 确认使用最新的稳定版本 -->
</dependency>


2
add configuration
@Configuration
public class SwaggerConfig {
  @Bean
  public GroupedOpenApi publicApi() {
    return GroupedOpenApi.builder()
            .group("music-api")
            .pathsToMatch("/music-api/**") // 设置路径匹配规则，表示将 music-api 这个路径的API进行归组
            .build();
  }
}

3
access address
// http://localhost:xxxx/swagger-ui/index.html
```

##### 1.2 Swagger3 / annotations

- [AllAnnotate-所有注解](file:///Users/xiawu/work/personal/frontend/8-penetrate/2-BACKEND/1-JAVA/3-annotation-and-knowledges.md)

```java some annotations 4
一些注解

1
swagger3 annotation
- @Tag(mame, description)
- @Operation(summary, description)
-
- @ApiResponses(value)
- @ApiResponse(responseCode, description) @Content @Schema @ArraySchema
-
- @Parameter
- @RequestBody 这个注解在 SpringBoot 中也存存，用来说明 post 请求的body 参数

2
@RequestMapping 可以映射任何 HTTP 方法（GET、POST、PUT、DELETE 等）
@GetMapping 专门用于映射 HTTP GET 请求。

3
parameters
- path parameters ------------------- @PathVariable
- query parameters  ----------------- @RequestParam
- request header parameters --------- @RequestHeader

4
@Controller 可以返回html页面
@RestController 不能返回html页面，返回的内容就是return的内容
1. @RestController = @Controller + @ResponseBody
2. 如果一个controller，一些页面要返回html，一些又要返回return的内容，就需要用 @Controller注解controller返回html，然后在要返回的return的方法上加上@ResponseBody来返回return后面的内容


5
Spring boot
- @RequestBody
- @PathVariable
```

##### 1.2 Swagger3 / examples

```java swagger3 examples 5
5
examples

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User Management", description = "Operations for managing users")
public class UserController {

    private List<User> users = new ArrayList<>();

    @GetMapping
    @Operation(summary = "List all users", description = "Returns a list of all users")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = User.class))))
    })
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
    @Operation(summary = "Get user by ID", description = "Returns a single user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation",
                    content = @Content(schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content)
    })
    public ResponseEntity<User> getUserById(@PathVariable @Parameter(description = "ID of user to return") String userId) {
        return users.stream()
                .filter(user -> user.getId().equals(userId))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Create a new user", description = "Creates a new user with given details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User created",
                    content = @Content(schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input",
                    content = @Content)
    })
    public ResponseEntity<User> createUser(@RequestBody @RequestBody @Parameter(description = "User details") User user) {
        users.add(user);
        return ResponseEntity.status(201).body(user);
    }

    @PutMapping("/{userId}")
    @Operation(summary = "Update an existing user", description = "Updates an existing user with given details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User updated",
                    content = @Content(schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content)
    })
    public ResponseEntity<User> updateUser(@PathVariable @Parameter(description = "ID of user to update") String userId,
                                           @RequestBody @RequestBody @Parameter(description = "Updated user details") User updatedUser) {
        return users.stream()
                .filter(user -> user.getId().equals(userId))
                .peek(user -> {
                    user.setName(updatedUser.getName());
                    user.setEmail(updatedUser.getEmail());
                })
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{userId}")
    @Operation(summary = "Delete a user by ID", description = "Deletes a user with the given ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "User deleted",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content)
    })
    public ResponseEntity<Void> deleteUser(@PathVariable @Parameter(description = "ID of user to delete") String userId) {
        boolean removed = users.removeIf(user -> user.getId().equals(userId));
        if (removed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
```

##### ------- ------- ------- ------- ------- ------- -------

##### ------- ------- ------- ------- ------- ------- -------

##### (2) Jackson / common annotations / install

- [Official website instruction documents.](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/jackson.html)

```java Install Jackson. 1
1
install
- 'spring-boot-starter-web' already included the 'jackson', so we don't need to install it again.

<!-- spring-boot-starter-web -->
<!-- web场景启动器 -->
<!-- 内置了 jackson -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

```java Globally format data through jackson. 2
2
Globally format data.

# jackson
# - globally format data through jackson.
spring:
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
```

```java Separately format data through jackson. 3
2
Separately format data.
- @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss", timezone = "GMT+8")
- @JsonPropertyOrder({"name", "singer", "album",  "time"})
- @JsonProperty("music_singer")
- @JsonInclude(JsonInclude.Include.NON_NULL) // If the value is none, then it will not be return;
- @JsonIgnore // Do not return this field


@JsonPropertyOrder({"name", "singer", "album",  "time"})
public class MusicTestBean {

    @JsonInclude(JsonInclude.Include.NON_NULL) // If the value is none, then it will not be return;
    public Integer id;

    public String name;

    @JsonIgnore // Do not return this field
    public String album;

    @JsonProperty("music_singer")
    public String singer;

    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss", timezone = "GMT+8") // @JsonFormat
    public Date time;
}
```

```java Common Annotations. 4
Common Annotations

Jackson
- @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss", timezone = "GMT+8")
- @JsonPropertyOrder({"name", "singer", "album",  "time"})
- @JsonProperty("music_singer")
- @JsonInclude(JsonInclude.Include.NON_NULL) // If the value is none, then it will not be return;
- @JsonIgnore // Do not return this field
```

##### (3) Redis / spring-boot-starter-data-redis

- [link](file:///Users/xiawu/work/personal/frontend/8-penetrate/6-TOOLS/4-REDIS/redis.md)
- [implement a little function](https://juejin.cn/post/6933224825200574478#heading-26)

##### ------- ------- ------- ------- ------- ------- -------

##### ------- ------- ------- ------- ------- ------- -------

##### (4) JPA / Mysql

##### 4.1 JPA / JPA 业务的标准流程 / ControllerInterface -> ControllerClass -> ServiceInterface -> ServiceClass -> RepositoryInterface

- [业务整体流程] `【 ControllerInterface -> ControllerClass -> ServiceInterface -> ServiceClass -> RepositoryInterface 】`
- [JPA 常见注解](file:///Users/xiawu/work/personal/frontend/8-penetrate/2-BACKEND/1-JAVA/3-annotation-and-knowledges.md)

```java / JPA 业务的标准流程
1
maven
<!-- 8 -->
<!-- spring-boot-starter-data-jpa -->
<!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-jpa -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
    // <version>3.3.3</version>
    // 注意：这里不要指定版本，因为我遇到了报错: 如下
    // Parameter 0 of constructor in com.example.backreviewjava.service.MusicJpaService required a bean named 'entityManagerFactory' not be found.
</dependency>

<!-- 9 -->
<!-- mysql connector 驱动 -->
<!-- mysql驱动注意点：( mysql驱动版本 ) 要和 ( mysql版本) 一致 -->
<!--- 利用 mybatis 操作mysql需要三个库 ( mysql + jdbc + mybatis ) -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.30</version>
    <scope>runtime</scope>
</dependency>



2
配置: 在 application.yml 中配置如下
spring:
  datasource:
    # 1. 只要装了 ( mysql驱动 ) 和 ( jdbc数据库连接池 )，并且在这里配置好 ( 数据库连接池相关的配置项 ) 就能连接数据库
    # 2. mysql驱动 => mysql-connector-java
    # 3. jdbc连接池 => spring-boot-starter-jdbc
    # 4. 更进一步：还可以使用 ( Druid数据源 + MyBatis )
    url: jdbc:mysql://localhost:3306/1-personal_music?serverTimezone=GMT%2B8&useSSL=false
    username: root
    password: rootroot
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
    hibernate:
      ddl-auto: validate
    database: mysql
    show-sql: true



3

```

##### ------- ------- ------- ------- ------- ------- -------

##### ------- ------- ------- ------- ------- ------- -------

##### (5) Mybatis / Mysql JDBC

- [tutorial](https://juejin.cn/post/6929145638898794503#heading-22)

```java / Maven 1
1
maven

<!-- 1 -->
<!-- mysql connector 驱动 -->
<!-- mysql驱动注意点：( mysql驱动版本 ) 要和 ( mysql版本) 一致 -->
<!--- 利用mybatis操作mysql需要三个库 ( mysql + jdbc + mybatis ) -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.30</version>
    <scope>runtime</scope>
</dependency>

<!-- 2 -->
<!-- spring-boot-starter-data-jdbc -->
<!-- 注意区分 ( spring-boot-starter-data-jdbc ) 和 ( spring-boot-starter-jdbc ) -->
 <dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-jdbc</artifactId>
 </dependency>

<!-- 3 -->
<!-- mybatis -->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.3</version>
</dependency>
```

```java / Config in application.properties

spring:
  datasource:
    # 1. 只要装了 ( mysql驱动 ) 和 ( jdbc数据库连接池 )，并且在这里配置好 ( 数据库连接池相关的配置项 ) 就能连接数据库
    # 2. mysql驱动 => mysql-connector-java
    # 3. jdbc连接池 => spring-boot-starter-jdbc
    # 4. 更进一步：还可以使用 ( Druid数据源 + MyBatis )
    url: jdbc:mysql://localhost:3306/personal_music?serverTimezone=GMT%2B8&useSSL=false
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: rootroot
```

##### (6) SpringBoot starter test / 单元测试 Unit Test

- Check the 'lightning' icon, and the test cases will not be executed.

```java Examples

package com.example.backreviewjava;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import javax.annotation.Resource;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;


@Slf4j
@SpringBootTest
@AutoConfigureMockMvc // 自动构建 MockMvc 这个对象，通过  @Resource 来使用
@ExtendWith(SpringExtension.class) // 表示给当前测试方法添加 springboot 运行时的环境，这样就可以拿到 controller servers mapper
public class MusicTestControllerTest {

    // Mock Object
    @Resource
    private MockMvc mockMvc;

    // The following code we don't need, because we used '@AutoConfigureMockMvc' and '@Resource' to replace it.
    //    @BeforeAll
    //    static void setUp() {
    //        mockMvc = MockMvcBuilders.standaloneSetup(new MusicTestController()).build();
    //    }


    @Test
    public void testGetMusic() throws Exception {
        MvcResult mvcResult = mockMvc.perform(
                        MockMvcRequestBuilders
                                .request(HttpMethod.GET, "/music-api/music")
                                .contentType("application/json")
                                .param("name", "晴天")
                                .param("singer", "周杰伦")
                                .param("album", "无与伦比"))
                // the expected value.
                .andExpect(MockMvcResultMatchers.status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.name").value("晴天")).andDo(print()).andReturn();

        mvcResult.getResponse().setCharacterEncoding("UTF-8");
        log.info(mvcResult.getResponse().getContentAsString());
    }

}

```
