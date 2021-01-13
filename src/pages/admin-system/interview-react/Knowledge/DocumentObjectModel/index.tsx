import React, { useState, useEffect, useRef } from 'react'

const DocumentObjectModel = () => {
  const [links] = useState([
    {
      name: 'DOM - 文档对象模型Document Object Model',
      url: ''
    },
  ])
  const refTitle = useRef<HTMLParagraphElement>(null)
  const refButton = useRef<HTMLButtonElement>(null)
  const refDiv = useRef<HTMLDivElement>(null)
  const refInnterAndOuter = useRef<HTMLDivElement>(null)
  const refHHH = useRef<HTMLDivElement>(null)

  // Element.nodeName === Element.tagName 元素名，大写
  // Element.draggable 是否可拖动
  // Element.lang 语言
  useEffect(() => {
    const TitleDom = refTitle.current
    if (TitleDom) {
      console.log('TitleDom.nodeName => Element.nodeName === Element.ragName :>> ', TitleDom?.nodeName);
      console.log('TitleDom.tagName => Element.nodeName === Element.ragName :>> ', TitleDom?.tagName);
      console.log('TitleDom.draggable => 返回一个布尔值，表示当前元素是否可以拖动 :>> ', TitleDom?.draggable);
      console.log('TitleDom.lang => 返回当前元素的语言设置 :>> ', TitleDom?.lang);
    }
  })

  // Element.accessKey键盘 和 Element.title鼠标悬浮
  useEffect(() => {
    const ButtonDom = refButton.current
    if (ButtonDom) {
      ButtonDom.accessKey = "u"
      ButtonDom.title = 'Element.title用来指定鼠标悬浮时的问题提示框'
    }
    // Element.accessKey => 可以读写当前元素的快捷键
    // 效果 => 当使用 ( Alt + u ) 时，就会把焦点移动到绑定了该属性的元素上
  }, [])

  // Element.dataset 对象
  useEffect(() => {
    const DivDom = refDiv.current
    if (DivDom) {
      console.log('DivDom.dataset => Element.dataset属性返回一个对象，该对象中可以访问到 ( data-) 属性的值 :>> ', DivDom.dataset);
      console.log('DivDom.dataset.custom :>> ', DivDom.dataset.custom);
      console.log('DivDom.getAttribute("id") :>> ', DivDom.getAttribute("id"));
      console.log('DivDom.getAttributeNames()返回一个数组，成员是该元素的所有属性的名字:>> ', DivDom.getAttributeNames());
    }
  }, [])

  // Element.innerHTML 和 Element.outerHTML
  useEffect(() => {
    const InnerHtmlANDOuterHtml = refInnterAndOuter.current
    if (InnerHtmlANDOuterHtml) {
      console.log('InnerHtmlANDOuterHtml.innerHTML :>> ', InnerHtmlANDOuterHtml?.innerHTML);
      console.log('InnerHtmlANDOuterHtml.outerHTML :>> ', InnerHtmlANDOuterHtml.outerHTML);
      // x,y,height,width,left,right,top,bottom
      console.log('InnerHtmlANDOuterHtml.getBoundingClientRect => 获取当前元素节点的大小位置等盒模型信息:>> ', InnerHtmlANDOuterHtml.getBoundingClientRect());
    }
  }, [])

  // Element.querySelector(css选择器)
  // Element.querySelectorAll(css选择器) => 返回 NodeList 类似数组的对象，表示所有匹配的元素
  useEffect(() => {
    const bb = document.querySelector('#custom-data-attrubute') // id选择器
    const cc = document.querySelector('[id="custom-data-attrubute"]') // 属性选择器
    console.log('Element.querySelector(css选择器)的使用 :>> ', bb, cc);

    const dd = document.querySelectorAll('.aaa')
    console.log('dd => 使用Element.querySelectorAll(css选择器)返回NodeList类似数组的对象 :>> ', dd);
  }, [])


  const renderLinks = () => links.map(({ name, url }) => <div key={name}><a href={url} target="blank">{name}</a></div>)

  const scrollintoView = () => {
    const HHH = refHHH.current
    if (HHH) {
      // Element.scrollintoView()
      // 参数
      //  - true 顶部对齐
      //  - false 底部对齐
      HHH.scrollIntoView(true)
      console.log('Element.scrollintoView() 可以是元素滚动到绑定事件的元素位置:>> ');
    }
  }

  return (
    <div className="document-object-model">
      <p ref={refTitle}>DOM - document object model文档对象模型</p><br />
      <div data-custom="dataCustom" ref={refDiv} id="custom-data-attrubute">Element中的 ( data- ) 属性</div>
      <div ref={refInnterAndOuter}>
        <div>child1</div>
        <div>child2</div>
      </div>
      <button onClick={scrollintoView}>点击触发 Element.scrollintoView() 事件，使页面滚动到绑定事件的元素位置</button>
      <div className="aaa">aaa</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">bbb</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">ccc</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">ddd</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">ddd</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">eee</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">fff</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">ggg</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">aaa</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">bbb</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">ccc</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">ddd</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">ddd</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">eee</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">fff</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa" ref={refHHH}>hhh ==== 点击button将滚动到这里</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">aaa</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">bbb</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">ccc</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">ddd</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">ddd</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">eee</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">fff</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">ggg</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">aaa</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">bbb</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">ccc</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">ddd</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">ddd</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">eee</div><br/><br/><br/><br/><br/><br/><br/>
      <div className="aaa">fff</div><br/><br/><br/><br/><br/><br/><br/>
      <button ref={refButton}>accessKey测试，当设置Element.accessKey='u'键盘后，按下Alt+u就能移动到它上面</button>
      <div>
        {renderLinks()}
      </div>
    </div>
  )
}

export default DocumentObjectModel