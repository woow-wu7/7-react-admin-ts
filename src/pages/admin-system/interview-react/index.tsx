import React from 'react'
import Diff from './Knowledge/Diff'
import VarUp from './Knowledge/VarUp'
import PrototypeChain from './Knowledge/PrototypeChain'
import Ceiling from './Knowledge/Ceiling'
import StickyFooter from './Knowledge/StickyFooter'
import './interview-react.scss'

const InterviewReact = () => {
  return (
    <div className="interview-react">
      <Diff />
      <VarUp />
      <PrototypeChain />
      <Ceiling />
      <StickyFooter />
    </div>
  )
}

export default InterviewReact
