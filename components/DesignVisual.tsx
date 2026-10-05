// Design-system showcase: typography (font specimen + type scale), color palette,
// and optionally an icon sheet and a component sheet.
// Configurable per case; defaults match the Lino case.

import Image from "next/image";

const BLUE = "#3366E4";

export type SheetImage = { src: string; width: number; height: number; alt: string };
const ROUNDED =
  'ui-rounded, "SF Pro Rounded", "Hiragino Maru Gothic ProN", "Nunito", system-ui, sans-serif';

const ALPHA_1 = "Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo";
const ALPHA_2 = "Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz";

// Type-scale points along a smooth wave, evenly spaced. Each label is centered
// under its dot; the first/last centers are inset by half their label width so
// the "12 pt" and "36 pt" labels touch the left/right edges of the viewBox.
const SCALE_W = 1180;
const DOT_R = 11;
const X_FIRST = 14; // half the width of "12 pt"
const X_LAST = SCALE_W - 37; // half the width of "36 pt"
const STEP = (X_LAST - X_FIRST) / 5;
const SCALE = [
  { y: 150, label: "12 pt", size: 13 },
  { y: 182, label: "14 pt", size: 15 },
  { y: 116, label: "16 pt", size: 18 },
  { y: 188, label: "18 pt", size: 20 },
  { y: 130, label: "24 pt", size: 25 },
  { y: 162, label: "36 pt", size: 33 },
].map((p, i) => ({ ...p, x: X_FIRST + i * STEP }));

// Cardinal-spline → cubic bezier path through the points.
function smoothPath(pts: { x: number; y: number }[]) {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export type PaletteColor = {
  hex: string;
  dark?: string;
  light?: string;
  role?: string;
  onLight?: boolean; // true → dark labels (for light swatches like yellow)
};

const COLORS: PaletteColor[] = [
  { hex: "#3366E4", dark: "#12237C", light: "#7E9BEA" },
  { hex: "#E47733", dark: "#5E2E12", light: "#ECB86E" },
  { hex: "#50A164", dark: "#234A1E", light: "#93C89D" },
  { hex: "#DC3F6A", dark: "#6B1330", light: "#E58BA4" },
];

const COLS_CLASS: Record<number, string> = {
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
};

function Typography({
  fontLines,
  fontStack,
  accent,
  gradFrom,
}: {
  fontLines: string[];
  fontStack: string;
  accent: string;
  gradFrom: string;
}) {
  return (
    <div style={{ fontFamily: fontStack, color: accent }}>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* name + weights — stretched to the height of the Aa block */}
        <div className="flex flex-col lg:justify-between">
          <h3 className="text-5xl font-bold leading-[0.95] tracking-tight [text-box:trim-start_cap_alphabetic] sm:text-6xl">
            {fontLines.map((line, i) => (
              <span key={line}>
                {line}
                {i < fontLines.length - 1 && <br />}
              </span>
            ))}
          </h3>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-2 text-xl sm:text-2xl [&>span]:[text-box:trim-end_cap_alphabetic]">
            <span className="font-normal">Regular</span>
            <span className="font-medium">Medium</span>
            <span className="font-semibold">Semibold</span>
          </div>
        </div>

        {/* Aa + alphabet */}
        <div>
          <p className="text-[6rem] font-bold leading-none tracking-tight [text-box:trim-start_cap_alphabetic] sm:text-[7rem]">
            Aa
          </p>
          <p className="mt-4 text-xl leading-relaxed sm:text-2xl">{ALPHA_1}</p>
          <p className="text-xl leading-relaxed [text-box:trim-end_cap_alphabetic] sm:text-2xl">
            {ALPHA_2}
          </p>
        </div>
      </div>

      {/* type scale wave */}
      <div className="mt-14 overflow-x-auto">
        <svg
          viewBox={`0 95 ${SCALE_W} 170`}
          className="h-auto w-full min-w-[640px]"
          role="img"
          aria-label="Escala tipográfica: 12, 14, 16, 18, 24 e 36 pt"
        >
          <defs>
            {/* light → the same color as the type above */}
            <linearGradient id="scaleGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={gradFrom} />
              <stop offset="1" stopColor={accent} />
            </linearGradient>
          </defs>
          <path
            d={smoothPath(SCALE)}
            fill="none"
            stroke="url(#scaleGrad)"
            strokeWidth={7}
            strokeLinecap="round"
          />
          {SCALE.map((p) => {
            return (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r={DOT_R} fill="#3f3f46" />
              <text
                x={p.x}
                y={252}
                textAnchor="middle"
                fontSize={p.size}
                fill={accent}
                style={{ fontFamily: fontStack }}
              >
                {p.label}
              </text>
            </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function Palette({
  palette,
  wcagNote,
}: {
  palette: PaletteColor[];
  wcagNote: string;
}) {
  return (
    <div>
      <div
        className={`grid grid-cols-2 gap-5 ${COLS_CLASS[palette.length] ?? "sm:grid-cols-4"}`}
      >
        {palette.map((c) => (
          <div key={c.hex}>
            <div
              className="keep-light relative flex h-32 flex-col justify-end rounded-2xl p-4"
              style={{ background: c.hex }}
            >
              {c.role && (
                <span
                  className={`text-sm font-semibold ${c.onLight ? "text-neutral-900" : "text-white"}`}
                >
                  {c.role}
                </span>
              )}
              <span
                className={`text-sm font-medium ${c.onLight ? "text-neutral-900/80" : "text-white/90"}`}
              >
                {c.hex}
              </span>
            </div>
            {c.dark && (
              <div
                className="mt-4 h-10 rounded-xl"
                style={{ background: c.dark }}
              />
            )}
            {c.light && (
              <div
                className="mt-3 h-10 rounded-xl"
                style={{ background: c.light }}
              />
            )}
          </div>
        ))}
      </div>

      {/* WCAG compliance note */}
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
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        {wcagNote}
      </p>
    </div>
  );
}

export function DesignVisual({
  wcagNote,
  fontLines = ["SF Pro", "Rounded"],
  fontStack = ROUNDED,
  accent = BLUE,
  gradFrom = "#E6ECFC",
  palette = COLORS,
  iconSheet,
  components,
}: {
  wcagNote: string;
  fontLines?: string[];
  fontStack?: string;
  accent?: string;
  gradFrom?: string;
  palette?: PaletteColor[];
  iconSheet?: SheetImage;
  components?: React.ReactNode; // component showcase, supplied by the case
}) {
  return (
    <div className="flex flex-col gap-10">
      <Typography
        fontLines={fontLines}
        fontStack={fontStack}
        accent={accent}
        gradFrom={gradFrom}
      />
      <hr className="border-neutral-100" />
      <Palette palette={palette} wcagNote={wcagNote} />

      {iconSheet && (
        <>
          <hr className="border-neutral-100" />
          <Image
            src={iconSheet.src}
            alt={iconSheet.alt}
            width={iconSheet.width}
            height={iconSheet.height}
            unoptimized
            className="h-auto w-full"
          />
        </>
      )}

      {components && (
        <>
          <hr className="border-neutral-100" />
          {components}
        </>
      )}
    </div>
  );
}
