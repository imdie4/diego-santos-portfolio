"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang, type Lang } from "@/lib/i18n";
import { CommentIcon, CursorIcon, FrameIcon, TextIcon } from "./icons";
import { ProfileMenu } from "./ProfileMenu";
import { ThemeToggle } from "./ThemeToggle";

const SHOW_LANG_TOGGLE = false;

// IA Playground is hidden for now (PlaygroundSection.tsx and its texts are kept).
const sectionIds = ["inicio", "projetos", "sobre", "contato"] as const;
type SectionId = (typeof sectionIds)[number];

const toolIcons = {
  inicio: CursorIcon,
  projetos: FrameIcon,
  sobre: TextIcon,
  contato: CommentIcon,
} as const;

export function Header() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<SectionId>("inicio");

  useEffect(() => {
    if (!onHome) return;
    // The active item is the last section whose top has passed 40% of the
    // viewport. Contato is short and sits at the very end, so it never gets
    // there: being scrolled to the bottom counts as being on it.
    let frame = 0;
    function update() {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) return setActive("contato");
      const line = window.innerHeight * 0.4;
      let current: SectionId = "inicio";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome]);

  // On a case study highlight "Projetos"; elsewhere (e.g. the 404) nothing.
  const activeId: SectionId | null = onHome
    ? active
    : pathname.startsWith("/cases/")
      ? "projetos"
      : null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between p-6">
      <ProfileMenu />

      <nav className="absolute left-1/2 top-1/2 flex h-14 -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-2xl bg-surface px-1.5 shadow-panel">
        {sectionIds.map((id) => {
          const Icon = toolIcons[id];
          const isActive = activeId === id;
          return (
            <a
              key={id}
              href={id === "inicio" ? "/" : `/#${id}`}
              onClick={() => setActive(id)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-[15px] transition-colors ${
                isActive
                  ? "bg-figma-blue font-semibold text-white"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              {t.nav[id]}
            </a>
          );
        })}
      </nav>

      {/* Language switch is hidden for now (the site stays in PT); the dark
          mode switch takes its place. Flip SHOW_LANG_TOGGLE to bring it back. */}
      {SHOW_LANG_TOGGLE ? (
        <div className="flex h-14 w-[200px] items-center justify-center gap-1 rounded-2xl bg-surface px-1.5 shadow-panel">
          {(["pt", "en"] as Lang[]).map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold uppercase transition-colors ${
                lang === code
                  ? "bg-neutral-100 text-figma-blue"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <span className="text-base leading-none" aria-hidden>
                {code === "pt" ? "🇧🇷" : "🇺🇸"}
              </span>
              {code}
            </button>
          ))}
        </div>
      ) : (
        <ThemeToggle />
      )}
    </header>
  );
}
