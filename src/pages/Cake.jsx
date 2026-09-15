import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import PageHeader from '../components/PageHeader'
import { cake, him, her } from '../data/site'
import './Cake.css'

const WISH_KEY = 'birthday-wish'

export default function Cake() {
  /* Which candles are still lit. Index-based. */
  const [lit, setLit] = useState(() =>
    Array.from({ length: cake.candles }, () => true)
  )
  const [wish, setWish] = useState('')
  const [savedWish, setSavedWish] = useState(null)
  const cakeRef = useRef(null)
  const timers = useRef([])

  const litCount = lit.filter(Boolean).length
  const allOut = litCount === 0

  /* If he already made a wish on this device, remember it. */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISH_KEY)
      if (stored) {
        setSavedWish(stored)
        setLit(Array.from({ length: cake.candles }, () => false))
      }
    } catch {
      /* localStorage can be blocked — the page works fine without it. */
    }
  }, [])

  /* Cancel any pending confetti bursts if he navigates away mid-celebration. */
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  /* Confetti bursts from the top of the cake. */
  const celebrate = useCallback(() => {
    const node = cakeRef.current
    let origin = { x: 0.5, y: 0.5 }

    if (node) {
      const r = node.getBoundingClientRect()
      origin = {
        x: (r.left + r.width / 2) / window.innerWidth,
        y: (r.top + r.height * 0.25) / window.innerHeight,
      }
    }

    const colors = ['#ff6b8a', '#ff7f6b', '#ffb08a', '#e0a244', '#f7dcae']

    confetti({ particleCount: 90, spread: 75, origin, colors, startVelocity: 38 })
    timers.current.push(
      setTimeout(
        () => confetti({ particleCount: 55, spread: 100, origin, colors, scalar: 0.85 }),
        160
      ),
      setTimeout(
        () => confetti({ particleCount: 40, spread: 120, origin, colors, scalar: 1.2 }),
        340
      )
    )
  }, [])

  const blowOut = (i) => {
    if (!lit[i] || savedWish) return

    const next = [...lit]
    next[i] = false
    setLit(next)

    if (next.every((l) => !l)) celebrate()
  }

  const blowAll = () => {
    if (savedWish) return
    setLit(Array.from({ length: cake.candles }, () => false))
    celebrate()
  }

  const relight = () => {
    setLit(Array.from({ length: cake.candles }, () => true))
    setWish('')
    setSavedWish(null)
    try {
      localStorage.removeItem(WISH_KEY)
    } catch {
      /* ignore */
    }
  }

  const submitWish = (e) => {
    e.preventDefault()
    const trimmed = wish.trim()
    if (!trimmed) return

    setSavedWish(trimmed)
    try {
      localStorage.setItem(WISH_KEY, trimmed)
    } catch {
      /* ignore — the wish still shows for this session */
    }
    celebrate()
  }

  return (
    <div className="page ck2">
      <div className="blob ck2__blob ck2__blob--1" />
      <div className="blob ck2__blob ck2__blob--2" />

      <div className="shell">
        <PageHeader
          eyebrow="Happy birthday"
          title="Blow out your candles"
          lead={cake.intro}
          accent="gold"
        />

        {/* ---------------- THE CAKE ---------------- */}
        <div className={`ck2__stage ${allOut ? 'is-dark' : ''}`}>
          <div className="ck2__cake" ref={cakeRef}>
            {/* candles */}
            <div className="ck2__candles">
              {lit.map((isLit, i) => (
                <button
                  key={i}
                  className={`candle ${isLit ? 'is-lit' : 'is-out'}`}
                  onClick={() => blowOut(i)}
                  disabled={!isLit || !!savedWish}
                  aria-label={
                    isLit ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is out`
                  }
                >
                  <span className="candle__flame" aria-hidden="true">
                    <span className="candle__glow" />
                  </span>
                  <span className="candle__smoke" aria-hidden="true" />
                  <span className="candle__wick" aria-hidden="true" />
                  <span className="candle__stick" aria-hidden="true" />
                </button>
              ))}
            </div>

            {/* Cake body — three tiers on a pedestal stand. Each tier is a
                cylinder: an elliptical top surface plus a shaded body, with
                gold pearl piping where it meets the tier below. */}
            <div className="ck2__tier ck2__tier--1" aria-hidden="true">
              <span className="ck2__drip" />
            </div>
            <div className="ck2__tier ck2__tier--2" aria-hidden="true">
              <span className="ck2__score">{him.turningAge} not out</span>
              <span className="ck2__pearls" />
            </div>
            <div className="ck2__tier ck2__tier--3" aria-hidden="true">
              <span className="ck2__ribbon" />
              <span className="ck2__pearls" />
            </div>

            <div className="ck2__stand" aria-hidden="true">
              <span className="ck2__stand-plate" />
              <span className="ck2__stand-stem" />
              <span className="ck2__stand-foot" />
            </div>

            {/* A leather ball resting on the stand in front of the cake.
                Sibling of the tiers rather than a child of one, so it can
                paint above them instead of being buried by the tier above. */}
            <span className="ck2__ball" aria-hidden="true">
              <span className="ck2__ball-seam" />
            </span>
          </div>

          {/* status line under the cake */}
          <div className="ck2__status" aria-live="polite">
            {!allOut ? (
              <>
                <p className="ck2__hint hand">
                  {litCount === 1 ? cake.lastCandleHint : cake.litHint}
                </p>
                <p className="ck2__count">
                  <strong>{litCount}</strong> of {cake.candles} still lit
                </p>
                {litCount < cake.candles && (
                  <button className="ck2__blowall" onClick={blowAll}>
                    or blow them all out at once 💨
                  </button>
                )}
              </>
            ) : (
              <motion.div
                className="ck2__dark-msg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <p className="ck2__dark-title display">
                  Happy birthday, {him.nickname2}
                </p>
                <p className="ck2__dark-sub hand">{cake.darkLine}</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* ---------------- THE WISH ---------------- */}
        <AnimatePresence mode="wait">
          {allOut && !savedWish && (
            <motion.section
              key="wish-form"
              className="ck2__wish"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <span className="ck2__wish-star" aria-hidden="true">
                ✨
              </span>
              <h2 className="ck2__wish-title display">{cake.wishPrompt}</h2>
              <p className="ck2__wish-help">{cake.wishHelp}</p>

              <form className="ck2__form" onSubmit={submitWish}>
                <label className="ck2__label" htmlFor="wish">
                  Your wish
                </label>
                <textarea
                  id="wish"
                  className="ck2__input"
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder={cake.wishPlaceholder}
                  rows={3}
                  maxLength={280}
                />
                <div className="ck2__form-row">
                  <span className="ck2__chars">{wish.length}/280</span>
                  <button
                    type="submit"
                    className="btn"
                    disabled={!wish.trim()}
                  >
                    {cake.wishButton} 🕯️
                  </button>
                </div>
              </form>
            </motion.section>
          )}

          {savedWish && (
            <motion.section
              key="wish-done"
              className="ck2__wish ck2__wish--done"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="ck2__wish-star" aria-hidden="true">
                🤍
              </span>
              <h2 className="ck2__wish-title display">{cake.wishDone}</h2>
              <p className="ck2__wish-note">{cake.wishDoneNote}</p>

              <blockquote className="ck2__saved">
                <p className="hand">{savedWish}</p>
                <footer>
                  — {him.name}, on his birthday
                </footer>
              </blockquote>

              <button className="btn btn-ghost ck2__relight" onClick={relight}>
                {cake.relightLabel} 🔥
              </button>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ---------------- HER NOTE ---------------- */}
        <motion.div
          className="ck2__note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="hand">{cake.fromHer}</p>
          <span className="ck2__note-sig">— {her.name}</span>
        </motion.div>
      </div>
    </div>
  )
}
