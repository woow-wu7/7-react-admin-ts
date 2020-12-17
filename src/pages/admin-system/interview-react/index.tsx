import React from 'react'
import SmartProgress from '@/components/SmartProgress'
import Diff from './Knowledge/Diff'
import VarUp from './Knowledge/VarUp'
import PrototypeChain from './Knowledge/PrototypeChain'
import Ceiling from './Knowledge/Ceiling'
import StickyFooter from './Knowledge/StickyFooter'
import VisibilityDisplay from './Knowledge/VisibilityDisplay'
import InlineBlock from './Knowledge/InlineBlock'
import Triangle from './Knowledge/Triangle'
import Animates from './Knowledge/Amimates'
import Progress from './Knowledge/Progress'
import BoxSizing from './Knowledge/BoxSizing'
import OnePx from './Knowledge/OnePx'
import Media from './Knowledge/Media'
import Em from './Knowledge/Em'
import Rem from './Knowledge/Rem'
import Ellipsis from './Knowledge/Ellipsis'
import Layouts from './Knowledge/LayOuts'
import CenterLayout from './Knowledge/Center'
import MarginCollapse from './Knowledge/Margin-collapse'
import ColumnEqual from './Knowledge/ColumnEqual'
import Curry from './Knowledge/Curry'
import Partial from './Knowledge/Partial'
import PromiseLearn from './Knowledge/PromiseLearn'
import CrossOrigin from './Knowledge/CrossOrigin'
import { useSelector } from 'react-redux'
import './interview-react.scss'

interface IConfig {
  path: string;
  deep: boolean;
  RegExp: any;
  mode: "sync" | "eager" | "weak" | "lazy" | "lazy-once" | undefined;
}

function requireModules() {
  const moduleMap = {}
  const moduleContext = require.context('./Knowledge', true, /index.tsx/, 'sync')
  moduleContext.keys().forEach(modulePath => {
    const moduleName: any = modulePath.match(/[A-Z].*\//)?.[0]?.replace(/\//g, '');
    moduleMap[moduleName] = moduleContext(modulePath).default
  })
  return moduleMap
}

const InterviewReact = () => {
  const res = requireModules()
  console.log('模块name和模块源码的map映射 :>> ', res);

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
      <CenterLayout />
      <MarginCollapse />
      <ColumnEqual />
      <Curry />
      <Partial />
      <CrossOrigin/>
    </div>
  )
}

export default InterviewReact
