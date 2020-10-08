import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import actionType from '../../../app.constant'


let gogo = true

const JsEs6Detail = (props: any) => {
  const params: {id: string} = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (gogo) {
      console.log(111);
      dispatch({
        type: actionType.GETLASTBREADCRUMBUSEPARAMS,
        payload: params.id
      })
      gogo = false
    }
  }, [])
  return (
    <div>
      <header>JsEs6Detail page  admin</header>
    </div>
  )
}

export default JsEs6Detail
