"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { MultiplayerCursor } from "./ContactCanvas";

/** Corner handle of a Figma selection frame. */
function Handle({ className }: { className: string }) {
  return (
    <span
      className={`absolute h-2.5 w-2.5 rounded-[1px] border-2 border-figma-selection bg-white ${className}`}
    />
  );
}

/**
 * 404 in the site's Figma language: an empty, selected frame on the canvas
 * with a lost multiplayer cursor, and the ways back.
 */
export function NotFoundView() {
  const { t } = useLang();
  const n = t.notFound;

  return (
    <section className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 pb-24">
      {/* same canvas grid as the hero, also behind the fixed header */}
      <div
        aria-hidden
        className="canvas-grid hero-fade pointer-events-none absolute bottom-0 left-1/2 top-[-8rem] -z-10 w-screen -translate-x-1/2"
      />

      <div className="hero-rise relative w-full max-w-xl">
        <span className="absolute -top-7 left-0 text-sm font-medium text-figma-selection">
          {n.layer}
        </span>
        <div className="relative border-2 border-figma-selection bg-white/70 px-8 py-14 text-center backdrop-blur-sm sm:px-12">
          <Handle className="-left-1.5 -top-1.5" />
          <Handle className="-right-1.5 -top-1.5" />
          <Handle className="-bottom-1.5 -left-1.5" />
          <Handle className="-bottom-1.5 -right-1.5" />

          <p className="font-mono text-6xl font-bold tracking-tight text-figma-selection sm:text-7xl">
            404
          </p>
          <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {n.title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-pretty text-lg text-neutral-600">{n.text}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-xl bg-figma-blue px-5 py-3 text-[15px] font-semibold text-white shadow-panel transition-colors hover:bg-figma-selection"
            >
              {n.home}
            </Link>
            <Link
              href="/#projetos"
              className="rounded-xl bg-white px-5 py-3 text-[15px] font-semibold text-neutral-800 shadow-panel transition-colors hover:bg-neutral-50"
            >
              {n.projects}
            </Link>
          </div>
        </div>

        {/* a lost collaborator wandering next to the frame */}
        <div data-inview="" className="reveal hidden sm:block">
          <MultiplayerCursor name={n.lost} color="#0D99FF" className="-bottom-12 -right-6" at={500} drift="b" />
        </div>
      </div>
    </section>
  );
}
