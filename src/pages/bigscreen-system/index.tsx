import React, { useEffect } from 'react'
import styles from './index.module.scss'
import {useHistory} from 'react-router-dom'
import {removeLocalStorage} from '@/utils/index'

const BigScreen = (props: any) => {
  const history = useHistory()
  useEffect(() => {
    history.push("/big-screen-home")
  },[history])
  const exit = () => {
    removeLocalStorage()
    history.replace('/login')
  }

  return (
    <div className={styles.layoutBigScreen}>
        <div className={styles.panel}>
          <p>大屏</p>
          <button onClick={exit} >退出</button>
        </div>
      {/* {renderRoutes(bidScreenRouters)} */}
    </div>
  )
}

export default BigScreen