import React from 'react'
import SmartProgress from '@/components/SmartProgress'
import Animates from './Knowledge/Amimates'
import Layouts from './Knowledge/LayOuts' // 应该为 LayOuts 文件名是key
// import CenterLayout from './Knowledge/Center' // 这里要引起注意，这里不能更改名字，因为moduleMap的key是截取的文件名
import { useSelector } from 'react-redux'
import autoRequire from './auto-require' // 自动引入模块，解决头部很多import
import './interview-react.scss'


const InterviewReact = () => {
  const {
    Diff,
    VarUp, // 变量提升
    PrototypeChain, // 原型链
    Ceiling,
    StickyFooter,
    VisibilityDisplay,
    InlineBlock,
    Triangle, // 三角形
    Progress,
    BoxSizing,
    OnePx,
    Media,
    Em,
    Rem,
    Ellipsis, // 省略号
    Center, // 垂直居中
    MarginCollapse, // margin 边距重叠
    ColumnEqual, // 多列等高
    Curry, // 柯里化
    Partial, // 片函数
    PromiseLearn, // proise
    PromiseManual, // 手写promise
    CrossOrigin, // 跨域
    FrontendRouter,
    Extend, // 继承
    Observer, // 观察者模式
    Garbage, // 垃圾回收机制
    FrontendModule, // 前端模块化
    ReduxSourceCode, // redux 和 react-redux 源码
    AxiosCancelToken, // Axios CancelToken 取消请求 
    DocumentObjectModel, // DOM文档对象模型
    EventLoop, // node 和 js 的事件轮询
    SlideMenu,
    Storage, // 代理模式重新代理 ( 原生Storage )
  } = autoRequire() as any

  const scrollRef = useSelector((state: { admin: { scrollContainer: HTMLDivElement } }) => state.admin.scrollContainer)
  return (
    <div className="interview-react">
      {/* 进度条 */}
      <SmartProgress
        scrollRef={scrollRef}
        option={{
          height: '2px',
          background: '#87D068',
        }}
      />
      <Diff />
      <VarUp />
      <PrototypeChain />
      <Ceiling />
      <StickyFooter />
      <PromiseLearn />
      <PromiseManual />
      <VisibilityDisplay />
      <InlineBlock />
      <Triangle />
      <Animates />
      <Progress />
      <BoxSizing />
      <OnePx />
      <Media />
      <Em />
      <Rem />
      <Ellipsis />
      <Layouts />
      <Center />
      <MarginCollapse />

      {/* 多列等高布局 */}
      <ColumnEqual />

      <Curry />
      <Partial />
      <CrossOrigin />
      <FrontendRouter />
      <Extend />
      <Observer />
      <Garbage />
      <FrontendModule />
      <ReduxSourceCode />
      <AxiosCancelToken />
      <Storage />
      <EventLoop />
      <SlideMenu />
      <DocumentObjectModel />
    </div>
  )
}

export default InterviewReact
