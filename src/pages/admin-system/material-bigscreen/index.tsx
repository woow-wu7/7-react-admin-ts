import React from 'react'
import styles from './bigscreen.module.scss'
import screenfull from 'screenfull'

const Material = (props: any) => {
  const fullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
  }
  return (
    <div className={styles.matarialBigScreen}>
      <div className={styles.fullscreenButton} onClick={fullscreen}>全屏</div>

      <div>
        <a href="https://juejin.im/post/6844903981945208839" target="_blank">(1) 线上后台系统</a>
      </div>

      <div className={styles.plugins}>
        <p className={styles.title}>插件</p>

        <a href="https://github.com/sindresorhus/screenfull.js" target="_blank">(1) screenfull.js</a>
      </div>
    </div>
  )
}

export default Material
