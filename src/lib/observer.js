/**
 * Adds the class `is-visible` to every `.reveal` element when it scrolls
 * into view. One observer, one class, one transition (see animations.css).
 *
 * @returns {() => void} cleanup function that disconnects the observer.
 */
export function initReveal() {
  const els = document.querySelectorAll('.reveal')

  // No IntersectionObserver (or no JS-driven scroll): show everything.
  if (typeof IntersectionObserver === 'undefined') {
    els.forEach((el) => el.classList.add('is-visible'))
    return () => {}
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
  )

  els.forEach((el) => observer.observe(el))
  return () => observer.disconnect()
}
