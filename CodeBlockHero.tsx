// Componente alternativo para o hero-right
// Bloco de código com syntax highlight estilo GitHub Dark
// Para usar: substitua o conteúdo de hero-right em Hero.tsx por <CodeBlockHero />
// e copie os estilos de CodeBlockHero.css para Hero.css

import React from 'react'

const lines = [
  { tokens: [{ text: '// developer.ts', cls: 'tok-comment' }] },
  { tokens: [] },
  { tokens: [
    { text: 'const', cls: 'tok-keyword' },
    { text: ' developer', cls: 'tok-var' },
    { text: ' = {', cls: 'tok-punct' },
  ]},
  { tokens: [
    { text: '  name', cls: 'tok-key' },
    { text: ':      ', cls: 'tok-punct' },
    { text: '"Germano Maccagnan"', cls: 'tok-string' },
    { text: ',', cls: 'tok-punct' },
  ]},
  { tokens: [
    { text: '  role', cls: 'tok-key' },
    { text: ':      ', cls: 'tok-punct' },
    { text: '"Desenvolvedor Web"', cls: 'tok-string' },
    { text: ',', cls: 'tok-punct' },
  ]},
  { tokens: [
    { text: '  location', cls: 'tok-key' },
    { text: ':  ', cls: 'tok-punct' },
    { text: '"Brasil 🇧🇷"', cls: 'tok-string' },
    { text: ',', cls: 'tok-punct' },
  ]},
  { tokens: [
    { text: '  available', cls: 'tok-key' },
    { text: ':  ', cls: 'tok-punct' },
    { text: 'true', cls: 'tok-bool' },
    { text: ',', cls: 'tok-punct' },
  ]},
  { tokens: [
    { text: '  stack', cls: 'tok-key' },
    { text: ':     [', cls: 'tok-punct' },
    { text: '"React"', cls: 'tok-string' },
    { text: ', ', cls: 'tok-punct' },
    { text: '"TypeScript"', cls: 'tok-string' },
    { text: ', ', cls: 'tok-punct' },
    { text: '"Node"', cls: 'tok-string' },
    { text: '],', cls: 'tok-punct' },
  ]},
  { tokens: [{ text: '}', cls: 'tok-punct' }] },
]

export default function CodeBlockHero() {
  return (
    <div className="code-block">
      <div className="code-titlebar">
        <span className="code-dot code-dot--red" />
        <span className="code-dot code-dot--yellow" />
        <span className="code-dot code-dot--green" />
        <span className="code-filename">developer.ts</span>
      </div>
      <div className="code-body">
        {lines.map((line, i) => (
          <div
            key={i}
            className="code-line"
            style={{ '--line-delay': `${0.15 + i * 0.07}s` } as React.CSSProperties}
          >
            <span className="code-ln">{i + 1}</span>
            <span className="code-content">
              {line.tokens.length === 0
                ? '\u00A0'
                : line.tokens.map((tok, j) => (
                    <span key={j} className={tok.cls}>{tok.text}</span>
                  ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/*
CSS a adicionar em Hero.css:

.code-block {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 14px;
  overflow: hidden;
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.72rem, 1.1vw, 0.85rem);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
}
.code-titlebar {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1rem;
  background: #161b22;
  border-bottom: 1px solid #30363d;
}
.code-dot { width: 12px; height: 12px; border-radius: 50%; }
.code-dot--red    { background: #ff5f57; }
.code-dot--yellow { background: #febc2e; }
.code-dot--green  { background: #28c840; }
.code-filename { margin-left: 0.4rem; font-size: 0.72rem; color: #8b949e; }
.code-body { padding: 1rem 0; }
.code-line {
  display: flex;
  gap: 1.2rem;
  padding: 0.1rem 1.2rem;
  opacity: 0;
  animation: lineReveal 0.25s ease forwards;
  animation-delay: var(--line-delay);
}
@keyframes lineReveal {
  from { opacity: 0; transform: translateX(-6px); }
  to   { opacity: 1; transform: translateX(0); }
}
.code-ln { color: #3d444d; user-select: none; min-width: 1.2rem; text-align: right; flex-shrink: 0; }
.code-content { color: #e6edf3; }
.tok-comment { color: #6e7681; font-style: italic; }
.tok-keyword { color: #ff7b72; }
.tok-var     { color: #79c0ff; }
.tok-key     { color: #7ee787; }
.tok-string  { color: #a5d6ff; }
.tok-bool    { color: #f8a261; }
.tok-punct   { color: #e6edf3; }
*/
