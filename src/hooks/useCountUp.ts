import { useEffect, useState } from 'react'

export function useCountUp(target: number, active = true, duration = 1200) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) {
      setN(0)
      return
    }
    let raf = 0
    let start = 0
    const tick = (now: number) => {
      if (!start) start = now
      const p = Math.min(1, (now - start) / duration)
      setN(target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])
  return n
}
