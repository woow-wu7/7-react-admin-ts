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

      <div className={styles.plugins}>
        <p className={styles.title}>教程</p>

        <a href="https://segmentfault.com/a/1190000020445644" target="_blank">(1) react中 echarts的封装</a>
        <a href="https://www.cnblogs.com/zhangnan35/p/12680038.html" target="_blank">(2) vue中 echarts的封装</a>

      </div>
    </div>
  )
}

export default Material
