import './Projects.css'
import { TbBrandGithubFilled } from 'react-icons/tb'

const projects = [
  {
    title: 'TrainerDex',
    desc: 'Plataforma social para treinadores Pokémon. Conta com página de login animada, landing page e sistema de cadastro.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    github: 'https://github.com/GerMacca',
    featured: true,
  },
  {
    title: 'HydroFarm',
    desc: 'Sistema de gestão para fazendas hidropônicas. Interface web para monitoramento e controle de cultivos.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/GerMacca',
    featured: false,
  },
  {
    title: 'Kingdom Rush UCS',
    desc: 'Jogo tower defense inspirado no clássico Kingdom Rush, desenvolvido como projeto acadêmico na UCS.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/GerMacca',
    featured: false,
  },
  {
    title: 'MarketPlace em Java',
    desc: 'Aplicação de marketplace desenvolvida em Java com interface gráfica e funcionalidades de compra e venda.',
    tags: ['Java'],
    github: 'https://github.com/GerMacca',
    featured: false,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="projects section">
      <div className="section-header">
        <span className="section-tag">// projetos</span>
        <h2>Trabalhos recentes</h2>
      </div>

      <div className="projects-grid">
        {projects.map(project => (
          <div
            key={project.title}
            className={`project-card ${project.featured ? 'featured' : ''}`}
          >
            <div className="project-top">
              <div className="project-folder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-github"
                aria-label="Ver no GitHub"
              >
                <TbBrandGithubFilled size={22} />
              </a>
            </div>

            <h3 className="project-title">{project.title}</h3>
            <p className="project-desc">{project.desc}</p>

            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
