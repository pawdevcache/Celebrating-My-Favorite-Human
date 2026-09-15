import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import { gallery } from '../data/site'
import './Gallery.css'

export default function Gallery() {
  const [active, setActive] = useState(null) // index of the open photo, or null

  const close = useCallback(() => setActive(null), [])

  const step = useCallback((dir) => {
    setActive((i) => (i === null ? null : (i + dir + gallery.length) % gallery.length))
  }, [])

  /* Swiping between photos — the arrows are there too, but on a phone this
     is what people actually try first. */
  const touch = useRef(null)

  const onTouchStart = (e) => {
    const t = e.touches[0]
    touch.current = { x: t.clientX, y: t.clientY }
  }

  const onTouchEnd = (e) => {
    const start = touch.current
    touch.current = null
    if (!start) return

    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y

    /* Ignore anything that is mostly vertical — that is a scroll, not a swipe. */
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return
    step(dx < 0 ? 1 : -1)
  }

  /* Arrow keys and Escape drive the lightbox. */
  useEffect(() => {
    if (active === null) return

    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close, step])

  return (
    <div className="page gal">
      <div className="blob gal__blob" />
      <div className="shell">
        <PageHeader
          eyebrow="Every photo I have of you"
          title="The gallery"
          lead="Some of these you have seen. Some of these you did not know I kept. Tap any of them to look properly."
          accent="gold"
        />

        <div className="gal__grid">
          {gallery.map((g, i) => (
            <motion.button
              key={g.src}
              className="gal__item"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
              aria-label={`Open photo: ${g.caption}`}
            >
              <img src={g.src} alt={g.alt ?? g.caption} loading="lazy" />
              <span className="gal__overlay">
                <span className="gal__caption">{g.caption}</span>
                <span className="gal__zoom" aria-hidden="true">
                  ⤢
                </span>
              </span>
            </motion.button>
          ))}
        </div>

        <p className="gal__note hand">
          ...and I am leaving room for all the ones we have not taken yet.
        </p>
      </div>

      {/* ---------------- LIGHTBOX ---------------- */}
      {active !== null && (
        <div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button className="lb__close" onClick={close} aria-label="Close">
            ✕
          </button>

          <button
            className="lb__nav lb__nav--prev"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>

          <figure className="lb__figure" onClick={(e) => e.stopPropagation()}>
            <motion.img
              key={gallery[active].src}
              src={gallery[active].src}
              alt={gallery[active].alt ?? gallery[active].caption}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <figcaption className="lb__caption">
              {gallery[active].caption}
              <span className="lb__count">
                {active + 1} / {gallery.length}
              </span>
            </figcaption>
          </figure>

          <button
            className="lb__nav lb__nav--next"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
