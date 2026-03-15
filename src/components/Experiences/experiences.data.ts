export type ExperienceTab  = 'work' | 'education' | 'courses'
export type ExperienceType  = 'work' | 'education' | 'courses' | 'internship'
export interface Experience {
  tab: ExperienceTab     // Qual aba exibe este item
  company: string        // Nome da empresa / instituição / plataforma
  role: string           // Cargo / curso / grau
  period: string         // Ex: "Mar 2024 - Atual" ou "Jan 2023 - Dez 2023"
  location?: string      // Ex: "Caxias do Sul, RS" ou "Remoto" ou "Online"
  description: string    // Descrição das atividades / conteúdo
  tags?: string[]        // Tecnologias / habilidades
  type: ExperienceType   // Badge colorido (work, freelance, internship, volunteer)
}

const experiences: Experience[] = [
  // ── EMPREGOS ──────────────────────────────────────────────────────────────
  {
    tab: 'work',
    company: 'Datalan Sistemas de Gestão',
    role: 'Desenvolvedor Desktop',
    period: 'Jul 2024 - Hoje',
    location: 'Caxias do Sul, RS',
    description:
      'Desenvolvedor de aplicações desktop em Delphi, utilizando Firebird como SGBD em ambiente centralizado. Atuo no desenvolvimento e manutenção de funcionalidades em sistema ERP, além de prestar suporte técnico aos clientes, realizando diagnóstico e resolução de problemas. Também desenvolvo rotinas em Python para automação de tarefas, otimizando processos e atividades operacionais.',
    tags: ['Delphi', 'Firebird', 'Python'],
    type: 'work',
  },
  // ── GRADUAÇÃO ─────────────────────────────────────────────────────────────
  {
    tab: 'education',
    company: 'UCS — Universidade de Caxias do Sul',
    role: 'Bacharelado em Ciência da Computação',
    period: '2023 - 2028 (apróx)',
    location: 'Caxias do Sul, RS',
    description:
      'Curso com foco em algoritmos, estrutura de dados, engenharia de software, redes e desenvolvimento de sistemas.',
    tags: ['Lógica', 'Boas práticas', 'Fundamentos', 'Complexidade'],
    type: 'education',
  },
  // ── CURSOS ────────────────────────────────────────────────────────────────
  {
    tab: 'courses',
    company: 'OneBitCode',
    role: 'Desenvolvedor Web FullStack',
    period: '2023',
    description:
      'Aprendendo as bases da web: de páginas simples e estáticas, passando por estilos, animações e JavaScript, versionando e organizando tudo com Git.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Git'],
    type: 'courses',
  },
  {
    tab: 'courses',
    company: 'UCS',
    role: 'Banco de Dados - UCS',
    period: 'Jun 2023',
    description:
      'Evento focado nos fundamentos e no uso de um banco de dados.',
    tags: ['MySQL'],
    type: 'courses',
  },
]

export default experiences
