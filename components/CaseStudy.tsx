"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLang, type Lang } from "@/lib/i18n";
import { getCase } from "@/lib/cases";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { DoubleDiamond } from "./DoubleDiamond";
import { GraphBlock, InfoBlock } from "./ResearchStat";
import { PersonaCard } from "./PersonaCard";
import { StructureMap } from "./StructureMap";
import { BeforeAfterScreens } from "./BeforeAfterScreens";
import { DesignVisual } from "./DesignVisual";
import { LinoComponentStates } from "./LinoComponentStates";
import { ResultsImpact } from "./ResultsImpact";
import { LearningsSection } from "./LearningsSection";
import { CaseToc } from "./CaseToc";
import { Block, ToolIcon } from "./caseUI";
import { useAutoReveal } from "./useReveal";

const UI: Record<Lang, Record<string, string>> = {
  pt: {
    back: "Início",
    overview: "Overview",
    problem: "Problema",
    solution: "Solução",
    impactWord: "Impacto",
    role: "Meu papel",
    individual: "Individual",
    team: "Em time",
    phases: "Processo",
    diverge: "divergir",
    converge: "convergir",
    imageSlot: "Foto da pesquisa de campo",
    constraintLabel: "Restrições",
    ddCaption:
      "As 4 etapas do Double Diamond, metodologia utilizada no projeto.",
    context: "Contexto & problema",
    whyNow: "Por que agora",
    constraints: "Constraints",
    research: "Discovery & research",
    pesquisa: "Pesquisa",
    insight: "Insight",
    persona: "Persona",
    goals: "Objetivos",
    pains: "Dores",
    structure: "Decisões estruturais",
    validation: "Validação e ajuste",
    visual: "Decisão visual funcional",
    prototype: "Acessar protótipo navegável no Figma",
    screenSlot: "Imagem da tela",
    resultsImpact: "Resultados e impacto",
    learningsTitle: "Aprendizados",
    nextSteps: "Próximos passos",
    wcag: "Todas as cores seguem as diretrizes de contraste da WCAG.",
    componentsHint:
      "Passe o mouse sobre os componentes para ver seus estados, ou toque neles no celular.",
    onThisPage: "Nesta página",
    methods: "Métodos",
    insights: "Insights",
    definition: "Definição do problema",
    hmw: "How Might We",
    success: "Métricas de sucesso",
    process: "Processo de design",
    evolution: "Evolução",
    tradeoff: "Trade-off",
    chose: "A escolha",
    collab: "Colaboração cross-funcional",
    usability: "Teste de usabilidade",
    designSystem: "Design system",
    finalSolution: "Solução final",
    results: "Impacto",
    learnings: "Aprendizados",
    differently: "O que faria diferente",
    learned: "O que aprendi",
    before: "Antes",
    after: "Depois",
    screensNote: "Espaços reservados — adicione os prints reais aqui.",
    others: "Outros projetos",
  },
  en: {
    back: "Home",
    overview: "Overview",
    problem: "Problem",
    solution: "Solution",
    impactWord: "Impact",
    role: "My role",
    individual: "Individual",
    team: "With the team",
    phases: "Process",
    diverge: "diverge",
    converge: "converge",
    imageSlot: "Field-research photo",
    constraintLabel: "Constraints",
    ddCaption:
      "The 4 stages of the Double Diamond, the methodology used in the project.",
    context: "Context & problem",
    whyNow: "Why now",
    constraints: "Constraints",
    research: "Discovery & research",
    pesquisa: "Research",
    insight: "Insight",
    persona: "Persona",
    goals: "Goals",
    pains: "Pains",
    structure: "Structural decisions",
    validation: "Validation & tuning",
    visual: "Functional visual decision",
    prototype: "Open the interactive Figma prototype",
    screenSlot: "Screen image",
    resultsImpact: "Results & impact",
    learningsTitle: "Learnings",
    nextSteps: "Next steps",
    wcag: "All colors follow the WCAG contrast guidelines.",
    componentsHint:
      "Hover over the components to see their states, or tap them on mobile.",
    onThisPage: "On this page",
    methods: "Methods",
    insights: "Insights",
    definition: "Problem definition",
    hmw: "How Might We",
    success: "Success metrics",
    process: "Design process",
    evolution: "Evolution",
    tradeoff: "Trade-off",
    chose: "The call",
    collab: "Cross-functional collaboration",
    usability: "Usability test",
    designSystem: "Design system",
    finalSolution: "Final solution",
    results: "Impact",
    learnings: "Learnings",
    differently: "What I'd do differently",
    learned: "What I learned",
    before: "Before",
    after: "After",
    screensNote: "Placeholders — drop the real screenshots here.",
    others: "More projects",
  },
};

