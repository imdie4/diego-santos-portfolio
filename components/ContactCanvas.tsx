"use client";

import type { CSSProperties } from "react";

/*
 * Figma/FigJam canvas pieces that decorate the contact section: sticky
 * notes and multiplayer cursors. All decorative (aria-hidden); they ride the
 * section's `.reveal` group, so each one pops in with its own `--delay`.
 */

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Multiplayer cursor: colored arrow plus a name tag, drifting gently. */
export function MultiplayerCursor({
  name,
  color,
  className,
  at,
  drift = "a",
}: {
  name: string;
  color: string;
  className: string;
  at: number;
  drift?: "a" | "b";
}) {
  return (
    <div aria-hidden className={`rv-pop pointer-events-none absolute ${className}`} style={delay(at)}>
      <div className={drift === "a" ? "cursor-drift-a" : "cursor-drift-b"}>
        <svg viewBox="0 0 24 24" className="h-6 w-6 drop-shadow-sm">
          <path
            d="M5.6 19.3 2 3.3a.9.9 0 0 1 1.3-1l15.1 7.2c.8.4.7 1.5-.1 1.8l-6.2 2.2a1 1 0 0 0-.5.4l-3.3 5.7c-.4.8-1.6.6-1.8-.3Z"
            fill={color}
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="ml-4 inline-block whitespace-nowrap rounded-full rounded-tl-sm px-2.5 py-1 text-xs font-semibold text-white shadow-md"
          style={{ background: color }}
        >
          {name}
        </span>
      </div>
    </div>
  );
}

/** FigJam sticky note. `tone` picks the paper color and its tilt. */
export function StickyNote({
  text,
  className,
  at,
  tone = "yellow",
}: {
  text: string;
  className: string;
  at: number;
  tone?: "yellow" | "pink";
}) {
  const paper = tone === "yellow" ? "-rotate-6 bg-[#FFE07A]" : "rotate-[5deg] bg-[#FFC2D6]";
  return (
    <div aria-hidden className={`rv-pop pointer-events-none absolute ${className}`} style={delay(at)}>
      <div
        className={`keep-light flex h-36 w-36 items-center justify-center p-4 text-left text-[15px] font-medium leading-snug text-neutral-800 shadow-[0_8px_20px_rgba(0,0,0,0.12)] ${paper}`}
      >
        {text}
      </div>
    </div>
  );
}
