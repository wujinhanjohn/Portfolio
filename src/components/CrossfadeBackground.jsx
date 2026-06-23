import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SECTION_IMAGES } from '../lib/sectionImages'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fixed, full-viewport background layer holding one image per section.
 * As the user scrolls across a section boundary, the outgoing image fades +
 * scales out while the incoming image fades + scales in, driven by the
 * ScrollTrigger `progress` value (not a timer). Reverses cleanly on scroll-back.
 *
 * The WebGL version (Stage 3) replaces the crossfade with a displacement shader
 * but keeps this same SECTION_IMAGES config and the isolated transition fn.
 */
function CrossfadeBackground() {
  const imgsRef = useRef([])

  useEffect(() => {
    const imgs = imgsRef.current.filter(Boolean)
    if (imgs.length === 0) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Resting state: first image visible, the rest hidden + slightly zoomed.
    gsap.set(imgs[0], { opacity: 1, scale: 1 })
    imgs.slice(1).forEach((img) => {
      gsap.set(img, { opacity: 0, scale: reduceMotion ? 1 : 1.05 })
    })

    // Insert a <link rel="preload"> for an image, once, so the next section's
    // background is decoded before it is needed.
    const preloaded = new Set()
    const preload = (index) => {
      const item = SECTION_IMAGES[index]
      if (!item || !item.src || preloaded.has(item.src)) return
      preloaded.add(item.src)
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = item.src
      document.head.appendChild(link)
    }

    let activeIndex = 0
    const setActive = (index) => {
      if (index === activeIndex) return
      activeIndex = index
      preload(index + 1) // prime the next section's image
    }
    preload(1) // prime section 2 immediately after section 1 mounts

    // The ONE function that owns the visual transition. Swap this in Stage 3.
    const applyTransition = (fromIndex, toIndex, progress) => {
      const fromImg = imgsRef.current[fromIndex]
      const toImg = imgsRef.current[toIndex]
      if (!fromImg || !toImg) return

      const duration = reduceMotion ? 0.2 : 0.3

      gsap.to(fromImg, {
        opacity: 1 - progress,
        scale: reduceMotion ? 1 : 1 + 0.05 * progress,
        duration,
        ease: 'none',
        overwrite: true,
      })
      gsap.to(toImg, {
        opacity: progress,
        scale: reduceMotion ? 1 : 1.05 - 0.05 * progress,
        duration,
        ease: 'none',
        overwrite: true,
      })

      setActive(progress >= 0.5 ? toIndex : fromIndex)
    }

    // One trigger per section boundary (N-1 for N sections). Each crossfade
    // completes as the next section docks at the viewport top, so the image is
    // fully shown at the start of that section. The final boundary ends at
    // 'bottom bottom' so the last image fully resolves at the page bottom.
    const lastIndex = SECTION_IMAGES.length - 1
    const triggers = []
    for (let i = 0; i < lastIndex; i += 1) {
      const nextSection = document.getElementById(SECTION_IMAGES[i + 1].id)
      if (!nextSection) continue
      const isFinalBoundary = i + 1 === lastIndex

      triggers.push(
        ScrollTrigger.create({
          trigger: nextSection,
          start: 'top bottom',
          end: isFinalBoundary ? 'bottom bottom' : 'top top',
          scrub: true,
          onUpdate: (self) => applyTransition(i, i + 1, self.progress),
        })
      )
    }

    // Pause GSAP while the tab is hidden; resume on return.
    const handleVisibility = () => {
      if (document.hidden) gsap.globalTimeline.pause()
      else gsap.globalTimeline.resume()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    ScrollTrigger.refresh()

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      triggers.forEach((t) => t.kill())
      gsap.killTweensOf(imgsRef.current.filter(Boolean))
      gsap.globalTimeline.resume()
    }
  }, [])

  return (
    <div id="bg-layer" aria-hidden="true">
      {SECTION_IMAGES.map((section, i) => {
        const style = {
          opacity: i === 0 ? 1 : 0,
          transform: i === 0 ? 'scale(1)' : 'scale(1.05)',
        }
        const setRef = (el) => {
          imgsRef.current[i] = el
        }
        // No-picture section: a plain background-coloured layer to fade to.
        if (!section.src) {
          return (
            <div key={section.id} ref={setRef} className="bg-blank" style={style} />
          )
        }
        return (
          <img
            key={section.id}
            ref={setRef}
            src={section.src}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
            decoding="async"
            draggable="false"
            style={style}
          />
        )
      })}
    </div>
  )
}

export default CrossfadeBackground
