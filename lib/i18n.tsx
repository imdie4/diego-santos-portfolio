"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "pt" | "en";

export const dict = {
  pt: {
    nav: {
      inicio: "Início",
      projetos: "Projetos",
      sobre: "Sobre",
      "ia-playground": "IA Playground",
      contato: "Contato",
    },
    hero: {
      title: "Criando produtos digitais a partir de problemas e pessoas reais.",
      // Figma layer names shown on hover over the two texts
      layers: { title: "titulo", subtitle: "subtitulo" },
      // text-edit menu that opens on hover
      edit: { text: "Texto", size: "Tamanho", color: "Cor" },
      // comments typed next to the cursor on each sticker
      stickers: {
        behance: "clique e visite meu Behance 🎨",
        figma: "minha principal ferramenta de design ✨",
        linkedin: "clique e visite meu LinkedIn 🤝",
        applePark: "eu no Apple Park 🌈",
        wwdc: "WWDC25 em Cupertino 🍎",
        claude: "IA e design se complementam 🤖",
        swift: "Swift Student Challenge 🏆",
      },
      subtitle:
        "Sou Diego Santos, designer de produto focado em transformar problemas complexos em soluções digitais claras, conectando design, tecnologia e decisão de negócio.",
    },
    projects: {
      heading: "Projetos",
      by: "por",
      items: [
        "Lino: transformando exercícios repetitivos em engajamento",
        "Chega Junto: 3º lugar no desafio de ESG do SEBRAE/PE",
        "EcoTrack: gerenciamento sustentável para micro e pequenas empresas",
      ],
      // Typed out next to the cursor when hovering each card (same order as items).
      comments: [
        "exercícios repetitivos viraram brincadeira 🎮",
        "uma solução nascida das dores de uma comunidade 🤝",
        "sustentabilidade cabe em pequenos negócios 🌱",
      ],
    },
    about: {
      heading: "Sobre mim",
      title: "Design com intenção, do problema à decisão.",
      // One string per paragraph.
      text: [
        "Sou designer de produto e UX/UI, bacharel em Design pela UFPE. Passei dois anos como iOS Product Designer na Apple Developer Academy, conduzindo projetos da pesquisa ao protótipo validado, e hoje lidero o design do sistema MAIPE, do Ministério da Educação.",
        "Em 2025, venci o Swift Student Challenge com um jogo que une lógica de programação e design thinking, e participei da WWDC25 na sede da Apple, na Califórnia.",
        "Entender de código e de negócio me permite conversar de igual para igual com a engenharia e tomar decisões de design que cabem na realidade do produto.",
      ],
      photoName: "foto-perfil",
      photoComment: "visitando a sede da Apple, na Califórnia 🍎",
      resume: "Baixar currículo",
      contact: "Entre em contato",
      worked: "Onde já trabalhei",
      experienceHeading: "Experiência",
      experiences: [
        {
          role: "Líder Técnico em Design",
          company: "V-Lab",
          period: "Fev 2026 — presente",
          desc: "Liderança do design do sistema MAIPE, do MEC, e criação de planos de pesquisa a partir de perguntas de negócio e produto.",
        },
        {
          role: "iOS Product Designer",
          company: "Apple Developer Academy | UFPE",
          period: "Fev 2024 — Dez 2025",
          desc: "Entrevistas, testes de usabilidade e análise de comportamento para apps iOS, do discovery à definição de problemas.",
        },
        {
          role: "Estágio em Design",
          company: "Sebrae Pernambuco",
          period: "Nov 2021 — Out 2023",
          desc: "Entrevistas com consumidores e funcionários e cruzamento de dados de uso e surveys para redesenhar o catálogo de soluções.",
        },
        {
          role: "Estágio em Product Design",
          company: "TDS Company",
          period: "Jul 2021 — Out 2021",
          desc: "Testes de usabilidade e A/B para validar a integração do Google Calendar à plataforma Strateegia.",
        },
      ],
      educationHeading: "Educação",
      education: [
        {
          degree: "Bacharelado em Design",
          school: "Universidade Federal de Pernambuco (UFPE)",
          period: "2020 — 2026",
          desc: "Ênfase em design de interação, pesquisa com usuários e projeto de produtos digitais.",
        },
      ],
      toolsHeading: "Ferramentas",
      toolsMore: "e mais",
      awardsHeading: "Prêmios e certificados",
      awards: [
        {
          kind: "award",
          name: "Swift Student Challenge",
          org: "Apple",
          year: "2025",
          desc: "Vencedor do desafio global da Apple para estudantes, com um app desenvolvido em Swift.",
        },
        {
          kind: "certificate",
          name: "Front-end Development",
          org: "Origamid",
          year: "2026",
          desc: "Curso de desenvolvimento front-end com HTML, CSS e JavaScript.",
        },
      ],
    },
    profile: {
      role: "Designer de Produto",
      networks: "Minhas redes",
      copyEmail: "Copiar e-mail",
      copied: "E-mail copiado!",
      sendEmail: "Enviar e-mail",
    },
    playground: {
      heading: "IA Playground",
      subtitle:
        "Experimentos rápidos onde uso IA como material de design — protótipos que exploram novas interações e fluxos.",
      panelTitle: "Recomendados da Comunidade",
      seeMore: "Ver mais experimentos",
      by: "por",
      items: [
        {
          title: "Gerador de paletas com IA",
          author: "Diego Santos",
          likes: "1.2k",
          views: "18k",
        },
        {
          title: "Assistente de copy para UX",
          author: "Diego Santos",
          likes: "864",
          views: "9.3k",
        },
        {
          title: "Organizador de feedback",
          author: "Diego Santos",
          likes: "412",
          views: "5.1k",
        },
      ],
    },
    contact: {
      title: "Vamos conversar?",
      // Figma canvas decorations around the invitation
      sticky: "viu algo que gostou? manda um oi! 👋",
      sticky2: "ficou com alguma dúvida? pergunta aí!",
      you: "Você",
      subtitle:
        "Tem um projeto, uma ideia ou só quer bater um papo sobre design e produto? Me manda uma mensagem.",
      email: "Entre em contato",
    },
    wip: "Este frame ainda está sendo desenhado…",
    notFound: {
      layer: "página-404",
      title: "Este frame não existe",
      text: "O link pode estar quebrado ou a página mudou de lugar.",
      home: "Voltar ao início",
      projects: "Ver projetos",
      lost: "Você",
    },
  },
  en: {
    nav: {
      inicio: "Home",
      projetos: "Projects",
      sobre: "About",
      "ia-playground": "AI Playground",
      contato: "Contact",
    },
    hero: {
      title: "Designing digital products from real problems and real people.",
      layers: { title: "title", subtitle: "subtitle" },
      edit: { text: "Text", size: "Size", color: "Color" },
      stickers: {
        behance: "click to visit my Behance 🎨",
        figma: "my main design tool ✨",
        linkedin: "click to visit my LinkedIn 🤝",
        applePark: "me at Apple Park 🌈",
        wwdc: "WWDC25 in Cupertino 🍎",
        claude: "AI and design go hand in hand 🤖",
        swift: "Swift Student Challenge 🏆",
      },
      subtitle:
        "I'm Diego Santos, a product designer focused on turning complex problems into clear digital solutions, connecting design, technology and business decisions.",
    },
    projects: {
      heading: "Projects",
      by: "by",
      items: [
        "Lino: Turning Repetitive Exercises into Engagement",
        "Chega Junto: 3rd Place at SEBRAE/PE's ESG Challenge",
        "EcoTrack: Sustainable Management for Micro and Small Businesses",
      ],
      comments: [
        "repetitive exercises turned into play 🎮",
        "a solution born from a community's real pains 🤝",
        "sustainability fits small businesses too 🌱",
      ],
    },
    about: {
      heading: "About me",
      title: "Design with intent, from problem to decision.",
      text: [
        "I'm a product and UX/UI designer with a bachelor's degree in Design from UFPE. I spent two years as an iOS Product Designer at the Apple Developer Academy, taking projects from research to validated prototype, and I now lead design for MAIPE, a system of Brazil's Ministry of Education.",
        "In 2025, I won the Swift Student Challenge with a game that combines programming logic and design thinking, and attended WWDC25 at Apple's headquarters in California.",
        "Understanding code and business lets me talk to engineering as a peer and make design decisions that fit the reality of the product.",
      ],
      photoName: "profile-photo",
      photoComment: "visiting Apple's headquarters in California 🍎",
      resume: "Download resume",
      contact: "Get in touch",
      worked: "Where I've worked",
      experienceHeading: "Experience",
      experiences: [
        {
          role: "Design Technical Lead",
          company: "V-Lab",
          period: "Feb 2026 — present",
          desc: "Leading design for the MAIPE system (Ministry of Education) and turning business and product questions into research plans.",
        },
        {
          role: "iOS Product Designer",
          company: "Apple Developer Academy | UFPE",
          period: "Feb 2024 — Dec 2025",
          desc: "Interviews, usability tests and behavior analysis for iOS apps, from discovery to problem definition.",
        },
        {
          role: "Design Intern",
          company: "Sebrae Pernambuco",
          period: "Nov 2021 — Oct 2023",
          desc: "Interviews with customers and staff, combining usage data and surveys to redesign the solutions catalog.",
        },
        {
          role: "Product Design Intern",
          company: "TDS Company",
          period: "Jul 2021 — Oct 2021",
          desc: "Usability and A/B tests to validate the Google Calendar integration into the Strateegia platform.",
        },
      ],
      educationHeading: "Education",
      education: [
        {
          degree: "Bachelor's degree in Design",
          school: "Federal University of Pernambuco (UFPE)",
          period: "2020 — 2026",
          desc: "Focus on interaction design, user research and digital product design.",
        },
      ],
      toolsHeading: "Tools",
      toolsMore: "and more",
      awardsHeading: "Awards & certificates",
      awards: [
        {
          kind: "award",
          name: "Swift Student Challenge",
          org: "Apple",
          year: "2025",
          desc: "Winner of Apple's global challenge for student developers, with an app built in Swift.",
        },
        {
          kind: "certificate",
          name: "Front-end Development",
          org: "Origamid",
          year: "2026",
          desc: "Front-end development course covering HTML, CSS and JavaScript.",
        },
      ],
    },
    profile: {
      role: "Product Designer",
      networks: "My networks",
      copyEmail: "Copy email",
      copied: "Email copied!",
      sendEmail: "Send email",
    },
    playground: {
      heading: "AI Playground",
      subtitle:
        "Quick experiments where I use AI as a design material — prototypes exploring new interactions and flows.",
      panelTitle: "Recommended resources from Community",
      seeMore: "See more experiments",
      by: "by",
      items: [
        {
          title: "AI palette generator",
          author: "Diego Santos",
          likes: "1.2k",
          views: "18k",
        },
        {
          title: "UX copy assistant",
          author: "Diego Santos",
          likes: "864",
          views: "9.3k",
        },
        {
          title: "Feedback organizer",
          author: "Diego Santos",
          likes: "412",
          views: "5.1k",
        },
      ],
    },
    contact: {
      title: "Let's talk.",
      sticky: "saw something you liked? say hi! 👋",
      sticky2: "got any questions? just ask!",
      you: "You",
      subtitle:
        "Got a project, an idea, or just want to chat about design and product? Send me a message.",
      email: "Get in touch",
    },
    wip: "This frame is still being designed…",
    notFound: {
      layer: "page-404",
      title: "This frame doesn't exist",
      text: "The link may be broken or the page has moved.",
      home: "Back to home",
      projects: "See projects",
      lost: "You",
    },
  },
} as const;

type Dict = (typeof dict)["pt"];

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");
  return (
    <LangContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
