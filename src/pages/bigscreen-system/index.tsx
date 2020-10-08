import React from 'react'
import { renderRoutes } from '@/utils/render-routes/index'
import styles from './index.module.scss'

const BigScreen = (props: any) => {
  return (
    <div className={styles.layoutBigScreen}>
      {renderRoutes(props.route.routes)}
    </div>
  )
}

export default BigScreen