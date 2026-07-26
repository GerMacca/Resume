import { useState } from 'react'
import './Experiences.css'
import experiences from './experiences.data'
import type { ExperienceTab } from './experiences.data'
import { useLanguage } from '../../i18n/LanguageContext'

const tabIds: ExperienceTab[] = ['work', 'education', 'courses']

export default function Experiences() {
  const { t, lang } = useLanguage()
  const [active, setActive] = useState<ExperienceTab>('work')

  const filtered = experiences.filter(e => e.tab === active)

  return (
    <section id="experiences" className="experiences section">
      <div className="section-header">
        <span className="section-tag">{t.experiences.tag}</span>
        <h2>{t.experiences.title}</h2>
      </div>

      <div className="exp-tabs">
        {tabIds.map(tab => (
          <button
            key={tab}
            className={`exp-tab ${active === tab ? 'exp-tab--active' : ''}`}
            onClick={() => setActive(tab)}
          >
            {t.experiences.tabs[tab]}
          </button>
        ))}
      </div>

      <div className="timeline">
        {filtered.map(exp => (
          <div className="timeline-item" key={`${exp.company}-${exp.role.pt}`}>
            <div className="timeline-dot" />

            <div className="timeline-card">
              <div className="timeline-card-header">
                <div className="timeline-card-title">
                  <h3>{exp.role[lang]}</h3>
                  <span className="timeline-company">{exp.company}</span>
                </div>
                <div className="timeline-card-meta">
                  <span className={`timeline-badge timeline-badge--${exp.type}`}>
                    {t.experiences.types[exp.type]}
                  </span>
                  <span className="timeline-period">{exp.period[lang]}</span>
                  {exp.location && (
                    <span className="timeline-location">{exp.location}</span>
                  )}
                </div>
              </div>

              <p className="timeline-desc">{exp.description[lang]}</p>

              {exp.tags && exp.tags.length > 0 && (
                <div className="timeline-tags">
                  {exp.tags.map(tag => (
                    <span className="timeline-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
