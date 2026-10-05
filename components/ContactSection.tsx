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

/** Diego's round avatar, as in a Figma comment. */
function Avatar() {
  return (
    <span
      aria-hidden
      className="block h-full w-full rounded-full bg-no-repeat"
      style={{
        backgroundImage: "url(/img/diego.png)",
        backgroundSize: "108%",
        backgroundPosition: "50% 52%",
      }}
    />
  );
}

/* Figma comment-thread header icons (decorative). */
function DotsIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
      <circle cx="4" cy="10" r="1.6" />
      <circle cx="10" cy="10" r="1.6" />
      <circle cx="16" cy="10" r="1.6" />
    </svg>
  );
}

function ResolveIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="10" r="8" />
      <path d="m6.5 10.2 2.4 2.4 4.6-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.5 4.5l11 11M15.5 4.5l-11 11" strokeLinecap="round" />
    </svg>
  );
}

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
        <div className="hidden [@media(min-width:1180px)]:block">
          <StickyNote text={c.sticky} className="left-[9%] top-[18%]" at={700} />
          <MultiplayerCursor name="Diego" color="#A259FF" className="right-[18%] top-[9%]" at={820} />
          <StickyNote text={c.sticky2} tone="pink" className="right-[13%] top-[54%]" at={1180} />
          <MultiplayerCursor name={c.you} color="#0D99FF" className="left-[18%] top-[62%]" at={1060} drift="b" />
        </div>

        {/* The invitation as an open Figma comment thread. Where Figma has the
            "Reply" field, the replies are the contact actions. */}
        <div className="rv-pop mx-auto text-left" style={delay(120)}>
          <div className="overflow-hidden rounded-3xl bg-surface shadow-[0_12px_32px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
            {/* thread header */}
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 sm:px-7">
              <span className="text-base font-semibold text-neutral-900">{c.commentHeader}</span>
              <span aria-hidden className="flex items-center gap-4 text-neutral-800">
                <DotsIcon />
                <ResolveIcon />
                <CloseIcon />
              </span>
            </div>

            <div className="px-6 pb-6 pt-5 sm:px-7">
              {/* the comment: author row (avatar, name, time centered on one
                  line), then the text indented under the name */}
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 shrink-0">
                  <Avatar />
                </span>
                <p className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2">
                  <span className="text-lg font-semibold text-neutral-900">Diego Santos</span>
                  <span className="text-neutral-400">{c.commentTime}</span>
                </p>
                <span aria-hidden className="text-neutral-800">
                  <DotsIcon />
                </span>
              </div>
              <div className="mt-4 sm:pl-[52px]">
                <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                  {c.title}
                </h2>
                <p className="mt-3 text-pretty text-lg text-neutral-600">{c.subtitle}</p>
              </div>

              {/* reply row: the actions are the replies, aligned with the
                  comment text (avatar 40px + 12px gap) */}
              <div className="mt-6 sm:pl-[52px]">
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={`mailto:${EMAIL}`}
                    style={delay(420)}
                    className="rv-pop flex items-center gap-2 rounded-xl bg-figma-blue px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-figma-selection"
                  >
                    <MailIcon className="h-4 w-4" />
                    {c.email}
                  </a>
                  <a
                    href={LINKEDIN}
                    style={delay(510)}
                    target="_blank"
                    rel="noreferrer"
                    className="rv-pop flex items-center gap-2 rounded-xl bg-neutral-100 px-5 py-3 text-[15px] font-semibold text-neutral-800 transition-colors hover:bg-neutral-200"
                  >
                    <Image src="/logos/linkedin.svg" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
                    LinkedIn
                  </a>
                  <a
                    href={BEHANCE}
                    style={delay(600)}
                    target="_blank"
                    rel="noreferrer"
                    className="rv-pop flex items-center gap-2 rounded-xl bg-neutral-100 px-5 py-3 text-[15px] font-semibold text-neutral-800 transition-colors hover:bg-neutral-200"
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
              </div>
            </div>
          </div>
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
