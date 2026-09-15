import { useEffect, useRef } from 'react'
import './CreaseScroll.css'

/**
 * Scroll progress, but as a cricket ball rolling down the pitch.
 * The ball's rotation is tied to the distance it has travelled, so it
 * actually rolls rather than slides. Writes straight to the DOM via a
 * ref — this fires on every scroll frame and should never re-render React.
 */
export default function CreaseScroll() {
  const ballRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    let raf = null

    const update = () => {
      raf = null
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const pct = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0

      const ball = ballRef.current
      const line = lineRef.current
      if (!ball || !line) return

      /* Rolling: circumference of the ball vs pixels travelled. */
      const travelled = pct * (line.clientWidth || 0)
      const spin = (travelled / (Math.PI * 16)) * 360

      ball.style.transform = `translate3d(${travelled}px, -50%, 0) rotate(${spin}deg)`
      line.style.setProperty('--pct', pct)
    }

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="crease" aria-hidden="true">
      <div className="crease__line" ref={lineRef}>
        <span className="crease__ball" ref={ballRef}>
          <span className="crease__seam" />
        </span>
      </div>
    </div>
  )
}
