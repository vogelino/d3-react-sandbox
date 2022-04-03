import { useState, useEffect } from 'react'

interface WindowSizeOutput {
  width: number | undefined
  height: number | undefined
}

export function useWindowSize(): WindowSizeOutput {
  const [windowSize, setWindowSize] = useState<WindowSizeOutput>({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    function handleResize(): void {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
