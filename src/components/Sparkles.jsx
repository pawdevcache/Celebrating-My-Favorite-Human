import { useMemo } from 'react'
import './Sparkles.css'

const TONES = [
  'var(--rose)',
  'var(--lilac)',
  'var(--gold)',
  'var(--mint)',
  'var(--sky)',
  'var(--coral)',
]

/**
 * A scatter of little twinkling four-point stars.
 * Positions come from a fixed pattern rather than Math.random so they
 * do not jump around between renders. Purely decorative.
 */
export default function Sparkles({ count = 22 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        /* two different primes keep the scatter from forming a grid */
        top: `${(i * 37) % 96}%`,
        left: `${(i * 61) % 97}%`,
        size: `${5 + ((i * 3) % 8)}px`,
        color: TONES[i % TONES.length],
        delay: `${((i * 7) % 40) / 10}s`,
        duration: `${2.6 + ((i * 5) % 22) / 10}s`,
      })),
    [count]
  )

  return (
    <div className="sp" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="sp__star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: s.color,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  )
}
