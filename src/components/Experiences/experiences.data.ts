import type { LocalizedString } from '../../i18n/translations'

export type ExperienceTab  = 'work' | 'education' | 'courses'
export type ExperienceType  = 'work' | 'education' | 'courses' | 'internship'
export interface Experience {
  tab: ExperienceTab            // Qual aba exibe este item
  company: string               // Nome da empresa / instituição / plataforma
  role: LocalizedString         // Cargo / curso / grau
  period: LocalizedString       // Ex: "Mar 2024 - Atual"
  location?: string             // Ex: "Caxias do Sul, RS" ou "Remoto"
  description: LocalizedString  // Descrição das atividades / conteúdo
  tags?: string[]               // Tecnologias / habilidades
  type: ExperienceType          // Badge colorido
}

const experiences: Experience[] = [
  // ── EMPREGOS ──────────────────────────────────────────────────────────────
  {
    tab: 'work',
    company: 'Datalan Sistemas de Gestão',
    role: { pt: 'Desenvolvedor Desktop', en: 'Desktop Developer' },
    period: { pt: 'Jul 2024 - Hoje', en: 'Jul 2024 - Present' },
    location: 'Caxias do Sul, RS',
    description: {
      pt: 'Desenvolvedor de aplicações desktop em Delphi, utilizando Firebird como SGBD em ambiente centralizado. Atuo no desenvolvimento e manutenção de funcionalidades em sistema ERP, além de prestar suporte técnico aos clientes, realizando diagnóstico e resolução de problemas. Também desenvolvo rotinas em Python para automação de tarefas, otimizando processos e atividades operacionais.',
      en: 'Desktop application developer working with Delphi and Firebird as the DBMS in a centralized environment. I develop and maintain features in an ERP system and provide technical support to clients, diagnosing and solving problems. I also build Python routines for task automation, optimizing processes and operational activities.',
    },
    tags: ['Delphi', 'Firebird', 'Python'],
    type: 'work',
  },
  // ── GRADUAÇÃO ─────────────────────────────────────────────────────────────
  {
    tab: 'education',
    company: 'UCS - Universidade de Caxias do Sul',
    role: { pt: 'Bacharelado em Ciência da Computação', en: 'BSc in Computer Science' },
    period: { pt: '2023 - 2028 (apróx)', en: '2023 - 2028 (approx.)' },
    location: 'Caxias do Sul, RS',
    description: {
      pt: 'Curso com foco em algoritmos, estrutura de dados, engenharia de software, redes e desenvolvimento de sistemas.',
      en: 'Degree focused on algorithms, data structures, software engineering, networks and systems development.',
    },
    tags: ['Lógica', 'Boas práticas', 'Fundamentos', 'Complexidade'],
    type: 'education',
  },
  // ── CURSOS ────────────────────────────────────────────────────────────────
  {
    tab: 'courses',
    company: 'OneBitCode',
    role: { pt: 'Desenvolvedor Web FullStack', en: 'FullStack Web Developer' },
    period: { pt: '2023', en: '2023' },
    description: {
      pt: 'Aprendendo as bases da web: de páginas simples e estáticas, passando por estilos, animações e JavaScript, versionando e organizando tudo com Git.',
      en: 'Learning the foundations of the web: from simple static pages, through styles, animations and JavaScript, versioning and organizing everything with Git.',
    },
    tags: ['HTML', 'CSS', 'JavaScript', 'Git'],
    type: 'courses',
  },
  {
    tab: 'courses',
    company: 'UCS',
    role: { pt: 'Banco de Dados - UCS', en: 'Databases - UCS' },
    period: { pt: 'Jun 2023', en: 'Jun 2023' },
    description: {
      pt: 'Evento focado nos fundamentos e no uso de um banco de dados.',
      en: 'Event focused on the fundamentals and usage of a database.',
    },
    tags: ['MySQL'],
    type: 'courses',
  },
]

export default experiences
