import { Link } from 'react-router-dom'
import { footer, him, her } from '../data/site'
import { links } from '../data/nav'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft__inner shell">
        <div className="ft__mark" aria-hidden="true">
          🎂
        </div>

        <p className="ft__line display">
          Sending love from {her.city} to {him.city} 🫣
        </p>

        <p className="ft__sub">{footer.line}</p>

        <nav className="ft__links" aria-label="Footer">
          {links.map((l) => (
            <Link key={l.to} to={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="ft__heart">
          made with <span aria-label="love">❤️</span> across the distance
        </p>
      </div>
    </footer>
  )
}
