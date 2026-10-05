import type { Lang } from "./i18n";

/**
 * Recruiter-oriented UX/UI case study structure: a fast "scan" layer
 * (hero, overview, impact) and a "depth" layer (context → research →
 * definition → process → solution). Reusable across projects.
 */
export interface CaseData {
  slug: string;
  accent: string;
  title: string;
  subtitle: string; // context + role, one line
  cover: string;
  tags: { label: string; value: string }[];
  toolsLabel: string;
  tools: string[]; // icon keys: "figma" | "maze"
  impact: { value: string; label: string }; // headline metric (hero + results only)

  overview: {
    problemPoints: string[];
    solution?: string;
    impactStats?: { value: string; label: string }[];
  };
  problemDeep: {
    introTitle: string;
    intro: string;
    photoCaption: string;
    method: string;
    pains: {
      who: string;
      text: string;
      emoji: string;
      quote?: { question: string; answer: string; profile: string };
      stat?: {
        percent: number;
        caption: string;
        tone: "rose" | "green" | "orange";
        side: "left" | "right";
      };
    }[];
    researchIntro: string;
    sample: {
      value: string;
      label: string;
      tone: "blue" | "pink" | "green" | "orange";
    }[];
    researchOutro: string;
    loopText: string;
    constraint: string[];
    hmw: string;
  };
  insight: {
    intro: string;
    discardedLabel: string;
    isolated: {
      emoji: string;
      pain: string;
      solution: string;
      tone: "rose" | "green" | "orange";
    }[];
    decisionLabel: string;
    moment: string;
    pointsLead: string;
    points: { text: string; tone: "rose" | "green" | "orange" }[];
    decision: string;
  };
  persona: {
    intro: string;
    outro: string;
    people: {
      name: string;
      tone: "rose" | "green";
      photoSide: "left" | "right";
      chips: string[];
      description: string;
      goals: string[];
      pains: string[];
      photo?: string;
    }[];
  };
  structure: { text: string };
  validation: { text: string };
  visual: { text: string };
  solutionSection: {
    intro: string;
    topics: { title: string; text: string }[];
    prototypeUrl: string;
  };
  resultsImpact: {
    intro: string;
    columns: { header: string; value: string; caption: string }[];
    mechanism: string;
  };
  learningsSection: {
    reflections: {
      tone: "orange" | "green";
      label: string;
      heading: string;
      text: string;
    }[];
    openTitle: string;
    openItems: { heading: string; text: string }[];
  };
  phasesIntro: string;
  phases: { title: string; desc: string }[];
  role: { individual: string; team: string };

  context: { pain: string; whyNow: string; constraints: string[] };

  research: {
    methods: string[];
    insights: { title: string; text: string }[];
    quote: string;
    quoteAuthor: string;
  };

  definition: { hmw: string; successMetrics: string[] };

  process: {
    evolution: { stage: string; note: string }[];
    tradeoff: {
      a: { title: string; text: string };
      b: { title: string; text: string };
      choice: string;
    };
    collaboration: string;
    usability: string;
  };

  designSystem: { components: string[]; scale: string };

  solution: { intro: string; screens: { title: string; text: string }[] };

  results: {
    metrics: { value: string; label: string; before?: string; after?: string }[];
    text: string;
  };

  learnings: { differently: string; learned: string };
}

