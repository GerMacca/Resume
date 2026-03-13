import './Projects.css'
import { TbBrandGithubFilled } from 'react-icons/tb'
import { AiOutlineStar } from 'react-icons/ai'
import { useGithubRepos } from './useGithubRepos'

const FEATURED = ['Lugia-Logs', 'HydroFarm', 'Kingdom-Rush-UCS']

const featuredIndex = (name: string) => FEATURED.indexOf(name) + 1

export default function Projects() {
  const { repos, loading, error } = useGithubRepos('GerMacca')

  const tags = (repo: { topics: string[]; languages: string[] }) => {
    const list = [...repo.languages]
    repo.topics.forEach(t => { if (!list.includes(t)) list.push(t) })
    return list.slice(0, 5)
  }

  return (
    <section id="projects" className="projects section">
      <div className="section-header">
        <span className="section-tag">// projetos</span>
        <h2>Trabalhos recentes</h2>
      </div>

      {loading && (
        <div className="projects-loading">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="project-skeleton" />
          ))}
        </div>
      )}

      {error && (
        <p className="projects-error">Não foi possível carregar os repositórios.</p>
      )}

      {!loading && !error && (
        <div className="projects-grid">
          {repos.map(repo => (
            <div
              key={repo.id}
              className={`project-card ${FEATURED.includes(repo.name) ? 'featured' : ''}`}
            >
              <div className="project-top">
                <div className="project-folder">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                {repo.stargazers_count > 0 && (
                  <span className="project-stars">
                    <AiOutlineStar size={14} />
                    {repo.stargazers_count}
                  </span>
                )}
              </div>

              {FEATURED.includes(repo.name) && (
                <span className="project-featured-num">
                  {String(featuredIndex(repo.name)).padStart(2, '0')}
                </span>
              )}

              <h3 className="project-title">{repo.name}</h3>
              <p className="project-desc">{repo.description ?? 'Sem descrição.'}</p>

              <div className="project-tags">
                {tags(repo).map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-github-btn"
              >
                <TbBrandGithubFilled size={16} />
                Ver no GitHub
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
