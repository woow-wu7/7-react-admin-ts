import { setLocalStorage } from '@/utils'
import React from 'react'
import { useParams } from 'react-router-dom'

const JsEs5Detail = (props: any) => {
  const params = useParams()
  setLocalStorage('routeParams', params)

  return (
    <div>
      <header>JsEs6Detail page  admin</header>
    </div>
  )
}

export default JsEs5Detail
