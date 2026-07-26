export type Lang = 'pt' | 'en'

// String traduzida usada nos arquivos de dados (skills, experiências)
export type LocalizedString = Record<Lang, string>

const pt = {
  nav: {
    home: 'Início',
    about: 'Sobre',
    skills: 'Skills',
    path: 'Trajetória',
    projects: 'Projetos',
    lab: 'Lab',
    contact: 'Contato',
    terminalHint: 'Abrir terminal (Ctrl+K)',
  },
  hero: {
    role: 'Desenvolvedor Web',
    desc:
      'Desenvolvedor de software com experiência no desenvolvimento de aplicações desktop, ' +
      'atuando na criação e manutenção de sistemas. Atualmente estudo Ciência da Computação ' +
      'e sigo aprofundando meus conhecimentos em desenvolvimento web, área na qual busco ' +
      'evoluir e construir novos projetos.',
    download: 'Download CV',
    viewProjects: 'Ver projetos ↓',
    iCreate: 'Eu crio ',
    words: ['soluções', 'projetos', 'websites', 'aplicações'],
  },
  about: {
    tag: '// sobre',
    title: 'Quem sou eu',
    p1:
      'Sou o Germano, desenvolvedor de software de Caxias do Sul – RS. Hoje trabalho com ' +
      'desenvolvimento desktop na Datalan Sistemas de Gestão, criando e mantendo funcionalidades ' +
      'de um sistema ERP em Delphi com Firebird, além de automatizar processos com Python.',
    p2:
      'Fora do expediente, meu foco é a web: React, TypeScript e Node.js são as ferramentas ' +
      'que uso nos meus projetos pessoais — incluindo este portfólio. Curso Ciência da ' +
      'Computação na UCS e gosto de transformar o que aprendo em coisas que dá para clicar, ' +
      'testar e quebrar (a seção Lab é prova disso).',
    p3:
      'Estou em busca de oportunidades para crescer como desenvolvedor web e encarar ' +
      'desafios novos. Se quiser trocar uma ideia, os contatos estão logo ali embaixo.',
    factsTitle: 'sobre.ts',
  },
  skills: {
    tag: '// habilidades',
    title: 'Stack tecnológica',
    since: 'desde',
    close: 'Fechar',
    viewDetails: 'Ver detalhes de',
    noProjects: 'Nenhum projeto público ainda.',
    site: 'Site',
  },
  experiences: {
    tag: '// experiências',
    title: 'Trajetória',
    tabs: { work: 'Empregos', education: 'Graduação', courses: 'Cursos' },
    types: {
      work: 'Emprego',
      education: 'Graduação',
      courses: 'Cursos complementares',
      internship: 'Estágio',
    },
  },
  projects: {
    tag: '// projetos',
    title: 'Trabalhos recentes',
    error: 'Não foi possível carregar os repositórios.',
    noDesc: 'Sem descrição.',
    github: 'GitHub',
    site: 'Ver site',
    all: 'Todos',
  },
  lab: {
    tag: '// lab',
    title: 'Componentes interativos',
    nina: 'Desafio de digitação da Nina',
    ninaPlaceholder: 'Digite aqui...',
    pangram: 'Três pratos de trigo para três tigres tristes comendo trigo!',
    draw: 'Painel de Desenho',
    drawHint: 'Clique para pintar',
    clear: 'Limpar',
    scratch: 'Raspadinha',
    scratchHint: 'Raspe para revelar',
    scratchLabel: '✦  RASPE AQUI  ✦',
    revealed: 'revelado',
    restart: 'Reiniciar',
    ball: 'Jogo da Bolinha',
    ballHint: 'Passe o mouse na bolinha para iniciar',
    gameOver: 'GAME OVER',
    reset: 'reiniciar',
    bubbles: 'Bolhas',
    bubblesHint: 'Passe o mouse nas bolhas para estourá-las',
  },
  contact: {
    tag: '// contato',
    title: 'Vamos conversar',
    desc:
      'Estou disponível para novas oportunidades, projetos freelance ou apenas para bater ' +
      'um papo sobre tecnologia. Não hesite em entrar em contato!',
    downloadCv: 'Baixar CV',
  },
  terminal: {
    welcome: "Bem-vindo! Digite 'help' para ver os comandos.",
    notFound: 'comando não encontrado:',
    help: [
      'help      — mostra esta lista',
      'about     — quem é o Germano',
      'skills    — vai para a stack',
      'projects  — vai para os projetos',
      'lab       — vai para o lab',
      'contact   — vai para o contato',
      'cv        — baixa o currículo',
      'github    — abre o GitHub',
      'linkedin  — abre o LinkedIn',
      'lang      — troca o idioma (PT/EN)',
      'clear     — limpa o terminal',
      'exit      — fecha o terminal',
    ],
    aboutText: 'Germano Maccagnan — dev desktop de dia, dev web à noite. Caxias do Sul, RS.',
    navigating: 'navegando para',
    downloading: 'baixando currículo...',
    opening: 'abrindo',
    langChanged: 'idioma alterado para inglês... just kidding, agora é english!',
  },
}

