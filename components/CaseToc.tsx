"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/**
 * "On this page" index, fixed in the left gutter: numbered sections with a
 * vertical bar per item. Highlights the section in view; click scrolls to it.
 */
export function CaseToc({
  items,
  title,
  accent,
}: {
  items: TocItem[];
  title: string;
  accent: string;
}) {
  const [active, setActive] = useState(items[0]?.id);
  const [visible, setVisible] = useState(false);
  const ids = items.map((it) => it.id).join("|"); // stable effect dependency

  // Only show once the first section (Overview) scrolls into view.
  useEffect(() => {
    const first = document.getElementById(items[0]?.id);
    if (!first) return;
    const onScroll = () =>
      setVisible(first.getBoundingClientRect().top <= window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      // A section becomes active as it crosses the upper-middle of the viewport.
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav
      aria-label={title}
      aria-hidden={!visible}
      className={`fixed left-[max(16px,calc(50%-672px))] top-32 z-30 hidden max-h-[calc(100vh-10rem)] w-36 overflow-y-auto transition-opacity duration-300 [@media(min-width:1360px)]:block ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ul>
        {items.map((it, i) => {
          const on = active === it.id;
          return (
            <li key={it.id} className="py-0.5">
              <button
                type="button"
                onClick={() => go(it.id)}
                aria-current={on ? "true" : undefined}
                className="group flex w-full items-center gap-3 border-l-2 py-1.5 pl-3 text-left transition-colors"
                style={{ borderColor: on ? accent : "#e5e5e5" }}
              >
                <span
                  className="text-xs font-medium tabular-nums leading-5 transition-colors"
                  style={{ color: on ? accent : "#a3a3a3" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-sm leading-5 transition-colors ${
                    on ? "text-neutral-900" : "text-neutral-500 group-hover:text-neutral-800"
                  }`}
                >
                  {it.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
