"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

const EMAIL = "diegofsants04@gmail.com";
const LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/diegoferrsantos",
    badge: (
      <Image
        src="/logos/linkedin.svg"
        alt="LinkedIn"
        width={28}
        height={28}
        className="h-7 w-7 rounded-md"
      />
    ),
  },
  {
    name: "Behance",
    href: "https://www.behance.net/imdi_e",
    badge: (
      <Image
        src="/logos/behance.svg"
        alt="Behance"
        width={28}
        height={28}
        className="h-7 w-7 rounded-md"
      />
    ),
  },
  {
    name: "Figma Community",
    href: "https://www.figma.com/@diegosantos",
    badge: (
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1E1E1E]">
        <svg viewBox="0 0 12 18" className="h-4 w-auto" aria-hidden>
          <path d="M6 9a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" fill="#1ABCFE" />
          <path d="M0 15a3 3 0 0 1 3-3h3v3a3 3 0 1 1-6 0z" fill="#0ACF83" />
          <path d="M6 0v6h3a3 3 0 1 0 0-6H6z" fill="#FF7262" />
          <path d="M0 3a3 3 0 0 0 3 3h3V0H3a3 3 0 0 0-3 3z" fill="#F24E1E" />
          <path d="M0 9a3 3 0 0 0 3 3h3V6H3a3 3 0 0 0-3 3z" fill="#A259FF" />
        </svg>
      </span>
    ),
  },
];

export function ProfileMenu() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // clipboard may be unavailable; the address stays visible in the menu
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex h-14 w-[200px] items-center gap-3 rounded-2xl bg-white px-4 shadow-panel transition-colors hover:bg-neutral-50"
      >
        <span
          role="img"
          aria-label="Diego Santos"
          className="h-9 w-9 rounded-full bg-no-repeat"
          style={{
            backgroundImage: "url(/img/diego.png)",
            backgroundSize: "108%",
            backgroundPosition: "50% 52%",
          }}
        />
        <span className="text-[15px] font-semibold">Diego Santos</span>
        <svg
          viewBox="0 0 12 12"
          className={`h-3 w-3 text-neutral-500 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] w-72 rounded-2xl bg-[#1E1E1E] p-2 text-white shadow-2xl">
          <div className="flex flex-col items-center px-4 pb-5 pt-6">
            <span
              role="img"
              aria-label="Diego Santos"
              className="h-16 w-16 rounded-full bg-no-repeat"
              style={{
                backgroundImage: "url(/img/diego.png)",
                backgroundSize: "108%",
                backgroundPosition: "50% 52%",
              }}
            />
            <p className="mt-3 text-[15px] font-semibold">Diego Santos</p>
            <p className="mt-0.5 text-sm text-neutral-400">{t.profile.role}</p>
            <p className="mt-0.5 text-sm text-neutral-400">{EMAIL}</p>
          </div>

          <div className="border-t border-white/10 py-2">
            <p className="px-3 pb-1 pt-1.5 text-xs text-neutral-500">
              {t.profile.networks}
            </p>
            {LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[15px] hover:bg-white/10"
              >
                {link.badge}
                <span className="flex-1">{link.name}</span>
                <svg viewBox="0 0 12 12" className="h-3 w-3 text-neutral-500" aria-hidden>
                  <path
                    d="M4.5 2.5 8 6l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
          </div>

          <div className="border-t border-white/10 py-2">
            <button
              onClick={copyEmail}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[15px] hover:bg-white/10"
            >
              <span className="flex h-7 w-7 items-center justify-center">
                {copied ? (
                  <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#0ACF83]" aria-hidden>
                    <path
                      d="m3 8.5 3.5 3.5L13 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                    <rect
                      x="5.5"
                      y="5.5"
                      width="8"
                      height="8"
                      rx="1.5"
                      stroke="currentColor"
                      fill="none"
                    />
                    <path
                      d="M10.5 5.5v-2A1.5 1.5 0 0 0 9 2H4a1.5 1.5 0 0 0-1.5 1.5v5A1.5 1.5 0 0 0 4 10h1.5"
                      stroke="currentColor"
                      fill="none"
                    />
                  </svg>
                )}
              </span>
              {copied ? t.profile.copied : t.profile.copyEmail}
            </button>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-[15px] hover:bg-white/10"
            >
              <span className="flex h-7 w-7 items-center justify-center">
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                  <rect
                    x="1.5"
                    y="3.5"
                    width="13"
                    height="9"
                    rx="1.5"
                    stroke="currentColor"
                    fill="none"
                  />
                  <path
                    d="m2.5 5 5.5 4 5.5-4"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {t.profile.sendEmail}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
