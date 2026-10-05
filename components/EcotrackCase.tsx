"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang, type Lang } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { Block, ToolIcon } from "./caseUI";
import { useAutoReveal } from "./useReveal";
import { PersonaCard } from "./PersonaCard";
import { DesignVisual, type PaletteColor } from "./DesignVisual";
import { ResultsImpact } from "./ResultsImpact";
import { CaseToc } from "./CaseToc";

const GREEN = "#4F9A3E";
const WATER = "#2A9FD6";

// Ecotrack palette (semantic roles) — used in the "visual decision" section.
const ECO_PALETTE: PaletteColor[] = [
  { hex: "#2A9FD6", role: "Água" },
  { hex: "#F2A900", role: "Energia", onLight: true },
  { hex: "#E4703A", role: "Resíduos" },
  { hex: "#4F9A3E", role: "Marca" },
  { hex: "#17357A", role: "Certificações" },
];

// Colored columns for the results dashboard (green / water / orange).
const ECO_RESULT_STYLES = [
  { bg: "#4F9A3E", w1: "#6DB05C", coral: "left" as const, clock: false },
  { bg: "#2A9FD6", w1: "#54B4E0", coral: null, clock: false },
  { bg: "#E4703A", w1: "#EA9166", coral: "right" as const, clock: false },
];

type Persona = {
  name: string;
  tone: "green";
  photoSide: "left" | "right";
  chips: string[];
  description: string;
  goals: string[];
  pains: string[];
};

type Content = {
  back: string;
  title: string;
  subtitle: string;
  cover: string;
  tags: { label: string; value: string }[];
  toolsLabel: string;
  tools: string[];
  overview: {
    problemPoints: string[];
    solution: string;
    impact: { value: string; label: string }[];
  };
  labels: {
    overview: string;
    ovProblem: string;
    ovSolution: string;
    ovImpact: string;
    problem: string;
    process: string;
    structure: string;
    validation: string;
    visual: string;
    solution: string;
    results: string;
    learnings: string;
    others: string;
    goals: string;
    pains: string;
    prototype: string;
    wcag: string;
    hmw: string;
    constraint: string;
    empathy: string;
    pillars: string;
    discarded: string;
    givesAccess: string;
    screenSlot: string;
    adjustment: string;
    onThisPage: string;
  };
  problem: {
    introTitle: string;
    intro: string;
    stats: { value: string; caption: string; tone: "green" | "water" }[];
    quotesLead: string;
    quotes: string[];
    constraint: string;
    hmw: string;
  };
  process: {
    intro: string;
    phases: { tag: string; title: string; when: string }[];
    persona: Persona;
    empathyIntro: string;
    empathy: {
      front: string;
      quote: string;
      feeling: string;
      opportunity: string;
    }[];
    pillarsLead: string;
    pillars: string[];
  };
  structure: {
    text: string;
    flow: string[];
    sections: { name: string; desc: string }[];
    connection: string;
    discarded: string;
  };
  validation: { text: string; screens: string[] };
  visual: { text: string; fontLines: string[] };
  solution: {
    intro: string;
    topics: { title: string; text: string }[];
    prototypeUrl: string;
  };
  results: {
    intro: string;
    columns: { header: string; value: string; caption: string }[];
    mechanism: string;
    adjustment: string;
  };
  learnings: { heading: string; text: string }[];
};

