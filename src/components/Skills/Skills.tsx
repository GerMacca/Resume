import { useState, useEffect } from 'react'
import './Skills.css'
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript,
  SiReact, SiGit, SiDelphi, SiPostgresql,
} from 'react-icons/si'
import { FaNodeJs } from "react-icons/fa";
import { FaDatabase, FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'
import type { IconType } from 'react-icons'

type Project = {
  name: string
  github: string
  site?: string
}

type Skill = {
  icon: IconType
  name: string
  color: string
  desc: string
  area: string
  category: string
  since: number
  projects: Project[]
}

const skills: Skill[] = [
  {
    icon: SiReact,
    name: 'React',
    color: '#61dafb',
    area: 'react',
    category: 'Frontend',
    since: 2024,
    desc: 'Framework principal para aplicações SPA. Usado no TrainerDex e neste portfólio, explorando hooks, componentes e gerenciamento de estado.',
    projects: [
      { name: 'TrainerDex', github: 'https://github.com/GermanoMaccagnan/TrainerDex' },
      { name: 'Portfólio', github: 'https://github.com/GermanoMaccagnan/GermanoMaccagnanResume' },
    ],
  },
  {
    icon: SiHtml5,
    name: 'HTML5',
    color: '#e34f26',
    area: 'html',
    category: 'Frontend',
    since: 2022,
    desc: 'Base de todos os meus projetos web. Estruturação semântica e acessível presente em cada trabalho que desenvolvi.',
    projects: [
      { name: 'TrainerDex', github: 'https://github.com/GermanoMaccagnan/TrainerDex' },
      { name: 'Portfólio', github: 'https://github.com/GermanoMaccagnan/GermanoMaccagnanResume' },
    ],
  },
  {
    icon: SiTypescript,
    name: 'TypeScript',
    color: '#3178c6',
    area: 'ts',
    category: 'FullStack',
    since: 2025,
    desc: 'Adotado em projetos mais recentes para maior segurança e organização. Este portfólio foi desenvolvido inteiramente com TypeScript.',
    projects: [
      { name: 'Portfólio', github: 'https://github.com/GermanoMaccagnan/GermanoMaccagnanResume' },
    ],
  },
  {
    icon: SiJavascript,
    name: 'JavaScript',
    color: '#f7df1e',
    area: 'js',
    category: 'Frontend',
    since: 2023,
    desc: 'Linguagem que uso no dia a dia para lógica de interações, manipulação do DOM e integração com APIs.',
    projects: [
      { name: 'TrainerDex', github: 'https://github.com/GermanoMaccagnan/TrainerDex' },
    ],
  },
  {
    icon: SiCss,
    name: 'CSS3',
    color: '#1572b6',
    area: 'css',
    category: 'Frontend',
    since: 2022,
    desc: 'Responsável pelos estilos, animações e layouts. Explorei flexbox, grid e keyframes em projetos como o TrainerDex e este portfólio.',
    projects: [
      { name: 'TrainerDex', github: 'https://github.com/GermanoMaccagnan/TrainerDex' },
      { name: 'Portfólio', github: 'https://github.com/GermanoMaccagnan/GermanoMaccagnanResume' },
    ],
  },
  {
    icon: FaNodeJs,
    name: 'NodeJS',
    color: '#248926',
    area: 'NodeJs',
    category: 'Backend',
    since: 2025,
    desc: 'Desenvolvimento de APIs e servidores backend. Integração com bancos de dados e serviços externos.',
    projects: [],
  },
  {
    icon: FaDatabase,
    name: 'Firebird',
    color: '#f5a623',
    area: 'fb',
    category: 'Database',
    since: 2023,
    desc: 'Banco relacional utilizado com Delphi. Experiência com queries SQL, procedures, triggers, generators e administração de dados.',
    projects: [],
  },
  {
    icon: SiGit,
    name: 'Git',
    color: '#f05032',
    area: 'git',
    category: 'Ferramentas',
    since: 2022,
    desc: 'Controle de versão presente em todos os meus projetos. Uso o GitHub como repositório central para colaboração e histórico do código.',
    projects: [
      { name: 'GitHub', github: 'https://github.com/GermanoMaccagnan' },
    ],
  },
  {
    icon: SiDelphi,
    name: 'Delphi',
    color: '#e62431',
    area: 'delphi',
    category: 'Desktop',
    since: 2024,
    desc: 'Desenvolvimento de aplicações desktop com foco em sistemas de gestão. Familiaridade com VCL, eventos e integração com bancos de dados.',
    projects: [],
  },
  {
    icon: SiPostgresql,
    name: 'PostgreSQL',
    color: '#336791',
    area: 'pg',
    category: 'Database',
    since: 2025,
    desc: 'SGBD robusto para projetos que exigem maior escala. Experiência com modelagem de dados, queries avançadas e integrações com aplicações.',
    projects: [],
  },
]

function ExpandedCard({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const { icon: Icon, name, color, desc, category, since, projects } = skill

  return (
    <div className="proj-backdrop" onClick={onClose}>
      <div
        className="proj-expanded-card"
        style={{ '--skill-color': color } as React.CSSProperties}
        onClick={e => e.stopPropagation()}
      >
        {/* Watermark */}
        <div className="bento-watermark proj-watermark" aria-hidden="true"><Icon /></div>

        {/* Fechar */}
        <button className="proj-close" onClick={onClose} aria-label="Fechar">
          <FaTimes />
        </button>

        {/* Meta */}
        <div className="bento-meta">
          <span className="bento-category">{category}</span>
          <span className="bento-since">desde {since}</span>
        </div>

        {/* Ícone + nome */}
        <div className="bento-header">
          <div className="bento-icon"><Icon /></div>
          <span className="bento-name">{name}</span>
        </div>

        {/* Descrição completa */}
        <p className="proj-desc-full">{desc}</p>

        {/* Divisor */}
        <div className="proj-divider" />

        {/* Projetos */}
        {projects.length === 0 ? (
          <p className="proj-empty">Nenhum projeto público ainda.</p>
        ) : (
          <ul className="proj-list">
            {projects.map(p => (
              <li key={p.name} className="proj-item">
                <span className="proj-name">{p.name}</span>
                <div className="proj-links">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link proj-link--gh">
                    <FaGithub /> <span>GitHub</span>
                  </a>
                  {p.site && (
                    <a href={p.site} target="_blank" rel="noopener noreferrer" className="proj-link proj-link--site">
                      <FaExternalLinkAlt /> <span>Site</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default function Skills() {
  const [selected, setSelected] = useState<Skill | null>(null)

  return (
    <section id="skills" className="skills section">
      <div className="section-header">
        <span className="section-tag">// habilidades</span>
        <h2>Stack tecnológica</h2>
      </div>

      {/* Marquee */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...skills, ...skills].map(({ icon: Icon, name, color }, i) => (
            <div key={`${name}-${i}`} className="marquee-item">
              <span className="a" style={{ color, display: 'flex', alignItems: 'center' }}><Icon size={36} /></span>
              <span className="marquee-label">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <div className="skills-bento">
        {skills.map((skill) => {
          const { icon: Icon, name, color, desc, area, category, since } = skill
          return (
            <div
              key={name}
              className={`bento-card bento-${area}`}
              style={{ '--skill-color': color } as React.CSSProperties}
              onClick={() => setSelected(skill)}
            >
              <div className="bento-watermark" aria-hidden="true"><Icon /></div>

              <div className="bento-meta">
                <span className="bento-category">{category}</span>
                <span className="bento-since">desde {since}</span>
              </div>

              <div className="bento-header">
                <div className="bento-icon"><Icon /></div>
                <span className="bento-name">{name}</span>
              </div>

              <p className="bento-desc">{desc}</p>
            </div>
          )
        })}
      </div>

      {selected && <ExpandedCard skill={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
