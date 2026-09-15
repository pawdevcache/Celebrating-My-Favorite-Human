import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'
import { him, notOut } from '../data/site'
import './NotOut.css'

const BALLS_PER_OVER = 6
const PALETTE = ['#ff6b8a', '#ff7f6b', '#ffb08a', '#e0a244', '#f7dcae']

/* Days he has been alive — one "ball faced" per day. */
function ballsFaced() {
  const [, month, day] = him.birthday.split('-').map(Number)
  const born = new Date(him.birthYear, month - 1, day)
  const days = Math.floor((Date.now() - born.getTime()) / 86400000)
  return days > 0 ? days : 0
}

/* Counts from 0 up to `target` once it scrolls into view. */
function useCountUp(target, active, duration = 1400) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!active) return

    let raf
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      /* ease-out so it slows into the final number like a scoreboard */
      const eased = 1 - Math.pow(1 - t, 3)
      setN(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])

  return n
}

export default function NotOut() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  const [balls] = useState(ballsFaced)
  const score = useCountUp(him.turningAge, inView, 1100)
  const ballCount = useCountUp(balls, inView, 1800)

  /* Each hit gets a new id so the CSS animation restarts cleanly. */
  const [hit, setHit] = useState(null)
  const [sixes, setSixes] = useState(0)
  const [over, setOver] = useState(0)      // balls bowled this over, 0–6
  const [overDone, setOverDone] = useState(false)
  const pitchRef = useRef(null)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  /* Track a timeout and drop its id once it fires, so the array does not
     grow without bound across a long session of hitting the ball. */
  const track = useCallback((id) => {
    timers.current.push(id)
    return id
  }, [])

  const later = useCallback(
    (fn, ms) => {
      const id = setTimeout(() => {
        timers.current = timers.current.filter((t) => t !== id)
        fn()
      }, ms)
      return track(id)
    },
    [track]
  )

  const burst = useCallback((opts = {}) => {
    const node = pitchRef.current
    let origin = { x: 0.5, y: 0.6 }
    if (node) {
      const r = node.getBoundingClientRect()
      origin = {
        x: (r.left + r.width * 0.35) / window.innerWidth,
        y: (r.top + r.height * 0.55) / window.innerHeight,
      }
    }
    confetti({
      particleCount: 70,
      spread: 68,
      angle: 62,
      startVelocity: 46,
      colors: PALETTE,
      origin,
      ...opts,
    })
  }, [])

  /* Six sixes in six balls deserves rather more than one burst. */
  const perfectOver = useCallback(() => {
    const node = pitchRef.current
    if (!node) return
    const r = node.getBoundingClientRect()
    const y = (r.top + r.height * 0.5) / window.innerHeight

    ;[0, 180, 360, 560].forEach((delay, i) => {
      later(() => {
        confetti({
          particleCount: 80,
          spread: 90,
          startVelocity: 52,
          colors: PALETTE,
          origin: { x: 0.1, y },
          angle: 55,
          scalar: 1 + i * 0.1,
        })
        confetti({
          particleCount: 80,
          spread: 90,
          startVelocity: 52,
          colors: PALETTE,
          origin: { x: 0.9, y },
          angle: 125,
          scalar: 1 + i * 0.1,
        })
      }, delay)
    })
  }, [later])

  const smash = useCallback(() => {
    if (hit) return

    const id = Date.now()
    const line = notOut.sixLines[sixes % notOut.sixLines.length]
    const nextOver = over + 1
    const complete = nextOver === BALLS_PER_OVER

    setHit({ id, line })
    setSixes((s) => s + 1)
    setOver(nextOver)

    later(() => burst(), 260)

    if (complete) {
      later(() => setOverDone(true), 620)
      later(perfectOver, 700)
      /* Fresh over — new bowler, same treatment. */
      later(() => {
        setOverDone(false)
        setOver(0)
      }, 4200)
    }

    later(() => setHit(null), 1900)
  }, [hit, sixes, over, burst, perfectOver, later])

  const lead = notOut.lead.replace('{age}', him.turningAge)
  const footer = notOut.footer.replace('{name}', him.name)

  return (
    <section className="section no" ref={ref}>
      <div className="shell">
        <motion.div
          className="no__board"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          {/* ---------- Scoreboard ---------- */}
          <div className="no__panel">
            <div className="no__panel-top">
              <span className="no__label">Batting</span>
              <span className="no__live">
                <span className="no__live-dot" aria-hidden="true" />
                Still in
              </span>
            </div>

            <p className="no__batsman">
              {him.name}
              <em>“{him.nickname2}”</em>
            </p>

            <p className="no__score">
              <span className="no__runs">{score}</span>
              <span className="no__notout">not out</span>
            </p>

            <div className="no__rows">
              <div className="no__row">
                <span className="no__row-k">{notOut.ballsFacedLabel}</span>
                <span className="no__row-v">{ballCount.toLocaleString()}</span>
                <span className="no__row-n">{notOut.ballsFacedNote}</span>
              </div>
              <div className="no__row">
                <span className="no__row-k">{notOut.strikeRateLabel}</span>
                <span className="no__row-v">{notOut.strikeRateValue}</span>
                <span className="no__row-n">{notOut.strikeRateNote}</span>
              </div>
              <div className="no__row">
                <span className="no__row-k">{notOut.sixesLabel}</span>
                <span className="no__row-v no__row-v--live">{sixes}</span>
                <span className="no__row-n">
                  {sixes === 0 ? 'have a go →' : 'and counting'}
                </span>
              </div>
            </div>

            {/* ---- The over ---- */}
            <div className="no__over">
              <span className="no__over-label">{notOut.overLabel}</span>
              <div className="no__over-balls">
                {Array.from({ length: BALLS_PER_OVER }, (_, i) => (
                  <span
                    key={i}
                    className={`no__over-ball ${i < over ? 'is-hit' : ''}`}
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    {i < over ? '6' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- The bat and ball ---------- */}
          <div className="no__play">
            <p className="eyebrow">{notOut.eyebrow}</p>
            <p className="no__lead">{lead}</p>

            <div className="no__pitch" ref={pitchRef}>
              {/* stumps behind the batter, where they belong */}
              <span
                className={`no__stumps ${hit ? 'is-shaken' : ''}`}
                aria-hidden="true"
              >
                <span className="no__bail" />
                <span className="no__stump" />
                <span className="no__stump" />
                <span className="no__stump" />
              </span>

              {/* the ball that flies away when hit */}
              {hit && (
                <span key={hit.id} className="no__flight" aria-hidden="true">
                  <span className="no__flight-ball">
                    <span className="no__seam" />
                  </span>
                </span>
              )}

              {/* SIX! shout */}
              <AnimatePresence>
                {hit && !overDone && (
                  <motion.span
                    key={`shout-${hit.id}`}
                    className="no__shout"
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.35, delay: 0.22 }}
                  >
                    {notOut.sixShout}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* the perfect over takes over the whole pitch */}
              <AnimatePresence>
                {overDone && (
                  <motion.div
                    className="no__perfect"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <span className="no__perfect-num display">
                      {notOut.overShout}
                    </span>
                    <span className="no__perfect-note">{notOut.overNote}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The batter, side on. Body, head and legs stand still and
                  only lean into the shot; the arms group swings the bat, so
                  the bat stays in his hands through the whole arc.
                  Back limbs come first so the front ones paint over them. */}
              <span
                className={`no__batter ${hit ? 'is-swinging' : ''}`}
                aria-hidden="true"
              >
                <span className="no__head">
                  <span className="no__face" />
                  <span className="no__helmet" />
                  <span className="no__peak" />
                  <span className="no__grille" />
                </span>

                <span className="no__neck" />
                <span className="no__torso">
                  <span className="no__name">{him.name}</span>
                  {notOut.shirtNumber && (
                    <span className="no__number">{notOut.shirtNumber}</span>
                  )}
                </span>

                <span className="no__leg no__leg--back">
                  <span className="no__boot" />
                </span>
                <span className="no__leg no__leg--front">
                  <span className="no__boot" />
                </span>

                <span className="no__arms">
                  <span className="no__arm no__arm--back" />
                  <span className="no__arm no__arm--front" />
                  <span className="no__forearm" />
                  <span className="no__glove" />
                  <span className="no__bat">
                    <span className="no__bat-handle" />
                    <span className="no__bat-blade" />
                  </span>
                </span>
              </span>

              {/* the ball he taps */}
              <button
                className={`no__ball ${hit ? 'is-gone' : ''}`}
                onClick={smash}
                disabled={!!hit}
                aria-label="Hit the ball for six"
              >
                <span className="no__seam" aria-hidden="true" />
              </button>

              <span className="no__ground" aria-hidden="true" />
            </div>

            <p className="no__hint hand" aria-live="polite">
              {hit
                ? hit.line
                : sixes === 0
                  ? notOut.playHint
                  : notOut.playHintAfter}
            </p>
          </div>
        </motion.div>

        <p className="no__footer hand">{footer}</p>
      </div>
    </section>
  )
}
