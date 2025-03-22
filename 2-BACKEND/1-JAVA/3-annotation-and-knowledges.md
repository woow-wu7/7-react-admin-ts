##### Annotation 注解 以及 各种知识点

- 1. SpringBoot
- @RequestMapping ---- Use '@RequestMapping' annotation preferentially because it can highlight the HTTP method. and it's similar to @RequestParam...
- // - value | path
- // - method
- // - params
- // - headers
- // - consumes: 指定 请求 的内容类型（Content-Type） // consume 消费 // pursue 追求
- // - produces: 指定 响应 的内容类型（Content-Type） // produce 生产 // product 产品
- // - name: 为请求映射指定一个名称，通常用于生成文档或日志
- @RequestParam
- @RequestBody
- @RequestHeader
- @PathVariable
- @RequestPart ------ 用于处理多部分表单数据，用在 multipart/form-data 表单提交请求的方法上，上传文件功能请看 【 4.2 Upload File 】
-
- 2. Swagger
- @Tag(name, description)
- @Operation(summary, description)
- @ApiResponses(value)
- @ApiResponse(responseCode, description) @Content @Schema @ArraySchema
- @Parameter
-
- 3. JPA
- @Entity
- @Table("music")
- @Id
- @GeneratedValue(strategy = GenerationType.IDENTITY)
- @Column(name = "name", nullable = false, unique = true, length = 512)
- [@Query] -- value 指定查询语句 --------------- @Query(value="SELECT u FROM User u WHERE u.email = ?1")
- [@Query] -- nativeQuery 原生 SQL 查询 --------- @Query(value = "SELECT \* FROM users WHERE email = ?1", nativeQuery = true) // 默认是 false
- [@Query] -- countQuery -- 计数查询语句 ------- @Query(value = "SELECT u FROM User u", countQuery = "SELECT count(u) FROM User u")
- [@Query] -- countProjection ---------------- @Query(value = "SELECT u FROM User u", countProjection = "count(u)")
- JpaRepository.findAll()
- JpaRepository.findById(id)
- JpaRepository.findAllById(Arrays.asList(1L, 2L));
- JpaRepository.save(entity) // --------------- create / update
- JpaRepository.saveAll(entity) // ------------ create / update. => saveAll 方法会根据 id 字段来决定是插入新数据还是更新现有数据
- JpaRepository.deleteById(id)
- JpaRepository.count()
- JpaRepository.countAll()
- repository.existsById(1L); // --------------- check whether is exist.
- // 同时也支持自定义查询，比如模糊查询
- // 详见: 本文件 / [ ##### 2.4 JPA / 模糊查询 fuzzy query ]
- // @Query("SELECT m FROM MusicJpaEntity m WHERE " + "m.name LIKE %:keyword% OR " + "m.singer LIKE %:keyword% OR " + "m.album LIKE %:keyword%")
- // List<MusicJpaEntity> searchByKeyword(@Param("keyword") String keyword);
-
- 4. Lombok
- @Data // ------------------------------------ Generate getter() and setter() function automatically. such as toString()、equals() 和 hashCode()
- @Builder // --------------------------------- Person.builder().name("John").age(30).build();
- @DataAllArgsConstructor // ------------------ It's a constructor with full parameters.
- @NoArgsConstructor // ----------------------- It's a constructor with no parameters.
-
- 5. Jackson
- @JsonProperty("group") // ------------------- { "group": "SomeGroupName" } 而不是 { "groupName": "SomeGroupName" }
  private String groupName;
-
- 6. Interceptor 拦截器
- HandlerInterceptor // ----------------------- 1. 创建拦截器类，自定义拦截规则 ( @Component ) ( public class RequestInterceptor implements HandlerInterceptor )
  - preHandle // ------------------------------ 在目标方法执行前执行，即 controller 方法执行前执行
  - postHandle // ----------------------------- 在目标方法执行完成后执行
  - afterCompletion // ------------------------ 在页面渲染后执行
