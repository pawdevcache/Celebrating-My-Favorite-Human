import { useMemo } from 'react'
import './FloatingHearts.css'

const GLYPHS = ['❤️', '🎈', '✨', '🎂', '🏏', '💌', '🎉', '🏆']

/** Slow drifting decorations behind the hero. Purely ornamental. */
export default function FloatingHearts({ count = 14 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        glyph: GLYPHS[i % GLYPHS.length],
        left: `${(i * 97) % 100}%`,
        size: `${0.8 + ((i * 7) % 10) / 10}rem`,
        duration: `${14 + ((i * 13) % 12)}s`,
        delay: `${-((i * 31) % 20)}s`,
        drift: `${((i % 5) - 2) * 26}px`,
      })),
    [count]
  )

  return (
    <div className="fh" aria-hidden="true">
      {items.map((it) => (
        <span
          key={it.id}
          className="fh__item"
          style={{
            left: it.left,
            fontSize: it.size,
            animationDuration: it.duration,
            animationDelay: it.delay,
            '--drift': it.drift,
          }}
        >
          {it.glyph}
        </span>
      ))}
    </div>
  )
}
