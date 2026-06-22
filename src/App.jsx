import { useEffect } from 'react'
import { initReveal } from './lib/observer'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

// NOTE: the liquid image background (WebGLBackground / CrossfadeBackground) is
// disabled for now so the type reads clean on the warm off-white base. The
// components and src/lib/sectionImages.js remain — drop in real section photos
// and re-add <BackgroundLayer /> below to switch it back on.

function App() {
  useEffect(() => initReveal(), [])

  return (
    <>
      <Navbar />
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
