import React from 'react'
import styles from './index.module.scss'

const NumberAnimate = ({ score = 0, mode = 'down', off = false }) => {

  const rednerColItem = (col: any) => {
    return [col]
      .concat(new Array(score * 30).fill(0).map((_, index) => index % 10))
      .concat([col])
      .map(number =>
        <div key={(+new Date() + Math.random()) * Math.random()} className={styles.wheelItem}>
          {number}
        </div>)
  }

  const renderCol = () => {
    return String(score)
      .split('')
      .map((col, i) =>
        <span key={i} className={mode === 'down' && i === 0 ? styles.wheelWrapDown : styles.wheelWrapUp} >
          {rednerColItem(col)}
        </span>
      )
  }

  if (off) {
    return <span className={styles.wheel}>{score}</span>
  }
  return (
    <span className={styles.wheel}>
      {renderCol()}
    </span>
  )
}

export default React.memo(NumberAnimate)
