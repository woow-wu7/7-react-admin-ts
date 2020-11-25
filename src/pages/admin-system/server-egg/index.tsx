/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import styles from './egg.module.scss'

const ServerEgg = (props: any) => {
  return (
    <div className={styles.egg}>
      <p className={styles.title}>egg</p>
      
      <div className={styles.content}>
        <a href="https://github.com/woow-wu7/7-react-admin-egg" target="_blank">7-react-admin-egg项目地址</a>
      </div>
    </div>
  )
}

export default ServerEgg
