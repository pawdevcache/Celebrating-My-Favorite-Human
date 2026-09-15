import { useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Sparkles from '../components/Sparkles'
import { reasons, him } from '../data/site'
import './Reasons.css'

export default function Reasons() {
  const [flipped, setFlipped] = useState(() => new Set())

  const toggle = (i) =>
    setFlipped((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  const allOpen = flipped.size === reasons.length
  const toggleAll = () =>
    setFlipped(allOpen ? new Set() : new Set(reasons.map((_, i) => i)))

  return (
    <div className="page reasons">
      <Sparkles count={20} />
      <div className="blob blob--drift reasons__blob reasons__blob--1" />
      <div className="blob blob--drift-2 reasons__blob reasons__blob--2" />
      <div className="blob blob--drift reasons__blob reasons__blob--3" />

      <div className="shell">
        <PageHeader
          eyebrow={`${reasons.length} reasons and counting`}
          title="Reasons I love you"
          lead={`I could not fit them all on one page, so here are ${reasons.length} of them. Tap a card to turn it over — the real answer is on the back.`}
        />

        <div className="reasons__bar">
          <p className="reasons__progress">
            <strong>{flipped.size}</strong> of {reasons.length} turned over
          </p>
          <button className="btn btn-ghost reasons__all" onClick={toggleAll}>
            {allOpen ? 'Close them all' : 'Turn them all over'}
          </button>
        </div>

        <div className="reasons__grid">
          {reasons.map((r, i) => {
            const isFlipped = flipped.has(i)
            return (
              <motion.div
                key={r.front}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              >
                <button
                  className={`flip tone-${(i % 6) + 1} ${
                    isFlipped ? 'is-flipped' : ''
                  }`}
                  onClick={() => toggle(i)}
                  aria-pressed={isFlipped}
                  aria-label={`Reason ${i + 1}: ${r.front}. ${
                    isFlipped ? 'Showing the answer.' : 'Tap to reveal.'
                  }`}
                >
                  <span className="flip__inner">
                    {/* --- front --- */}
                    <span className="flip__face flip__face--front">
                      <span className="flip__num">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flip__front-text display">
                        {r.front}
                      </span>
                      <span className="flip__hint">tap to turn over</span>
                    </span>

                    {/* --- back --- */}
                    <span className="flip__face flip__face--back">
                      <span className="flip__heart" aria-hidden="true">
                        ❤️
                      </span>
                      <span className="flip__back-text">{r.back}</span>
                    </span>
                  </span>
                </button>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          className="reasons__end hand"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          ...and about a thousand more reasons I could never fit onto these pages ❤️
        </motion.p>
      </div>
    </div>
  )
}
