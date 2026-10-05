"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

type Theme = "light" | "dark";

/** localStorage key; app/layout.tsx reads it before paint to avoid a flash. */
export const THEME_KEY = "theme";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <circle cx="12" cy="12" r="4.5" />
      <path
        d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a.6.6 0 0 0-.8-.7A9.5 9.5 0 1 0 21.2 15.4a.6.6 0 0 0-.7-.8z" />
    </svg>
  );
}

/** Light / dark switch, in the same segmented style as the old PT/EN toggle. */
export function ThemeToggle() {
  const { t } = useLang();
  const [theme, setTheme] = useState<Theme>("light");

  // pick up what the pre-paint script in layout.tsx already applied
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function choose(next: Theme) {
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // storage may be blocked; the choice still applies for this visit
    }
  }

  const options: { id: Theme; label: string; Icon: () => JSX.Element }[] = [
    { id: "light", label: t.theme.light, Icon: SunIcon },
    { id: "dark", label: t.theme.dark, Icon: MoonIcon },
  ];

  return (
    <div
      role="radiogroup"
      aria-label={t.theme.label}
      className="flex h-14 w-[200px] items-center justify-center gap-1 rounded-2xl bg-surface px-1.5 shadow-panel"
    >
      {options.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={theme === id}
          onClick={() => choose(id)}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
            theme === id
              ? "bg-neutral-100 text-figma-blue"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
        >
          <Icon />
          {label}
        </button>
      ))}
    </div>
  );
}
