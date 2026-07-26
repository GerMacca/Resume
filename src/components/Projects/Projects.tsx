import { useMemo, useState } from 'react'
import './Projects.css'
import { TbBrandGithubFilled, TbExternalLink } from 'react-icons/tb'
import { AiOutlineStar } from 'react-icons/ai'
import { useGithubRepos } from './useGithubRepos'
import { useLanguage } from '../../i18n/LanguageContext'


const projectImages = import.meta.glob('../../assets/*.{png,jpg,webp,jpeg}', { eager: true }) as Record<string, { default: string }>

function getProjectImage(name: string): string | null {
  for (const ext of ['png', 'jpg', 'webp', 'jpeg']) {
    const key = `../../assets/${name}.${ext}`
    if (projectImages[key]) return projectImages[key].default
  }
  return null
}

// Repos sem screenshot local ganham um placeholder no tema do site
// (o cartão OG do GitHub é branco e destoa do dark theme).
function ProjectPreview({ image, name }: { image: string | null; name: string }) {
  const [failed, setFailed] = useState(false)

  if (!image || failed) {
    return (
      <div className="project-placeholder" aria-hidden="true">
        <span className="project-placeholder-glyph">{'</>'}</span>
        <span className="project-placeholder-name">{name}</span>
      </div>
    )
  }
  return <img src={image} alt={name} loading="lazy" onError={() => setFailed(true)} />
}

const MAX_FILTERS = 8

export default function Projects() {
  const { t } = useLanguage()
  const { repos, loading, error } = useGithubRepos('GerMacca')
  const [filter, setFilter] = useState<string | null>(null)

  // Tecnologias mais usadas entre os repos, para os chips de filtro
  const techs = useMemo(() => {
    const counts = new Map<string, number>()
    repos.forEach(repo =>
      repo.languages.forEach(lang => counts.set(lang, (counts.get(lang) ?? 0) + 1))
    )
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_FILTERS)
      .map(([lang]) => lang)
  }, [repos])

  const visible = filter
    ? repos.filter(repo => repo.languages.includes(filter))
    : repos

  const tags = (repo: { topics: string[]; languages: string[] }) => {
    const list = [...repo.languages]
    repo.topics.forEach(tp => { if (!list.includes(tp)) list.push(tp) })
    return list.slice(0, 5)
  }

  return (
    <section id="projects" className="projects section">
      <div className="section-header">
        <span className="section-tag">{t.projects.tag}</span>
        <h2>{t.projects.title}</h2>
      </div>

      {loading && (
        <div className="projects-loading">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="project-skeleton" />
          ))}
        </div>
      )}

      {error && (
        <p className="projects-error">{t.projects.error}</p>
      )}

      {!loading && !error && (
        <>
          {techs.length > 1 && (
            <div className="projects-filter">
              <button
                className={`filter-chip ${filter === null ? 'filter-chip--active' : ''}`}
                onClick={() => setFilter(null)}
              >
                {t.projects.all}
              </button>
              {techs.map(tech => (
                <button
                  key={tech}
                  className={`filter-chip ${filter === tech ? 'filter-chip--active' : ''}`}
                  onClick={() => setFilter(f => (f === tech ? null : tech))}
                >
                  {tech}
                </button>
              ))}
            </div>
          )}

          <div className="projects-list">
            {visible.map(repo => {
              return (
                <div key={repo.id} className="project-card">
                  <div className="project-preview">
                    <ProjectPreview image={getProjectImage(repo.name)} name={repo.name} />
                  </div>
                  <div className="project-content">
                    <div className="project-top">
                      <h3 className="project-title">{repo.name}</h3>
                      {repo.stargazers_count > 0 && (
                        <span className="project-stars">
                          <AiOutlineStar size={14} />
                          {repo.stargazers_count}
                        </span>
                      )}
                    </div>

                    <p className="project-desc">{repo.description ?? t.projects.noDesc}</p>

                    <div className="project-tags">
                      {tags(repo).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>

                    <div className="project-links">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="project-github-btn">
                        <TbBrandGithubFilled size={16} />
                        {t.projects.github}
                      </a>
                      {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="project-site-btn">
                          <TbExternalLink size={16} />
                          {t.projects.site}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}
