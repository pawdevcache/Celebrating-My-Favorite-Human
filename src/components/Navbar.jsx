import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { links } from '../data/nav'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <div className="nav__inner shell">
        <NavLink to="/" className="nav__brand" aria-label="Home">
          <span className="nav__brand-mark" aria-hidden="true">
            🎂
          </span>
          <span className="nav__brand-text">
            Happy Birthday
            <em>my favorite human</em>
          </span>
        </NavLink>

        <nav className="nav__links" aria-label="Main">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `nav__link ${isActive ? 'is-active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className={`nav__burger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav__drawer ${open ? 'is-open' : ''}`}>
        {links.map((l, i) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `nav__drawer-link ${isActive ? 'is-active' : ''}`
            }
            style={{ transitionDelay: open ? `${i * 40 + 60}ms` : '0ms' }}
          >
            <span className="nav__drawer-num">
              {String(i + 1).padStart(2, '0')}
            </span>
            {l.label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}
