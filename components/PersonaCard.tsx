import Image from "next/image";

type Tone = "rose" | "green";

// Per-persona color system, matched to the reference mockup.
const TONE: Record<
  Tone,
  {
    name: string; // name + chip text/border
    pill: string; // filled header pill (Objetivos / Dores)
    base: string; // photo frame background
    waves: [string, string, string]; // light → dark decorative waves
  }
> = {
  rose: {
    name: "#E23A6D",
    pill: "#E23A6D",
    base: "#FDECF2",
    waves: ["#F9CFDE", "#F3A6C1", "#E23A6D"],
  },
  green: {
    name: "#2FA35F",
    pill: "#2FA35F",
    base: "#E8F6EC",
    waves: ["#C6EBD3", "#95DDAE", "#3BA368"],
  },
};

/** Decorative underwater photo frame with layered waves, blue bubbles and a coral/seaweed accent. */
function PhotoFrame({ tone, src }: { tone: Tone; src?: string }) {
  const t = TONE[tone];

  // A real photo already carries its own wave background — show it as-is.
  if (src) {
    return (
      <div className="relative aspect-[8/7] w-full overflow-hidden rounded-3xl bg-white">
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 1024px) 420px, 100vw"
          className="object-cover object-[center_30%]"
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[8/7] w-full overflow-hidden rounded-3xl"
      style={{ background: t.base }}
    >
      {/* layered waves at the bottom */}
      <svg
        className="absolute inset-x-0 bottom-0 h-3/4 w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,120 C60,90 140,150 200,120 C260,90 340,150 400,120 L400,300 L0,300 Z"
          fill={t.waves[0]}
        />
        <path
          d="M0,175 C70,145 130,205 200,175 C270,145 330,205 400,175 L400,300 L0,300 Z"
          fill={t.waves[1]}
        />
        <path
          d="M0,230 C80,205 150,255 220,230 C290,205 340,250 400,230 L400,300 L0,300 Z"
          fill={t.waves[2]}
        />
      </svg>

      {/* blue bubbles */}
      <span className="absolute left-[14%] top-[38%] h-8 w-8 rounded-full bg-[#7CCDEE]" />
      <span className="absolute left-[8%] bottom-[10%] h-11 w-11 rounded-full bg-[#7CCDEE]" />
      <span className="absolute right-[10%] top-[30%] h-6 w-6 rounded-full bg-[#AEDFF5]" />
      <span className="absolute right-[16%] bottom-[22%] h-9 w-9 rounded-full bg-[#7CCDEE]" />

      {/* coral (rose) / seaweed (green) accent */}
      {tone === "rose" ? (
        <svg
          className="absolute bottom-[16%] left-[4%] h-20 w-16"
          viewBox="0 0 60 80"
          fill="none"
          aria-hidden
        >
          <path
            d="M30 80V34M30 46C30 46 22 42 20 32C18 22 24 16 24 16M30 44C30 44 38 40 40 30C42 20 36 14 36 14M30 34C30 34 26 28 27 20M30 34C30 34 34 28 33 20"
            stroke="#E8C77E"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          className="absolute bottom-[12%] right-[6%] h-24 w-14"
          viewBox="0 0 50 90"
          fill="none"
          aria-hidden
        >
          <path
            d="M20 90C20 90 12 60 20 40C28 20 20 4 20 4"
            stroke="#2F8F57"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M34 90C34 90 40 62 33 44C26 26 34 12 34 12"
            stroke="#46A860"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* photo placeholder */}
      <div className="absolute inset-6 flex items-center justify-center rounded-2xl border border-dashed border-neutral-400/60 text-sm text-neutral-500">
        Foto
      </div>
    </div>
  );
}

/** Filled header pill (emoji + label) used above the Objetivos / Dores lists. */
function TagHeader({ emoji, label, bg }: { emoji: string; label: string; bg: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-white"
      style={{ background: bg }}
    >
      <span aria-hidden>{emoji}</span>
      {label}
    </span>
  );
}

/** Bulleted list matched to the reference (dot + text). */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((it) => (
        <li key={it} className="flex gap-2 text-sm leading-snug text-neutral-600">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export type Persona = {
  name: string;
  tone: Tone;
  photoSide: "left" | "right";
  chips: string[];
  description: string;
  goals: string[];
  pains: string[];
  photo?: string;
};

export function PersonaCard({
  persona,
  goalsLabel,
  painsLabel,
}: {
  persona: Persona;
  goalsLabel: string;
  painsLabel: string;
}) {
  const t = TONE[persona.tone];
  const photoLeft = persona.photoSide === "left";

  const photo = <PhotoFrame tone={persona.tone} src={persona.photo} />;

  const content = (
    <div className="flex flex-col">
      <h3
        className="text-4xl font-bold tracking-tight sm:text-5xl"
        style={{ color: t.name }}
      >
        {persona.name}
      </h3>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {persona.chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border px-4 py-1.5 text-sm font-medium"
            style={{ borderColor: t.name, color: t.name }}
          >
            {chip}
          </span>
        ))}
      </div>

      <p className="mt-5 text-[15px] leading-relaxed text-neutral-600">
        {persona.description}
      </p>

      <div className="mt-7 grid gap-8 sm:grid-cols-2">
        <div>
          <TagHeader emoji="🎯" label={goalsLabel} bg={t.pill} />
          <BulletList items={persona.goals} />
        </div>
        <div>
          <TagHeader emoji="🤕" label={painsLabel} bg={t.pill} />
          <BulletList items={persona.pains} />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`grid items-center gap-8 lg:gap-12 ${
        photoLeft
          ? "lg:grid-cols-[0.85fr_1.15fr]"
          : "lg:grid-cols-[1.15fr_0.85fr]"
      }`}
    >
      {photoLeft ? (
        <>
          {photo}
          {content}
        </>
      ) : (
        <>
          {content}
          {photo}
        </>
      )}
    </div>
  );
}
