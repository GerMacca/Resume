import './About.css'
import { useLanguage } from '../../i18n/LanguageContext'

const facts = {
  location: "'Caxias do Sul, RS'",
  role: "'Desenvolvedor Web'",
  education: "'Ciência da Computação @ UCS'",
  stack: "['React', 'TypeScript', 'Node', 'Delphi', '...']",
  status: "'aberto a oportunidades'",
}

const factsEn = {
  location: "'Caxias do Sul, Brazil'",
  role: "'Desktop Developer Web'",
  education: "'Computer Science @ UCS'",
  stack: "['React', 'TypeScript', 'Node', 'Delphi', '...']",
  status: "'open to opportunities'",
}

const highlightWords = {
  pt: ['Germano', 'desenvolvedor de software', 'React', 'TypeScript', 'Node.js', 'Ciência da Computação'],
  en: ['Germano', 'software developer', 'React', 'TypeScript', 'Node.js', 'Computer Science'],
}

function highlight(text: string, words: string[]) {
  const pattern = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  return text.split(pattern).map((part, i) =>
    words.includes(part) ? (
      <span key={i} className="about-highlight">
        {part}
      </span>
    ) : (
      part
    )
  )
}

export default function About() {
  const { t, lang } = useLanguage()
  const entries = Object.entries(lang === 'pt' ? facts : factsEn)
  const words = highlightWords[lang]

  return (
    <section id="about" className="about section">
      <div className="section-header">
        <span className="section-tag">{t.about.tag}</span>
        <h2>{t.about.title}</h2>
      </div>

      <div className="about-grid">
        <div className="about-text">
          <p>{highlight(t.about.p1, words)}</p>
          <p>{highlight(t.about.p2, words)}</p>
          <p>{highlight(t.about.p3, words)}</p>
        </div>

        <div className="about-code" aria-hidden="true">
          <div className="about-code-bar">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <span className="about-code-file">{t.about.factsTitle}</span>
          </div>
          <pre className="about-code-body">
            <code>
              <span className="tok-kw">const</span> <span className="tok-var">GERMANO</span> = {'{'}
              {'\n'}
              {entries.map(([key, value]) => (
                <span key={key}>
                  {'  '}
                  <span className="tok-prop">{key}</span>:{' '}
                  <span className="tok-str">{value}</span>,{'\n'}
                </span>
              ))}
              {'}'}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
