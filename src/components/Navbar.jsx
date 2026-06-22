import { useEffect, useState } from 'react'

const NAV_LINKS = ['about', 'experience', 'work', 'skills', 'contact']

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // Background rule appears once you leave the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lightweight scroll-spy for the active link underline.
  useEffect(() => {
    const ids = ['hero', ...NAV_LINKS]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const close = () => setOpen(false)

  return (
    <nav className={`navbar${scrolled ? ' is-scrolled' : ''}`} aria-label="Primary">
      <div className="container navbar__inner">
        <a className="navbar__logo" href="#hero" onClick={close}>
          WJ
        </a>

        <button
          className={`navbar__toggle${open ? ' is-open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="primary-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul id="primary-menu" className={`navbar__links${open ? ' is-open' : ''}`}>
          {NAV_LINKS.map((section) => (
            <li key={section}>
              <a
                className={`navbar__link${active === section ? ' is-active' : ''}`}
                href={`#${section}`}
                onClick={close}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
