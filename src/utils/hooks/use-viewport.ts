import React, { useEffect } from 'react'

export const useViewport = () => {
  const [width, setWidth] = React.useState(document.documentElement.clientWidth)

  const changeWindowSize = () => {
    console.log('change width')
    setWidth(v => document.documentElement.clientWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', changeWindowSize, false)
    return () => {
      window.removeEventListener('resize', changeWindowSize, false)
    }
  }, [])

  return [width]
}