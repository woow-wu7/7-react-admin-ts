import React, { useState } from 'react'

const Em = () => {
  const [links] = useState([
    {
      name: '前端模块化 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904056557682701'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)
  return (
    <div className="frontend-module">
      <p>前端模块化</p><br />

      <h1>Commonjs方案: 主要用于服务端，同步加载，nodejs使用commonjs规范；commonjs模块就是对象，输入时必须查找对象属性</h1>
      <h1>AMD,CMD用于浏览器端，异步加载</h1>
      <h1>ES6的模块化方案，可以用于浏览器和服务器，通用方案，静态的</h1>
      <br/>
      <h1>AMD：用于浏览器端，依赖前置，异步加载，运行时确定依赖关系，输入输出的变量 --- requirejs</h1>
      <h1>CMD: 用于浏览器端，依赖就近，异步加载，运行时确定依赖关系，输入输出的变量 --- seajs</h1>
      <h1>ES6的模块化方案：可以用于浏览器和服务器，静态的，即在编译时就能确定模块的依赖关系，输入输出的变量；而commonjs，AMD，CMD都只能在运行时才能确定</h1>
      <h1>Commonjs模块就是对象，输入时必须查找对象的属性</h1>
      <h1>ES6模块不是对象，而是通过 ( export命令显示的指定输出的代码 )，再通过 ( import命名显示的输入 )</h1>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default Em