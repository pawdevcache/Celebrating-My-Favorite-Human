import { motion } from 'framer-motion'
import './PageHeader.css'

export default function PageHeader({ eyebrow, title, lead, accent = 'rose' }) {
  return (
    <header className={`ph ph--${accent}`}>
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {eyebrow}
      </motion.p>

      <motion.h1
        className="ph__title display"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08 }}
      >
        {title}
      </motion.h1>

      {lead && (
        <motion.p
          className="ph__lead"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
        >
          {lead}
        </motion.p>
      )}

      <motion.span
        className="ph__rule"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </header>
  )
}
