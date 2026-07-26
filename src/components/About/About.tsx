import './About.css'
import { useLanguage } from '../../i18n/LanguageContext'

const facts = {
  location: "'Caxias do Sul, RS'",
  role: "'Desenvolvedor Desktop @ Datalan'",
  education: "'Ciência da Computação @ UCS'",
  stack: "['React', 'TypeScript', 'Node', 'Delphi']",
  learning: "'sempre'",
}

const factsEn = {
  location: "'Caxias do Sul, Brazil'",
  role: "'Desktop Developer @ Datalan'",
  education: "'Computer Science @ UCS'",
  stack: "['React', 'TypeScript', 'Node', 'Delphi']",
  learning: "'always'",
}

export default function About() {
  const { t, lang } = useLanguage()
  const entries = Object.entries(lang === 'pt' ? facts : factsEn)

  return (
    <section id="about" className="about section">
      <div className="section-header">
        <span className="section-tag">{t.about.tag}</span>
        <h2>{t.about.title}</h2>
      </div>

      <div className="about-grid">
        <div className="about-text">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
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
              <span className="tok-kw">const</span> <span className="tok-var">germano</span> = {'{'}
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
