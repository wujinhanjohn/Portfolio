import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

function Hero() {
  const typedEl = useRef(null)
  const parallaxEl = useRef(null)

  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: [
        'Software Engineer',
        'Distributed Systems',
        'Full Stack Developer',
        'NUS Computing',
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
      smartBackspace: false,
    })
    return () => typed.destroy()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxEl.current) {
        parallaxEl.current.style.transform = `translateY(${window.scrollY * 0.28}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="hero" className="hero-section d-flex align-items-center justify-content-center">
      <div className="hero-mesh-bg" ref={parallaxEl}></div>
      <div className="hero-gradient-overlay"></div>

      <div className="container text-center hero-content position-relative">
        <p className="hero-greeting" data-aos="fade-down" data-aos-duration="600">
          Hello, I&apos;m
        </p>
        <h1 className="hero-name" data-aos="fade-up" data-aos-delay="100">
          Wu Jinhan
        </h1>
        <div className="hero-typed-wrapper" data-aos="fade-up" data-aos-delay="200">
          <span ref={typedEl}></span>
        </div>
        <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="300">
          Building systems that scale. Breaking ones that don&apos;t.
        </p>
        <div
          className="d-flex gap-3 justify-content-center flex-wrap"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <a href="#projects" className="btn btn-cyan-glow">
            View Projects
          </a>
          <a
            href="https://github.com/WuJinhan1"
            className="btn btn-outline-cyan"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>

        <div className="hero-scroll-hint" data-aos="fade-up" data-aos-delay="600">
          <span></span>
        </div>
      </div>
    </section>
  )
}

export default Hero
