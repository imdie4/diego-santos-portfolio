"use client";

import type { CSSProperties, ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import { useReveal } from "./useReveal";

/** Offset of a thumbnail detail from its card's own entrance. */
const sub = (ms: number) => ({ "--sub": `${ms}ms` }) as CSSProperties;

function HeartIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M8 13.5S2 10 2 5.9C2 4 3.5 2.5 5.3 2.5c1.1 0 2.1.5 2.7 1.4.6-.9 1.6-1.4 2.7-1.4C12.5 2.5 14 4 14 5.9c0 4.1-6 7.6-6 7.6z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M3 13.5c.7-2.3 2.7-3.5 5-3.5s4.3 1.2 5 3.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M4 10a6 6 0 0 1 10.5-4M16 10a6 6 0 0 1-10.5 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M14.5 2.5V6H11M5.5 17.5V14H9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* FigJam-style dotted thumbnails, one per experiment */

function ThumbFrame({
  bg,
  children,
}: {
  bg: string;
  children: ReactNode;
}) {
  return (
    <div
      className="relative flex h-full items-center justify-center overflow-hidden rounded-xl p-5"
      style={{
        background: bg,
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.35) 1.2px, transparent 1.2px)",
        backgroundSize: "14px 14px",
      }}
    >
      {children}
    </div>
  );
}

function PaletteThumb() {
  return (
    <ThumbFrame bg="#7C5CFF">
      <div className="flex flex-col items-center gap-3">
        <span
          className="rv-pop rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#7C5CFF]"
          style={sub(250)}
        >
          ✦ gerar paleta
        </span>
        <div className="flex gap-1.5">
          {/* the palette "generates": swatches pop in one after another */}
          {["#F24E1E", "#FFC700", "#0ACF83", "#1ABCFE", "#A259FF"].map((c, i) => (
            <span
              key={c}
              className="rv-pop h-9 w-7 rounded-md shadow"
              style={{ background: c, ...sub(500 + i * 80) }}
            />
          ))}
        </div>
      </div>
    </ThumbFrame>
  );
}

function CopyThumb() {
  return (
    <ThumbFrame bg="#12B76A">
      <div className="w-full space-y-2">
        {/* a short chat: the prompt is sent, then the reply arrives */}
        <div
          className="rv-msg ml-auto w-3/4 origin-bottom-right rounded-2xl rounded-tr-sm bg-white/90 px-3 py-2 text-[11px] text-neutral-700"
          style={sub(300)}
        >
          Escreva um CTA curto…
        </div>
        <div
          className="rv-msg w-4/5 origin-bottom-left rounded-2xl rounded-tl-sm bg-[#0B3D2E] px-3 py-2 text-[11px] text-white"
          style={sub(850)}
        >
          “Comece grátis em 2 minutos ✨”
        </div>
      </div>
    </ThumbFrame>
  );
}

function FeedbackThumb() {
  return (
    <ThumbFrame bg="#FF7A59">
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {[
          ["Bug", "#EF4444"],
          ["UX", "#7C5CFF"],
          ["Elogio", "#0ACF83"],
          ["Ideia", "#1ABCFE"],
          ["Urgente", "#111827"],
          ["Dúvida", "#F59E0B"],
        ].map(([label, color], i) => (
          // feedback gets tagged one item at a time
          <span
            key={label}
            className="rv-pop rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow"
            style={{ background: color as string, ...sub(300 + i * 90) }}
          >
            {label}
          </span>
        ))}
      </div>
    </ThumbFrame>
  );
}

const thumbs: ReactNode[] = [
  <PaletteThumb key="p" />,
  <CopyThumb key="c" />,
  <FeedbackThumb key="f" />,
];

export function PlaygroundSection() {
  const { t } = useLang();
  const pg = t.playground;
  const ref = useReveal<HTMLElement>(".reveal");

  return (
    <section ref={ref} id="ia-playground" className="scroll-mt-28 bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <h2 className="rv-rise text-3xl font-bold tracking-tight">{pg.heading}</h2>
          <p
            className="rv-rise mt-3 max-w-2xl text-neutral-600"
            style={{ "--delay": "120ms" } as CSSProperties}
          >
            {pg.subtitle}
          </p>
        </div>

        {/* Figma "Recommended resources" style panel. It opens like a Figma
            panel, then each experiment plays out what it does. */}
        <div className="reveal rv-panel mt-10 rounded-3xl bg-neutral-100 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{pg.panelTitle}</h3>
            <div className="flex items-center gap-3 text-neutral-500">
              <button
                className="transition-colors hover:text-neutral-800"
                aria-label="Atualizar"
              >
                <RefreshIcon />
              </button>
              <button
                className="transition-colors hover:text-neutral-800"
                aria-label="Fechar"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(3,1fr)_auto]">
            {pg.items.map((item, i) => (
              <article
                key={item.title}
                className="rv-rise group cursor-pointer"
                style={{ "--delay": `${200 + i * 150}ms` } as CSSProperties}
              >
                <div className="h-44 overflow-hidden rounded-xl ring-1 ring-black/5 transition-shadow group-hover:shadow-lg">
                  {thumbs[i]}
                </div>
                <h4 className="mt-3 font-medium">{item.title}</h4>
                <div className="mt-1 flex items-center gap-3 text-[13px] text-neutral-500">
                  <span>
                    {pg.by} {item.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <HeartIcon />
                    {item.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <PersonIcon />
                    {item.views}
                  </span>
                </div>
              </article>
            ))}

            {/* "See more" trailing item */}
            <div
              className="rv-fade flex items-center justify-center lg:w-40"
              style={{ "--delay": "900ms" } as CSSProperties}
            >
              <button className="text-[15px] font-semibold text-figma-blue hover:underline">
                {pg.seeMore} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
