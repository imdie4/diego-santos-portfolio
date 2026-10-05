// Results dashboard: 4 colored columns (header pill + big stat card) with
// underwater waves, coral and blue bubbles — matches the reference mockup.

type Column = { header: string; value: string; caption: string };

type ColStyle = {
  bg: string;
  w1: string;
  coral: "left" | "right" | null;
  clock: boolean;
  // Illustrated card background (waves + coral baked in). When set, it
  // replaces the code-drawn waves and coral.
  bgImage?: string;
};

const LR = "/img/projects/lino-results";

// Default styling per column index (blue, rose, green, orange) — the Lino case.
const STYLE: ColStyle[] = [
  { bg: "#3366E4", w1: "#4F79EA", coral: "right", clock: true, bgImage: `${LR}/blue.svg` },
  { bg: "#DC3F6A", w1: "#E15F82", coral: null, clock: false, bgImage: `${LR}/rose.svg` },
  { bg: "#50A164", w1: "#6FB37F", coral: "left", clock: false, bgImage: `${LR}/green.svg` },
  { bg: "#FF822D", w1: "#E9904F", coral: null, clock: false, bgImage: `${LR}/orange.svg` },
];

const GRID_COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

function Waves({ mid }: { mid: string }) {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 h-2/5 w-full"
      viewBox="0 0 300 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0,55 C60,32 120,72 180,52 C240,34 300,58 300,58 L300,120 L0,120 Z"
        fill="#ffffff"
        opacity="0.14"
      />
      <path
        d="M0,82 C70,60 140,96 210,80 C262,68 300,86 300,86 L300,120 L0,120 Z"
        fill={mid}
      />
    </svg>
  );
}

function Coral({ side }: { side: "left" | "right" }) {
  return (
    <svg
      className={`absolute bottom-3 h-16 w-14 ${side === "right" ? "right-3" : "left-3"}`}
      viewBox="0 0 60 80"
      fill="none"
      aria-hidden
    >
      <path
        d="M30 80V34M30 46C30 46 22 42 20 32C18 22 24 16 24 16M30 44C30 44 38 40 40 30C42 20 36 14 36 14M30 34C30 34 26 28 27 20M30 34C30 34 34 28 33 20"
        stroke="#E8C77E"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const Clock = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" fill="currentColor" />
    <path
      d="M12 7.5V12l3 2"
      stroke="#3366E4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Decorative blue bubbles straddling the columns (percent of the whole grid).
const BUBBLES = [
  { l: 2, t: 24, s: 42 },
  { l: 5, t: 37, s: 22 },
  { l: 26, t: 82, s: 28 },
  { l: 29, t: 91, s: 18 },
  { l: 48, t: 32, s: 26 },
  { l: 51, t: 42, s: 16 },
  { l: 71, t: 27, s: 40 },
  { l: 75, t: 41, s: 20 },
  { l: 97, t: 80, s: 26 },
];

export function ResultsImpact({
  columns,
  styles = STYLE,
}: {
  columns: Column[];
  styles?: ColStyle[];
}) {
  return (
    <div className="relative">
      <div
        className={`grid grid-cols-2 gap-4 ${GRID_COLS[columns.length] ?? "sm:grid-cols-4"}`}
      >
        {columns.map((col, i) => {
          const s = styles[i % styles.length];
          return (
            <div key={col.header} className="flex flex-col gap-4">
              {/* header pill */}
              <div
                className="flex items-center justify-center gap-2 rounded-2xl py-3.5 text-center text-base font-semibold text-white"
                style={{ background: s.bg }}
              >
                {s.clock && (
                  <span className="text-white">
                    <Clock />
                  </span>
                )}
                {col.header}
              </div>

              {/* stat card */}
              <div
                className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl px-4 py-6 text-center text-white ${
                  s.bgImage ? "" : "min-h-[300px]"
                }`}
                style={
                  s.bgImage
                    ? {
                        // Keep the illustration's own proportions (209×340) and
                        // keep the text in the flat upper area, clear of the coral.
                        background: `${s.bg} url("${s.bgImage}") center bottom / cover no-repeat`,
                        aspectRatio: "209 / 340",
                        paddingBottom: "38%",
                      }
                    : { background: s.bg }
                }
              >
                {!s.bgImage && <Waves mid={s.w1} />}
                {!s.bgImage && s.coral && <Coral side={s.coral} />}
                <span className="relative z-10 text-5xl font-bold tracking-tight sm:text-6xl">
                  {col.value}
                </span>
                <span className="relative z-10 mt-3 text-base font-medium leading-snug sm:text-lg">
                  {col.caption}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* blue bubbles overlay */}
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8FD3F5]"
          style={{
            left: `${b.l}%`,
            top: `${b.t}%`,
            width: b.s,
            height: b.s,
          }}
        />
      ))}
    </div>
  );
}
