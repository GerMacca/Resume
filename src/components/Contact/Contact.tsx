import './Contact.css'
import { RiLinkedinFill } from 'react-icons/ri'
import { TbBrandGithubFilled } from 'react-icons/tb'
import { FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from "react-icons/md";

const contacts = [
  {
    icon: MdEmail,
    label: 'Email',
    value: 'germaccagnan@gmail.com',
    href: 'mailto:germaccagnan@gmail.com',
    color: '#ffffff',
    bg: '255, 255, 255',
  },
  {
    icon: RiLinkedinFill,
    label: 'LinkedIn',
    value: 'Germano Maccagnan dos Santos',
    href: 'https://www.linkedin.com/in/germano-maccagnan-dos-santos/',
    color: '#0a66c2',
    bg: '10, 102, 194',
  },
  {
    icon: TbBrandGithubFilled,
    label: 'GitHub',
    value: 'GerMacca',
    href: 'https://github.com/GerMacca',
    color: '#ffffff',
    bg: '255, 255, 255',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: '+55 54 9 9163-0400',
    href: 'https://wa.me/5554991630400',
    color: '#25d366',
    bg: '37, 211, 102',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="section-header">
        <span className="section-tag">// contato</span>
        <h2>Vamos conversar</h2>
      </div>

      <div className="contact-content">
        <p className="contact-desc">
          Estou disponível para novas oportunidades, projetos freelance ou
          apenas para bater um papo sobre tecnologia. Não hesite em entrar em
          contato!
        </p>

        <div className="contact-grid">
          {contacts.map(({ icon: Icon, label, value, href, color, bg }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div
                className="contact-icon"
                style={{ background: `rgba(${bg}, 0.12)`, color }}
              >
                <Icon size={26} />
              </div>
              <div className="contact-info">
                <span className="contact-label">{label}</span>
                <span className="contact-value">{value}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="contact-footer">
          <p>© {new Date().getFullYear()} Germano Maccagnan dos Santos</p>
          <a href="/curriculo-germano.pdf" download className="btn-dl-footer">
            Baixar CV
          </a>
        </div>
      </div>
    </section>
  )
}
