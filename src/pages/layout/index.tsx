import React from 'react'
import { renderRoutes } from 'react-router-config'
import { Select, Button } from 'antd'
import styles from './layout.module.scss'


let systemType = ''

const Layout = (props: any) => {
  const { Option } = Select;
  const handleChange = () => {

  }
  const render = () => {
    if (systemType === 'admin') {
      return (
        <div className={styles.layoutAdmin}>
          <header className={styles.header}>layout page admin</header>
          {renderRoutes(props.route.routes)}
        </div>
      )
    } else {
      return (
        <div className={styles.layoutBigScreen}>
          <header className={styles.header}>layout page bigScreen</header>
          {renderRoutes(props.route.routes)}
        </div>
      )
    }
  }
  return (
    <>
      <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
      </Select>
      {render()}
    </>
  )


}

export default Layout