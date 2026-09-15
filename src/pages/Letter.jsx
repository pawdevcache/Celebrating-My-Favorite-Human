import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FloatingHearts from '../components/FloatingHearts'
import { letter, him, her, images, reasons } from '../data/site'
import './Letter.css'

export default function Letter() {
  return (
    <div className="page lt">
      <FloatingHearts count={10} />
      <div className="blob lt__blob lt__blob--1" />
      <div className="blob lt__blob lt__blob--2" />

      <div className="shell lt__shell">
        <motion.header
          className="lt__head"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="lt__stamp" aria-hidden="true">
            <span className="lt__stamp-inner">
              <span className="lt__stamp-emoji">🎂</span>
              <span className="lt__stamp-date">13 · 11</span>
            </span>
          </span>
          <p className="eyebrow">Sealed with a lot of feeling</p>
          <h1 className="lt__title display">{letter.heading}</h1>
        </motion.header>

        {/* ---- The letter ---- */}
        <motion.article
          className="lt__paper"
          initial={{ opacity: 0, y: 34, rotate: -0.6 }}
          animate={{ opacity: 1, y: 0, rotate: -0.4 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="lt__photo">
            <img
              src={images.letter}
              alt={images.letterAlt ?? him.name}
              loading="lazy"
            />
            <span className="lt__photo-tape" aria-hidden="true" />
          </div>

          <div className="lt__body">
            {letter.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                className={i === 0 ? 'lt__salutation' : ''}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.4) }}
              >
                {p}
              </motion.p>
            ))}

            <motion.div
              className="lt__signoff"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="lt__signoff-line">{letter.signoff},</p>
              <p className="lt__signature">{her.name2}</p>
            </motion.div>

            <p className="lt__ps">{letter.ps}</p>
          </div>
        </motion.article>

        <motion.div
          className="lt__cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="lt__cta-text hand">
            Now go turn over the reasons — there are {reasons.length} of them.
          </p>
          <Link to="/reasons" className="btn">
            Reasons I love you 💌
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
