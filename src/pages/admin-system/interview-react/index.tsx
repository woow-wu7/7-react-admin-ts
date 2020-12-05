import React from 'react'
import Diff from './Knowledge/Diff'
import VarUp from './Knowledge/VarUp'
import PrototypeChain from './Knowledge/PrototypeChain'
import Ceiling from './Knowledge/Ceiling'
import StickyFooter from './Knowledge/StickyFooter'
import VisibilityDisplay from './Knowledge/VisibilityDisplay'
import InlineBlock from './Knowledge/InlineBlock'
import Triangle from './Knowledge/Triangle'
import './interview-react.scss'

const InterviewReact = () => {
  return (
    <div className="interview-react">
      <Diff />
      <VarUp />
      <PrototypeChain />
      <Ceiling />
      <StickyFooter />
      <VisibilityDisplay />
      <InlineBlock />
      <Triangle />
    </div>
  )
}

export default InterviewReact