- WebMvcConfigurer // ------------------------- 2. 注册拦截器 ( @Configuration ) ( public class WebConfig implements WebMvcConfigurer )
- // 详见: 本文件 / [ ##### 2.4 JPA / 模糊查询 fuzzy query ]
-
- 7. Attribute Binding. 属性绑定
- @Component
- @ConfigurationProperties(prefix = "spring.datasource")
- // 1. Through '@Component' you can get the component value in any where.
- // 2. Through '@ConfigurationProperties(prefix = "spring.datasource")' you can inject the value of spring.datasource in 'application.yml'.
- // 3. // TIPS: The more secure way is to use ENVIRONMENT.
-
- 8. 环境变量 -> It can replace the 'Attribute Binding'.
- // position: ------------------------------- run / edit configurations / Modify Options / Environment variables
- // usage: ---------------------------------- username: ${DB_USERNAME} // in application.yml file
-
- 9. Test
- @Test 表示该方法是测试方法
- @ParameterizedTest 表示该方法是参数测试
- @RepeatedTest 表示方法可重复执行
- @DisplayName 为测试类或测试方法设置展示名称
- @BeforeEach 表示在每个单元测试前执行
- @AfterEach
- @BeforeAll 在所有单元测试前执行
- @AfterAll
- @Tag 单元测试类别
- @Disabled 表示测试类或测试方法不执行
- @Timeout 测试方法超过定时后将返回错误
- @ExtendWith 为测试类或测试方法提供扩展类引用
-
-
-
- 999. Others
- 1
- ObjectUtils.isEmpty()
- 2
- [List, ArrayList, Set, Map] 中有 stream() filter() ... 方法
  - stream()
  - filter()
  - map()
  - distinct() // ------------------- 去除重复元素 // distinct 不同的 清楚的 adj
  - collect(Collectors.toList()) ---- 收集到 List 数据结构中
  - sorted() ------------------------ 排序
  - limit(N) ------------------------ 方法用于截取流中的前 N 个元素
  - skip(N) ------------------------- 跳过流中的前 N 个元素

```

```

##### (1) SpringBoot Annotation.

##### 1.1 @RequestMapping

- _Please use this '@RequestMapping' annotation preferentially because it can highlight the HTTP method. and it's similar to @RequestParam..._

```java / RequestMapping
1
@RequestMapping(
  method = RequestMethod.POST,
  value = "/example{key}",
  params = "id=1"
  headers = "Content-Type=application/json",
  consumes = "application/json", // ---------------------------------- consume 指定控制器方法接受的请求内容类型
  produces = { "application/json", "application/vnd.error+json" }, // produce 指定控制器方法返回的内容类型（MIME 类型）
)

// produces = { "application/json", "application/vnd.error+json" }
// -- application/json：标准的 JSON 格式。
// -- application/vnd.error+json：特定的 JSON 格式，通常用于错误响应。
```

##### 1.2 ResponseEntity

```java ResponseEntity
ResponseEntity 的作用

// - 1. 状态码控制/status：你可以指定HTTP状态码，例如200（OK）、201（Created）、404（Not Found）等
// - 2. 头部信息控制/header：你可以添加自定义的HTTP头部信息
// - 3. 响应体控制/body：你可以指定响应体的内容
ResponseEntity.status(HttpStatus.OK).headers(headers).body("Response with custom header");
// ResponseEntity.status(HttpStatus.OK).headers(headers).body("Response with custom header");
// ResponseEntity.ok().headers(headers).body("Response with custom header"); // .ok = .status(HttpStatus.OK).
// ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get value"); // 500
// ResponseEntity.status(HttpStatus.OK).body(value); // 200
```

##### 1.3 final keyword

```java final
final
- The 'final' keyword indicates the data is a constant.
- 表示一个 常量，不能被修改
--

private final MusicJpaService musicJpaService;

@Autowired
public MusicJpaApiController(MusicJpaService musicJpaService) {
  this.musicJpaService = musicJpaService;
}
```

##### ------- ------- ------- ------- ------- ------- -------

##### ------- ------- ------- ------- ------- ------- -------

##### (2) JPA 常见注解 / 使用示例代码

##### 2.1 JPA / 常见注解