const ECO: Record<Lang, Content> = {
  pt: {
    back: "Início",
    title: "EcoTrack: gerenciamento sustentável para micro e pequenas empresas",
    subtitle:
      "Transformei dado de consumo em parâmetro e ação, mudando o enquadramento de sustentabilidade de custo para vantagem competitiva.",
    cover: "/img/projects/ecotrack.png",
    tags: [
      { label: "Papel", value: "Product Designer" },
      { label: "Duração", value: "8 semanas" },
      { label: "Método", value: "Challenge Based Learning" },
    ],
    toolsLabel: "Ferramentas",
    tools: ["figma"],
    overview: {
      problemPoints: [
        "Micro e pequenas empresas gerenciam água, energia e resíduos sem nenhum parâmetro de comparação.",
        "Certificações ambientais são pouco buscadas por falta de clareza sobre o retorno que trazem pro negócio.",
      ],
      solution:
        "App iOS que transforma dado ambiental em decisão estratégica, conectando monitoramento, comparação com empresas do mesmo porte e certificações num único lugar.",
      impact: [
        { value: "60%", label: "disseram que o benchmarking influenciaria decisões futuras de redução de custo" },
      ],
    },
    labels: {
      overview: "Overview",
      ovProblem: "Problema",
      ovSolution: "Solução",
      ovImpact: "Impacto",
      problem: "O Problema",
      process: "Processo",
      structure: "Decisões estruturais",
      validation: "Validação em baixa fidelidade",
      visual: "Decisão visual funcional",
      solution: "Solução",
      results: "Resultado e impacto",
      learnings: "Aprendizados",
      others: "Outros projetos",
      goals: "Objetivos",
      pains: "Dores",
      prototype: "Acessar protótipo navegável no Figma",
      wcag: "Todas as cores seguem as diretrizes de contraste da WCAG.",
      hmw: "How Might We",
      constraint: "A restrição real",
      empathy: "Mapa de empatia",
      pillars: "Três pilares do produto",
      discarded: "Caminho descartado",
      givesAccess: "Dá acesso a",
      screenSlot: "Imagem da tela",
      adjustment: "Ajuste durante o teste",
      onThisPage: "Nesta página",
    },
    problem: {
      introTitle: "Dado sem parâmetro não vira decisão",
      intro:
        "Micro e pequenas empresas gerenciam consumo de água, energia e resíduos sem nenhum parâmetro de comparação. Entrevistei 12 microempreendedores de setores variados, e os números confirmaram a suspeita inicial.",
      stats: [
        {
          value: "67%",
          caption: "nunca compararam suas despesas com empresas do mesmo porte.",
          tone: "water",
        },
        {
          value: "75%",
          caption:
            "não sabiam como uma certificação ambiental poderia impactar o próprio negócio.",
          tone: "green",
        },
      ],
      quotesLead:
        "O padrão por trás desses números aparece na fala dos próprios entrevistados. O problema não era falta de dado, era falta de parâmetro pra interpretar o dado.",
      quotes: [
        "seria bom comparar meus gastos com empresas parecidas pra ver se estou na média",
        "já ouvi falar de selos, mas não sei se valem a pena pro meu negócio",
      ],
      constraint:
        "A restrição real é que dado bruto sozinho não muda esse comportamento. Mesmo tendo acesso aos números de consumo, o empresário não tinha como saber se aquilo era bom ou ruim, nem via caminho prático de ação a partir disso.",
      hmw: "Como podemos ajudar um empresário sem tempo a enxergar sustentabilidade como vantagem competitiva, e não como custo, usando dados que ele já tem mas não sabe interpretar?",
    },
    process: {
      intro:
        "Conduzi o projeto usando Challenge Based Learning (Engage, Investigate, Act) ao longo de 8 semanas: descoberta e entrevistas nas 3 primeiras, definição e ideação até a semana 4, prototipação e implementação até a semana 7, entrega na semana 8.",
      phases: [
        { tag: "Engage", title: "Descoberta e entrevistas", when: "Semanas 1–3" },
        { tag: "Investigate", title: "Definição e ideação", when: "até a Semana 4" },
        { tag: "Act", title: "Prototipação e implementação", when: "até a Semana 7" },
        { tag: "Act", title: "Entrega", when: "Semana 8" },
      ],
      persona: {
        name: "Carlos Henrique",
        tone: "green",
        photoSide: "left",
        chips: ["36 anos", "Dono de padaria de bairro", "Cuida sozinho de tudo"],
        description:
          "Cuida sozinho das finanças e da operação. Quer entender se está dentro da média do setor e tornar o negócio mais sustentável, mas trava na dificuldade de interpretar dado de consumo.",
        goals: [
          "Entender se está dentro da média do setor",
          "Tornar o negócio mais sustentável",
        ],
        pains: [
          "Dificuldade de interpretar dado de consumo",
          "Desconhece quais certificações cabem no seu porte",
        ],
      },
      empathyIntro:
        "Organizei as falas das entrevistas num mapa de empatia em quatro frentes. Cada frente tinha uma fala, um sentimento e uma oportunidade associada — foi esse cruzamento que gerou os três pilares do produto.",
      empathy: [
        {
          front: "Registro",
          quote: "não consigo organizar meus gastos",
          feeling: "Frustração",
          opportunity: "Centralizar o dado de forma simples",
        },
        {
          front: "Comparação",
          quote: "queria ver se estou na média do setor",
          feeling: "Insegurança",
          opportunity: "Benchmarking com empresas do mesmo porte",
        },
        {
          front: "Metas",
          quote: "não sei por onde começar a economizar",
          feeling: "Indecisão",
          opportunity: "Conectar recurso a ação com retorno estimado",
        },
        {
          front: "Certificados",
          quote: "não sei se os selos valem a pena",
          feeling: "Dúvida",
          opportunity: "Transformar certificação em progresso mensurável",
        },
      ],
      pillarsLead: "Foi esse cruzamento que gerou os três pilares do produto:",
      pillars: ["Comparação", "Clareza", "Orientação prática"],
    },
    structure: {
      text: "Organizei o produto em três seções complementares: Home pra monitoramento e comparação, Certificados pra transformar certificação em progresso mensurável, Metas pra conectar recurso a ação com retorno financeiro estimado.",
      flow: ["Onboarding", "Cadastro único"],
      sections: [
        { name: "Home", desc: "Monitoramento e comparação" },
        { name: "Certificados", desc: "Certificação como progresso mensurável" },
        { name: "Metas", desc: "Recurso → ação com retorno estimado" },
      ],
      connection:
        "A conexão entre as três foi a decisão central: monitorar sem comparar não gera urgência, comparar sem próximo passo não gera ação, agir sem visibilidade de retorno não sustenta o comportamento.",
      discarded:
        "Dentro disso, descartei automatizar recomendações mais avançadas por depender de dado estruturado que pequena empresa geralmente não tem.",
    },
    validation: {
      text: "Antes da UI final, testei a estrutura em wireframe. Isso validou que o fluxo de comparação e a lógica de metas com retorno financeiro faziam sentido antes de investir em interface.",
      screens: [
        "Recurso individual",
        "Comparação",
        "Certificado em progresso",
        "Metas com investimento e economia",
      ],
    },
    visual: {
      text: "Escolhi SF Pro pela leitura analítica limpa. Cada recurso tem cor fixa (azul água, amarelo energia, laranja resíduos), verde ancora a marca e a navegação, azul escuro marca certificações.",
      fontLines: ["SF Pro"],
    },
    solution: {
      intro:
        "Os três pilares (comparação, clareza, orientação prática) viraram três telas com papéis complementares, conectadas por uma arquitetura simples: Onboarding leva a um cadastro único, que dá acesso a Home, Certificados e Metas.",
      prototypeUrl: "#",
      topics: [
        {
          title: "Home: o dado virou contexto",
          text: "Centraliza água, energia e resíduos com consumo mensal, custo e comparação direta com empresas do mesmo porte (no protótipo, uma análise mostrou o empresário 11% acima da média do setor). Resolve diretamente a dor de que 67% nunca tinham feito esse tipo de comparação.",
        },
        {
          title: "Certificados: a certificação abstrata virou progresso mensurável",
          text: "O empresário vê quais certificações cabem no seu porte, percentual de conclusão e o que falta pra completar, com uma lista de ações claras (por exemplo, “implementar um sistema de gestão ambiental”). Resolve a dor de que 75% não sabiam como certificação impactava o negócio.",
        },
        {
          title: "Metas: a intenção virou ação com retorno estimado",
          text: "Cada meta conecta um recurso a uma ação concreta, com investimento inicial e economia de longo prazo estimada (instalar arejador na torneira, por exemplo, com investimento a partir de R$40 e até 75% de economia). As metas nascem tanto de ações de certificação quanto de oportunidades da comparação, fechando o ciclo entre as três telas.",
        },
      ],
    },
    results: {
      intro:
        "Testei o protótipo interativo com os mesmos 10 empresários de micro e pequenas empresas.",
      columns: [
        {
          header: "Contexto",
          value: "70%",
          caption: "nunca tinham visto seus dados contextualizados dessa forma",
        },
        {
          header: "Benchmarking",
          value: "60%",
          caption: "disseram que influenciaria decisões de redução de custo",
        },
        {
          header: "Metas",
          value: "75%",
          caption: "se interessaram em metas após ver a projeção financeira",
        },
      ],
      mechanism:
        "O achado comportamental mais relevante: apresentar consumo com contexto comparativo e projeção financeira mudou o enquadramento da conversa, de “preciso ser mais sustentável” pra “posso reduzir custo e ganhar vantagem competitiva”.",
      adjustment:
        "Um ajuste no meio do teste também gerou resultado direto: certificações estavam sendo pouco exploradas, reposicionei a seção destacando benefício prático e financeiro, e o engajamento com essa parte aumentou nas sessões seguintes.",
    },
    learnings: [
      {
        heading: "Framing é decisão de design",
        text: "Chamar o EcoTrack de “ferramenta de gestão” em vez de “app de sustentabilidade” mudou a receptividade nas entrevistas.",
      },
      {
        heading: "Dado sem consequência não move empresário",
        text: "Só quando adicionei comparação setorial e projeção de economia na mesma tela o dado passou a gerar decisão.",
      },
      {
        heading: "Certificações eram o diferencial que subestimei",
        text: "Apareceram como dor secundária na pesquisa e viraram a feature de maior engajamento nos testes.",
      },
    ],
  },
  en: {
    back: "Home",
    title: "EcoTrack: Sustainable Management for Micro and Small Businesses",
    subtitle:
      "I turned consumption data into a benchmark and a next step, reframing sustainability from a cost into a competitive advantage.",
    cover: "/img/projects/ecotrack.png",
    tags: [
      { label: "Role", value: "Product Designer" },
      { label: "Duration", value: "8 weeks" },
      { label: "Method", value: "Challenge Based Learning" },
    ],
    toolsLabel: "Tools",
    tools: ["figma"],
    overview: {
      problemPoints: [
        "Micro and small businesses manage water, energy and waste with no benchmark for comparison.",
        "Environmental certifications are rarely pursued for lack of clarity about the return they bring to the business.",
      ],
      solution:
        "An iOS app that turns environmental data into strategic decisions, connecting monitoring, comparison with same-size businesses and certifications in one place.",
      impact: [
        { value: "60%", label: "said benchmarking would influence future cost-reduction decisions" },
      ],
    },
    labels: {
      overview: "Overview",
      ovProblem: "Problem",
      ovSolution: "Solution",
      ovImpact: "Impact",
      problem: "The Problem",
      process: "Process",
      structure: "Structural decisions",
      validation: "Low-fidelity validation",
      visual: "Functional visual decision",
      solution: "Solution",
      results: "Result & impact",
      learnings: "Learnings",
      others: "More projects",
      goals: "Goals",
      pains: "Pains",
      prototype: "Open the interactive Figma prototype",
      wcag: "All colors follow the WCAG contrast guidelines.",
      hmw: "How Might We",
      constraint: "The real constraint",
      empathy: "Empathy map",
      pillars: "Three product pillars",
      discarded: "Path I dropped",
      givesAccess: "Gives access to",
      screenSlot: "Screen image",
      adjustment: "Mid-test adjustment",
      onThisPage: "On this page",
    },
    problem: {
      introTitle: "Data without a benchmark doesn't become a decision",
      intro:
        "Micro and small businesses manage water, energy and waste consumption with no benchmark for comparison. I interviewed 12 micro-entrepreneurs across sectors, and the numbers confirmed the initial hunch.",
      stats: [
        {
          value: "67%",
          caption: "had never compared their expenses with businesses of the same size.",
          tone: "water",
        },
        {
          value: "75%",
          caption:
            "didn't know how an environmental certification could impact their own business.",
          tone: "green",
        },
      ],
      quotesLead:
        "The pattern behind these numbers shows up in what interviewees said themselves. The problem wasn't a lack of data, it was a lack of a benchmark to interpret the data.",
      quotes: [
        "it would be good to compare my costs with similar businesses to see if I'm around the average",
        "I've heard about eco-labels, but I don't know if they're worth it for my business",
      ],
      constraint:
        "The real constraint is that raw data alone doesn't change this behavior. Even with access to the consumption numbers, the owner had no way to know whether they were good or bad, nor a practical path to act on them.",
      hmw: "How might we help a time-strapped owner see sustainability as a competitive advantage, not a cost, using data they already have but can't interpret?",
    },
    process: {
      intro:
        "I ran the project using Challenge Based Learning (Engage, Investigate, Act) over 8 weeks: discovery and interviews in the first 3, definition and ideation up to week 4, prototyping and implementation up to week 7, delivery in week 8.",
      phases: [
        { tag: "Engage", title: "Discovery and interviews", when: "Weeks 1–3" },
        { tag: "Investigate", title: "Definition and ideation", when: "by Week 4" },
        { tag: "Act", title: "Prototyping and implementation", when: "by Week 7" },
        { tag: "Act", title: "Delivery", when: "Week 8" },
      ],
      persona: {
        name: "Carlos Henrique",
        tone: "green",
        photoSide: "left",
        chips: ["36 years old", "Neighborhood bakery owner", "Runs everything alone"],
        description:
          "Handles finances and operations by himself. He wants to know if he's within the sector average and make the business more sustainable, but gets stuck on the difficulty of interpreting consumption data.",
        goals: [
          "Understand if he's within the sector average",
          "Make the business more sustainable",
        ],
        pains: [
          "Difficulty interpreting consumption data",
          "Doesn't know which certifications fit his size",
        ],
      },
      empathyIntro:
        "I organized the interview quotes into an empathy map across four fronts. Each front had a quote, a feeling and an associated opportunity — that crossover is what generated the product's three pillars.",
      empathy: [
        {
          front: "Recording",
          quote: "I can't organize my expenses",
          feeling: "Frustration",
          opportunity: "Centralize the data simply",
        },
        {
          front: "Comparison",
          quote: "I'd like to see if I'm around the sector average",
          feeling: "Insecurity",
          opportunity: "Benchmarking against same-size businesses",
        },
        {
          front: "Goals",
          quote: "I don't know where to start saving",
          feeling: "Indecision",
          opportunity: "Connect a resource to action with estimated return",
        },
        {
          front: "Certificates",
          quote: "I don't know if the labels are worth it",
          feeling: "Doubt",
          opportunity: "Turn certification into measurable progress",
        },
      ],
      pillarsLead: "That crossover is what generated the product's three pillars:",
      pillars: ["Comparison", "Clarity", "Practical guidance"],
    },
    structure: {
      text: "I organized the product into three complementary sections: Home for monitoring and comparison, Certificates to turn certification into measurable progress, Goals to connect a resource to action with an estimated financial return.",
      flow: ["Onboarding", "Single sign-up"],
      sections: [
        { name: "Home", desc: "Monitoring and comparison" },
        { name: "Certificates", desc: "Certification as measurable progress" },
        { name: "Goals", desc: "Resource → action with estimated return" },
      ],
      connection:
        "The connection between the three was the central decision: monitoring without comparing creates no urgency, comparing without a next step creates no action, acting without visible return doesn't sustain the behavior.",
      discarded:
        "Within that, I dropped automating more advanced recommendations, since they depend on structured data that a small business usually doesn't have.",
    },
    validation: {
      text: "Before the final UI, I tested the structure in wireframes. This validated that the comparison flow and the goals-with-financial-return logic made sense before investing in the interface.",
      screens: [
        "Individual resource",
        "Comparison",
        "Certificate in progress",
        "Goals with investment and savings",
      ],
    },
    visual: {
      text: "I chose SF Pro for its clean analytical read. Each resource has a fixed color (water blue, energy yellow, waste orange), green anchors the brand and navigation, dark blue marks certifications.",
      fontLines: ["SF Pro"],
    },
    solution: {
      intro:
        "The three pillars (comparison, clarity, practical guidance) became three screens with complementary roles, connected by a simple architecture: Onboarding leads to a single sign-up, which gives access to Home, Certificates and Goals.",
      prototypeUrl: "#",
      topics: [
        {
          title: "Home: data became context",
          text: "It centralizes water, energy and waste with monthly consumption, cost and a direct comparison with same-size businesses (in the prototype, one analysis showed the owner 11% above the sector average). It directly solves the pain that 67% had never made this kind of comparison.",
        },
        {
          title: "Certificates: abstract certification became measurable progress",
          text: "The owner sees which certifications fit their size, the completion percentage and what's left to finish, with a clear action list (for example, “implement an environmental management system”). It solves the pain that 75% didn't know how certification impacted the business.",
        },
        {
          title: "Goals: intention became action with estimated return",
          text: "Each goal connects a resource to a concrete action, with an upfront investment and estimated long-term savings (installing a faucet aerator, for example, from R$40 and up to 75% savings). Goals come both from certification actions and from opportunities in the comparison, closing the loop between the three screens.",
        },
      ],
    },
    results: {
      intro:
        "I tested the interactive prototype with the same 10 micro and small business owners.",
      columns: [
        {
          header: "Context",
          value: "70%",
          caption: "had never seen their data contextualized this way",
        },
        {
          header: "Benchmarking",
          value: "60%",
          caption: "said it would influence cost-reduction decisions",
        },
        {
          header: "Goals",
          value: "75%",
          caption: "got interested in goals after seeing the financial projection",
        },
      ],
      mechanism:
        "The most relevant behavioral finding: presenting consumption with comparative context and a financial projection changed the framing of the conversation, from “I need to be more sustainable” to “I can cut costs and gain a competitive advantage”.",
      adjustment:
        "A mid-test adjustment also produced a direct result: certifications were being under-explored, so I repositioned the section highlighting the practical and financial benefit, and engagement with that part increased in the following sessions.",
    },
    learnings: [
      {
        heading: "Framing is a design decision",
        text: "Calling EcoTrack a “management tool” instead of a “sustainability app” changed receptiveness in the interviews.",
      },
      {
        heading: "Data without consequence doesn't move an owner",
        text: "Only when I added sector comparison and savings projection on the same screen did the data start driving decisions.",
      },
      {
        heading: "Certifications were the differentiator I underestimated",
        text: "They showed up as a secondary pain in research and became the most engaging feature in testing.",
      },
    ],
  },
};

