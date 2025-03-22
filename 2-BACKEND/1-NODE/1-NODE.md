### Node

### (一) 常用函数

- [detail](file:///Users/xiawu/work/personal/front-end/8-penetrate/2-BACKEND/1-NODE/node.js)

### path

```
1
path.resolve()
// - 作用: 将( 路径或路径片段 ) 的序列解析为 ( 绝对路径 )
// - 返回值：一个 ( 绝对路径 )
// --- 注意: 不传参数将返回 ( 当前工作目录的绝对路径 )
// --- node命令输入时所在的 目录 的 绝对路径
// --- 比如 "node": "node 2-BACKEND/1-NODE/node.js" 是 package.json 文件中的语句，所以 path.resolve() 就表示 ( package.json文件 ) ( 所在的目录 )

2
path.join()
- 拼接路径


3
__dirname 和 __filename
- __filename: ( 执行node命令的文件 ) 的 ( 绝对路径 ) ------------------ 执行脚本的文件 的绝对路径
- __dirname: ( 执行node命令的文件 ) 所在的 ( 目录 ) 的 ( 绝对路径 ) ----- 执行脚本的文件 所在目录 的绝对路径


4
process.pwd()
- node命令输入时所在的 目录 的 ( 绝对路径 )
- 所以: path.resolve()不传参 = process.cwd()
- 所以: 在工程化项目中，process.cwd() 大部分情况是 package.json 所在的的 文件夹 的 绝对路径
- Official document: https://nodejs.org/api/process.html


5
path.dirname(path)
- 文件路径: 当 path 是文件路时，会返回该文件所在的文件夹的路径，即去取具体的file
  - path1 = path.dirname("/users/admin/website/index.html");
  - path1 = /users/admin/website
- 文件夹路径: 当 path 是文件夹时，返回上一级的文件夹路径，即 ( 父文件夹路径 )
  - path2 = path.dirname("website/post/comments")
  - path2 = website/post
- 所以: path.dirname 可以用来寻找父文件夹
```

### fs

```
1
fs.readdir(path, options, callback)
- path: It holds the path of the directory from where the contents have to be read. It can be a String, Buffer or URL. //是一个绝对路径
- options:
  - encoding --------------- default value is UTF-8
  - withFileTypes ---------- It is a boolean value which specifies whether the files would be returned as fs.Dirent objects. The default value is ‘false’.
- callbacks(err, files)
- tutorial: https://www.geeksforgeeks.org/node-js-fs-readdir-method/


2
fs.stat(path, options, callback)
- 特点: 是一个 ( 异步 ) 函数
- 作用: 常用来检查 一个文件或目录是否存在，已经获取改文件或目录的相关信息
- 参数:
  - callback(err, stats)
  - stats: It's the Stats object that contains the details of the file path.
  - stats:
    - stats.isFile()
    - stats.isDirectory()
    - stats.size
- tutorial: https://www.geeksforgeeks.org/node-js-fs-stat-method/#
```

- Example:

```
import logger from "@/lib/logger";
import * as fs from "fs";
import path from "path";
import { normalizeResult } from "@/utils/functions";

export async function GET() {
  try {
    const startDirectory = process.cwd();
    const fileNameToFind = "admin.conf";

    const res = new Promise((resolve, reject) => {
      findFileUpward(startDirectory, fileNameToFind, (err, filePath) => {
        if (err) {
          logger.error("发生错误:", err);
          return reject(false);
        } else if (filePath) {
          logger.warn(`找到文件: ${filePath}`);
          return resolve(true);
        } else {
          logger.warn(`未找到文件: ${fileNameToFind}`);
          return reject(false);
        }
      });
    });

    const response = await res;
    return Response.json(
      normalizeResult({ data: { isExist: response }, method: "GET" }, "success")
    );
  } catch (error) {
    logger.error(`发生错误: ${error}`);
    return Response.json(
      { error: "发生错误:", errorData: error },
      { status: 500 }
    );
  }
}

function findFileRecursively(
  directory: string,
  fileName: string,
  callback: (err: Error | null, filePath?: string) => void
): void {
  fs.readdir(directory, (err, files) => {
    if (err) {
      return callback(err);
    }

    files.forEach((file, index) => {
      const filePath = path.join(directory, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          return callback(err);
        }

        if (stats.isFile() && file === fileName) {
          return callback(null, filePath);
        } else if (stats.isDirectory()) {
          findFileRecursively(filePath, fileName, (err, result) => {
            if (err) {
              return callback(err);
            }
            if (result) {
              return callback(null, result);
            }

            if (index === files.length - 1) {
              callback(null, null as any);
            }
          });
        } else if (index === files.length - 1) {
          callback(null, null as any);
        }
      });
    });
  });
}

function findFileUpward(
  startDirectory: string,
  fileName: string,
  callback: (err: Error | null, filePath?: string) => void
): void {
  let currentDirectory = startDirectory;
  const checkDirectory = (directory: string) => {
    findFileRecursively(directory, fileName, (err, filePath) => {
      if (err) {
        return callback(err);
      }
      if (filePath) {
        return callback(null, filePath);
      }

      const parentDirectory = path.dirname(directory);
      if (parentDirectory === directory) {
        return callback(null, null as any);
      }
      checkDirectory(parentDirectory);
    });
  };

  checkDirectory(currentDirectory);
}
```
