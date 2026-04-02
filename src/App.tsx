import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Skills from './components/Skills/Skills'
import Experiences from './components/Experiences/Experiences'
import Projects from './components/Projects/Projects'
import Lab from './components/Lab/Lab'
import Contact from './components/Contact/Contact'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experiences />
        <Projects />
        <Lab />
        <Contact />
      </main>
    </div>
  )
}

export default App
