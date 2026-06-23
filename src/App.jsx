import { useEffect } from 'react'
import { initReveal } from './lib/observer'
import WebGLBackground from './components/WebGLBackground'
import CrossfadeBackground from './components/CrossfadeBackground'
import Logo from './components/Logo'
import DotNav from './components/DotNav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

// WebGL liquid morph when available; CSS crossfade fallback otherwise.
const BackgroundLayer = hasWebGL() ? WebGLBackground : CrossfadeBackground

function App() {
  useEffect(() => initReveal(), [])

  return (
    <>
      <BackgroundLayer />
      <Logo />
      <DotNav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <p className="footer__text">
            Wu Jinhan &copy; {new Date().getFullYear()} — Designed &amp; built by hand
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
