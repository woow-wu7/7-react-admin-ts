import React from 'react'
import Diff from './Knowledge/Diff'
import VarUp from './Knowledge/VarUp'
import PrototypeChain from './Knowledge/PrototypeChain'
import Ceiling from './Knowledge/Ceiling'
import './interview-react.scss'

const InterviewReact = () => {
  return (
    <div className="interview-react">
      <Diff />
      <VarUp />
      <PrototypeChain />
      <Ceiling />
    </div>
  )
}

export default InterviewReact
