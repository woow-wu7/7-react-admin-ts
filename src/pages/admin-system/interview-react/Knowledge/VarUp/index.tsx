import React, { useEffect, useState } from 'react'

const VarUp = () => {
  const [links] = useState([
    {
      name: '变量提升 - 我的语雀笔记',
      url: 'https://zhuanlan.zhihu.com/p/103187276'
    },
    {
      name: '变量提升 - 我的掘金博客',
      url: 'https://juejin.cn/post/6844904046050934792'
    },
  ])
  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)

  useEffect(() => {
    function a(name: string) {
      // var name = 'wang'
      // var name = undefined
      console.log('name :>> ', name); // 输出 'wang'
      var name = 'zhang' // name = 'zhang'
      console.log('name :>> ', name); // 输出 '张'
    }
    a('wang')
  }, [])

  // useEffect(() => {
  //   function b(name: any) {
  //     var name = 'zhang';
  //     function name() {console.log(20)}
  //     console.log('name :>> ', name);
  //   }
  //   b('wang')
  // }, [])
  return (
    <div className="var-up">
      <p>变量提升</p>
      <div className="explain">{`优先级：函数形参 > 函数声明 > 变量声明`}</div>
      <div className="explain">{`函数名已经存在，新的覆盖旧的`}</div>
      <div className="explain">{`变量名已经存在，直接跳过变量的声明`}</div>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default VarUp
