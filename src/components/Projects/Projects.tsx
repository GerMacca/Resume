import './Projects.css'
import { TbBrandGithubFilled, TbExternalLink } from 'react-icons/tb'
import { AiOutlineStar } from 'react-icons/ai'
import { useGithubRepos } from './useGithubRepos'


const projectImages = import.meta.glob('../../assets/*.{png,jpg,webp,jpeg}', { eager: true }) as Record<string, { default: string }>

function getProjectImage(name: string): string | null {
  for (const ext of ['png', 'jpg', 'webp', 'jpeg']) {
    const key = `../../assets/${name}.${ext}`
    if (projectImages[key]) return projectImages[key].default
  }
  return null
}

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
        <div className="projects-list">
          {repos.map(repo => (
            <div key={repo.id} className="project-card">
              <div className="project-preview">
                {getProjectImage(repo.name)
                  ? <img src={getProjectImage(repo.name)!} alt={repo.name} loading="lazy" />
                  : <span className="project-no-image">sem imagem</span>
                }
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

                <p className="project-desc">{repo.description ?? 'Sem descrição.'}</p>

                <div className="project-tags">
                  {tags(repo).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="project-github-btn">
                    <TbBrandGithubFilled size={16} />
                    GitHub
                  </a>
                  {repo.homepage && (
                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="project-site-btn">
                      <TbExternalLink size={16} />
                      Ver site
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
