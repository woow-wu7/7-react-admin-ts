import React, { useEffect, useState } from 'react'
import { renderRoutes } from '../../utils'
import { connect, useSelector } from 'react-redux'
import styles from './layout.module.scss'
import { SYSTEMTYPE } from '../../global/enum'
import { useHistory } from 'react-router-dom'



const Layout = (props: any) => {
  const { systemType } = props
  let history = useHistory();
  const token = useSelector((state: any) => state.app.token)

  useEffect(() => {
    if(!token) {
      history.replace('/login')
    }
  }, [])

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