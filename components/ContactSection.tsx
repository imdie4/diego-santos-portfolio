"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { useReveal } from "./useReveal";
import { MailIcon } from "./icons";
import { MultiplayerCursor, StickyNote } from "./ContactCanvas";

const EMAIL = "diegofsants04@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/diegoferrsantos";
const BEHANCE = "https://www.behance.net/imdi_e";

export function ContactSection() {
  const { t } = useLang();
  const c = t.contact;
  // The closing invitation builds up line by line, then the actions pop in.
  const ref = useReveal<HTMLElement>(".reveal");
  const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

  return (
    <section
      ref={ref}
      id="contato"
      className="relative overflow-hidden py-28 text-center"
    >
      {/* Same Figma-style grid background as the hero (decorative) */}
      <div
        aria-hidden
        className="canvas-grid pointer-events-none absolute inset-0 -z-10"
      />

      <div className="reveal mx-auto max-w-2xl px-6">
        {/* Figma canvas pieces around the invitation (wide screens only, so
            they never crowd the text) */}
        <div className="hidden xl:block">
          <StickyNote text={c.sticky} className="left-[9%] top-[18%]" at={700} />
          <MultiplayerCursor name="Diego" color="#A259FF" className="right-[18%] top-[9%]" at={820} />
          <StickyNote text={c.sticky2} tone="pink" className="right-[13%] top-[54%]" at={1180} />
          <MultiplayerCursor name={c.you} color="#0D99FF" className="left-[18%] top-[62%]" at={1060} drift="b" />
        </div>

        <h2
          className="rv-rise text-balance text-4xl font-bold tracking-tight sm:text-5xl"
          style={delay(120)}
        >
          {c.title}
        </h2>
        <p
          style={delay(260)}
          className="rv-rise mx-auto mt-6 max-w-xl text-pretty text-lg text-neutral-600">
          {c.subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            style={delay(420)}
            className="rv-pop flex items-center gap-2 rounded-xl bg-figma-blue px-5 py-3 text-[15px] font-semibold text-white shadow-panel transition-colors hover:bg-figma-selection"
          >
            <MailIcon className="h-4 w-4" />
            {c.email}
          </a>
          <a
            href={LINKEDIN}
            style={delay(510)}
            target="_blank"
            rel="noreferrer"
            className="rv-pop flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[15px] font-semibold text-neutral-800 shadow-panel transition-colors hover:bg-neutral-50"
          >
            <Image src="/logos/linkedin.svg" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
            LinkedIn
          </a>
          <a
            href={BEHANCE}
            style={delay(600)}
            target="_blank"
            rel="noreferrer"
            className="rv-pop flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[15px] font-semibold text-neutral-800 shadow-panel transition-colors hover:bg-neutral-50"
          >
            <Image
              src="/logos/behance.svg"
              alt=""
              width={18}
              height={18}
              className="h-[18px] w-[18px] rounded-[2px]"
            />
            Behance
          </a>
        </div>

        <a
          href={`mailto:${EMAIL}`}
          style={delay(740)}
          className="rv-fade mt-8 inline-block text-sm text-neutral-500 transition-colors hover:text-figma-blue"
        >
          {EMAIL}
        </a>
      </div>
    </section>
  );
}
