## Mysql

```
distinct 不同的 独特的 清楚的 adj

constraint 约束 n

character 性格 特征
reference 引用v 参考n
engine 引擎 发动机
collate 核对 校对 v
alias 别名 n
restrict 约束 v
// strict严格的 VS restrict约束 VS district 区域地区

ascend 上升 v // ------------- descend 下降 v
increase 增加 v // ----------- decrease 减少 v
uppercase 大写 // ------------ lowercase 小写

primary key: 主键 -一个表 只能有一个 主键，并且 ( 主键 ) 不能有 ( 重复值 ) 和 ( NULL )
key: 索引
```

## (一) TABLE

```sql
1
创建表
--
CREATE TABLE `music` (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '歌名',
  `album` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '相册',
  `date` datetime DEFAULT NULL COMMENT '日期',
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `singer_id` int DEFAULT NULL COMMENT '歌手ID',

  ####### ---------------------------------- 主键 PRIMARY KEY
  PRIMARY KEY (`id`),

  ####### ---------------------------------- 索引 KEY
  KEY `SINGER_ID` (`singer_id`),

  ####### ---------------------------------- 外键约束 CONSTRAINT
  CONSTRAINT `SINGER_ID` FOREIGN KEY (`singer_id`) REFERENCES `singer` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT

) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



------- 分割线 ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- -------
------- 分割线 ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- -------



2
查询表
--
####### -- 使用数据库
USE DATABASE_AA;
SELECT
    ap.CASE_ID,

    ####### -- 使用 ( GROUP_CONCAT ) 函数将 同一 CASE_ID 下的多个 ADMINSTRATOR_NOTE、INCURRED_MONTH、PAYMENT_MONTH、RECEIPTS_RECEIVED 和 TERM 值连接成一个字符串
    ####### -- 使用 ( ORDER BY ) 按照 am.TERM 的顺序进行排序
    ####### -- 使用 ( DISTINCT ) 关键字确保 ADMINSTRATOR_NOTE 只保留一个
    ####### -- 使用 ( AS - alias ) 别名
    GROUP_CONCAT(DISTINCT ap.ADMINSTRATOR_NOTE ORDER BY am.TERM ASC) AS ADMINSTRATOR_NOTES,

    GROUP_CONCAT(am.INCURRED_MONTH ORDER BY am.TERM ASC) AS INCURRED_MONTHS,
    GROUP_CONCAT(am.PAYMENT_MONTH ORDER BY am.TERM ASC) AS PAYMENT_MONTHS,
    GROUP_CONCAT(am.RECEIPTS_RECEIVED ORDER BY am.TERM ASC) AS RECEIPTS_RECEIVED,
    GROUP_CONCAT(am.TERM ORDER BY am.TERM ASC) AS TERMS
FROM
    APPLICATION AS ap
####### --------------------------- JOIN --------- SQL的关键字: 将两个表连接在一起 -- 注意: INNER JOIN 和 JOIN 等价
JOIN
    APPLICATION_PAYMENT AS am
####### --------------------------- ON ----------- SQL的关键字: 用于指定连接条件，连接条件定义了两个表中的哪些行应该被连接在一起
ON
    ap.APP_ID = am.APP_ID
WHERE
    ####### ---------------------- IN ------------ SQL的关键字: IN 是一个用于指定多个可能值的运算符，它用于在 WHERE 子句中过滤结果，只返回那些与 IN 列表中的值匹配的行
    am.RECEIPTS_RECEIVED In (0)
####### --------------------------- GROUP BY ----- 按照 ap.CASE_ID 进行分组，将同一 CASE_ID 下的记录合并在一起
GROUP BY
    ap.CASE_ID;



------- 分割线 ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- -------
------- 分割线 ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- -------



3
查询表
3 和 2 类似，使用 music 和 singer 表
--
SELECT
    m.singer_id,
    GROUP_CONCAT(m.`name` ORDER BY m.date DESC) AS MUSIC_NAME,
    GROUP_CONCAT(m.album ORDER BY m.date DESC) AS ALBUM,
		GROUP_CONCAT(m.date ORDER BY m.date DESC) AS DATE,
    GROUP_CONCAT(DISTINCT s.`name`) AS SINGER_NAME,
    GROUP_CONCAT(DISTINCT s.gender) AS GENDER
FROM
    music AS m
JOIN
    singer AS s
ON
    m.singer_id = s.id
WHERE
    s.id IN (1, 2)
GROUP BY
    m.singer_id;



------- 分割线 ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- -------
------- 分割线 ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- -------



4
其他
- 修改字段名: ALTER TABLE 表名 CHANGE 旧字段名 新字段名 数据类型;
- 修改列的定义: ALTER TABLE 表名 MODIFY 列名 新数据类型;
- 修改列的名词: ALTER TABLE 表名 RENAME TO 新列名;
- // alter 改变 更改 v
--
ALTER TABLE test MODIFY COLUMN name VARCHAR(123); ####### -- 修改 name 列的长度为 123
ALTER TABLE test RENAME COLUMN name to NAMES; ####### ------ 修改 name 列名为 NAMES

SELECT * FROM music WHERE `name` LIKE "晴%";
SELECT * FROM music WHERE `name` LIKE "%晴%";
SELECT * FROM music WHERE `name` LIKE "晴__";
SELECT * FROM music WHERE `name` REGEXP "[晴|七]";
// LIKE: 运算符用于 - 模式匹配
// REGEXP: 运算符用于 - 正则表达式匹配
// %: 是一个 ( 通配符 )，表示任意数量的字符（包括零个字符）
// _: 每一个下划线表示 ( 一个字符 ) ----------------------------- 这里是两个下划线，所以匹配两个任意字符，也就是说这个 name 一共三个字符

SELECT COUNT(*) from music;
SELECT singer_id, COUNT(*) from music GROUP BY singer_id;
// COUNT(*): 计算查询结果中的 总行数
```

## (二) VIEW

```sql
CREATE VIEW SingerMusicDetails AS
SELECT
    S.id AS singerID,
    S.name AS singerName,
    S.age,
    S.gender,
    M.id AS musicID,
    M.name AS musicName,
    M.album,
    M.date
FROM
    singer S

####### --------------- INNER JOIN - SQL的关键字: 将两个表连接在一起 -- 注意: ( INNER JOIN ) 和 ( JOIN ) 等价
INNER JOIN
    music M

####### --------------- ON --------- SQL的关键字: 用于指定连接条件，连接条件定义了两个表中的哪些行应该被连接在一起
ON
    S.id = M.singer_id;
```
