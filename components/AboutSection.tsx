"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { LogoMarquee } from "./LogoMarquee";
import { HoverComment } from "./Sticker";
import { useReveal } from "./useReveal";
import { MailIcon } from "./icons";

const EMAIL = "diegofsants04@gmail.com";
// Drop the PDF in /public with this name to enable the download button.
const RESUME = "/curriculo-diego-santos.pdf";
const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/diegoferrsantos", logo: "/logos/linkedin.svg", w: 40, h: 40 },
  // Behance's file is a square with sharp corners: round it like the LinkedIn mark (r ≈ 7.3%).
  { name: "Behance", href: "https://www.behance.net/imdi_e", logo: "/logos/behance.svg", w: 40, h: 40, radius: "7.3%" },
];

// Design tools (logos via Iconify: "SVG Logos" CC0; Maze from theSVG, MIT).
const TOOLS = [
  { name: "Figma", logo: "/logos/tools/figma.svg" },
  { name: "Miro", logo: "/logos/tools/miro.svg" },
  { name: "Maze", logo: "/logos/tools/maze.svg", invertInDark: true },
  { name: "Jira", logo: "/logos/tools/jira.svg" },
  { name: "Adobe Creative Suite", logo: "/logos/tools/adobe.svg" },
  { name: "Claude", logo: "/logos/claude.svg" },
];

// The button's `shadow-panel` (1px hairline + soft blur), as a drop-shadow so it
// follows each logo's own outline instead of a box.
const ICON_SHADOW =
  "drop-shadow(0 0 0.5px rgba(0,0,0,0.12)) drop-shadow(0 2px 8px rgba(0,0,0,0.08))";