```java / JPA 常见注解
JPA

1. @Entity
2. @Table("music")

3. @Id
3. @GeneratedValue(strategy = GenerationType.IDENTITY)

4. @Column(name = "name", nullable = false, unique = true, length = 512)
// name: The 'name' represents the field that is mapped to the database.
// nullable: The 'nullable=false' means that the 'name' is not null.
// unique: The 'unique=true' field means this field is unique in the database.
// length: The 'length=512' field means the max length of this field is 512.
TIPS: the 'music_name' field 【 correspond to 】 the 'name' field in the database.
-- map: 地图n 映射v
-- correspond: 对应 相当于 类似于
-- 【 correspond to. 和...相对应 】

------- -------

5.
Some query methods that come with JPA.
自带的一些查询方法
- JpaRepository.findAll()
- JpaRepository.findById(id)
- JpaRepository.save(entity) // --------------------------- create / update
- JpaRepository.deleteById(id)
- JpaRepository.count()
- JpaRepository.countAll()
- JpaRepository.findAllById(Arrays.asList(1L, 2L));
- repository.existsById(1L); // --------------------------- check whether is exist.
```

##### 2.2 JPA / JPA 和 Swagger 示例 1

```java / JPA 和 Swagger 示例 1
package com.example.backreviewjava.controller;

import com.example.backreviewjava.jpa.entity.MusicJpaEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/music-jpa-api")
@Tag(name = "Test jpa and swagger3", description = "Test jpa and swagger3")
public interface MusicJpaApi {

    // 1
    // getAllMusics
    @Operation(summary = "Get all musics", description = "Returns a list of all musics")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful", content = @Content(array = @ArraySchema(schema = @Schema(implementation = MusicJpaEntity.class)))),
            @ApiResponse(responseCode = "400", description = "Failed", content = @Content)
    })
    @RequestMapping(value = "/all-music", method = RequestMethod.GET)
    public List<MusicJpaEntity> getAllMusics();


    // 2
    // getMusicById
    @Operation(summary = "Get one music by id", description = "Returns a music")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful", content = @Content(schema = @Schema(implementation = MusicJpaEntity.class))),
            @ApiResponse(responseCode = "400", description = "Failed", content = @Content)
    })
    @RequestMapping(value = "/music/{id}", method = RequestMethod.GET)
    public MusicJpaEntity getMusicById(@PathVariable Integer id);

    // 3
    // addMusic
    @Operation(summary = "Add a music", description = "Add a music")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Music created successfully", content = @Content(schema = @Schema(implementation = MusicJpaEntity.class))),
            @ApiResponse(responseCode = "400", description = "Music created unsuccessfully", content = @Content)
    })
    @RequestMapping(value = "/music", method = RequestMethod.POST)
    public void addMusic(@RequestBody @Parameter(description = "music", required = true, schema = @Schema(implementation = MusicJpaEntity.class)) MusicJpaEntity music);

    // 4
    // edit
    @Operation(summary = "Edit a music", description = "Edit a music")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Music edited successfully", content = @Content(schema = @Schema(implementation = MusicJpaEntity.class))),
            @ApiResponse(responseCode = "400", description = "Music edited unsuccessfully", content = @Content)
    })
    @RequestMapping(value = "/music", method = RequestMethod.PUT)
    public  void editMusic(@RequestBody MusicJpaEntity music);

    // 5
    // delete
    @Operation(summary = "Delete a music", description = "Delete a music")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Music deleted successfully", content = @Content),
            @ApiResponse(responseCode = "404", description = "Music deleted unsuccessfully", content = @Content)
    })
    @RequestMapping(value = "/music/{id}", method = RequestMethod.DELETE)
    public void deleteMusic(@PathVariable Integer id);
}
```

##### 2.3 JPA / JPA 和 Swagger 示例 2

```java / JPA 和 Swagger 示例 2

package com.example.backreviewjava.service.impl;

import com.example.backreviewjava.jpa.repository.MusicJpaRepository;
import com.example.backreviewjava.jpa.entity.MusicJpaEntity;
import com.example.backreviewjava.service.MusicJpaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class MusicJpaServiceImpl implements MusicJpaService {

    private final MusicJpaRepository musicJpaRepository;
    // @Resource
    @Autowired
    public MusicJpaServiceImpl(MusicJpaRepository musicJpaRepository) {
        this.musicJpaRepository = musicJpaRepository;
    }

    // 1
    // findAll()
    public List<MusicJpaEntity> getAllMusics() {
        log.warn("getAllMusic==========>MusicJpaServiceImpl/musicJpaRepository/findAll");
        return musicJpaRepository.findAll();
    }

    // 2
    // findById(id),get()
    public  MusicJpaEntity getMusicById(Integer id) {
        return musicJpaRepository.findById(id).get();
    }

    // 3
    // save() - add
    public void  addMusic(MusicJpaEntity music) {
        log.warn("addMusic{}", music);
        musicJpaRepository.save(music);
    }

    // 4
    // save() - edit
    public void editMusic(MusicJpaEntity music) {
        log.warn("editMusic{}", music);
        musicJpaRepository.save(music);
    }

    // 5
    // deleteById
    public void deleteMusic(Integer id) {
        log.warn("deleteMusic==========>MusicJpaServiceImpl/deleteMusic/id={}", id);
        musicJpaRepository.deleteById(id);
    }

}
```

