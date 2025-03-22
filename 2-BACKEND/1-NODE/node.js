const path = require("path");
const fs = require("fs");

// 1
// __filename: ( 执行node命令的文件 ) 的 ( 绝对路径 ) ----------------------- 执行脚本的文件 的绝对路径
const filename = __filename;
console.log("filename: ", filename);

// 2
// __dirname: ( 执行node命令的文件 ) 所在的 ( 目录 ) 的 ( 绝对路径 ) ---------- 执行脚本的文件 所在目录 的绝对路径
const dirname = __dirname;
console.log("dirname: ", dirname);

// 3
// path.resolve()
// - 作用: 将( 路径或路径片段 ) 的序列解析为 ( 绝对路径 )
// - 返回值：一个 ( 绝对路径 )
// --- 注意: 不传参数将返回 ( 当前工作目录的绝对路径 )
// --- 绝对路径: node命令输入时所在的 目录 的 绝对路径
// --- 比如: "node": "node 2-BACKEND/1-NODE/node.js" 是 package.json 中的语句，所以 path.resolve() 就表示 ( package.json文件 ) ( 所在的目录 )
// --- 所以: path.resolve()不传参 = process.cwd()
const path_resolve = path.resolve();
console.log("path.resolve: ", path_resolve);

// 4
// path.join()
// - 拼接路径
const path_join = path.join("/1-node", "/node.js");
console.log("path.join: ", path_join);

// 5
// process.cwd()
// - node命令输入时所在的 目录 的 ( 绝对路径 )
// - 所以: path.resolve()不传参 = process.cwd()
// - 所以: 在工程化项目中，process.cwd() 大部分情况是 package.json 所在的的 文件夹 的 绝对路径
const process_cwd = process.cwd();
console.log("process.cwd: ", process_cwd);

// 6
// fs.readdir(path, options, callback)
// - 读取 path 文件夹下的 所有文件
fs.readdir(process_cwd, (err, files) => {
  console.log("fs.readdir: ", files);

  files.forEach((file) => {
    const fileAbsolutePath = path.join(process_cwd, file);
    fs.stat(fileAbsolutePath, (err, stats) => {
      // console.log("stats: ", stats);
      // console.log(`${file}是文件吗？`, stats.isFile());
      // console.log(`${file}是文件夹吗？`, stats.isDirectory());
    });
  });
});

// 7
// path.dirname(path)
// - 文件路径: 当 path 是文件路时，会返回该文件所在的文件夹的路径，即去取具体的file
//   - path1 = path.dirname("/users/admin/website/index.html");
//   - path1 = /users/admin/website
// - 文件夹路径: 当 path 是文件夹时，返回上一级的文件夹路径，即 ( 父文件夹路径 )
//   - path2 = path.dirname("website/post/comments")
//   - path2 = website/post
// - 所以: path.dirname 可以用来寻找父文件夹
const _dirname = path.dirname(__dirname);
console.log("_dirname: ", _dirname);
const _dirname2 = path.dirname(__filename);
console.log("_dirname2: ", _dirname2);
