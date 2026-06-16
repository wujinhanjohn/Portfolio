import { useEffect, useState } from 'react'

const NAV_LINKS = ['about', 'experience', 'projects', 'skills', 'contact']

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="container">
        <a className="navbar-brand" href="#hero">WJ</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {NAV_LINKS.map(section => (
              <li key={section} className="nav-item">
                <a className="nav-link" href={`#${section}`}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
