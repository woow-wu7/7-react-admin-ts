import React, { useState } from 'react'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import styles from './layout.module.scss'
import { SYSTEMTYPE } from '../../global/enum'



const Layout = (props: any) => {
  const { systemType } = props

  const render = () => {
    if (systemType === SYSTEMTYPE.ADMIN) {
      return (
        <div className={styles.layoutAdmin}>
          <header className={styles.header}>layout page admin</header>
          {renderRoutes(props.route.routes)}
        </div>
      )
    } else {
      return (
        <div className={styles.layoutBigScreen}>
          {renderRoutes(props.route.routes)}
        </div>
      )
    }
  }
  return (
    <>
      {render()}
    </>
  )


}

const mapStateToProps = (state: any) => {
  return {
    systemType: state.app.systemType
  }
}


export default connect(mapStateToProps)(Layout)