// Colors for the field-research sample boxes.
const SAMPLE_TONE: Record<string, string> = {
  blue: "bg-blue-600",
  pink: "bg-rose-500",
  green: "bg-emerald-500",
  orange: "bg-orange-500",
};

// Outline colors for the three pain cards — matched to the interview sample boxes.
const PAIN_TONE = [
  { border: "border-rose-500/30", chip: "bg-rose-500/15" }, // Criança
  { border: "border-emerald-500/30", chip: "bg-emerald-500/15" }, // Responsável
  { border: "border-orange-500/30", chip: "bg-orange-500/15" }, // Terapeuta
];

// Colors for the research stat blocks + boxed testimonial, per persona.
const STAT_TONE: Record<
  string,
  { wave: string; info: string; border: string; text: string; chip: string }
> = {
  rose: {
    wave: "#F43F5E",
    info: "bg-rose-500",
    border: "border-rose-500/30",
    text: "text-rose-500",
    chip: "bg-rose-500/15",
  },
  green: {
    wave: "#10B981",
    info: "bg-emerald-500",
    border: "border-emerald-500/30",
    text: "text-emerald-500",
    chip: "bg-emerald-500/15",
  },
  orange: {
    wave: "#F97316",
    info: "bg-orange-500",
    border: "border-orange-500/30",
    text: "text-orange-500",
    chip: "bg-orange-500/15",
  },
};

