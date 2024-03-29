import { useLayoutEffect, useState } from 'react'

export default function useWindowSize() {
  const [size, setSize] = useState([0, 0])

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }

    setSize([window.innerWidth, window.innerHeight])

    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}
