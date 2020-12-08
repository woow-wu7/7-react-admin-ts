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
import MarginCollapse from './Knowledge/Margin-collapse'
import ColumnEqual from './Knowledge/ColumnEqual'
import Curry from './Knowledge/Curry'
import Partial from './Knowledge/Partial'
import { useSelector } from 'react-redux'
import './interview-react.scss'

const InterviewReact = () => {
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
      <MarginCollapse />
      <ColumnEqual />
      <Curry />
      <Partial />
    </div>
  )
}

export default InterviewReact
