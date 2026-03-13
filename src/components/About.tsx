import './About.css'

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="section-header">
        <span className="section-tag">// sobre mim</span>
        <h2>Quem sou eu</h2>
      </div>

      <div className="about-grid">
        <div className="about-text">
          <p>
            Sou um desenvolvedor apaixonado por tecnologia e design,
            cursando <strong>Ciência da Computação</strong> na UCS
            (Universidade de Caxias do Sul). Tenho experiência com
            desenvolvimento web, criando aplicações modernas e funcionais.
          </p>
          <p>
            Meu objetivo é construir produtos digitais que proporcionem
            experiências incríveis, unindo boas práticas de código com design
            moderno e funcional.
          </p>
          <p>
            Quando não estou programando, gosto de explorar novos projetos,
            jogos e continuar aprendendo as últimas tendências do
            desenvolvimento web.
          </p>
        </div>

        <div className="about-info">
          <div className="info-item">
            <span className="info-label">Nome</span>
            <span className="info-value">Germano Maccagnan dos Santos</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email</span>
            <a href="mailto:germaccagnan@gmail.com" className="info-value info-link">
              germaccagnan@gmail.com
            </a>
          </div>
          <div className="info-item">
            <span className="info-label">WhatsApp</span>
            <a href="https://wa.me/5554991630400" target="_blank" rel="noopener noreferrer" className="info-value info-link">
              +55 54 9 9163-0400
            </a>
          </div>
          <div className="info-item">
            <span className="info-label">Localização</span>
            <span className="info-value">Caxias do Sul, RS — Brasil</span>
          </div>
          <div className="info-item">
            <span className="info-label">Disponibilidade</span>
            <span className="info-value available">Disponível para projetos</span>
          </div>
        </div>
      </div>
    </section>
  )
}
