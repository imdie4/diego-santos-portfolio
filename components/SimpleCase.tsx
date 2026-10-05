"use client";

import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { simpleCases, type CaseImage, type ContentBlock } from "@/lib/simpleCases";
import { ProjectCard } from "./ProjectCard";
import { CaseToc } from "./CaseToc";
import { Block } from "./caseUI";
import { useAutoReveal } from "./useReveal";

/** Renders inline **bold** inside a text string. */
function rich(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-neutral-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

/** A case image, or a numbered slot while the real file isn't there yet. */
function CaseFigure({ image, n }: { image: CaseImage; n: number }) {
  if (image.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width ?? 2048}
        height={image.height ?? 1046}
        className="h-auto w-full rounded-2xl ring-1 ring-black/5"
      />
    );
  }
  return (
    <div className="flex aspect-[1024/523] w-full flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 text-center">
      <span className="text-sm font-semibold text-neutral-500">Imagem {n}</span>
      <span className="text-xs text-neutral-400">{image.alt}</span>
    </div>
  );
}

function Blocks({
  blocks,
  accent,
  firstImage,
}: {
  blocks: ContentBlock[];
  accent: string;
  /** number of this section's first image */
  firstImage: number;
}) {
  let n = firstImage;
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((b, i) => {
        if (b.type === "p")
          return (
            <p key={i} className="max-w-3xl text-pretty text-lg leading-relaxed text-neutral-700">
              {rich(b.text)}
            </p>
          );
        if (b.type === "list")
          return (
            <ul key={i} className="flex max-w-3xl flex-col gap-3">
              {b.items.map((item) => (
                <li key={item} className="flex gap-3 text-lg leading-relaxed text-neutral-700">
                  <span
                    aria-hidden
                    className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: accent }}
                  />
                  <span>{rich(item)}</span>
                </li>
              ))}
            </ul>
          );
        return (
          <div key={i} className="mt-3 first:mt-0">
            <CaseFigure image={b.image} n={n++} />
          </div>
        );
      })}
    </div>
  );
}

/**
 * Image-and-text case study: Lino-style header and overview, then the old
 * portfolio's sections in order (see lib/simpleCases.ts).
 */
export function SimpleCase({ slug }: { slug: string }) {
  const { t } = useLang();
  const revealRef = useAutoReveal<HTMLElement>();
  const c = simpleCases[slug];
  if (!c) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const title = t.projects.items[index];
  const others = projects
    .map((p, i) => ({ ...p, title: t.projects.items[i] }))
    .filter((p) => p.slug !== slug);

  // Images are numbered in page order (the overview's is 1), so they can be
  // sent by number. firstImage[i] = number of section i's first image.
  const firstImage: number[] = [];
  c.sections.reduce((next, s) => {
    firstImage.push(next);
    return next + s.blocks.filter((b) => b.type === "img").length;
  }, 2);

  const toc = [
    { id: "sec-overview", label: "Overview" },
    ...c.sections.map((s) => ({ id: s.id, label: s.toc })),
  ];

  return (
    <article ref={revealRef} className="-mt-32 bg-surface pt-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* HERO — same as the Lino case */}
        <header className="pb-6 pt-4">
          <div className="hero-fade text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-figma-blue"
            >
              <span aria-hidden>←</span> Início
            </Link>
          </div>

          <div className="mt-10">
            <h1 className="hero-rise mx-auto max-w-4xl text-balance text-center text-4xl font-bold tracking-tight [--delay:80ms] sm:text-5xl">
              {title}
            </h1>
            <p className="hero-rise mx-auto mt-5 max-w-3xl text-pretty text-center text-lg text-neutral-600 [--delay:200ms]">
              {c.subtitle}
            </p>
            <dl className="hero-rise mt-10 grid grid-cols-2 gap-6 border-t border-neutral-100 pt-8 [--delay:320ms] sm:grid-cols-4">
              {c.meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                    {m.label}
                  </dt>
                  <dd className="mt-1 text-[15px] font-medium">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-rise mt-10 overflow-hidden rounded-2xl ring-1 ring-black/5 [--delay:440ms]">
            <Image
              src={c.cover.src!}
              alt={c.cover.alt}
              width={c.cover.width ?? 1600}
              height={c.cover.height ?? 800}
              className="h-auto w-full"
              priority
            />
          </div>
        </header>

        {/* OVERVIEW — same layout as the Lino case */}
        <Block label="Overview" icon="overview" id="sec-overview">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
                Problema
              </h3>
              <div className="mt-4 flex flex-1 flex-col gap-4">
                {c.overview.problem.map((p) => (
                  <div
                    key={p}
                    className="flex flex-1 items-center rounded-2xl bg-amber-50 p-5 text-neutral-800 ring-1 ring-amber-200"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
                  Solução
                </h3>
                <div className="mt-4 rounded-2xl bg-emerald-50 p-5 text-neutral-800 ring-1 ring-emerald-200">
                  {c.overview.solution}
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
                  Impacto
                </h3>
                <div className="mt-4 flex flex-1 items-center">
                  <div className="grid w-full grid-cols-2 gap-4">
                    {c.overview.impact.map((s) => (
                      <div key={s.value} className="flex items-end gap-2">
                        <span
                          className="text-4xl font-bold leading-none tracking-tight sm:text-5xl"
                          style={{ color: c.accent }}
                        >
                          {s.value}
                        </span>
                        <span className="text-sm leading-tight" style={{ color: c.accent }}>
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <CaseFigure image={c.overview.image} n={1} />
          </div>
        </Block>

        {/* the old portfolio's sections, in their original order */}
        {c.sections.map((s, i) => (
          <Block key={s.id} id={s.id}>
            <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight">{s.title}</h2>
            <Blocks blocks={s.blocks} accent={c.accent} firstImage={firstImage[i]} />
          </Block>
        ))}

        <Block label="Outros projetos" icon="others" id="sec-outros">
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

      <CaseToc items={toc} title="Nesta página" accent={c.accent} />
    </article>
  );
}
