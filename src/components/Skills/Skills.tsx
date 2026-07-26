import { useState, useEffect } from 'react'
import './Skills.css'
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript,
  SiReact, SiGit, SiDelphi, SiPostgresql, SiPython
} from 'react-icons/si'
import { FaNodeJs } from "react-icons/fa";
import { FaDatabase, FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import { useGithubRepos, type GithubRepo } from '../Projects/useGithubRepos'
import { useLanguage } from '../../i18n/LanguageContext'
import type { LocalizedString } from '../../i18n/translations'

type Skill = {
  icon: IconType
  name: string
  color: string
  desc: LocalizedString
  area: string
  category: LocalizedString
  since: number
  matchKeys: string[]
}

const GITHUB_USERNAME = 'GerMacca'

const CATEGORIES = {
  frontend: { pt: 'Frontend', en: 'Frontend' },
  fullstack: { pt: 'FullStack', en: 'FullStack' },
  backend: { pt: 'Backend', en: 'Backend' },
  database: { pt: 'Database', en: 'Database' },
  desktop: { pt: 'Desktop', en: 'Desktop' },
  tools: { pt: 'Ferramentas', en: 'Tools' },
} satisfies Record<string, LocalizedString>

function matchRepos(repos: GithubRepo[], matchKeys: string[]): GithubRepo[] {
  if (matchKeys.includes('*')) return repos
  if (matchKeys.length === 0) return []
  return repos.filter(repo =>
    matchKeys.some(key => {
      const k = key.toLowerCase()
      return (
        repo.language?.toLowerCase() === k ||
        repo.allLanguages.some(l => l.toLowerCase() === k) ||
        repo.topics.some(t => t.toLowerCase() === k)
      )
    })
  )
}

const skills: Skill[] = [
  {
    icon: SiReact,
    name: 'React',
    color: '#61dafb',
    area: 'react',
    category: CATEGORIES.frontend,
    since: 2024,
    desc: {
      pt: 'Utilizo React nos meus principais projetos web, aplicando conceitos como componentização, hooks e organização de estado para desenvolver interfaces dinâmicas e reutilizáveis. Tenho experiência na estruturação de componentes, separação de responsabilidades e construção de aplicações SPA, buscando manter o código organizado e fácil de manter.',
      en: 'I use React in my main web projects, applying concepts like componentization, hooks and state organization to build dynamic, reusable interfaces. I have experience structuring components, separating responsibilities and building SPAs, always aiming to keep the code organized and easy to maintain.',
    },
    matchKeys: ['React'],
  },
  {
    icon: SiHtml5,
    name: 'HTML5',
    color: '#e34f26',
    area: 'html',
    category: CATEGORIES.frontend,
    since: 2022,
    desc: {
      pt: 'Presente em todos os meus projetos web. Experiência na construção de estruturas semânticas e bem organizadas para aplicações e páginas web.',
      en: 'Present in all of my web projects. Experience building semantic, well-organized structures for web applications and pages.',
    },
    matchKeys: ['HTML'],
  },
  {
    icon: SiTypescript,
    name: 'TypeScript',
    color: '#3178c6',
    area: 'ts',
    category: CATEGORIES.fullstack,
    since: 2025,
    desc: {
      pt: 'Utilizado em projetos mais recentes para melhorar a organização e segurança do código. Venho aplicando TypeScript em aplicações web e neste portfólio, explorando tipagem estática e melhor estruturação do projeto.',
      en: 'Used in my most recent projects to improve code organization and safety. I have been applying TypeScript in web applications and in this portfolio, exploring static typing and better project structure.',
    },
    matchKeys: ['TypeScript'],
  },
  {
    icon: SiJavascript,
    name: 'JavaScript',
    color: '#f7df1e',
    area: 'js',
    category: CATEGORIES.frontend,
    since: 2023,
    desc: {
      pt: 'Uso JavaScript para lógica das aplicações web, manipulação de dados e integração com APIs nos meus projetos.',
      en: 'I use JavaScript for web application logic, data manipulation and API integration in my projects.',
    },
    matchKeys: ['JavaScript'],
  },
  {
    icon: SiCss,
    name: 'CSS3',
    color: 'rebeccapurple',
    area: 'css',
    category: CATEGORIES.frontend,
    since: 2022,
    desc: {
      pt: 'Experiência na criação de layouts responsivos, estilização de componentes e uso de animações para melhorar a experiência das interfaces.',
      en: 'Experience creating responsive layouts, styling components and using animations to improve interface experiences.',
    },
    matchKeys: ['CSS'],
  },
  {
    icon: FaNodeJs,
    name: 'NodeJS',
    color: '#248926',
    area: 'nodejs',
    category: CATEGORIES.backend,
    since: 2025,
    desc: {
      pt: 'Utilizado em estudos e projetos pessoais para desenvolvimento de APIs e integração com bancos de dados.',
      en: 'Used in studies and personal projects to build APIs and integrate with databases.',
    },
    matchKeys: ['Express', 'Fastify'],
  },
  {
    icon: FaDatabase,
    name: 'Firebird',
    color: '#f5a623',
    area: 'fb',
    category: CATEGORIES.database,
    since: 2023,
    desc: {
      pt: 'Banco de dados utilizado diariamente no ambiente de trabalho em conjunto com Delphi, trabalhando com queries SQL, procedures, triggers e manutenção de dados em sistemas ERP.',
      en: 'Database I use daily at work alongside Delphi, writing SQL queries, procedures, triggers and maintaining data in ERP systems.',
    },
    matchKeys: ['firebird'],
  },
  {
    icon: SiGit,
    name: 'Git',
    color: '#f05032',
    area: 'git',
    category: CATEGORIES.tools,
    since: 2022,
    desc: {
      pt: 'Utilizo Git no dia a dia para versionamento dos meus projetos e organização do histórico de desenvolvimento utilizando GitHub.',
      en: 'I use Git daily for versioning my projects and organizing development history with GitHub.',
    },
    matchKeys: ['*'],
  },
  {
    icon: SiDelphi,
    name: 'Delphi',
    color: '#e62431',
    area: 'delphi',
    category: CATEGORIES.desktop,
    since: 2024,
    desc: {
      pt: 'Utilizado diariamente no desenvolvimento e manutenção de aplicações desktop no ambiente profissional, principalmente em sistemas de gestão. Participo da criação de novas funcionalidades, manutenção de rotinas existentes, correção de problemas e integração com bancos de dados utilizados pelo sistema.',
      en: 'Used daily to develop and maintain desktop applications professionally, mainly in management systems. I work on new features, maintenance of existing routines, bug fixing and integration with the databases used by the system.',
    },
    matchKeys: ['Delphi'],
  },
  {
    icon: SiPostgresql,
    name: 'PostgreSQL',
    color: '#336791',
    area: 'pg',
    category: CATEGORIES.database,
    since: 2025,
    desc: {
      pt: 'Utilizado em projetos pessoais e também estudado durante a graduação, trabalhando com modelagem de dados e construção de queries SQL.',
      en: 'Used in personal projects and studied during my degree, working with data modeling and SQL queries.',
    },
    matchKeys: ['PostgreSQL', 'Prisma', 'Mongoose'],
  },
  {
    icon: SiPython,
    name: 'Python',
    color: '#3776ab',
    area: 'python',
    category: CATEGORIES.tools,
    since: 2024,
    desc: {
      pt: 'Utilizo Python para automatizar tarefas no trabalho e também em projetos pessoais, principalmente scripts para manipulação de dados e automação de processos.',
      en: 'I use Python to automate tasks at work and in personal projects, mostly scripts for data manipulation and process automation.',
    },
    matchKeys: ['Python'],
  },
]

function ExpandedCard({ skill, repos, onClose }: { skill: Skill; repos: GithubRepo[]; onClose: () => void }) {
  const { t, lang } = useLanguage()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const { icon: Icon, name, color, desc, category, since, matchKeys } = skill
  const projects = matchRepos(repos, matchKeys)

  return (
    <div className="proj-backdrop" onClick={onClose}>
      <div
        className="proj-expanded-card"
        style={{ '--skill-color': color } as React.CSSProperties}
        role="dialog"
        aria-modal="true"
        aria-label={name}
        onClick={e => e.stopPropagation()}
      >
        {/* Watermark */}
        <div className="bento-watermark proj-watermark" aria-hidden="true"><Icon /></div>

        {/* Fechar */}
        <button className="proj-close" onClick={onClose} aria-label={t.skills.close}>
          <FaTimes />
        </button>

        {/* Meta */}
        <div className="bento-meta">
          <span className="bento-category">{category[lang]}</span>
          <span className="bento-since">{t.skills.since} {since}</span>
        </div>

        {/* Ícone + nome */}
        <div className="bento-header">
          <div className="bento-icon"><Icon /></div>
          <span className="bento-name">{name}</span>
        </div>

        {/* Descrição completa */}
        <p className="proj-desc-full">{desc[lang]}</p>

        {/* Divisor */}
        <div className="proj-divider" />

        {/* Projetos */}
        {projects.length === 0 ? (
          <p className="proj-empty">{t.skills.noProjects}</p>
        ) : (
          <ul className="proj-list">
            {projects.map(p => (
              <li key={p.id} className="proj-item">
                <span className="proj-name">{p.name}</span>
                <div className="proj-links">
                  <a href={p.html_url} target="_blank" rel="noopener noreferrer" className="proj-link proj-link--gh">
                    <FaGithub /> <span>GitHub</span>
                  </a>
                  {p.homepage && (
                    <a href={p.homepage} target="_blank" rel="noopener noreferrer" className="proj-link proj-link--site">
                      <FaExternalLinkAlt /> <span>{t.skills.site}</span>
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
  const { t, lang } = useLanguage()
  const [selected, setSelected] = useState<Skill | null>(null)
  const { repos } = useGithubRepos(GITHUB_USERNAME)

  return (
    <section id="skills" className="skills section">
      <div className="section-header">
        <span className="section-tag">{t.skills.tag}</span>
        <h2>{t.skills.title}</h2>
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
              role="button"
              tabIndex={0}
              aria-label={`${t.skills.viewDetails} ${name}`}
              onClick={() => setSelected(skill)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelected(skill)
                }
              }}
            >
              <div className="bento-watermark" aria-hidden="true"><Icon /></div>

              <div className="bento-meta">
                <span className="bento-category">{category[lang]}</span>
                <span className="bento-since">{t.skills.since} {since}</span>
              </div>

              <div className="bento-header">
                <div className="bento-icon"><Icon /></div>
                <span className="bento-name">{name}</span>
              </div>

              <p className="bento-desc">{desc[lang]}</p>
            </div>
          )
        })}
      </div>

      {selected && <ExpandedCard skill={selected} repos={repos} onClose={() => setSelected(null)} />}
    </section>
  )
}
