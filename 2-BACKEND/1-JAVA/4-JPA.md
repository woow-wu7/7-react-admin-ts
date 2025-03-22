##### JPA

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

##### (1) JPA / JPA Config 配置

- [业务整体流程] `【 ControllerInterface -> ControllerClass -> ServiceInterface -> ServiceClass -> RepositoryInterface 】`
- [JPA 常见注解](./3-annotation-and-knowledges.md)

```java - JPA Config 配置
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
```

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
TIPS: the 'music_name' field correspond to the 'name' field in the database.
-- map: 地图n 映射v
-- correspond: 对应 相当于 类似于
-- 【 correspond to. 和...相对应 】

------- -------

5.
Some query methods that come with JPA.
自带的一些查询方法
- JpaRepository.findAll()
- JpaRepository.findById(id)
- JpaRepository.findByIdIn(ids) // ------------------------ 通过 IDS 多个ID查询多个数据
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
