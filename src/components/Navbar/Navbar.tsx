import { useState, useEffect } from 'react'
import './Navbar.css'
import { useLanguage } from '../../i18n/LanguageContext'

const sectionIds = ['#home', '#about', '#skills', '#experiences', '#projects', '#lab', '#contact'] as const

export default function Navbar({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const { t, lang, toggleLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  const links = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#experiences', label: t.nav.path },
    { href: '#projects', label: t.nav.projects },
    { href: '#lab', label: t.nav.lab },
    { href: '#contact', label: t.nav.contact },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = sectionIds
      .map(id => document.querySelector(id))
      .filter((el): el is Element => el !== null)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="navbar-logo">
        <span>{'<'}</span>GMS<span>{'/>'}</span>
      </a>

      <nav className={`navbar-links ${open ? 'open' : ''}`}>
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={active === link.href ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="navbar-actions">
        <button
          className="navbar-terminal"
          onClick={onOpenTerminal}
          aria-label={t.nav.terminalHint}
          title={t.nav.terminalHint}
        >
          {'>_'}
        </button>
        <button
          className="navbar-lang"
          onClick={toggleLang}
          aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para português'}
        >
          {lang === 'pt' ? 'EN' : 'PT'}
        </button>
        <button
          className={`navbar-burger ${open ? 'active' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
