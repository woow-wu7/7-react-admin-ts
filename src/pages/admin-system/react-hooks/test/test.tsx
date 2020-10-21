import React, { useEffect, useState } from 'react'



function Test() {
  const [message, setMessage] = useState({
    name: 'wang',
    age: 20,
  })

  useEffect(() => {
    setMessage(prev => ({
      ...prev,
      name: 'li'
    }))
  }, [])

  return (
    <div>
      <div>{message.name}</div>
    </div>
  )
}

export default Test
