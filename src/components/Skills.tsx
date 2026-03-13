import './Skills.css'
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript,
  SiReact, SiOpenjdk, SiGit, SiDelphi, SiPostgresql,
} from 'react-icons/si'
import { FaDatabase } from 'react-icons/fa'
import type { IconType } from 'react-icons'

type Skill = {
  icon: IconType
  name: string
  color: string
  desc: string
  area: string
  category: string
  since: number
  level: number
}

const skills: Skill[] = [
  {
    icon: SiReact,
    name: 'React',
    color: '#61dafb',
    area: 'react',
    category: 'Frontend',
    since: 2023,
    level: 4,
    desc: 'Framework principal para aplicações SPA. Usado no TrainerDex e neste portfólio, explorando hooks, componentes e gerenciamento de estado.',
  },
  {
    icon: SiHtml5,
    name: 'HTML5',
    color: '#e34f26',
    area: 'html',
    category: 'Frontend',
    since: 2022,
    level: 5,
    desc: 'Base de todos os meus projetos web. Estruturação semântica e acessível presente em cada trabalho que desenvolvi.',
  },
  {
    icon: SiTypescript,
    name: 'TypeScript',
    color: '#3178c6',
    area: 'ts',
    category: 'Frontend',
    since: 2023,
    level: 3,
    desc: 'Adotado em projetos mais recentes para maior segurança e organização. Este portfólio foi desenvolvido inteiramente com TypeScript.',
  },
  {
    icon: SiJavascript,
    name: 'JavaScript',
    color: '#f7df1e',
    area: 'js',
    category: 'Frontend',
    since: 2022,
    level: 4,
    desc: 'Linguagem que uso no dia a dia para lógica de interações, manipulação do DOM e integração com APIs.',
  },
  {
    icon: SiCss,
    name: 'CSS3',
    color: '#1572b6',
    area: 'css',
    category: 'Frontend',
    since: 2022,
    level: 4,
    desc: 'Responsável pelos estilos, animações e layouts. Explorei flexbox, grid e keyframes em projetos como o TrainerDex e este portfólio.',
  },
  {
    icon: SiOpenjdk,
    name: 'Java',
    color: '#f89820',
    area: 'java',
    category: 'Backend',
    since: 2022,
    level: 3,
    desc: 'Aprendizado acadêmico sólido na UCS. Desenvolvi o MarketPlace em Java com foco em orientação a objetos.',
  },
  {
    icon: FaDatabase,
    name: 'Firebird',
    color: '#f5a623',
    area: 'fb',
    category: 'Database',
    since: 2023,
    level: 3,
    desc: 'Banco relacional utilizado com Delphi. Experiência com queries SQL, procedures e administração de dados.',
  },
  {
    icon: SiGit,
    name: 'Git',
    color: '#f05032',
    area: 'git',
    category: 'Ferramentas',
    since: 2022,
    level: 4,
    desc: 'Controle de versão presente em todos os meus projetos. Uso o GitHub como repositório central para colaboração e histórico do código.',
  },
  {
    icon: SiDelphi,
    name: 'Delphi',
    color: '#e62431',
    area: 'delphi',
    category: 'Desktop',
    since: 2023,
    level: 3,
    desc: 'Desenvolvimento de aplicações desktop com foco em sistemas de gestão. Familiaridade com VCL, eventos e integração com bancos de dados.',
  },
  {
    icon: SiPostgresql,
    name: 'PostgreSQL',
    color: '#336791',
    area: 'pg',
    category: 'Database',
    since: 2024,
    level: 3,
    desc: 'SGBD robusto para projetos que exigem maior escala. Experiência com modelagem de dados, queries avançadas e integrações com aplicações.',
  },
]

function LevelDots({ level }: { level: number }) {
  return (
    <div className="bento-dots">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`bento-dot ${i < level ? 'bento-dot--on' : ''}`} />
      ))}
    </div>
  )
}

export default function Skills() {
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
        {skills.map(({ icon: Icon, name, color, desc, area, category, since, level }) => (
          <div
            key={name}
            className={`bento-card bento-${area}`}
            style={{ '--skill-color': color } as React.CSSProperties}
          >
            {/* Watermark icon no fundo */}
            <div className="bento-watermark" aria-hidden="true"><Icon /></div>

            {/* Topo: categoria + ano */}
            <div className="bento-meta">
              <span className="bento-category">{category}</span>
              <span className="bento-since">desde {since}</span>
            </div>

            {/* Ícone + nome */}
            <div className="bento-header">
              <div className="bento-icon"><Icon /></div>
              <span className="bento-name">{name}</span>
            </div>

            {/* Descrição */}
            <p className="bento-desc">{desc}</p>

            {/* Rodapé: dots de nível */}
            <div className="bento-footer">
              <span className="bento-level-label">nível</span>
              <LevelDots level={level} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
