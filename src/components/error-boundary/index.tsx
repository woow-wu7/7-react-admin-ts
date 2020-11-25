import React, { useState } from "react"

const ErrorBoundary = (props: {children: any}) => {
  const [hasError, sethasError] = useState(false)
  return (
    hasError
    ?
    <div>程序出现错误</div>
    :
    props.children
  )
}

export default ErrorBoundary