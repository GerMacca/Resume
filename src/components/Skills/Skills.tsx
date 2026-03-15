import { useState, useEffect } from 'react'
import './Skills.css'
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript,
  SiReact, SiGit, SiDelphi, SiPostgresql, SiPython
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
    desc: 'Utilizo React nos meus principais projetos web, aplicando conceitos como componentização, hooks e organização de estado para desenvolver interfaces dinâmicas e reutilizáveis. Tenho experiência na estruturação de componentes, separação de responsabilidades e construção de aplicações SPA, buscando manter o código organizado e fácil de manter. ',
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
    desc: 'Presente em todos os meus projetos web. Experiência na construção de estruturas semânticas e bem organizadas para aplicações e páginas web.',
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
    desc: 'Utilizado em projetos mais recentes para melhorar a organização e segurança do código. Venho aplicando TypeScript em aplicações web e neste portfólio, explorando tipagem estática e melhor estruturação do projeto.',
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
    desc: 'Uso JavaScript para lógica das aplicações web, manipulação de dados e integração com APIs nos meus projetos.',
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
    desc: 'Experiência na criação de layouts responsivos, estilização de componentes e uso de animações para melhorar a experiência das interfaces.',
    projects: [
      { name: 'TrainerDex', github: 'https://github.com/GermanoMaccagnan/TrainerDex' },
      { name: 'Portfólio', github: 'https://github.com/GermanoMaccagnan/GermanoMaccagnanResume' },
    ],
  },
  {
    icon: FaNodeJs,
    name: 'NodeJS',
    color: '#248926',
    area: 'nodejs',
    category: 'Backend',
    since: 2025,
    desc: 'Utilizado em estudos e projetos pessoais para desenvolvimento de APIs e integração com bancos de dados.',
    projects: [],
  },
  {
    icon: FaDatabase,
    name: 'Firebird',
    color: '#f5a623',
    area: 'fb',
    category: 'Database',
    since: 2023,
    desc: 'Banco de dados utilizado diariamente no ambiente de trabalho em conjunto com Delphi, trabalhando com queries SQL, procedures, triggers e manutenção de dados em sistemas ERP.',
    projects: [],
  },
  {
    icon: SiGit,
    name: 'Git',
    color: '#f05032',
    area: 'git',
    category: 'Ferramentas',
    since: 2022,
    desc: 'Utilizo Git no dia a dia para versionamento dos meus projetos e organização do histórico de desenvolvimento utilizando GitHub.',
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
    desc: 'Utilizado diariamente no desenvolvimento e manutenção de aplicações desktop no ambiente profissional, principalmente em sistemas de gestão. Participo da criação de novas funcionalidades, manutenção de rotinas existentes, correção de problemas e integração com bancos de dados utilizados pelo sistema.',
    projects: [],
  },
  {
    icon: SiPostgresql,
    name: 'PostgreSQL',
    color: '#336791',
    area: 'pg',
    category: 'Database',
    since: 2025,
    desc: 'Utilizado em projetos pessoais e também estudado durante a graduação, trabalhando com modelagem de dados e construção de queries SQL.',
    projects: [],
  },
  {
    icon: SiPython,
    name: 'Python',
    color: '#3776ab',
    area: 'python',
    category: 'Ferramentas',
    since: 2024,
    desc: 'Utilizo Python para automatizar tarefas no trabalho e também em projetos pessoais, principalmente scripts para manipulação de dados e automação de processos.',
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
