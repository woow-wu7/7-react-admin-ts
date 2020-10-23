import { useEffect, useRef } from 'react';

interface IusePrevious {
  <T>(state: T): T
}

export const usePrevious: IusePrevious = (state) => {
  const ref = useRef(state)
  useEffect(() => {
    ref.current = state
  })
  return ref.current
}