const STAT_TONE = {
  green: "#4F9A3E",
  water: "#2A9FD6",
};

export function EcotrackCase() {
  const { lang, t } = useLang();
  // sections rise in piece by piece while scrolling
  const revealRef = useAutoReveal<HTMLElement>();
  const c = ECO[lang];
  const L = c.labels;
  const others = projects
    .map((p, i) => ({ ...p, title: t.projects.items[i] }))
    .filter((p) => p.slug !== "ecotrack");

  return (
    <article ref={revealRef} className="-mt-32 bg-white pt-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* HERO */}
        <header className="pb-6 pt-4">
          <div className="hero-fade text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-[#4F9A3E]"
            >
              <span aria-hidden>←</span> {c.back}
            </Link>
          </div>
          <div className="mt-10">
            <h1 className="hero-rise mx-auto max-w-4xl [--delay:80ms] text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
              {c.title}
            </h1>
            <p className="hero-rise mx-auto mt-5 max-w-2xl text-pretty text-center text-lg text-neutral-600 [--delay:200ms]">
              {c.subtitle}
            </p>
            <dl className="hero-rise mt-10 grid grid-cols-2 [--delay:320ms] gap-6 border-t border-neutral-100 pt-8 sm:grid-cols-4">
              {c.tags.map((tag) => (
                <div key={tag.label}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                    {tag.label}
                  </dt>
                  <dd className="mt-1 text-[15px] font-medium">{tag.value}</dd>
                </div>
              ))}
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                  {c.toolsLabel}
                </dt>
                <dd className="mt-2 flex items-center gap-2.5">
                  {c.tools.map((tool) => (
                    <ToolIcon key={tool} name={tool} />
                  ))}
                </dd>
              </div>
            </dl>
          </div>
          <div className="hero-rise mt-10 overflow-hidden rounded-2xl ring-1 ring-black/5 [--delay:440ms]">
            <Image
              src={c.cover}
              alt={c.title}
              width={1600}
              height={800}
              className="h-auto w-full"
              priority
            />
          </div>
        </header>

        {/* OVERVIEW — same structure as the Lino case */}
        <Block label={L.overview} icon="overview" id="eco-overview">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Problema */}
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
                {L.ovProblem}
              </h3>
              <div className="mt-4 flex flex-1 flex-col gap-4">
                {c.overview.problemPoints.map((p, i) => (
                  <div
                    key={i}
                    className="flex flex-1 items-center rounded-2xl bg-amber-50 p-5 text-neutral-800 ring-1 ring-amber-200"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Solução + Impacto */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
                  {L.ovSolution}
                </h3>
                <div className="mt-4 rounded-2xl bg-emerald-50 p-5 text-neutral-800 ring-1 ring-emerald-200">
                  {c.overview.solution}
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
                  {L.ovImpact}
                </h3>
                <div className="mt-4 flex flex-1 items-center">
                  <div className="flex w-full flex-col gap-4">
                    {c.overview.impact.map((s) => (
                      // big number with its label alongside (as in the Lino overview)
                      <div key={s.value} className="flex items-end gap-3">
                        <span
                          className="shrink-0 text-6xl font-bold leading-none tracking-tight sm:text-7xl"
                          style={{ color: GREEN }}
                        >
                          {s.value}
                        </span>
                        <span className="max-w-xs text-base leading-snug" style={{ color: GREEN }}>
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Block>

        {/* PROBLEM */}
        <Block label={L.problem} icon="context" id="eco-problema">
          <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col justify-center rounded-2xl bg-[#4F9A3E] p-8 text-white sm:p-10">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {c.problem.introTitle}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/90">
                {c.problem.intro}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {c.problem.stats.map((s) => (
                <div
                  key={s.value}
                  className="flex flex-col justify-center rounded-2xl p-7 text-white"
                  style={{ background: STAT_TONE[s.tone] }}
                >
                  <span className="text-5xl font-bold tracking-tight">
                    {s.value}
                  </span>
                  <span className="mt-3 text-base font-medium leading-snug">
                    {s.caption}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-12 text-lg leading-relaxed text-neutral-700">
            {c.problem.quotesLead}
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {c.problem.quotes.map((q) => (
              <blockquote
                key={q}
                className="rounded-2xl border-2 border-[#4F9A3E]/30 p-6 text-lg italic leading-relaxed text-neutral-700"
              >
                “{q}”
              </blockquote>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border-y border-neutral-100 py-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              {L.constraint}
            </p>
            <p className="mt-2 text-lg leading-relaxed text-neutral-700">
              {c.problem.constraint}
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-[#4F9A3E] p-8 text-white sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
              {L.hmw}
            </p>
            <p className="mt-3 text-xl font-semibold leading-snug sm:text-2xl">
              {c.problem.hmw}
            </p>
          </div>
        </Block>

        {/* PROCESS */}
        <Block label={L.process} icon="process" id="eco-processo">
          <p className="text-lg leading-relaxed text-neutral-700">
            {c.process.intro}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.process.phases.map((ph, i) => (
              <div
                key={ph.title + i}
                className="rounded-2xl border border-neutral-200 p-6"
              >
                <span className="inline-flex rounded-full bg-[#4F9A3E]/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#4F9A3E]">
                  {ph.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                  {ph.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">{ph.when}</p>
              </div>
            ))}
          </div>

          {/* persona */}
          <div className="mt-16">
            <PersonaCard
              persona={c.process.persona}
              goalsLabel={L.goals}
              painsLabel={L.pains}
            />
          </div>

          {/* empathy map */}
          <div className="mt-16">
            <p className="text-lg leading-relaxed text-neutral-700">
              {c.process.empathyIntro}
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {c.process.empathy.map((e) => (
                <div
                  key={e.front}
                  className="flex flex-col rounded-2xl border border-neutral-200 p-6"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#4F9A3E]">
                    {e.front}
                  </span>
                  <p className="mt-3 text-[15px] italic leading-snug text-neutral-700">
                    “{e.quote}”
                  </p>
                  <span className="mt-3 inline-flex w-fit rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-500">
                    {e.feeling}
                  </span>
                  <p className="mt-4 border-t border-neutral-100 pt-3 text-sm text-neutral-600">
                    {e.opportunity}
                  </p>
                </div>
              ))}
            </div>

            {/* pillars */}
            <div className="mt-8 rounded-2xl bg-[#4F9A3E]/5 p-6 sm:p-7">
              <p className="text-sm font-medium text-neutral-500">
                {c.process.pillarsLead}
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {c.process.pillars.map((p) => (
                  <span
                    key={p}
                    className="rounded-full bg-[#4F9A3E] px-4 py-1.5 text-sm font-semibold text-white"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Block>

        {/* STRUCTURE */}
        <Block label={L.structure} icon="process" id="eco-estrutura">
          <p className="text-lg leading-relaxed text-neutral-700">
            {c.structure.text}
          </p>

          {/* flow diagram */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {c.structure.flow.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-full border-2 border-[#4F9A3E] px-4 py-1.5 text-sm font-semibold text-[#4F9A3E]">
                    {step}
                  </span>
                  <span aria-hidden className="text-[#4F9A3E]">
                    →
                  </span>
                </span>
              ))}
              <span className="text-sm font-medium text-neutral-500">
                {L.givesAccess}
              </span>
            </div>
            <div className="mt-4 grid w-full gap-4 sm:grid-cols-3">
              {c.structure.sections.map((s) => (
                <div
                  key={s.name}
                  className="rounded-2xl bg-[#4F9A3E] p-6 text-center text-white"
                >
                  <h3 className="text-lg font-bold">{s.name}</h3>
                  <p className="mt-1.5 text-sm text-white/85">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-[#4F9A3E]/5 p-6 sm:p-7">
            <p className="text-center text-lg font-semibold leading-relaxed text-neutral-800">
              {c.structure.connection}
            </p>
          </div>
          <div className="mt-6 rounded-xl border border-dashed border-neutral-300 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              {L.discarded}
            </p>
            <p className="mt-2 leading-relaxed text-neutral-600">
              {c.structure.discarded}
            </p>
          </div>
        </Block>

        {/* VALIDATION */}
        <Block label={L.validation} icon="validation" id="eco-validacao">
          <p className="text-lg leading-relaxed text-neutral-700">
            {c.validation.text}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {c.validation.screens.map((s) => (
              <div key={s} className="flex flex-col items-center gap-3">
                <div className="flex aspect-[9/16] w-full items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-3 text-center text-xs text-neutral-400">
                  {L.screenSlot}
                </div>
                <span className="text-center text-sm font-medium text-neutral-600">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </Block>

        {/* VISUAL DECISION */}
        <Block label={L.visual} icon="designSystem" id="eco-visual">
          <p className="text-lg leading-relaxed text-neutral-700">
            {c.visual.text}
          </p>
          <div className="mt-10">
            <DesignVisual
              wcagNote={L.wcag}
              fontLines={c.visual.fontLines}
              fontStack='"SF Pro Display", "SF Pro Text", -apple-system, system-ui, sans-serif'
              accent={GREEN}
              gradFrom="#DCEBD3"
              palette={ECO_PALETTE}
            />
          </div>
        </Block>

        {/* SOLUTION */}
        <Block label={L.solution} icon="solution" id="eco-solucao">
          <p className="text-lg leading-relaxed text-neutral-700">
            {c.solution.intro}
          </p>
          <div className="mt-12">
            {c.solution.topics.map((t, i) => (
              <div key={t.title}>
                {i > 0 && <hr className="my-12 border-neutral-100" />}
                <div
                  className={`grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-12 ${
                    i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="flex aspect-[4/5] items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 text-sm font-medium text-neutral-400">
                    {L.screenSlot}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-neutral-900">
                      {t.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-neutral-700">
                      {t.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <a
              href={c.solution.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#4F9A3E] px-7 py-3.5 text-base font-semibold text-white transition hover:bg-[#437f34]"
            >
              {L.prototype}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
          </div>
        </Block>

        {/* RESULTS */}
        <Block label={L.results} icon="results" id="eco-resultados">
          <p className="text-lg leading-relaxed text-neutral-700">
            {c.results.intro}
          </p>
          <div className="mt-10">
            <ResultsImpact
              columns={c.results.columns}
              styles={ECO_RESULT_STYLES}
            />
          </div>
          <p className="mt-12 text-lg leading-relaxed text-neutral-700">
            {c.results.mechanism}
          </p>
          <div className="mt-8 rounded-2xl bg-[#4F9A3E]/5 p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#4F9A3E]">
              {L.adjustment}
            </p>
            <p className="mt-2 leading-relaxed text-neutral-700">
              {c.results.adjustment}
            </p>
          </div>
        </Block>

        {/* LEARNINGS */}
        <Block label={L.learnings} icon="learnings" id="eco-aprendizados">
          <div className="grid gap-6 sm:grid-cols-3">
            {c.learnings.map((l, i) => (
              <div
                key={l.heading}
                className="flex flex-col rounded-2xl border border-neutral-200 p-7"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4F9A3E]/15 text-lg font-bold text-[#4F9A3E]">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-neutral-900">
                  {l.heading}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-600">{l.text}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* OTHER PROJECTS */}
        <Block label={L.others} icon="others">
          <div className="grid gap-8 sm:grid-cols-2">
            {others.map((p) => (
              <ProjectCard
                key={p.slug}
                tags={p.tags}
                title={p.title}
                cover={p.cover}
                color={p.color}
                href={p.href ?? "/#projetos"}
              />
            ))}
          </div>
        </Block>
      </div>

      <CaseToc
        title={L.onThisPage}
        accent={GREEN}
        items={["eco-overview", "eco-problema", "eco-processo", "eco-estrutura", "eco-validacao", "eco-visual", "eco-solucao", "eco-resultados", "eco-aprendizados"].map((id, i) => ({
          id,
          label: (lang === "pt"
            ? ["Overview", "Problema", "Processo", "Estrutura", "Validação", "Visual", "Solução", "Resultados", "Aprendizados"]
            : ["Overview", "Problem", "Process", "Structure", "Validation", "Visual", "Solution", "Results", "Learnings"])[i],
        }))}
      />
    </article>
  );
}
