"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Lino UI components, one card per component. Each Figma export stacks the
 * component's states in a single SVG; every card shows one state at a time
 * (by cropping that state's region of the SVG) and cross-fades between them.
 */

const SCALE = 1.4; // shared scale so relative sizes stay true
const INTERVAL = 1200; // ms each state stays on screen while hovered
const FIRST_STEP = 500; // ms until the first switch after hovering
const BASE = "/img/projects/lino-components";

type Comp = {
  file: string;
  alt: string;
  sheet: [number, number]; // SVG width/height
  w: number; // state region size, in SVG units
  h: number;
  pos: [number, number][]; // top-left of each state region
};

const col = (x: number, ys: number[]) => ys.map((y) => [x, y] as [number, number]);

const COMPONENTS: Comp[] = [
  { file: "tab-bar.svg", alt: "Tab bar", sheet: [193, 156], w: 183.6, h: 48.9, pos: col(4.4, [4.45, 53.35, 102.26]) },
  { file: "atividade.svg", alt: "Card de atividade", sheet: [175, 187], w: 158.9, h: 28.7, pos: col(7.9, [7.9, 43.46, 79, 114.6, 147.05]) },
  { file: "foto-perfil.svg", alt: "Foto de perfil", sheet: [188, 58], w: 46.5, h: 46.5, pos: [[7.1, 5.7], [70.4, 5.7], [133.7, 5.7]] },
  { file: "adc-atividade.svg", alt: "Adicionar atividade", sheet: [175, 38], w: 158, h: 20.5, pos: [[8.4, 8.4]] },
  { file: "text-field.svg", alt: "Campo de texto", sheet: [152, 53], w: 135.2, h: 34.8, pos: [[8, 9.5]] },
  { file: "cta-states.svg", alt: "Botão CTA", sheet: [90, 125], w: 73.6, h: 22, pos: col(7.9, [7.9, 36.8, 65.7, 94.6]) },
  { file: "cta.svg", alt: "Botão CTA pressionado", sheet: [90, 67], w: 73.6, h: 22, pos: col(7.9, [7.9, 36.8]) },
  { file: "answer-button.svg", alt: "Botões de resposta", sheet: [93, 123], w: 76.2, h: 21.6, pos: col(7.9, [7.9, 36.35, 64.8, 93.25]) },
  { file: "missao-popup-button.svg", alt: "Botão do pop-up de missão", sheet: [127, 89], w: 110.9, h: 33.1, pos: col(7.9, [7.9, 47.9]) },
  { file: "estalar-button.svg", alt: "Botão Estalar", sheet: [175, 79], w: 158.9, h: 27.8, pos: col(7.9, [7.9, 42.57]) },
  { file: "gravar-button.svg", alt: "Botão Gravar", sheet: [175, 79], w: 158.9, h: 27.8, pos: col(7.9, [7.9, 42.57]) },
  { file: "garama-button.svg", alt: "Botão Garama", sheet: [175, 79], w: 158.9, h: 27.8, pos: col(7.9, [7.9, 42.57]) },
];

function AnimatedComponent({ c }: { c: Comp }) {
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(false); // cycling while hovered
  const touch = useRef(false); // last pointer was touch/pen
  const n = c.pos.length;
  const interactive = n > 1;

  // Cycle through the states only while the card is hovered.
  useEffect(() => {
    if (!playing || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const next = () => setCur((i) => (i + 1) % n);
    let timer: ReturnType<typeof setInterval>;
    const first = setTimeout(() => {
      next();
      timer = setInterval(next, INTERVAL);
    }, FIRST_STEP);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [playing, n]);

  const [sw, sh] = c.sheet;

  return (
    <div
      className={`keep-light flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed bg-surface p-6 transition-colors ${
        interactive
          ? "cursor-pointer border-[#3366E4]/35 hover:border-[#3366E4]/70"
          : "border-[#3366E4]/35"
      }`}
      onPointerDown={(e) => {
        touch.current = e.pointerType !== "mouse";
      }}
      onPointerEnter={(e) => {
        if (interactive && e.pointerType === "mouse") setPlaying(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        setPlaying(false);
        setCur(0);
      }}
      onClick={() => {
        // On touch screens there's no hover: each tap advances one state.
        if (interactive && touch.current) setCur((i) => (i + 1) % n);
      }}
    >
      {/* window onto one state; every state is a layer, only the current one is visible */}
      <div
        role="img"
        aria-label={c.alt}
        className="relative w-full overflow-hidden"
        style={{ maxWidth: c.w * SCALE, aspectRatio: `${c.w} / ${c.h}` }}
      >
        {c.pos.map(([x, y], i) => (
          <Image
            key={i}
            src={`${BASE}/${c.file}`}
            alt=""
            aria-hidden
            width={sw}
            height={sh}
            unoptimized
            className="absolute h-auto max-w-none transition-opacity duration-500 ease-in-out motion-reduce:transition-none"
            style={{
              width: `${(sw / c.w) * 100}%`,
              left: `${(-x / c.w) * 100}%`,
              top: `${(-y / c.h) * 100}%`,
              opacity: i === cur ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* state dots — clickable, jump straight to a state (and pause the cycle) */}
      {interactive && (
        <div className="flex gap-1">
          {c.pos.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${c.alt} ${i + 1}/${n}`}
              aria-pressed={i === cur}
              onClick={(e) => {
                e.stopPropagation();
                setPlaying(false);
                setCur(i);
              }}
              className="flex h-4 w-4 items-center justify-center"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                  i === cur ? "bg-[#3366E4]" : "bg-neutral-200 hover:bg-neutral-400"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function LinoComponentStates({ hint }: { hint: string }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COMPONENTS.map((c) => (
          <AnimatedComponent key={c.file} c={c} />
        ))}
      </div>

      {/* interaction hint */}
      <p className="mt-5 flex items-center gap-2 text-sm text-neutral-500">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M9 11V5.5a1.5 1.5 0 013 0V11m0-1.5a1.5 1.5 0 013 0V11m0-.5a1.5 1.5 0 013 0V15a6 6 0 01-6 6h-.5a6 6 0 01-5-2.7L4.3 15.2a1.5 1.5 0 012.4-1.8L9 15.5" />
        </svg>
        {hint}
      </p>
    </div>
  );
}