const lino_pt: CaseData = {
  slug: "lino",
  accent: "#2F62E8",
  title: "Lino: transformando exercícios repetitivos em engajamento",
  subtitle:
    "Redesenho gamificado reduziu o abandono do treino fonoaudiológico, elevando a conclusão em 42%.",
  cover: "/img/projects/lino.png",
  tags: [
    { label: "Papel", value: "Product Designer" },
    { label: "Duração", value: "8 semanas" },
    { label: "Cliente", value: "Apple Developer Academy" },
  ],
  toolsLabel: "Ferramentas",
  tools: ["figma", "maze"],
  impact: { value: "+62%", label: "adesão à prática diária nos testes" },

  overview: {
    problemPoints: [
      "Atividades repetitivas afastavam as crianças da terapia, travando sua evolução.",
      "Pais e terapeutas não conseguiam acompanhar o progresso ou identificar dificuldades fora do consultório.",
    ],
    solution:
      "Aplicativo gamificado que torna a terapia da fala com crianças mais envolvente e acompanhável para pais e terapeutas.",
    impactStats: [
      { value: "+42%", label: "de atividades concluídas" },
      { value: "+38%", label: "de frequência semanal" },
    ],
  },
  problemDeep: {
    introTitle: "Um método que funciona, mas não engaja",
    intro:
      "Na terapia fonoaudiológica infantil, o treino de fonemas depende de repetição constante, tanto na clínica quanto em casa. É um método que funciona clinicamente, mas que não foi desenhado pensando em como a criança o experiencia.",
    photoCaption: "Pesquisa de campo: entrevistas com crianças, responsáveis e fonoaudiólogos",
    method:
      "Entrevistei crianças em terapia, seus responsáveis e fonoaudiólogos, e identifiquei três dores conectadas:",
    pains: [
      {
        who: "Criança",
        text: "A criança sente a repetição como cansativa, o que derruba o engajamento ao longo da prática",
        emoji: "🧒",
        quote: {
          question: "O que você acha dos exercícios que faz com a fonoaudióloga?",
          answer: "São meio chatos às vezes... ter que repetir todo dia.",
          profile: "Miguel, 8 anos - Dificuldade na pronúncia de palavras com R vibrante",
        },
        stat: {
          percent: 90,
          caption:
            "Disseram preferir atividades que pareçam jogos em vez de exercícios tradicionais.",
          tone: "rose",
          side: "left",
        },
      },
      {
        who: "Responsável",
        text: "O responsável não consegue enxergar evolução com clareza, o que gera insegurança sobre se a prática em casa está funcionando",
        emoji: "👪",
        quote: {
          question: "Como você costuma acompanhar o progresso do seu filho?",
          answer: "Não sei ao certo. Só percebo quando existe um progresso nas atividades.",
          profile: "Carol, 33 anos - Mãe de criança com dificuldade no desenvolvimento na fala",
        },
        stat: {
          percent: 68,
          caption: "Relataram dificuldade em manter a rotina de prática em casa.",
          tone: "green",
          side: "right",
        },
      },
      {
        who: "Terapeuta",
        text: "O terapeuta perde visibilidade sobre o que acontece fora da clínica, dificultando ajustar o plano terapêutico",
        emoji: "👩‍⚕️",
        quote: {
          question: "Que tipo de ferramenta ajudaria no acompanhamento?",
          answer: "Algo que mostre o progresso e motive a criança a continuar, sem tirar o foco terapêutico.",
          profile: "Samara, 28 anos - Fonoaudióloga infantil",
        },
        stat: {
          percent: 72,
          caption:
            "Apontaram falta de recursos digitais para acompanhar o progresso remotamente.",
          tone: "orange",
          side: "left",
        },
      },
    ],
    researchIntro:
      "Entrevistei os três públicos separadamente e de forma proposital nessa ordem: primeiro fonoaudiólogos, pra entender a lógica clínica por trás da repetição; depois responsáveis, pra entender a experiência de acompanhar em casa; por último crianças, pra observar a reação direta ao exercício.",
    sample: [
      {
        value: "📍",
        label: "Comunidade Beira Rio / Várzea · Recife / PE",
        tone: "blue",
      },
      {
        value: "8",
        label: "Crianças com problemas na fala (6 a 10 anos)",
        tone: "pink",
      },
      {
        value: "15",
        label: "Responsáveis de crianças com problemas na fala",
        tone: "green",
      },
      { value: "10", label: "Fonoaudiólogos e terapeutas", tone: "orange" },
    ],
    researchOutro:
      "Cada entrevista revelava uma camada diferente do mesmo problema, e só ficou claro que as três dores eram a mesma coisa vista de três ângulos quando cruzei os três relatos.",
    loopText:
      "Esses três pontos não são problemas isolados: eles se retroalimentam. Quando a criança se desmotiva, a prática em casa cai. Quando cai, o responsável perde parâmetro de progresso. Quando isso acontece, o terapeuta perde dado pra decidir o próximo passo.",
    constraint: [
      "Repetição não pode ser eliminada",
      "Três públicos com necessidades diferentes na mesma solução",
      "Contexto de uso é doméstico, sem supervisão profissional direta",
      "Público principal de 6 a 10 anos",
      "Exercícios precisam ser clinicamente válidos",
      "Prazo de 8 semanas",
    ],
    hmw: "Como podemos transformar a repetição, que hoje é vivida como cansativa, em algo percebido como progresso, sem comprometer a função terapêutica do exercício?",
  },
  insight: {
    intro:
      "Isoladamente, cada dor pedia uma solução diferente: gamificação para engajamento, relatório para os pais, dashboard para o terapeuta. Juntas, apontavam para o mesmo momento.",
    discardedLabel: "Caminho descartado",
    isolated: [
      { emoji: "🧒", pain: "Engajamento", solution: "Gamificação simples", tone: "rose" },
      { emoji: "👪", pain: "Falta de clareza", solution: "Relatório para os pais", tone: "green" },
      { emoji: "👩‍⚕️", pain: "Falta de visibilidade", solution: "Dashboard para o terapeuta", tone: "orange" },
    ],
    decisionLabel: "A decisão",
    moment: "O momento da repetição",
    pointsLead: "Resolver esse momento:",
    points: [
      { text: "Devolve engajamento à criança", tone: "rose" },
      { text: "Dá progresso visível ao responsável", tone: "green" },
      { text: "Permite acompanhamento do terapeuta", tone: "orange" },
    ],
    decision:
      "Atacar o momento da repetição em si, em vez de tratar cada dor como uma feature separada.",
  },
  persona: {
    intro:
      "Mapeei dois perfis a partir das entrevistas. A criança responde melhor a estímulo, recompensa e variação, principalmente quando a repetição vira progresso visível. O responsável busca clareza e controle pra validar se a prática funciona fora da sessão.",
    outro:
      "Ao desenhar a jornada de ambos, confirmei que o ponto crítico identificado no cruzamento das entrevistas realmente concentrava a maior queda de engajamento.",
    people: [
      {
        name: "Ana Paula Oliveira",
        tone: "rose",
        photoSide: "left",
        photo: "/img/projects/lino-persona-ana.png",
        chips: ["30 anos", "Professora", "Casada"],
        description:
          "Busca exercícios de fala mais divertidos para engajar o filho que está fazendo tratamento com um profissional fonoaudiólogo.",
        goals: [
          "Apoiar o filho no desenvolvimento da fala.",
          "Encontrar atividades lúdicas que mantenham o engajamento.",
        ],
        pains: [
          "Dificuldade em manter a criança motivada.",
          "Pouca clareza nos resultados do acompanhamento.",
        ],
      },
      {
        name: "Lucas Oliveira",
        tone: "green",
        photoSide: "right",
        photo: "/img/projects/lino-persona-lucas.png",
        chips: ["6 anos", "Curioso", "Dificuldade na fala"],
        description:
          "Tem dificuldades de pronúncia em alguns fonemas e está em tratamento fonoaudiológico.",
        goals: [
          "Falar de forma mais clara.",
          "Ter confiança ao se comunicar com seus amigos.",
        ],
        pains: [
          "Perde o interesse rapidamente em exercícios repetitivos.",
          "Sente-se frustrado quando não consegue se expressar bem.",
        ],
      },
    ],
  },
  structure: {
    text:
      "A partir disso, estruturei o produto em dois núcleos, Prática e Jornada. Prática concentra execução, missão diária e medalhas, voltada pra criança. Jornada concentra progressão e acompanhamento, voltada pro responsável. Essa separação foi deliberada: reduz carga cognitiva, separa ação de acompanhamento, e permite o produto crescer sem aumentar complexidade pra quem só quer praticar.",
  },
  validation: {
    text:
      "Usei wireframes pra validar estrutura antes da interface final, com foco em reduzir fricção no início da atividade e manter a ação principal sempre evidente. Dois problemas apareceram nessa etapa: o feedback de recompensa precisava ser imediato dentro da atividade, não só no final, e o dashboard da Jornada tinha informação demais. Simplifiquei pros dois indicadores mais acionáveis.",
  },
  visual: {
    text:
      "Escolhi SF Pro Rounded pela leveza e consistência com as HIG da Apple, e defini quatro cores com papel semântico fixo (azul para prática e progresso, laranja para conquistas, rosa para missão diária, verde para suporte). A intenção era que a criança identificasse o contexto pela cor antes de precisar ler qualquer texto, o que é decisão funcional, não só estética.",
  },
  solutionSection: {
    intro:
      "A decisão de atacar o momento da repetição definiu três frentes de trabalho, uma pra cada ponto identificado no cruzamento das entrevistas.",
    prototypeUrl: "#",
    topics: [
      {
        title: "Home: engajamento no momento crítico",
        text:
          "Resolve a dor de que a criança desengajava durante a repetição. Transforma a prática em progressão visível através de missão diária, streak semanal e medalhas, dando à criança um motivo pra continuar mesmo quando o exercício em si é repetitivo.",
      },
      {
        title: "Atividades: o exercício em si",
        text:
          "Resolve o mesmo ponto crítico, mas dentro da execução. Pontuação em tempo real, instrução clara e ilustrada, prática com palavras reais acompanhadas de imagem e áudio de referência. O feedback em tempo real acontece só nos acertos, propositalmente: se a criança erra ou não consegue completar a fala, a atividade segue sem interrupção, e só ao final ela vê quantos pontos obteve e quantos acertos teve por etapa. Essa decisão evita que o exercício vire um lugar de punição visível, o que iria contra o próprio objetivo de reduzir a resistência à repetição.",
      },
      {
        title: "Jornada: visibilidade pro responsável",
        text:
          "Resolve a dor de que o responsável não tinha dado pra acompanhar evolução. Relatório exportável pra sessão terapêutica, calendário de prática, média de acertos e histórico de atividades. O calendário marca tanto os dias em que houve prática quanto os dias em que não houve, dando ao responsável visibilidade da consistência, não só do desempenho.",
      },
      {
        title: "Separação entre Prática e Jornada",
        text:
          "Home e Jornada vivem em áreas separadas da tab bar, cada uma pensada pra um usuário diferente. A criança termina a atividade e volta pra Home, o responsável acessa a Jornada em outro momento, sem ponto de contato direto entre os dois fluxos dentro do app. Essa separação reforça a decisão de arquitetura já tomada no Processo: reduzir carga cognitiva mantendo ação e acompanhamento como espaços distintos, em vez de misturar os dois numa mesma tela.",
      },
    ],
  },
  resultsImpact: {
    intro:
      "O teste rodou por 3 semanas com 6 crianças, 5 responsáveis e 3 fonoaudiólogas, comparando o método tradicional com o uso do protótipo em casa.",
    columns: [
      { header: "3 Semanas", value: "+42%", caption: "na conclusão de atividades" },
      { header: "6 Crianças", value: "+38%", caption: "na frequência semanal de prática" },
      { header: "5 Responsáveis", value: "87%", caption: "dos responsáveis relataram maior clareza sobre o progresso" },
      { header: "3 Fonoaudiólogas", value: "+31%", caption: "no tempo médio de engajamento por sessão" },
    ],
    mechanism:
      "O mais relevante não foi o número em si, mas o mecanismo: ver pontos acumulando em tempo real reduzia visivelmente a resistência da criança à repetição, confirmando que a gamificação funcionava como forma de tornar visível um progresso normalmente abstrato.",
  },
  learningsSection: {
    reflections: [
      {
        tone: "orange",
        label: "O que faria diferente",
        heading: "Testar com crianças mais cedo",
        text:
          "Testaria com crianças mais cedo. Validei wireframes com adultos e só vi o problema no protótipo final: adultos subestimam a impaciência infantil com fluxos longos.",
      },
      {
        tone: "green",
        label: "O que deu certo",
        heading: "Separar os fluxos desde o início",
        text:
          "Separar os fluxos de criança e responsável foi a decisão mais acertada, e só foi possível porque as personas tinham sido mapeadas a fundo antes de qualquer decisão de arquitetura.",
      },
    ],
    openTitle: "Dois pontos ficaram em aberto",
    openItems: [
      {
        heading: "Retenção como próxima métrica",
        text:
          "Os testes mediram engajamento dentro da sessão, não retenção, o que tornaria D1 e D7 as métricas prioritárias numa v2.",
      },
      {
        heading: "Alerta proativo pro responsável",
        text:
          "A separação total entre Home e Jornada significa que o responsável só percebe uma ausência de prática ao abrir o app por conta própria, sem nenhum alerta proativo, algo que eu priorizaria resolver a seguir.",
      },
    ],
  },
  phasesIntro:
    "Conduzi o projeto de forma iterativa, estruturado em descoberta, definição, ideação e prototipação. Como líder de design, a primeira decisão foi priorizar validar comportamento antes de aprofundar interface, pra evitar investir em solução visual que não resolvesse o problema central.",
  phases: [
    {
      title: "Descobrir",
      desc: "Entrevistas com crianças, pais e fonoaudiólogos para entender a rotina e os pontos de abandono.",
    },
    {
      title: "Definir",
      desc: "Síntese da pesquisa em um problema claro e nas métricas de sucesso.",
    },
    {
      title: "Desenvolver",
      desc: "Ideação, wireframes e protótipos, testando e iterando as soluções.",
    },
    {
      title: "Entregar",
      desc: "Protótipo de alta fidelidade validado com usuários e pronto para handoff.",
    },
  ],
  role: {
    individual:
      "Pesquisa, arquitetura de informação, UI, protótipo e testes de usabilidade — de ponta a ponta.",
    team: "Validação clínica dos exercícios com uma fonoaudióloga a cada iteração.",
  },

  context: {
    pain: "Fonoaudiólogos veem o progresso travar quando a criança não pratica entre as sessões. Sem repetição, cada consulta recomeça quase do zero.",
    whyNow:
      "A terapia acontece 1× por semana, mas o ganho real depende da prática diária em casa — justamente o momento sem apoio profissional.",
    constraints: [
      "Público de 6 a 9 anos, muitos ainda em alfabetização",
      "Uso majoritariamente sem supervisão adulta",
      "Exercícios precisam ser clinicamente válidos",
      "Prazo acadêmico de 8 semanas",
    ],
  },

  research: {
    methods: [
      "Entrevistas com 3 fonoaudiólogas",
      "Conversas com 5 pais/responsáveis",
      "Análise de 4 apps concorrentes",
    ],
    insights: [
      {
        title: "Recompensa vence nota",
        text: "A criança abandona quando percebe que 'errou'; reforço positivo mantém a tentativa.",
      },
      {
        title: "O pai é o gargalo",
        text: "Sem lembrete e feedback claro, a prática em casa simplesmente não acontece.",
      },
      {
        title: "Curto vence perfeito",
        text: "5 minutos por dia engajam mais do que blocos longos de exercício.",
      },
    ],
    quote: "Ela faz na consulta, mas em casa não quer nem ouvir falar.",
    quoteAuthor: "Mãe de paciente, 7 anos",
  },

  definition: {
    hmw: "Como transformar a prática diária de fala em um hábito que a criança queira repetir sozinha?",
    successMetrics: [
      "Adesão — % de dias com ao menos 1 missão concluída",
      "Autonomia — % de crianças que concluem sem ajuda adulta",
      "Percepção dos pais — facilidade de uso (1–5)",
    ],
  },

  process: {
    evolution: [
      { stage: "Sketch", note: "Fluxo da missão no papel" },
      { stage: "Wireframe", note: "Estrutura de home, exercício e resumo" },
      { stage: "Protótipo hi-fi", note: "Linguagem lúdica e microinterações" },
    ],
    tradeoff: {
      a: {
        title: "Trilha linear",
        text: "Uma sequência fixa de exercícios, simples de entender — mas que a criança 'termina' e abandona.",
      },
      b: {
        title: "Missões diárias",
        text: "Metas curtas que renovam todo dia, criando um gatilho de retorno constante.",
      },
      choice:
        "Escolhi as missões diárias: o gatilho diário sustenta o hábito melhor do que uma trilha com fim.",
    },
    collaboration:
      "Validei a sequência e a nomenclatura dos exercícios com a fonoaudióloga a cada iteração, garantindo que a gamificação não descaracterizasse a terapia.",
    usability:
      "No teste com 6 crianças, o botão de gravar não era óbvio. Aumentei o contraste e criei um estado 'pressione para falar' — a dúvida sumiu na segunda rodada.",
  },

  designSystem: {
    components: [
      "Botões de ação grandes",
      "Cards de missão",
      "Badges e medalhas",
      "Estados de feedback (acerto / tentar de novo)",
    ],
    scale:
      "Componentes pensados para receber novos sons e exercícios sem redesenho — a base cresce junto com a terapia.",
  },

  solution: {
    intro:
      "O fluxo principal: escolher a missão do dia, praticar com feedback imediato e ver o progresso na trilha.",
    screens: [
      { title: "Home", text: "Missão do dia em destaque e progresso rápido logo na abertura." },
      { title: "Exercício", text: "Uma palavra por vez, com áudio e um botão de gravar bem claro." },
      { title: "Resumo", text: "Pontos e resumo da trilha para comemorar cada avanço." },
    ],
  },

  results: {
    metrics: [
      {
        value: "+62%",
        label: "adesão à prática diária",
        before: "esporádica",
        after: "quase diária",
      },
      { value: "9/10", label: "concluíram sem ajuda adulta" },
      { value: "4.8/5", label: "facilidade percebida pelos pais" },
    ],
    text: "As crianças completaram os exercícios de forma independente e pediram para continuar — o sinal mais forte de que a gamificação sustentava o hábito.",
  },

  learnings: {
    differently:
      "Testaria com mais crianças e por mais dias, para medir hábito de verdade — não só a reação da primeira sessão.",
    learned:
      "Para crianças, simplicidade não é estética, é acessibilidade. Cada palavra a menos e cada recompensa a mais muda o comportamento.",
  },
};

