import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Experiences from './components/Experiences/Experiences'
import Projects from './components/Projects/Projects'
import Lab from './components/Lab/Lab'
import Contact from './components/Contact/Contact'
import Terminal from './components/Terminal/Terminal'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  useScrollReveal()
  const [terminalOpen, setTerminalOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setTerminalOpen(o => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="app">
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experiences />
        <Projects />
        <Lab />
        <Contact />
      </main>
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </div>
  )
}

export default App
