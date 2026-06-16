import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <footer>
        <div className="container">
          <p className="mb-0">
            Built with React + Vite + Bootstrap 5 &mdash; Wu Jinhan &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
