import { useState, useEffect } from 'react'
import './Hero.css'
import SocialOrbit from '../SocialOrbit/SocialOrbit'
import { useLanguage } from '../../i18n/LanguageContext'

function Typewriter({ words }: { words: string[] }) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing')

  useEffect(() => {
    const word = words[wordIndex]
    if (phase === 'typing') {
      if (charIndex < word.length) {
        const t = setTimeout(() => { setDisplayText(word.slice(0, charIndex + 1)); setCharIndex(c => c + 1) }, 110)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('deleting'), 1800)
        return () => clearTimeout(t)
      }
    }
    if (phase === 'deleting') {
      if (charIndex > 0) {
        const t = setTimeout(() => { setDisplayText(word.slice(0, charIndex - 1)); setCharIndex(c => c - 1) }, 55)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => { setPhase('typing'); setWordIndex(i => (i + 1) % words.length) }, 300)
        return () => clearTimeout(t)
      }
    }
  }, [charIndex, phase, wordIndex, words])

  return (
    <span className="hero-typewriter">
      {displayText}
      <span className="cursor" />
    </span>
  )
}

export default function Hero() {
  const { t, lang } = useLanguage()

  return (
    <section id="home" className="hero">
      <div className="hero-bg-glow" />

      <div className="hero-left">
        <SocialOrbit />
      </div>

      <div className="hero-right">

        <h1 className="hero-name">
          Germano <span>Maccagnan</span>
        </h1>
        <p className="hero-role">{t.hero.role}</p>
        <p className="hero-desc">{t.hero.desc}</p>
        <div className="hero-ctas">
          <a href="/curriculo-germano.pdf" download className="btn-download">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>{t.hero.download}</span>
          </a>
          <a href="#projects" className="hero-secondary-cta">
            {t.hero.viewProjects}
          </a>
        </div>
      </div>

      <div className="hero-bottom">
        <span className="hero-prefix">{t.hero.iCreate}</span>
        <Typewriter key={lang} words={t.hero.words} />
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
      </div>
    </section>
  )
}
