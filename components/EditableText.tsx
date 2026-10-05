"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { useLang } from "@/lib/i18n";

const FONTS = [
  {
    key: "sans",
    label: "Sans",
    css: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
  },
  { key: "serif", label: "Serif", css: "Georgia, 'Times New Roman', serif" },
  {
    key: "mono",
    label: "Mono",
    css: "'SF Mono', 'JetBrains Mono', ui-monospace, 'Courier New', monospace",
  },
] as const;

const COLORS = [
  { key: "black", value: "#1E1E1E" },
  { key: "blue", value: "#0D99FF" },
  { key: "purple", value: "#A259FF" },
  { key: "red", value: "#F24E1E" },
] as const;

const HANDLE =
  "absolute h-2.5 w-2.5 rounded-[1px] border-2 border-figma-selection bg-surface";

interface EditableTextProps {
  as?: ElementType;
  name: string;
  className?: string;
  rootClassName?: string;
  children: ReactNode;
}

export function EditableText({
  as: Tag = "p",
  name,
  className = "",
  rootClassName = "",
  children,
}: EditableTextProps) {
  const { t } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);

  const [open, setOpen] = useState(false);
  const [fontCss, setFontCss] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [size, setSize] = useState<number | null>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
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

  // Short grace period so the pointer can travel from the text to the panel.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function handleOpen() {
    clearTimeout(closeTimer.current);
    // seed the size stepper with the current rendered size on first open
    if (size === null && textRef.current) {
      const px = parseFloat(getComputedStyle(textRef.current).fontSize);
      setSize(Math.round(px));
    }
    setOpen(true);
  }

  function scheduleClose() {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  }

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const selected = open;

  return (
    <div
      ref={rootRef}
      className={`group/edit relative has-[[data-edit-open]]:z-30 ${rootClassName}`}
      // Opens on hover (click still opens it on touch screens).
      onPointerEnter={(e) => e.pointerType === "mouse" && handleOpen()}
      onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
    >
      <Tag
        ref={textRef}
        onClick={handleOpen}
        className={`cursor-pointer ${className}`}
        style={{
          fontFamily: fontCss ?? undefined,
          color: color ?? undefined,
          fontSize: size ?? undefined,
        }}
      >
        {children}
      </Tag>

      {/* Figma selection chrome */}
      <div
        className={`pointer-events-none absolute -inset-2 border-2 border-figma-selection transition-opacity ${
          selected ? "opacity-100" : "opacity-0 group-hover/edit:opacity-100"
        }`}
      >
        <span className={`${HANDLE} -left-1.5 -top-1.5`} />
        <span className={`${HANDLE} -right-1.5 -top-1.5`} />
        <span className={`${HANDLE} -bottom-1.5 -left-1.5`} />
        <span className={`${HANDLE} -bottom-1.5 -right-1.5`} />
        <span className="absolute -top-6 left-0 whitespace-nowrap text-xs font-medium text-figma-selection">
          {name}
        </span>
      </div>

      {open && (
        // pt-[18px] is an invisible bridge over the gap, so moving down to the
        // panel doesn't count as leaving the text.
        <div
          data-edit-open
          className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-[18px]"
          onClick={(e) => e.stopPropagation()}
        >
        <div className="w-64 cursor-default rounded-2xl bg-surface p-3 text-left shadow-2xl ring-1 ring-black/5">
          <p className="px-1 pb-2 text-xs font-medium uppercase tracking-wide text-neutral-400">
            {t.hero.edit.text} · {name}
          </p>

          {/* Font family */}
          <div className="flex gap-1.5">
            {FONTS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFontCss(f.css)}
                style={{ fontFamily: f.css }}
                className={`flex-1 rounded-lg border py-2 text-sm transition-colors ${
                  fontCss === f.css
                    ? "border-figma-blue bg-figma-blue/10 text-figma-blue"
                    : "border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                Ag
                <span className="mt-0.5 block text-[10px] text-neutral-400">
                  {f.label}
                </span>
              </button>
            ))}
          </div>

          {/* Font size */}
          <div className="mt-3 flex items-center justify-between rounded-lg border border-neutral-200 px-2 py-1.5">
            <span className="text-xs text-neutral-400">{t.hero.edit.size}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSize((s) => Math.max(10, (s ?? 16) - 2))}
                className="flex h-6 w-6 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-medium tabular-nums">
                {size ?? "—"}
              </span>
              <button
                onClick={() => setSize((s) => Math.min(120, (s ?? 16) + 2))}
                className="flex h-6 w-6 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Color */}
          <div className="mt-3 flex items-center justify-between px-1">
            <span className="text-xs text-neutral-400">{t.hero.edit.color}</span>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setColor(c.value)}
                  style={{ backgroundColor: c.value }}
                  aria-label={c.key}
                  className={`h-6 w-6 rounded-full transition-transform hover:scale-110 ${
                    color === c.value
                      ? "ring-2 ring-figma-blue ring-offset-2"
                      : "ring-1 ring-black/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
