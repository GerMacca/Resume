import { useEffect, useRef, useState } from 'react'
import './Terminal.css'
import { useLanguage } from '../../i18n/LanguageContext'

interface Line {
  type: 'cmd' | 'out'
  text: string
}

const SECTIONS: Record<string, string> = {
  home: '#home',
  about: '#about',
  skills: '#skills',
  projects: '#projects',
  lab: '#lab',
  contact: '#contact',
}

const LINKS: Record<string, string> = {
  github: 'https://github.com/GerMacca',
  linkedin: 'https://www.linkedin.com/in/germano-maccagnan-dos-santos/',
}

export default function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, toggleLang } = useLanguage()
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const welcomedRef = useRef(false)

  useEffect(() => {
    if (!open) return
    if (!welcomedRef.current) {
      welcomedRef.current = true
      setLines([{ type: 'out', text: t.terminal.welcome }])
    }
    inputRef.current?.focus()
  }, [open, t])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines])

  if (!open) return null

  function print(...texts: string[]) {
    setLines(prev => [...prev, ...texts.map(text => ({ type: 'out' as const, text }))])
  }

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    setLines(prev => [...prev, { type: 'cmd', text: raw }])

    if (cmd === 'help') {
      print(...t.terminal.help)
    } else if (cmd === 'about') {
      print(t.terminal.aboutText)
    } else if (cmd in SECTIONS) {
      print(`${t.terminal.navigating} ${cmd}...`)
      document.querySelector(SECTIONS[cmd])?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(onClose, 600)
    } else if (cmd in LINKS) {
      print(`${t.terminal.opening} ${cmd}...`)
      window.open(LINKS[cmd], '_blank', 'noopener,noreferrer')
    } else if (cmd === 'cv') {
      print(t.terminal.downloading)
      const a = document.createElement('a')
      a.href = '/curriculo-germano.pdf'
      a.download = ''
      a.click()
    } else if (cmd === 'lang') {
      print(t.terminal.langChanged)
      toggleLang()
    } else if (cmd === 'clear') {
      setLines([])
    } else if (cmd === 'exit') {
      onClose()
    } else {
      print(`${t.terminal.notFound} ${cmd}`)
    }
  }

  return (
    <div className="terminal-backdrop" onClick={onClose}>
      <div
        className="terminal-window"
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        onClick={e => {
          e.stopPropagation()
          inputRef.current?.focus()
        }}
      >
        <div className="terminal-bar">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
          <span className="terminal-title">visitor@gms — zsh</span>
          <button className="terminal-close" onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        <div className="terminal-body" ref={bodyRef}>
          {lines.map((line, i) =>
            line.type === 'cmd' ? (
              <div key={i} className="terminal-line">
                <span className="terminal-prompt">visitor@gms:~$</span> {line.text}
              </div>
            ) : (
              <div key={i} className="terminal-line terminal-out">{line.text}</div>
            )
          )}

          <div className="terminal-line terminal-input-line">
            <span className="terminal-prompt">visitor@gms:~$</span>
            <input
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  run(input)
                  setInput('')
                }
                if (e.key === 'Escape') onClose()
              }}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