const en: typeof pt = {
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    path: 'Journey',
    projects: 'Projects',
    lab: 'Lab',
    contact: 'Contact',
    terminalHint: 'Open terminal (Ctrl+K)',
  },
  hero: {
    role: 'Web Developer',
    desc:
      'Software developer experienced in building desktop applications, working on the ' +
      'creation and maintenance of systems. Currently studying Computer Science while ' +
      'deepening my knowledge of web development, the field where I aim to grow and ' +
      'build new projects.',
    download: 'Download CV',
    viewProjects: 'View projects ↓',
    iCreate: 'I build ',
    words: ['solutions', 'projects', 'websites', 'applications'],
  },
  about: {
    tag: '// about',
    title: 'Who am I',
    p1:
      "I'm Germano, a software developer from Caxias do Sul, Brazil. I currently work on " +
      'desktop development at Datalan Sistemas de Gestão, building and maintaining features ' +
      'for an ERP system in Delphi with Firebird, plus automating processes with Python.',
    p2:
      'Outside working hours, my focus is the web: React, TypeScript and Node.js are the ' +
      'tools behind my personal projects — including this portfolio. I study Computer ' +
      'Science at UCS and I enjoy turning what I learn into things you can click, test ' +
      'and break (the Lab section is proof).',
    p3:
      "I'm looking for opportunities to grow as a web developer and take on new " +
      'challenges. If you want to chat, my contact info is right below.',
    factsTitle: 'about.ts',
  },
  skills: {
    tag: '// skills',
    title: 'Tech stack',
    since: 'since',
    close: 'Close',
    viewDetails: 'View details of',
    noProjects: 'No public projects yet.',
    site: 'Site',
  },
  experiences: {
    tag: '// experience',
    title: 'Journey',
    tabs: { work: 'Jobs', education: 'Degree', courses: 'Courses' },
    types: {
      work: 'Job',
      education: 'Degree',
      courses: 'Additional courses',
      internship: 'Internship',
    },
  },
  projects: {
    tag: '// projects',
    title: 'Recent work',
    error: 'Could not load repositories.',
    noDesc: 'No description.',
    github: 'GitHub',
    site: 'View site',
    all: 'All',
  },
  lab: {
    tag: '// lab',
    title: 'Interactive components',
    nina: "Nina's typing challenge",
    ninaPlaceholder: 'Type here...',
    pangram: 'The quick brown fox jumps over the lazy dog!',
    draw: 'Drawing Board',
    drawHint: 'Click to paint',
    clear: 'Clear',
    scratch: 'Scratch card',
    scratchHint: 'Scratch to reveal',
    scratchLabel: '✦  SCRATCH HERE  ✦',
    revealed: 'revealed',
    restart: 'Restart',
    ball: 'Ball Game',
    ballHint: 'Hover the ball to start',
    gameOver: 'GAME OVER',
    reset: 'restart',
    bubbles: 'Bubbles',
    bubblesHint: 'Hover the bubbles to pop them',
  },
  contact: {
    tag: '// contact',
    title: "Let's talk",
    desc:
      "I'm available for new opportunities, freelance projects or just a chat about " +
      "technology. Don't hesitate to reach out!",
    downloadCv: 'Download CV',
  },
  terminal: {
    welcome: "Welcome! Type 'help' to see the available commands.",
    notFound: 'command not found:',
    help: [
      'help      — shows this list',
      'about     — who is Germano',
      'skills    — go to the tech stack',
      'projects  — go to the projects',
      'lab       — go to the lab',
      'contact   — go to the contact section',
      'cv        — download the resume',
      'github    — open GitHub',
      'linkedin  — open LinkedIn',
      'lang      — switch language (PT/EN)',
      'clear     — clear the terminal',
      'exit      — close the terminal',
    ],
    aboutText: 'Germano Maccagnan — desktop dev by day, web dev by night. Caxias do Sul, Brazil.',
    navigating: 'navigating to',
    downloading: 'downloading resume...',
    opening: 'opening',
    langChanged: 'language switched to portuguese... brincadeira, agora é português!',
  },
}

export type Translation = typeof pt

export const translations: Record<Lang, Translation> = { pt, en }
