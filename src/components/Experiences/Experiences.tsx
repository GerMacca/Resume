import { useState } from 'react'
import './Experiences.css'
import experiences from './experiences.data'
import type { ExperienceTab } from './experiences.data'

const tabs: { id: ExperienceTab; label: string }[] = [
  { id: 'work', label: 'Empregos' },
  { id: 'education', label: 'Graduação' },
  { id: 'courses', label: 'Cursos' },
]

const typeLabel: Record<string, string> = {
  work: 'Emprego',
  education: 'Graduação',
  courses: 'Cursos complementares',
  internship: 'Estágio',
}

export default function Experiences() {
  const [active, setActive] = useState<ExperienceTab>('work')

  const filtered = experiences.filter(e => e.tab === active)

  return (
    <section id="experiences" className="experiences section">
      <div className="section-header">
        <span className="section-tag">// experiências</span>
        <h2>Trajetória</h2>
      </div>

      <div className="exp-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`exp-tab ${active === tab.id ? 'exp-tab--active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="timeline">
        {filtered.map((exp, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-dot" />

            <div className="timeline-card">
              <div className="timeline-card-header">
                <div className="timeline-card-title">
                  <h3>{exp.role}</h3>
                  <span className="timeline-company">{exp.company}</span>
                </div>
                <div className="timeline-card-meta">
                  <span className={`timeline-badge timeline-badge--${exp.type}`}>
                    {typeLabel[exp.type]}
                  </span>
                  <span className="timeline-period">{exp.period}</span>
                  {exp.location && (
                    <span className="timeline-location">{exp.location}</span>
                  )}
                </div>
              </div>

              <p className="timeline-desc">{exp.description}</p>

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
