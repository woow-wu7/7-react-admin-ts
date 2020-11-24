import React, { useEffect } from 'react'
import styles from './index.module.scss'
import {useHistory} from 'react-router-dom'
import {removeLocalStorage} from '@/utils/index'

const BigScreen = (props: any) => {
  const history = useHistory()
  useEffect(() => {
    const viewports = document.querySelector('meta[name=viewport]')
    viewports && viewports.setAttribute('content', `width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0`)
    console.log(viewports, "viewport");
  }, [])
  useEffect(() => {
    history.push("/big-screen-home")
  },[history])
  const exit = () => {
    removeLocalStorage()
    history.replace('/login')
  }

  return (
    <div className={styles.layoutBigScreen}>
      {/* {renderRoutes(bidScreenRouters)} */}
      <div className={styles.big__Header}>
        <p>大屏监测平台</p>
        <div className={styles.headeer__button} onClick={exit} >注销</div>
        <div className={styles.header__link}>
          <p>查看监测后台</p>
        </div>
      </div>

      <div className={styles.big__content}>
        {/* 左 */}
        <div className={styles.content__left}>
          <div className={styles.left__indicator}>1</div>
          <div className={styles.left__user}>2</div>
          <div className={styles.left__service}>3</div>
        </div>
        {/* 中 */}
        <div className={styles.content__center}>
          <div className={styles.center__cards}></div>
          <div className={styles.center__map}></div>
        </div>
        {/* 右 */}
        <div className={styles.content__right}>
          <div className={styles.right__indicator}>1</div>
          <div className={styles.right__user}>2</div>
          <div className={styles.right__service}>3</div>
        </div>
      </div>
    </div>
  )
}

export default BigScreen