##### 2.4 JPA / 模糊查询 fuzzy query

```java / JPA 模糊查询 fuzzy query
package com.example.backreviewjava.jpa.repository;

import com.example.backreviewjava.jpa.entity.MusicJpaEntity;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MusicJpaRepository extends JpaRepository<MusicJpaEntity, Integer> {

    // 自定义 JPQL 查询，对 name, singer 和 album 进行模糊查询
    // -- 第一个 m 是别名代表的实体
    // -- 第二个 m 是给 MusicJpaEntity 去了一个别名
    @Query("SELECT m FROM MusicJpaEntity m WHERE " +
            "m.name LIKE %:keyword% OR " +
            "m.singer LIKE %:keyword% OR " +
            "m.album LIKE %:keyword%")
    List<MusicJpaEntity> searchByKeyword(@Param("keyword") String keyword);
}
```

##### ------- ------- ------- ------- ------- ------- -------

##### ------- ------- ------- ------- ------- ------- -------

##### (3) Swagger / 常见注解 / 示例

```java / Swagger 示例 1
package com.example.backreviewjava.controller;

import com.example.backreviewjava.jpa.entity.MusicJpaEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/music-jpa-api")
@Tag(name = "Test jpa and swagger3", description = "Test jpa and swagger3")
public interface MusicJpaApi {

    // 1
    // getAllMusics
    @Operation(summary = "Get all musics", description = "Returns a list of all musics")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful", content = @Content(array = @ArraySchema(schema = @Schema(implementation = MusicJpaEntity.class)))),
            @ApiResponse(responseCode = "400", description = "Failed", content = @Content)
    })
    @RequestMapping(value = "/all-music", method = RequestMethod.GET)
    public List<MusicJpaEntity> getAllMusics();


    // 2
    // getMusicById
    @Operation(summary = "Get one music by id", description = "Returns a music")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful", content = @Content(schema = @Schema(implementation = MusicJpaEntity.class))),
            @ApiResponse(responseCode = "400", description = "Failed", content = @Content)
    })
    @RequestMapping(value = "/music/{id}", method = RequestMethod.GET)
    public MusicJpaEntity getMusicById(@PathVariable Integer id);

    // 3
    // addMusic
    @Operation(summary = "Add a music", description = "Add a music")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Music created successfully", content = @Content(schema = @Schema(implementation = MusicJpaEntity.class))),
            @ApiResponse(responseCode = "400", description = "Music created unsuccessfully", content = @Content)
    })
    @RequestMapping(value = "/music", method = RequestMethod.POST)
    public void addMusic(@RequestBody @Parameter(description = "music", required = true, schema = @Schema(implementation = MusicJpaEntity.class)) MusicJpaEntity music);

    // 4
    // edit
    @Operation(summary = "Edit a music", description = "Edit a music")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Music edited successfully", content = @Content(schema = @Schema(implementation = MusicJpaEntity.class))),
            @ApiResponse(responseCode = "400", description = "Music edited unsuccessfully", content = @Content)
    })
    @RequestMapping(value = "/music", method = RequestMethod.PUT)
    public  void editMusic(@RequestBody MusicJpaEntity music);

    // 5
    // delete
    @Operation(summary = "Delete a music", description = "Delete a music")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Music deleted successfully", content = @Content),
            @ApiResponse(responseCode = "404", description = "Music deleted unsuccessfully", content = @Content)
    })
    @RequestMapping(value = "/music/{id}", method = RequestMethod.DELETE)
    public void deleteMusic(@PathVariable Integer id);
}
```

##### ------- ------- ------- ------- ------- ------- -------

##### ------- ------- ------- ------- ------- ------- -------

##### (4) 【【 SpringBoot All knowledge 】】 [SpringBoot-All-Knowledge]

##### 4.1 目录最佳实践 / SpringBoot 目录最佳实践