const lino_en: CaseData = {
  slug: "lino",
  accent: "#2F62E8",
  title: "Lino: Turning Repetitive Exercises into Engagement",
  subtitle:
    "A gamified redesign reduced dropout in speech-therapy training, raising completion by 42%.",
  cover: "/img/projects/lino.png",
  tags: [
    { label: "Role", value: "Product Designer" },
    { label: "Duration", value: "8 weeks" },
    { label: "Client", value: "Apple Developer Academy" },
  ],
  toolsLabel: "Tools",
  tools: ["figma", "maze"],
  impact: { value: "+62%", label: "daily practice adherence in testing" },

  overview: {
    problemPoints: [
      "Repetitive activities pushed children away from therapy, stalling their progress.",
      "Parents and therapists couldn't track progress or spot difficulties outside the clinic.",
    ],
    solution:
      "A gamified app that makes children's speech therapy more engaging and trackable for parents and therapists.",
    impactStats: [
      { value: "+42%", label: "in completed activities" },
      { value: "+38%", label: "in weekly frequency" },
    ],
  },
  problemDeep: {
    introTitle: "A method that works, but doesn't engage",
    intro:
      "In children's speech therapy, phoneme training relies on constant repetition — in the clinic and at home. It's a method that works clinically, but wasn't designed around how the child experiences it.",
    photoCaption: "Field research: interviews with children, parents and speech therapists",
    method:
      "I interviewed children in therapy, their parents and speech therapists, and found three connected pains:",
    pains: [
      {
        who: "Child",
        text: "The child feels the repetition as tiring, which drags engagement down over the practice",
        emoji: "🧒",
        quote: {
          question: "What do you think of the exercises you do with your speech therapist?",
          answer: "They're kind of boring sometimes... having to repeat every day.",
          profile: "Miguel, 8 years old - Difficulty pronouncing words with the rolled R",
        },
        stat: {
          percent: 90,
          caption:
            "said they prefer activities that feel like games rather than traditional exercises.",
          tone: "rose",
          side: "left",
        },
      },
      {
        who: "Parent",
        text: "The parent can't clearly see progress, which creates insecurity about whether home practice is working",
        emoji: "👪",
        quote: {
          question: "How do you usually track your child's progress?",
          answer: "I'm not really sure. I only notice when there's progress in the activities.",
          profile: "Carol, 33 years old - Mother of a child with a speech development difficulty",
        },
        stat: {
          percent: 68,
          caption: "reported difficulty keeping up the home practice routine.",
          tone: "green",
          side: "right",
        },
      },
      {
        who: "Therapist",
        text: "The therapist loses visibility of what happens outside the clinic, making it hard to adjust the therapeutic plan",
        emoji: "👩‍⚕️",
        quote: {
          question: "What kind of tool would help with tracking?",
          answer: "Something that shows progress and motivates the child to keep going, without taking away the therapeutic focus.",
          profile: "Samara, 28 years old - Pediatric speech therapist",
        },
        stat: {
          percent: 72,
          caption:
            "pointed to a lack of digital tools to track progress remotely.",
          tone: "orange",
          side: "left",
        },
      },
    ],
    researchIntro:
      "I interviewed the three audiences separately and deliberately in this order: first speech therapists, to understand the clinical logic behind repetition; then parents, to understand the experience of supporting practice at home; and last the children, to observe their direct reaction to the exercise.",
    sample: [
      {
        value: "📍",
        label: "Beira Rio / Várzea community · Recife / PE",
        tone: "blue",
      },
      {
        value: "8",
        label: "Children with speech difficulties (ages 6–10)",
        tone: "pink",
      },
      {
        value: "15",
        label: "Parents of children with speech difficulties",
        tone: "green",
      },
      { value: "10", label: "Speech therapists and clinicians", tone: "orange" },
    ],
    researchOutro:
      "Each interview revealed a different layer of the same problem, and it only became clear that the three pains were the same thing seen from three angles once I cross-referenced the three accounts.",
    loopText:
      "These three points aren't isolated problems: they reinforce each other. When the child loses motivation, home practice drops. When it drops, the parent loses a reference for progress. When that happens, the therapist loses the data to decide the next step.",
    constraint: [
      "Repetition can't be removed",
      "Three audiences with different needs in one solution",
      "Usage happens at home, without direct professional supervision",
      "Primary audience aged 6 to 10",
      "Exercises must be clinically valid",
      "8-week timeline",
    ],
    hmw: "How might we turn repetition, today experienced as tiring, into something perceived as progress, without compromising the exercise's therapeutic function?",
  },
  insight: {
    intro:
      "On their own, each pain called for a different solution: gamification for engagement, a report for parents, a dashboard for the therapist. Together, they pointed to the same moment.",
    discardedLabel: "Path I dropped",
    isolated: [
      { emoji: "🧒", pain: "Engagement", solution: "Simple gamification", tone: "rose" },
      { emoji: "👪", pain: "Lack of clarity", solution: "Report for parents", tone: "green" },
      { emoji: "👩‍⚕️", pain: "Lack of visibility", solution: "Dashboard for the therapist", tone: "orange" },
    ],
    decisionLabel: "The call",
    moment: "The moment of repetition",
    pointsLead: "Solving that moment:",
    points: [
      { text: "Gives engagement back to the child", tone: "rose" },
      { text: "Gives the parent visible progress", tone: "green" },
      { text: "Lets the therapist follow along", tone: "orange" },
    ],
    decision:
      "Tackle the moment of repetition itself, instead of treating each pain as a separate feature.",
  },
  persona: {
    intro:
      "I mapped two profiles from the interviews. The child responds better to stimulus, reward and variation, especially when repetition turns into visible progress. The caregiver looks for clarity and control to validate whether the practice works outside the session.",
    outro:
      "By designing both journeys, I confirmed that the critical point identified at the intersection of the interviews really did concentrate the biggest drop in engagement.",
    people: [
      {
        name: "Ana Paula Oliveira",
        tone: "rose",
        photoSide: "left",
        photo: "/img/projects/lino-persona-ana.png",
        chips: ["30 years old", "Teacher", "Married"],
        description:
          "Looks for more fun speech exercises to engage her son, who is under treatment with a speech therapist.",
        goals: [
          "Support her son's speech development.",
          "Find playful activities that keep engagement up.",
        ],
        pains: [
          "Hard to keep the child motivated.",
          "Little clarity on the follow-up results.",
        ],
      },
      {
        name: "Lucas Oliveira",
        tone: "green",
        photoSide: "right",
        photo: "/img/projects/lino-persona-lucas.png",
        chips: ["6 years old", "Curious", "Speech difficulty"],
        description:
          "Has trouble pronouncing some phonemes and is under speech therapy treatment.",
        goals: [
          "Speak more clearly.",
          "Feel confident when talking to his friends.",
        ],
        pains: [
          "Quickly loses interest in repetitive exercises.",
          "Feels frustrated when he can't express himself well.",
        ],
      },
    ],
  },
  structure: {
    text:
      "From there, I structured the product into two cores, Practice and Journey. Practice concentrates execution, daily mission and medals, aimed at the child. Journey concentrates progression and follow-up, aimed at the caregiver. This split was deliberate: it reduces cognitive load, separates action from follow-up, and lets the product grow without adding complexity for whoever just wants to practice.",
  },
  validation: {
    text:
      "I used wireframes to validate the structure before the final interface, focused on reducing friction at the start of the activity and keeping the main action always evident. Two problems showed up at this stage: the reward feedback needed to be immediate inside the activity, not only at the end, and the Journey dashboard had too much information. I simplified it down to the two most actionable indicators.",
  },
  visual: {
    text:
      "I chose SF Pro Rounded for its lightness and consistency with Apple's HIG, and defined four colors with a fixed semantic role (blue for practice and progress, orange for achievements, pink for the daily mission, green for support). The intent was for the child to identify the context by color before needing to read any text, which is a functional decision, not just an aesthetic one.",
  },
  solutionSection: {
    intro:
      "The decision to tackle the moment of repetition defined three fronts of work, one for each point identified at the intersection of the interviews.",
    prototypeUrl: "#",
    topics: [
      {
        title: "Home: engagement at the critical moment",
        text:
          "Solves the pain that the child disengaged during repetition. It turns practice into visible progression through a daily mission, weekly streak and medals, giving the child a reason to keep going even when the exercise itself is repetitive.",
      },
      {
        title: "Activities: the exercise itself",
        text:
          "Solves the same critical point, but inside the execution. Real-time scoring, clear illustrated instructions, practice with real words paired with a reference image and audio. Real-time feedback happens only on correct answers, on purpose: if the child misses or can't complete the speech, the activity continues without interruption, and only at the end do they see how many points they earned and how many hits they had per stage. This decision keeps the exercise from becoming a place of visible punishment, which would work against the very goal of reducing resistance to repetition.",
      },
      {
        title: "Journey: visibility for the caregiver",
        text:
          "Solves the pain that the caregiver had no data to follow progress. Exportable report for the therapy session, practice calendar, average accuracy and activity history. The calendar marks both the days with practice and the days without it, giving the caregiver visibility into consistency, not just performance.",
      },
      {
        title: "Separation between Practice and Journey",
        text:
          "Home and Journey live in separate areas of the tab bar, each designed for a different user. The child finishes the activity and returns to Home; the caregiver accesses the Journey at another time, with no direct touchpoint between the two flows inside the app. This separation reinforces the architecture decision already made in the Process: reduce cognitive load by keeping action and follow-up as distinct spaces, instead of mixing the two on the same screen.",
      },
    ],
  },
  resultsImpact: {
    intro:
      "The test ran for 3 weeks with 6 children, 5 caregivers and 3 speech therapists, comparing the traditional method with using the prototype at home.",
    columns: [
      { header: "3 Weeks", value: "+42%", caption: "in activity completion" },
      { header: "6 Children", value: "+38%", caption: "in weekly practice frequency" },
      { header: "5 Caregivers", value: "87%", caption: "of caregivers reported more clarity about progress" },
      { header: "3 Speech therapists", value: "+31%", caption: "in average engagement time per session" },
    ],
    mechanism:
      "What mattered most wasn't the number itself, but the mechanism: seeing points pile up in real time visibly reduced the child's resistance to repetition, confirming that gamification worked as a way to make normally abstract progress visible.",
  },
  learningsSection: {
    reflections: [
      {
        tone: "orange",
        label: "What I'd do differently",
        heading: "Test with kids earlier",
        text:
          "I'd test with children earlier. I validated wireframes with adults and only spotted the problem in the final prototype: adults underestimate children's impatience with long flows.",
      },
      {
        tone: "green",
        label: "What worked",
        heading: "Splitting the flows from the start",
        text:
          "Separating the child and caregiver flows was the best decision, and it was only possible because the personas had been mapped in depth before any architecture decision.",
      },
    ],
    openTitle: "Two open points",
    openItems: [
      {
        heading: "Retention as the next metric",
        text:
          "The tests measured in-session engagement, not retention, which would make D1 and D7 the priority metrics in a v2.",
      },
      {
        heading: "A proactive alert for the caregiver",
        text:
          "The full separation between Home and Journey means the caregiver only notices a gap in practice by opening the app on their own, with no proactive alert — something I'd prioritize solving next.",
      },
    ],
  },
  phasesIntro:
    "I ran the project iteratively, structured into discovery, definition, ideation and prototyping. As design lead, the first decision was to prioritize validating behavior before going deeper into the interface, to avoid investing in a visual solution that wouldn't solve the core problem.",
  phases: [
    {
      title: "Discover",
      desc: "Interviews with children, parents and therapists to understand the routine and drop-off points.",
    },
    {
      title: "Define",
      desc: "Synthesizing research into a clear problem and success metrics.",
    },
    {
      title: "Develop",
      desc: "Ideation, wireframes and prototypes, testing and iterating the solutions.",
    },
    {
      title: "Deliver",
      desc: "A hi-fi prototype validated with users and ready for handoff.",
    },
  ],
  role: {
    individual:
      "Research, information architecture, UI, prototype and usability testing — end to end.",
    team: "Clinical validation of the exercises with a speech therapist on every iteration.",
  },

  context: {
    pain: "Therapists see progress stall when children don't practice between sessions. Without repetition, each appointment starts almost from scratch.",
    whyNow:
      "Therapy happens once a week, but real gains depend on daily practice at home — exactly the moment with no professional support.",
    constraints: [
      "Audience aged 6–9, many still early readers",
      "Mostly used without adult supervision",
      "Exercises must be clinically valid",
      "8-week academic deadline",
    ],
  },

  research: {
    methods: [
      "Interviews with 3 speech therapists",
      "Conversations with 5 parents",
      "Teardown of 4 competing apps",
    ],
    insights: [
      {
        title: "Reward beats score",
        text: "Kids quit the moment they feel they 'failed'; positive reinforcement keeps them trying.",
      },
      {
        title: "The parent is the bottleneck",
        text: "Without a reminder and clear feedback, home practice simply doesn't happen.",
      },
      {
        title: "Short beats perfect",
        text: "5 minutes a day engage more than long exercise blocks.",
      },
    ],
    quote: "She does it in the session, but at home she won't even hear about it.",
    quoteAuthor: "Parent of a 7-year-old patient",
  },

  definition: {
    hmw: "How might we turn daily speech practice into a habit a child wants to repeat on their own?",
    successMetrics: [
      "Adherence — % of days with at least 1 mission completed",
      "Autonomy — % of kids finishing without adult help",
      "Parent perception — ease of use (1–5)",
    ],
  },

  process: {
    evolution: [
      { stage: "Sketch", note: "Mission flow on paper" },
      { stage: "Wireframe", note: "Home, exercise and summary structure" },
      { stage: "Hi-fi prototype", note: "Playful language and microinteractions" },
    ],
    tradeoff: {
      a: {
        title: "Linear trail",
        text: "A fixed sequence of exercises, easy to grasp — but the child 'finishes' it and drops off.",
      },
      b: {
        title: "Daily missions",
        text: "Short goals that refresh every day, creating a constant reason to return.",
      },
      choice:
        "I chose daily missions: the daily trigger sustains the habit better than a trail with an end.",
    },
    collaboration:
      "I validated the exercise sequence and naming with the speech therapist each iteration, making sure gamification didn't dilute the therapy.",
    usability:
      "In testing with 6 kids, the record button wasn't obvious. I raised contrast and added a 'press to speak' state — the confusion was gone by the second round.",
  },

  designSystem: {
    components: [
      "Large action buttons",
      "Mission cards",
      "Badges and medals",
      "Feedback states (correct / try again)",
    ],
    scale:
      "Components built to absorb new sounds and exercises without redesign — the base grows with the therapy.",
  },

  solution: {
    intro:
      "The core flow: pick the day's mission, practice with immediate feedback, and see progress on the trail.",
    screens: [
      { title: "Home", text: "The day's mission front and center, with quick progress on open." },
      { title: "Exercise", text: "One word at a time, with audio and a very clear record button." },
      { title: "Summary", text: "Points and a trail summary to celebrate every step forward." },
    ],
  },

  results: {
    metrics: [
      { value: "+62%", label: "daily practice adherence", before: "sporadic", after: "near-daily" },
      { value: "9/10", label: "finished without adult help" },
      { value: "4.8/5", label: "ease of use rated by parents" },
    ],
    text: "Children completed the exercises independently and asked to continue — the strongest sign that gamification was sustaining the habit.",
  },

  learnings: {
    differently:
      "I'd test with more children over more days, to measure real habit — not just the first-session reaction.",
    learned:
      "For children, simplicity isn't aesthetics, it's accessibility. Every word removed and every reward added changes behavior.",
  },
};

export const cases: Record<Lang, Record<string, CaseData>> = {
  pt: { lino: lino_pt },
  en: { lino: lino_en },
};

export function getCase(lang: Lang, slug: string): CaseData | undefined {
  return cases[lang]?.[slug];
}