function AwardBadge() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF3C4]">
      <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5 text-[#B7791F]" aria-hidden>
        <circle cx="8" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="M5.8 8.8 4.5 14l3.5-2 3.5 2-1.3-5.2"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CertificateBadge() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF3C4]">
      <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5 text-[#B7791F]" aria-hidden>
        <rect x="2" y="2.5" width="12" height="8.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5 5.5h6M5 7.8h3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path
          d="M9.5 11v3l1.25-.8L12 14v-3"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Corner handle of a Figma selection frame. */
function Handle({ className }: { className: string }) {
  return (
    <span
      className={`about-handle absolute z-10 h-2.5 w-2.5 rounded-[1px] border-2 border-figma-selection bg-surface ${className}`}
    />
  );
}

export function AboutSection() {
  const { t } = useLang();
  const a = t.about;
  // Intro reveal: heading rises, the photo frame lands with its selection
  // handles popping on, then the text and the social icons follow.
  const ref = useReveal<HTMLElement>(".about-head, .about-intro, .reveal");
  const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

  return (
    <section ref={ref} id="sobre" className="scroll-mt-28 border-t border-neutral-200 bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section title, same style as "Projetos" */}
        <h2 className="about-head text-3xl font-bold tracking-tight">{a.heading}</h2>

        {/* Small text + big photo */}
        <div className="about-intro mt-14 grid items-end gap-10 lg:grid-cols-[minmax(0,440px)_1fr]">
          {/* Big photo inside a Figma selection frame */}
          <div className="ai-rise relative w-full max-w-md" style={delay(0)}>
            <span className="absolute -top-7 left-0 text-sm font-medium text-figma-selection">
              {a.photoName}
            </span>
            {/* hovering types a caption, like the hero stickers */}
            <HoverComment comment={a.photoComment} className="block">
            <div className="relative border-2 border-figma-selection">
              <Handle className="-left-1.5 -top-1.5" />
              <Handle className="-right-1.5 -top-1.5" />
              <Handle className="-bottom-1.5 -left-1.5" />
              <Handle className="-bottom-1.5 -right-1.5" />
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                <Image
                  src="/img/sobre-wwdc25.jpg"
                  alt="Diego Santos na WWDC25, no Apple Park"
                  fill
                  sizes="(min-width: 1024px) 440px, 100vw"
                  className="ai-photo object-cover object-[30%_50%]"
                  style={delay(0)}
                />
              </div>
            </div>
            </HoverComment>
          </div>

          <div>
            <h3
              className="ai-rise text-balance text-4xl font-bold tracking-tight sm:text-5xl"
              style={delay(200)}
            >
              {a.title}
            </h3>
            <div
              className="ai-rise mt-6 flex max-w-xl flex-col gap-4 text-pretty text-lg text-neutral-600"
              style={delay(320)}
            >
              {a.text.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            {/* Profiles + contact actions */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {/* same button as the contact section's "Enviar e-mail" */}
              <span className="ai-pop block" style={delay(480)}>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 rounded-xl bg-figma-blue px-5 py-3 text-[15px] font-semibold text-white shadow-panel transition-colors hover:bg-figma-selection"
                >
                  <MailIcon className="h-4 w-4" />
                  {a.contact}
                </a>
              </span>
              {SOCIALS.map((s, i) => {
                const external = s.href.startsWith("http");
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    aria-label={s.name}
                    title={s.name}
                    className="flex h-10 items-center transition-opacity hover:opacity-70"
                  >
                    {/* animated wrapper, so the pop-in doesn't override the hover opacity */}
                    <span className="ai-pop block" style={delay(570 + i * 90)}>
                      <Image
                        src={s.logo}
                        alt=""
                        width={s.w}
                        height={s.h}
                        style={{ width: s.w, height: s.h, filter: ICON_SHADOW, borderRadius: s.radius }}
                      />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Logos of companies worked at: the strip is already moving, so it
            just fades in */}
        <div className="reveal rv-fade">
          <LogoMarquee />
        </div>

        {/* Experience + Education, side by side */}
        <div className="mt-24 grid gap-12 lg:grid-cols-2">
          {/* Experience: cards slide in from the left in order, like a timeline */}
          <div className="reveal">
            <h3 className="rv-rise text-3xl font-bold tracking-tight">
              {a.experienceHeading}
            </h3>
            <div className="mt-8 flex flex-col gap-5">
              {a.experiences.map((exp, i) => (
                <article
                  key={exp.role + exp.company}
                  className="rv-left rounded-2xl border border-neutral-200 p-7"
                  style={delay(120 + i * 110)}
                >
                  {/* role / company + period / description */}
                  <h4 className="text-xl font-semibold">{exp.role}</h4>
                  <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="text-neutral-500">{exp.company}</span>
                    <span className="text-sm text-neutral-500">{exp.period}</span>
                  </div>
                  <p className="mt-3 text-neutral-600">{exp.desc}</p>
                </article>
              ))}
            </div>

            {/* resume download, below the experience list */}
            <a
              href={RESUME}
              download
              style={delay(120 + a.experiences.length * 110 + 60)}
              className="rv-pop mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-figma-blue px-5 text-[15px] font-semibold text-white shadow-panel transition-colors hover:bg-figma-selection"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                <path
                  d="M8 2.5v8m0 0 3-3m-3 3-3-3M3 12.5h10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {a.resume}
            </a>
          </div>

          {/* Education + Awards, stacked in the right column */}
          <div className="flex flex-col lg:pb-[112px]">
            {/* Education: mirrors the experience column, from the right */}
            <div className="reveal">
            <h3 className="rv-rise text-3xl font-bold tracking-tight">
              {a.educationHeading}
            </h3>
            <div className="mt-8 flex flex-col gap-5">
              {a.education.map((edu, i) => (
                <article
                  key={edu.degree}
                  className="rv-right rounded-2xl border border-neutral-200 p-7"
                  style={delay(120 + i * 110)}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-xl font-semibold">{edu.degree}</h4>
                    <span className="text-sm text-neutral-500">{edu.period}</span>
                  </div>
                  <p className="mt-1 text-neutral-500">{edu.school}</p>
                  <p className="mt-3 text-neutral-600">{edu.desc}</p>
                </article>
              ))}
            </div>
            </div>

            {/* Awards & certificates. Its auto margin and the tools' split the free
                space evenly, so the gaps above and below this block are equal. */}
            {/* rows rise in and each badge lands like a seal being stamped */}
            <div className="reveal pt-16 lg:mt-auto">
            <h3 className="rv-rise text-3xl font-bold tracking-tight">
              {a.awardsHeading}
            </h3>
            <div className="mt-8 flex flex-col">
              {a.awards.map((award, i) => (
                <div
                  key={award.name}
                  className={`rv-rise flex items-start gap-4 py-5 first:pt-0 last:pb-0 ${
                    i > 0 ? "border-t border-neutral-200" : ""
                  }`}
                  style={delay(120 + i * 140)}
                >
                  <span className="rv-stamp block shrink-0" style={{ "--sub": "250ms" } as CSSProperties}>
                    {award.kind === "certificate" ? <CertificateBadge /> : <AwardBadge />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{award.name}</p>
                    <p className="text-sm text-neutral-500">{award.org}</p>
                    <p className="mt-2 text-sm text-neutral-600">{award.desc}</p>
                  </div>
                  {award.year && (
                    <span className="flex shrink-0 items-center gap-2 text-sm text-neutral-500">
                      {/* still in progress (e.g. a course being taken) */}
                      {award.status && (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200 dark:text-amber-300">
                          {award.status}
                        </span>
                      )}
                      {award.year}
                    </span>
                  )}
                </div>
              ))}
            </div>
            </div>

            {/* Tools — pushed to the bottom of the column, ending 32px above the last
                experience card (the 112px pad = resume button + its margin + 32px). */}
            {/* icons pop onto the canvas one by one, like layers being dropped */}
            <div className="reveal pt-16 lg:mt-auto">
            <h3 className="rv-rise text-3xl font-bold tracking-tight">
              {a.toolsHeading}
            </h3>
            {/* icons only; hovering types the tool name, like the hero stickers */}
            <ul className="mt-6 flex flex-wrap items-center gap-6">
              {TOOLS.map((tool, i) => (
                <li key={tool.name} className="rv-pop" style={delay(120 + i * 70)}>
                  <HoverComment
                    comment={tool.name}
                    className="flex h-10 w-10 cursor-default items-center justify-center"
                  >
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      width={40}
                      height={40}
                      className={`h-9 w-9 object-contain ${"invertInDark" in tool ? "dark:invert" : ""}`}
                    />
                  </HoverComment>
                </li>
              ))}
              {/* "+": there are more tools than the ones listed */}
              <li className="rv-pop" style={delay(120 + TOOLS.length * 70)}>
                <HoverComment
                  comment={a.toolsMore}
                  className="flex h-10 w-10 cursor-default items-center justify-center"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    role="img"
                    aria-label={a.toolsMore}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </HoverComment>
              </li>
            </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