```go 目录最佳实践
src
├── main
│   └── java
│       └── com.example.demo
│           ├── controller
│           ├── service
│           ├── dao/repository
│           ├── model/entity/dto
│           ├── config
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

##### 4.2 Static Resource / Access Static Resource / SpringBoot knowledge

```
Position: application.yml
-

spring:
  # 2.3
  # Configure static resources.
  # 2.3.1
  # spring.web.resources.static-locations: classpath:/custom-static/,classpath:/public/,classpath:/resources/,classpath:/static/
  # -- this indicates the location of the directory for static resources.
  # -- ( custom-static/public/resources/static ) the all directories are static resources.
  # 2.3.2
  # spring.mvc.static-path-pattern: /resources/**
  # -- this indicates the request path to access the static resource.
  # -- http://localhost:9999/resources/logo.png can access the static image.
  # English
  # -- configure 配置 v
  # -- configuration 配置 n
```

##### 4.3 Upload / Upload File

- [tutorial-link/controller](https://github.com/woow-wu7/5-back-review-java/blob/main/src/main/java/com/example/backreviewjava/controller/impl/FileUploadApiController.java)
- - [tutorial-link/html](https://github.com/woow-wu7/5-back-review-java/blob/main/src/main/resources/templates/fileUpload.html)

```java 1 Config / Upload File
1
maven
-
<!-- spring-boot-starter-thymeleaf -->
<!-- 主要用于显示resources/templates中的html -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>



2
pom.xml
-
spring
  # 2.6
  # spring-boot-starter-thymeleaf
  # 主要用于显示resources/templates中的html
  thymeleaf:
    cache: false
    mode: HTML
```

```java Complete


3
resources/templates/fileUpload.html
-
<!DOCTYPE html>
<!--注意：xmls:th 的值-->
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<div>测试页面</div>
<!-- th:action="@{/upload}" 提交的controller对应的path，即和controller的请求路径对应 -->
<!-- enctype="multipart/form-data" -->
<form th:action="@{/upload-api/by-template}" method="post" enctype="multipart/form-data">
    <div>
        <span>单头像上传</span>
        <input type="file" name="single">
    </div>
    <div>
        <!-- name=multiple 表示开启多个上传 -->
        <span>多头像上传</span>
        <input type="file" name="multiple" multiple>
    </div>
    <button type="submit">上传</button>
</form>
</body>
</html>




