import { useState, useEffect } from 'react'
import './Navbar.css'

const links = [
  { href: '#home', label: 'Início' },
  { href: '#about', label: 'Sobre' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projetos' },
  { href: '#contact', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="navbar-logo">
        GMS<span>.</span>
      </a>

      <nav className={`navbar-links ${open ? 'open' : ''}`}>
        {links.map(link => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>

      <button
        className={`navbar-burger ${open ? 'active' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}
