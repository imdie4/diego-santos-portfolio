// Learnings: two reflection cards (what I'd change / what worked) + an
// "open points → next steps" panel.

type Tone = "orange" | "green";

const TONE: Record<
  Tone,
  { border: string; chip: string; text: string }
> = {
  orange: {
    border: "border-orange-500/30",
    chip: "bg-orange-500/15 text-orange-500",
    text: "text-orange-500",
  },
  green: {
    border: "border-emerald-500/30",
    chip: "bg-emerald-500/15 text-emerald-500",
    text: "text-emerald-500",
  },
};

// Rewind icon (what I'd do differently) / check icon (what worked).
const ICON: Record<Tone, React.ReactNode> = {
  orange: (
    <path
      d="M11 6L5 12l6 6M5 12h9a5 5 0 015 5v1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  green: (
    <path
      d="M5 12.5l4.5 4.5L19 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

// Icons for the open-points list — retention metric (chart) and proactive alert (bell).
const OPEN_ICONS: React.ReactNode[] = [
  <path key="chart" d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6" />,
  <path
    key="bell"
    d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.5 21a2 2 0 01-3 0"
  />,
];

export type Reflection = {
  tone: Tone;
  label: string;
  heading: string;
  text: string;
};

export function LearningsSection({
  reflections,
  openItems,
  nextStepsLabel,
}: {
  reflections: Reflection[];
  openItems: { heading: string; text: string }[];
  nextStepsLabel: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* reflection cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {reflections.map((r) => {
          const t = TONE[r.tone];
          return (
            <div
              key={r.heading}
              className={`flex flex-col rounded-2xl border-2 p-7 ${t.border}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${t.chip}`}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    {ICON[r.tone]}
                  </svg>
                </span>
                <span
                  className={`text-xs font-semibold uppercase tracking-wide ${t.text}`}
                >
                  {r.label}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight text-neutral-900">
                {r.heading}
              </h3>
              <p className="mt-3 leading-relaxed text-neutral-600">{r.text}</p>
            </div>
          );
        })}
      </div>

      {/* open points → next steps */}
      <div className="rounded-2xl bg-[#3366E4]/5 p-8 sm:p-10">
        <div className="flex items-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#3366E4]">
            {nextStepsLabel}
          </span>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {openItems.map((it, i) => (
            <div key={it.heading} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3366E4] text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {OPEN_ICONS[i % OPEN_ICONS.length]}
                </svg>
              </span>
              <div>
                <h4 className="font-semibold text-neutral-900">{it.heading}</h4>
                <p className="mt-1.5 leading-relaxed text-neutral-600">
                  {it.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
