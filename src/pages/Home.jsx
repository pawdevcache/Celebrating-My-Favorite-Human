import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Countdown from '../components/Countdown'
import FloatingHearts from '../components/FloatingHearts'
import Sparkles from '../components/Sparkles'
import NotOut from '../components/NotOut'
import { him, home, images } from '../data/site'
import './Home.css'

const cards = [
  {
    to: '/cake',
    emoji: '🎂',
    title: 'Your Cake',
    text: 'Blow out the candles and make a wish. Start here.',
  },
  {
    to: '/our-story',
    emoji: '📖',
    title: 'Our Story',
    text: 'How we got from a first message to here.',
  },
  {
    to: '/reasons',
    emoji: '💗',
    title: 'Reasons I Love You',
    text: 'Twelve cards. Flip them over. I meant every one.',
  },
  {
    to: '/gallery',
    emoji: '📷',
    title: 'Gallery',
    text: 'Every photo I have of you, in one place.',
  },
  {
    to: '/long-distance',
    emoji: '🌍',
    title: 'The Distance',
    text: 'The kilometres between us, and why they lose.',
  },
  {
    to: '/letter',
    emoji: '💌',
    title: 'Your Letter',
    text: 'The thing I would say out loud if I were standing there.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <Sparkles count={26} />
        <FloatingHearts />
        <div className="blob blob--drift hero__blob hero__blob--1" />
        <div className="blob blob--drift-2 hero__blob hero__blob--2" />
        <div className="blob blob--drift hero__blob hero__blob--3" />
        <div className="blob blob--drift-2 hero__blob hero__blob--4" />
        <div className="blob blob--drift hero__blob hero__blob--5" />

        <div className="hero__inner shell">
          <div className="hero__copy">
            <motion.p
              className="hero__hand hand"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              To {him.nickname} —
            </motion.p>

            <motion.h1
              className="hero__title display"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              {home.greeting},
              <span className="hero__name gradient-text">{him.name}</span>
            </motion.h1>

            <motion.p
              className="hero__sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              {home.subtitle}
            </motion.p>

            <motion.div
              className="hero__meta"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
            >
              <span className="chip">🎂 13 November</span>
              <span className="chip">🎉 Turning {him.turningAge}</span>
            </motion.div>

            <motion.div
              className="hero__cta"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
            >
              <Link to="/cake" className="btn">
                Blow out your candles 🎂
              </Link>
              <Link to="/letter" className="btn btn-ghost">
                Read your letter 💌
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="hero__photo"
            initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero__frame">
              <img src={images.hero} alt={images.heroAlt} loading="eager" />
              <div className="hero__tape hero__tape--tl" />
              <div className="hero__tape hero__tape--br" />
            </div>
            <p className="hero__caption hand">{home.caption}</p>
          </motion.div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>{home.scrollHint}</span>
          <span className="hero__scroll-line" />
        </div>
      </section>

      {/* ---------------- COUNTDOWN ---------------- */}
      <section className="section countdown-band">
        <div className="shell">
          <motion.div
            className="countdown-band__box"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">The big day</p>
            <h2 className="countdown-band__title display">
              Counting down to the 13<sup>th</sup>
            </h2>
            <Countdown date={him.birthday} label="until your birthday" />
          </motion.div>

          <div className="stats">
            {home.stats.map((s, i) => (
              <motion.div
                key={s.label}
                className={`stats__item card tone-${[1, 2, 5][i % 3]}`}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.09 }}
              >
                <span className="stats__value">{s.value}</span>
                <span className="stats__label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- NOT OUT ---------------- */}
      <NotOut />

      {/* ---------------- EXPLORE CARDS ---------------- */}
      <section className="section explore">
        <div className="shell">
          <motion.div
            className="explore__head"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            transition={{ duration: 0.55 }}
          >
            <p className="eyebrow">Have a look around</p>
            <h2 className="explore__title display">
              I made you a whole website.
              <br />
              Go on open everything.
            </h2>
          </motion.div>

          <div className="explore__grid">
            {cards.map((c, i) => (
              <motion.div
                key={c.to}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Link to={c.to} className={`tile tone-${(i % 6) + 1}`}>
                  <span className="tile__emoji" aria-hidden="true">
                    {c.emoji}
                  </span>
                  <h3 className="tile__title">{c.title}</h3>
                  <p className="tile__text">{c.text}</p>
                  <span className="tile__go" aria-hidden="true">
                    Open →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