4
controller
-
package com.example.backreviewjava.controller.impl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
// 1
// Pay attention
// -- make sure to use '@Controller' to instead of the '@RestController' when implementing upload function.
// -- @Controller
// 2
// Detailed Process
// -- 1. FileUploadApiController
// ------ We should return the 'fileUpload' html template through the handleFile function firstly.
// ------ ( http://localhost:9999/upload-api/getTemplate )
// -- 2. resources/templates/fileUpload.html
// ------ The 'th:action="@{/upload-api/by-template}"' attribute in form tag should math the 'uploadFileByTemplate' function.
// 2
// 注意：前端上传组件的name="aaa"，是和java中的 @RequestPart("aaa") 对应的
// 注意: "/upload-api/by-template" 需要和 fileUpload.html 中的 'th:action="@{/upload-api/by-template}"' 匹配
@Controller
@Slf4j
@RequestMapping("/upload-api")
public class FileUploadApiController {
    // 1
    @RequestMapping(value = "/getTemplate", method = RequestMethod.GET)
    public String handleFile(
    ) {
        // 1. 这里返回的是 resources/templates/fileUpload.html
        // 2. 需要安装 spring-boot-starter-thymeleaf 这个maven依赖
        // 3. -- 所以我们启动项目后，需要首先访问 http://localhost:9999/upload-api/getTemplate 来打开文件上传页面
        // 3. -- 然后提交表单，提交的路径是 'th:action="@{/upload-api/by-template}"' 对应 "/upload-api/by-template" 这个路径的方法 uploadFileByTemplate
        return "fileUpload";
    }
    // 2
    // 注意: "/upload-api/by-template" 需要和 fileUpload.html 中的 'th:action="@{/upload-api/by-template}"' 匹配
    @RequestMapping(value = "/by-template", method = RequestMethod.POST)
    public String uploadFileByTemplate(
            @RequestPart("single") MultipartFile single,
            @RequestPart("multiple") MultipartFile[] multiple
    ) throws IOException {
        log.warn("上传的单文件{}", single);
        log.warn("上传的多文件{}", multiple);
        if (!single.isEmpty()) {
            // originalFilename: 获取原始文件名
            // transferTo: 保存到 ( Users/xiawu/work/personal... ) 文件夹
            String originalFilename = single.getOriginalFilename();
            log.warn("上传单文件文件名是:{}", originalFilename);
            single.transferTo(new File("/Users/xiawu/work/personal/back-end/back-review-java/src/main/resources/templates/files" + originalFilename));
        }
        if (multiple.length > 0) {
            for (MultipartFile file : multiple) { // for循环
                if (!file.isEmpty()) {
                    String originalFilename = file.getOriginalFilename(); // 原始文件名
                    long size = file.getSize()/1024; // 文件大小，默认但是为字节，1MB = 1024KB = 1024 * 1024 byte
                    log.info("文件名{}. 大小{}KB", originalFilename, size);
                    file.transferTo(new File("/Users/xiawu/work/personal/back-end/back-review-java/src/main/resources/templates/files" + originalFilename));
                }
            }
        }
        return "fileUpload"; // 返回 fileUpload.html
    }
    // (3)
    // 前后端分离的接口
    // 注意点
    // 1. consumes 一定要设置成 "multipart/form-data" 因为前端 antd 中的 Upload 组件是用的 form-data 方式在上传
    // 2. 前端上传时 Upload 组件一定要设置 name 属性，因为 name 的值是和这里的 @RequestPart("前端name属性的值") 一一对应
    // 3. consume 是消费的意思
    @RequestMapping(value = "/byfronten", consumes = "multipart/form-data", method = RequestMethod.POST)
    @ResponseBody // 因为用的是 @controler，因为要返回html，而这里我们需要返回前后端分离后的数据，所以加上 @ResponseBody
    public String frontendUpload(
            // @RequestParam("file") MultipartFile avatars
            @RequestPart("file") MultipartFile avatars
    ) {
        System.out.println(avatars);
        return "上传成功";
    }
}
```

##### 4.4 Interceptor 拦截器 / 1.创建拦截器 2.注册拦截器

```java 4.4.1 创建拦截器
4.4.1
创建拦截器
-
package com.example.backreviewjava.interceptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
@Component
@Slf4j
public class RequestInterceptor implements HandlerInterceptor {
    // 1
    // preHandle
    // 目标方法执行之前执行
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandle拦截器 - HTTP Method: " + request.getMethod());
        System.out.println("preHandle拦截器 - Request URL: " + request.getRequestURL());
        System.out.println("preHandle拦截器 - Query Parameters: " + request.getQueryString());
        System.out.println("preHandle拦截器 - Request Parameters: " + request.getParameterMap());
        System.out.println("preHandle拦截器 - Request Headers: " + Collections.list(request.getHeaderNames()));
        return true; // true 表示放行，false表示拦截
    }
    // 2
    // postHandle
    // 目标方法执行完成之后执行
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle拦截器 - Response Status: " + response.getStatus());
        System.out.println("postHandle拦截器 - Response Headers: " + response.getHeaderNames());
    }
    // 3
    // 页面渲染以后执行
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("afterCompletion拦截器");
        if (ex != null) {
            // 错误信息
            System.out.println("afterCompletion拦截器 - Exception Occurred: " + ex.getMessage());
        }
    }
}
```

```java 4.4.2 注册拦截器
4.4.2
注册拦截器
-
package com.example.backreviewjava.config;

import com.example.backreviewjava.interceptor.RequestInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebConfig  implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new RequestInterceptor())
                .addPathPatterns("/**") // 拦截 => 拦截所有请求，包括静态资源
                .excludePathPatterns("/", "/login", "css/**", "/fonts/**", "/images/**", "/js/**"); // 放行，放行了static文件夹下的所有静态资源
        // 问题：如何能访问到 resources/static/images/8.jpg
        // 回答：http://localhost:7777/images/8.jpg
    }
}
```

##### 4.5 杀进程

```
1
View process
- $ lsof -i :8080


2
Kill process
- $ kill <PID>


3
force kill process
- $ kill -9 <PID>


4
如何权限不够，可以用一下命令来设置比较高的权限
- 确保 /var/run 目录有正确的权限
- $ sudo chmod 777 /var/run
```
