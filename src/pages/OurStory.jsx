import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Sparkles from '../components/Sparkles'
import { story } from '../data/site'
import './OurStory.css'

export default function OurStory() {
  return (
    <div className="page story">
      <Sparkles count={18} />
      <div className="blob blob--drift story__blob" />
      <div className="blob blob--drift-2 story__blob story__blob--2" />
      <div className="shell">
        <PageHeader
          eyebrow="Chapter one of many"
          title="Our story, so far"
          lead={story.intro}
        />

        <ol className="tl">
          {story.chapters.map((c, i) => (
            <motion.li
              key={c.title}
              className={`tl__item tone-${(i % 6) + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="tl__marker">
                <span className="tl__dot" aria-hidden="true">
                  {c.emoji}
                </span>
                {i < story.chapters.length - 1 && <span className="tl__line" />}
              </div>

              <div className="tl__card card">
                <span className="tl__date">{c.date}</span>
                <h2 className="tl__title display">{c.title}</h2>
                <p className="tl__text">{c.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.p
          className="story__end hand"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          ...to be continued. For a very, very long time.
        </motion.p>
      </div>
    </div>
  )
}
