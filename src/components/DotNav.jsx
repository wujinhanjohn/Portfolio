import { useEffect, useState } from 'react'
import { SECTION_IMAGES } from '../lib/sectionImages'

/**
 * Fixed vertical dot navigation on the right edge. One dot per section, read
 * from SECTION_IMAGES (the single source of truth) — adding a section only
 * requires editing the config. The dot for the most-visible section is marked
 * active via an IntersectionObserver; labels slide out on hover/focus.
 */
function DotNav() {
  const [activeId, setActiveId] = useState(SECTION_IMAGES[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )

    SECTION_IMAGES.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav aria-label="Page sections" className="dot-nav">
      <ul role="list">
        {SECTION_IMAGES.map((section) => {
          const isActive = section.id === activeId
          return (
            <li
              key={section.id}
              className={isActive ? 'is-active' : undefined}
              aria-current={isActive ? 'true' : undefined}
            >
              <a href={`#${section.id}`} aria-label={`Go to ${section.label}`}>
                <span className="dot" aria-hidden="true" />
                <span className="dot-label">{section.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default DotNav
