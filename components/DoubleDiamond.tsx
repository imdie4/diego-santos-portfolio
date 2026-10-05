interface DoubleDiamondProps {
  phases: string[]; // [Descobrir, Definir, Desenvolver, Entregar]
  problemLabel: string;
  solutionLabel: string;
  diverge: string;
  converge: string;
  caption: string;
}

const LABEL_X = [97, 267, 453, 623];

/**
 * Double Diamond design-thinking diagram: two diamonds (problem space and
 * solution space), each split into a diverge and a converge phase. Static.
 */
export function DoubleDiamond({
  phases,
  problemLabel,
  solutionLabel,
  diverge,
  converge,
  caption,
}: DoubleDiamondProps) {
  return (
    <figure>
      <div className="rounded-3xl border border-neutral-200 bg-neutral-50/60 p-6 sm:p-8">
        <svg
          viewBox="0 0 720 265"
          className="h-auto w-full"
          role="img"
          aria-label="Double Diamond"
        >
        <defs>
          <linearGradient id="ddFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0D99FF" stopOpacity="0.1" />
            <stop offset="1" stopColor="#0D99FF" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* space labels */}
        <text
          x="182"
          y="12"
          textAnchor="middle"
          className="fill-neutral-400"
          style={{ font: "600 11px ui-monospace, monospace", letterSpacing: 1.5 }}
        >
          {problemLabel.toUpperCase()}
        </text>
        <text
          x="538"
          y="12"
          textAnchor="middle"
          className="fill-neutral-400"
          style={{ font: "600 11px ui-monospace, monospace", letterSpacing: 1.5 }}
        >
          {solutionLabel.toUpperCase()}
        </text>

        {/* diamonds + labels, pushed down for breathing room below the titles */}
        <g transform="translate(0, 28)">
        {/* base diamond fills */}
        <path d="M12 95 L182 20 L352 95 L182 170 Z" fill="url(#ddFill)" />
        <path d="M368 95 L538 20 L708 95 L538 170 Z" fill="url(#ddFill)" />

        {/* diamond outlines */}
        <path
          d="M12 95 L182 20 L352 95 L182 170 Z"
          fill="none"
          stroke="#0D99FF"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M368 95 L538 20 L708 95 L538 170 Z"
          fill="none"
          stroke="#0D99FF"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* diverge → converge dividers at each peak */}
        <line x1="182" y1="24" x2="182" y2="166" stroke="#0D99FF" strokeWidth="1" strokeDasharray="3 4" opacity="0.4" />
        <line x1="538" y1="24" x2="538" y2="166" stroke="#0D99FF" strokeWidth="1" strokeDasharray="3 4" opacity="0.4" />

        {/* phase labels — light up in sync with their quadrant */}
        {LABEL_X.map((x, i) => (
          <text
            key={x}
            x={x}
            y="216"
            textAnchor="middle"
            className="fill-neutral-800"
            style={{ font: "600 13px system-ui, sans-serif" }}
          >
            {phases[i]}
          </text>
        ))}

        {/* diverge / converge micro-labels */}
        {[
          [97, diverge],
          [267, converge],
          [453, diverge],
          [623, converge],
        ].map(([x, label], i) => (
          <text
            key={i}
            x={x as number}
            y="231"
            textAnchor="middle"
            className="fill-neutral-400"
            style={{ font: "500 10px ui-monospace, monospace" }}
          >
            {label}
          </text>
        ))}
        </g>
        </svg>
      </div>

      <figcaption className="mt-3 text-sm text-neutral-500">
        {caption}
      </figcaption>
    </figure>
  );
}