export function CaseStudy({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  // sections rise in piece by piece while scrolling
  const revealRef = useAutoReveal<HTMLElement>();
  const c = getCase(lang, slug);
  if (!c) notFound();
  const ui = UI[lang];

  const others = projects
    .map((p, i) => ({ ...p, title: t.projects.items[i] }))
    .filter((p) => p.slug !== slug);

  // One-word labels for the side index.
  const tocIds = [
    "sec-overview",
    "sec-problema",
    "sec-processo",
    "sec-pesquisa",
    "sec-insight",
    "sec-persona",
    "sec-estrutura",
    "sec-validacao",
    "sec-visual",
    "sec-solucao",
    "sec-resultados",
    "sec-aprendizados",
  ];
  const tocWords =
    lang === "pt"
      ? ["Overview", "Problema", "Processo", "Pesquisa", "Insight", "Persona", "Estrutura", "Validação", "Visual", "Solução", "Resultados", "Aprendizados"]
      : ["Overview", "Problem", "Process", "Research", "Insight", "Persona", "Structure", "Validation", "Visual", "Solution", "Results", "Learnings"];
  const toc = tocIds.map((id, i) => ({ id, label: tocWords[i] }));

  return (
    <article ref={revealRef} className="-mt-32 bg-white pt-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* 1 · HERO (scan) */}
        <header className="pb-6 pt-4">
          <div className="hero-fade text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-figma-blue"
            >
              <span aria-hidden>←</span> {ui.back}
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

          {/* cover — just the image */}
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

        {/* 2 · OVERVIEW (scan) */}
        <Block label={ui.overview} icon="overview" id="sec-overview">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Problema */}
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
                {ui.problem}
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
              {/* Solução — box (mesmo layout do Problema) */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
                  {ui.solution}
                </h3>
                {c.overview.solution && (
                  <div className="mt-4 rounded-2xl bg-emerald-50 p-5 text-neutral-800 ring-1 ring-emerald-200">
                    {c.overview.solution}
                  </div>
                )}
              </div>

              {/* Impacto — sem box, resultados em números grandes */}
              <div className="flex flex-1 flex-col">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
                  {ui.impactWord}
                </h3>
                <div className="mt-4 flex flex-1 items-center">
                  <div className="grid w-full grid-cols-2 gap-4">
                    {c.overview.impactStats?.map((s) => (
                      <div key={s.value} className="flex items-end gap-2">
                        <span className="text-4xl font-bold leading-none tracking-tight text-figma-blue sm:text-5xl">
                          {s.value}
                        </span>
                        <span className="text-sm leading-tight text-figma-blue">
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

        {/* PROBLEMA (depth) — narrative + field research + reinforcing loop */}
        <Block label={ui.problem} icon="context" id="sec-problema">
          {/* intro — image left, blue panel (title + text) right, matched heights */}
          <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_2fr]">
            <Image
              src="/img/projects/lino-problema.png"
              alt="Fonoaudióloga trabalhando exercícios de fala com uma criança"
              width={1164}
              height={1092}
              className="h-auto w-full rounded-2xl"
            />
            <div className="flex flex-col justify-center rounded-2xl bg-[#3366E4] p-8 text-white sm:p-10">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {c.problemDeep.introTitle}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/90">
                {c.problemDeep.intro}
              </p>
            </div>
          </div>

          {/* method + three connected pains */}
          <p className="mt-12 text-lg leading-relaxed text-neutral-700">
            {c.problemDeep.method}
          </p>

          {/* three connected pains — outlined cards, one color each */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {c.problemDeep.pains.map((pain, i) => (
              <div
                key={pain.who}
                className={`flex flex-col rounded-2xl border-2 p-6 ${PAIN_TONE[i].border}`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-lg leading-none ${PAIN_TONE[i].chip}`}
                  >
                    {pain.emoji}
                  </span>
                  <h4 className="text-base font-semibold text-neutral-900">
                    {pain.who}
                  </h4>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                  {pain.text}
                </p>
              </div>
            ))}
          </div>

          {/* reinforcing dynamic — text only */}
          <p className="mt-10 text-lg leading-relaxed text-neutral-700">
            {c.problemDeep.loopText}
          </p>

          {/* the constraints — lock + title (left) · chips (right), subtle divider above & below */}
          <div className="mt-10 border-y border-neutral-100 py-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-0">
              {/* left — lock icon + title, centered in the space before the chips */}
              <div className="flex shrink-0 flex-col items-center justify-center gap-3 text-neutral-900 sm:w-64">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-12 w-12"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.25 10.0546V8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8V10.0546C19.8648 10.1379 20.5907 10.348 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.40931 10.348 4.13525 10.1379 5.25 10.0546ZM6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C16.867 10 16.4515 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8ZM12 13.25C12.4142 13.25 12.75 13.5858 12.75 14V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V14C11.25 13.5858 11.5858 13.25 12 13.25Z"
                  />
                </svg>
                <p className="text-lg font-semibold text-neutral-900">
                  {ui.constraintLabel}
                </p>
              </div>

              {/* right — constraint chips, pushed to the right edge */}
              <div className="flex flex-1 flex-wrap justify-end gap-2.5">
                {c.problemDeep.constraint.map((con) => (
                  <span
                    key={con}
                    className="rounded-full border border-neutral-200 px-3.5 py-1.5 text-sm text-neutral-700"
                  >
                    {con}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* HMW — the question the rest of the case answers · image on the right */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-stretch">
            <div className="flex flex-col justify-center rounded-2xl bg-[#3366E4] p-8 text-white sm:p-10">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-white/60">
                {ui.hmw}
              </span>
              <p className="mt-3 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                {c.problemDeep.hmw}
              </p>
            </div>
            <Image
              src="/img/projects/lino-hmw.png"
              alt="Fonoaudióloga em sessão de terapia da fala com crianças"
              width={1164}
              height={1092}
              className="h-auto w-full rounded-2xl"
            />
          </div>
        </Block>

        {/* Processo (Double Diamond) */}
        <Block label={ui.phases} icon="process" id="sec-processo">
          <p className="mb-8 text-lg leading-relaxed text-neutral-700">
            {c.phasesIntro}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.phases.map((ph, i) => (
              <div
                key={ph.title}
                className="rounded-2xl border border-neutral-200 p-6"
              >
                <span className="font-mono text-sm font-semibold text-figma-blue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{ph.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{ph.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <DoubleDiamond
              phases={c.phases.map((p) => p.title)}
              problemLabel={ui.problem}
              solutionLabel={ui.solution}
              diverge={ui.diverge}
              converge={ui.converge}
              caption={ui.ddCaption}
            />
          </div>
        </Block>

        {/* PESQUISA — field research evidence */}
        <Block label={ui.pesquisa} icon="research" id="sec-pesquisa">
          <p className="text-lg leading-relaxed text-neutral-700">
            {c.problemDeep.researchIntro}
          </p>

          {/* field research — image + caption (left) · sample boxes (right) */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
            {/* left — image + caption (caption stays within photo width) */}
            <figure>
              <div className="relative h-[280px] overflow-hidden rounded-2xl">
                <Image
                  src="/img/projects/lino-pesquisa-campo-blur.png"
                  alt={c.problemDeep.photoCaption}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-neutral-500">
                {c.problemDeep.photoCaption}
              </figcaption>
            </figure>

            {/* right — 4 colored sample boxes */}
            <div className="grid h-[280px] grid-cols-2 grid-rows-2 gap-3">
              {c.problemDeep.sample.map((s) => (
                <div
                  key={s.label}
                  className={`flex flex-col justify-between rounded-2xl p-5 text-white ${SAMPLE_TONE[s.tone]}`}
                >
                  <span className="text-3xl font-bold leading-none">
                    {s.value}
                  </span>
                  <span className="mt-3 text-sm font-medium leading-snug text-white/90">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* testimonials from field research — question · answer · profile, stacked */}
          <div className="mt-10 flex flex-col gap-10">
            {c.problemDeep.pains.map((pain) => {
              if (!pain.quote) return null;
              const tone = pain.stat ? STAT_TONE[pain.stat.tone] : null;
              const quote = (
                <figure
                  className={`flex flex-col gap-3 ${
                    tone ? `justify-center rounded-2xl border-2 p-5 ${tone.border}` : ""
                  }`}
                >
                  <p className="text-[15px] leading-snug text-neutral-500">
                    “{pain.quote.question}”
                  </p>
                  <blockquote
                    className={`text-lg font-bold italic leading-snug tracking-tight ${
                      tone ? tone.text : "text-neutral-900"
                    }`}
                  >
                    “{pain.quote.answer}”
                  </blockquote>
                  <figcaption className="mt-1 text-sm italic text-neutral-500">
                    {pain.quote.profile}
                  </figcaption>
                </figure>
              );

              if (!pain.stat || !tone) {
                return (
                  <div key={pain.who} className="max-w-3xl">
                    {quote}
                  </div>
                );
              }

              const blocks = (
                <>
                  <GraphBlock percent={pain.stat.percent} wave={tone.wave} />
                  <InfoBlock text={pain.stat.caption} bg={tone.info} />
                </>
              );
              const left = pain.stat.side === "left";

              return (
                <div
                  key={pain.who}
                  className={`grid gap-6 lg:items-stretch ${
                    left
                      ? "lg:grid-cols-[0.8fr_0.8fr_2fr]"
                      : "lg:grid-cols-[2fr_0.8fr_0.8fr]"
                  }`}
                >
                  {left ? (
                    <>
                      {blocks}
                      {quote}
                    </>
                  ) : (
                    <>
                      {quote}
                      {blocks}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-lg leading-relaxed text-neutral-700">
            {c.problemDeep.researchOutro}
          </p>
        </Block>

        {/* INSIGHT — trade-off: 3 isolated solutions (dropped) → 1 unified decision */}
        <Block label={ui.insight} icon="learnings" id="sec-insight">
          <p className="text-lg leading-relaxed text-neutral-700">
            {c.insight.intro}
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            {/* discarded path — 3 separate solutions */}
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                {c.insight.discardedLabel}: 3 {lang === "pt" ? "produtos" : "products"}
              </p>
              <div className="mt-3 flex flex-1 flex-col gap-3">
                {c.insight.isolated.map((it) => (
                  <div
                    key={it.pain}
                    className={`flex flex-1 items-center gap-3 rounded-xl border border-dashed p-3 ${STAT_TONE[it.tone].border}`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg leading-none ${STAT_TONE[it.tone].chip}`}
                    >
                      {it.emoji}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                        {it.pain}
                      </p>
                      <p className="text-[15px] font-medium text-neutral-400 line-through">
                        {it.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* converge arrow */}
            <div
              className="flex items-center justify-center text-[#3366E4]"
              aria-hidden
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 rotate-90 lg:rotate-0"
              >
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </div>

            {/* chosen path — the unified moment (matches the height of the left cards) */}
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                {c.insight.decisionLabel}: 1 {lang === "pt" ? "produto" : "product"}
              </p>
              <div className="mt-3 flex flex-1 flex-col justify-center rounded-2xl bg-[#3366E4] p-6 text-white sm:p-7">
                <p className="text-2xl font-bold tracking-tight">
                  {c.insight.moment}
                </p>
                <p className="mt-4 border-t border-white/15 pt-4 text-sm font-medium text-white/70">
                  {c.insight.pointsLead}
                </p>
                <div className="mt-2.5 space-y-2.5">
                  {c.insight.points.map((p) => (
                    <div key={p.text} className="flex items-center gap-2.5">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${STAT_TONE[p.tone].info}`}
                      />
                      <span className="text-sm text-white/90">{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* the decision */}
          <div className="mt-8 rounded-2xl bg-[#3366E4]/5 p-6 sm:p-7">
            <p className="text-center text-lg font-semibold leading-relaxed text-neutral-800">
              {c.insight.decision}
            </p>
          </div>
        </Block>

        {/* PERSONA — two profiles mapped from the interviews */}
        <Block label={ui.persona} icon="persona" id="sec-persona">
          <p className="text-lg leading-relaxed text-neutral-700">
            {c.persona.intro}
          </p>
          <div className="mt-12 flex flex-col gap-16">
            {c.persona.people.map((p) => (
              <PersonaCard
                key={p.name}
                persona={p}
                goalsLabel={ui.goals}
                painsLabel={ui.pains}
              />
            ))}
          </div>
          <p className="mt-12 text-lg leading-relaxed text-neutral-700">
            {c.persona.outro}
          </p>
        </Block>

        {/* STRUCTURAL DECISIONS — product architecture mind-map */}
        <Block label={ui.structure} icon="process" id="sec-estrutura">
          <p className="text-lg leading-relaxed text-neutral-700">
            {c.structure.text}
          </p>
          <div className="mt-10">
            <StructureMap />
          </div>
        </Block>

        {/* VALIDATION & TUNING — before/after wireframe comparison */}
        <Block label={ui.validation} icon="validation" id="sec-validacao">
          <p className="text-lg leading-relaxed text-neutral-700">
            {c.validation.text}
          </p>
          <div className="mt-12">
            <BeforeAfterScreens beforeLabel={ui.before} afterLabel={ui.after} />
          </div>
        </Block>

        {/* FUNCTIONAL VISUAL DECISION — typography + color system */}
        <Block label={ui.visual} icon="designSystem" id="sec-visual">
          <p className="text-lg leading-relaxed text-neutral-700">
            {c.visual.text}
          </p>
          <div className="mt-10">
            <DesignVisual
              wcagNote={ui.wcag}
              iconSheet={{
                src: "/img/projects/lino-icons.svg",
                width: 900,
                height: 110,
                alt: "Ícones do Lino",
              }}
              components={<LinoComponentStates hint={ui.componentsHint} />}
            />
          </div>
        </Block>

        {/* SOLUTION — alternating screen / text blocks + prototype button */}
        <Block label={ui.solution} icon="solution" id="sec-solucao">
          <p className="text-lg leading-relaxed text-neutral-700">
            {c.solutionSection.intro}
          </p>

          <div className="mt-12">
            {c.solutionSection.topics.map((t, i) => (
              <div key={t.title}>
                {i > 0 && <hr className="my-12 border-neutral-100" />}
                <div
                  className={`grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-12 ${
                    i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* screen image placeholder */}
                  <div className="flex aspect-[4/5] items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 text-sm font-medium text-neutral-400">
                    {ui.screenSlot}
                  </div>
                  {/* title + text, aligned to the bottom line of the image */}
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

          {/* prototype link — Figma brand look (black pill + Figma logo) */}
          <div className="mt-14 flex justify-start">
            <a
              href={c.solutionSection.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-base font-semibold text-white transition hover:bg-neutral-800"
            >
              <svg viewBox="0 0 38 57" className="h-5 w-auto" aria-hidden>
                <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
                <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
                <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
                <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
                <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
              </svg>
              {ui.prototype}
            </a>
          </div>
        </Block>

        {/* RESULTS & IMPACT — colored stat dashboard */}
        <Block label={ui.resultsImpact} icon="results" id="sec-resultados">
          <p className="text-lg leading-relaxed text-neutral-700">
            {c.resultsImpact.intro}
          </p>
          <div className="mt-10">
            <ResultsImpact columns={c.resultsImpact.columns} />
          </div>
          <p className="mt-12 text-lg leading-relaxed text-neutral-700">
            {c.resultsImpact.mechanism}
          </p>
        </Block>

        {/* LEARNINGS — reflections + open points */}
        <Block label={ui.learningsTitle} icon="learnings" id="sec-aprendizados">
          <LearningsSection
            reflections={c.learningsSection.reflections}
            openItems={c.learningsSection.openItems}
            nextStepsLabel={ui.nextSteps}
          />
        </Block>

        {/* Other projects */}
        <Block label={ui.others} icon="others" id="sec-outros">
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

      <CaseToc items={toc} title={ui.onThisPage} accent="#3366E4" />
    </article>
  );
}
