import { useCallback, useEffect, useRef, useState } from 'react'

export function useTimer(active: boolean) {
  const [seconds, setSeconds] = useState(0)
  const id = useRef<number | null>(null)

  useEffect(() => {
    if (!active) {
      if (id.current) window.clearInterval(id.current)
      id.current = null
      return
    }
    id.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => {
      if (id.current) window.clearInterval(id.current)
    }
  }, [active])

  const reset = useCallback(() => setSeconds(0), [])
  const set = useCallback((v: number) => setSeconds(Math.max(0, v)), [])

  return { seconds, reset, setSeconds: set }
}
