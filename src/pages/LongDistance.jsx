import { useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Countdown from '../components/Countdown'
import { longDistance, distance, him, her, images } from '../data/site'
import './LongDistance.css'

/* Thumbnail first, real YouTube player on tap. The iframe (and all of
   YouTube's scripts) only loads once someone actually wants the song, and
   autoplay=1 means that one tap is also the tap that starts it playing. */
/* Pulls the 11-character video ID out of whatever YouTube link was pasted:
   youtu.be/ID?si=…, youtube.com/watch?v=ID&list=…, /embed/ID, /shorts/ID,
   or a bare ID. Returns '' if it cannot find one. */
function youTubeId(link) {
  if (!link) return ''
  if (/^[\w-]{11}$/.test(link)) return link
  try {
    const url = new URL(link)
    if (url.hostname.endsWith('youtu.be')) {
      return url.pathname.slice(1).split('/')[0]
    }
    return (
      url.searchParams.get('v') ??
      url.pathname.match(/\/(?:embed|shorts)\/([\w-]{11})/)?.[1] ??
      ''
    )
  } catch {
    return ''
  }
}

function SongPlayer({ link, label }) {
  const [playing, setPlaying] = useState(false)
  const id = youTubeId(link)
  if (!id) return null

  return (
    <div className="ld__song">
      <div className="ld__song-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={label ?? 'Our song'}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="ld__song-poster"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${label ?? 'our song'}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
            />
            <span className="ld__song-play" aria-hidden="true" />
          </button>
        )}
      </div>
      {label && <span className="ld__song-label">{label}</span>}
    </div>
  )
}

export default function LongDistance() {
  return (
    <div className="page ld">
      <div className="blob ld__blob ld__blob--1" />
      <div className="blob ld__blob ld__blob--2" />

      <div className="shell">
        <PageHeader
          eyebrow="Two cities, one us"
          title="About the distance"
          lead={longDistance.intro}
        />

        {/* ---- The map band ---- */}
        <motion.div
          className="ld__map"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="ld__side">
            <div className="ld__avatar">
              <img src={images.distanceHer} alt={her.name} loading="lazy" />
            </div>
            <span className="ld__who">{her.name}</span>
            <span className="ld__city">{her.city}</span>
          </div>

          <div className="ld__link">
            <span className="ld__dash" aria-hidden="true" />
            <div className="ld__link-badge">
              <span className="ld__km">{distance.km.toLocaleString()}</span>
              <span className="ld__km-unit">km apart</span>
              <span className="ld__miles">{distance.milesLabel}</span>
              {distance.hoursApart > 0 && (
                <span className="ld__tz">
                  and {distance.hoursApart} hours ahead of me
                </span>
              )}
            </div>
            <span className="ld__plane" aria-hidden="true">
              ✈️
            </span>
          </div>

          <div className="ld__side">
            <div className="ld__avatar">
              <img src={images.distanceHim} alt={him.name} loading="lazy" />
            </div>
            <span className="ld__who">{him.name}</span>
            <span className="ld__city">{him.city}</span>
          </div>
        </motion.div>

        {/* ---- The honest bit ---- */}
        <section className="ld__section">
          <div className="ld__prose">
            {longDistance.body.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </section>

        {/* ---- What closes the gap ---- */}
        <section className="ld__section">
          <h3 className="ld__h3 display">What we do about it</h3>

          <div className="ld__bridges">
            {longDistance.bridges.map((b, i) => (
              <motion.div
                key={b.title}
                className="ld__bridge"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <span className="ld__bridge-emoji" aria-hidden="true">
                  {b.emoji}
                </span>
                <h4 className="ld__bridge-title">{b.title}</h4>
                <p className="ld__bridge-text">{b.text}</p>
                {b.image && (
                  <figure
                    className="ld__bridge-photo"
                    style={{
                      '--photo-aspect': b.imageAspect,
                      '--photo-focus': b.imageFocus,
                    }}
                  >
                    <img src={b.image} alt={b.imageAlt ?? b.title} loading="lazy" />
                  </figure>
                )}
                {b.youtube && (
                  <SongPlayer link={b.youtube} label={b.songLabel} />
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---- Next time we meet ---- */}
        {distance.nextMeetup && (
          <motion.section
            className="ld__next"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">The countdown that actually hurts</p>
            <h3 className="ld__next-title display">
              Until I see you again
            </h3>
            <Countdown
              date={distance.nextMeetup}
              label={`until ${distance.nextMeetupLabel}`}
            />
          </motion.section>
        )}
      </div>
    </div>
  )
}
