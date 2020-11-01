import { useState, useEffect } from 'react';

const useOnce = (delay?: number) => {
  const [once, setOnce] = useState(false)

  useEffect(() => {
    delay 
      ? setTimeout(() => {
          setOnce(() => true)
        }, delay)
      : setOnce(() => true)
  }, [delay])

  return once
}


export { useOnce }