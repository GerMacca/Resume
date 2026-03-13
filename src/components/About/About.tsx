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

        <div className="about-photo-wrapper">
          <div className="about-photo-frame">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Foto de perfil"
              className="about-photo"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
