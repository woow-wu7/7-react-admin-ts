
// 自动require模块
// require.context(directory, useSubdirectories, regExp, mode)
// 参数
// 1. directory => 要搜索
// 3. useSubdirectories => 是否搜索子目录
// 3. regExp => 匹配文件的表达式
// 返回值
// require(request) 函数，该函数有三个 ( 属性 )
// 1. resolve => require.resolve()，该函数返回request被解析后得到的模块id
// 2. keys => requier.keys(), 也是一个函数，返回一个数组，由所有可能被此context module 处理的请求组成

/**
 * @function requireModules 函数
 * @desc 自动引入模块，返回 ( 模块名 : 模块内容 ) 的map映射
 */
function requireModules() {
  const moduleMap = {}
  const moduleContext = require.context('./Knowledge', true, /index\.tsx$/, 'sync')
  moduleContext.keys().forEach(modulePath => {
    // moduleName
    // 1. 获取模块名
    // 2. modulePath.match(/[A-Z].*\//) => 表示匹配 ( 大写字母 ) 到 ( / ) 的字符串
    // 3. modulePath.match(/[A-Z].*\//)?.[0] => ? 表示 前面的对象存在就访问其第一个属性，这里是一个数组访问第一项
    // 4. replace(/\//g, '') => 是把 ( / ) 符号替换成 ( 空字符串 )，即删除掉 (  / )
    const moduleName: any = modulePath.match(/[A-Z].*\//)?.[0]?.replace(/\//g, ''); 
    moduleMap[moduleName] = moduleContext(modulePath).default
  })
  console.log('moduleMap :>> ', moduleMap);
  return moduleMap
}

export default requireModules