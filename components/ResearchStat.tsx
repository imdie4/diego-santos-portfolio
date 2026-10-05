// Wave vector extracted from the provided asset (Group 2685).
const WAVE =
  "M-112.874 44.8041C-112.874 38.6944 -116.348 33.1069 -121.754 30.2596C-121.812 30.2291 -121.87 30.1987 -121.927 30.1682C-123.061 29.571 -123.47 28.1426 -122.838 27.0278C-122.226 25.9494 -120.862 25.5406 -119.765 26.1185L-119.66 26.1737C-112.839 29.7669 -106.154 33.283 -98.0916 36.1566L-80.4513 40.3098C-79.6285 40.5036 -78.7916 40.6318 -77.9485 40.6933L-49.8399 42.7437C-46.4434 42.669 -43.2314 42.502 -40.1825 42.2532L-15.7768 37.8453C-12.072 36.7513 -8.63416 35.5203 -5.36728 34.1983L-0.793884 32.2481C3.54391 30.3077 7.6412 28.2354 11.755 26.1552C28.594 17.6404 45.7029 8.99985 79.676 8.99982C97.2587 8.99982 110.201 11.1381 120.82 14.3858C131.421 17.6282 139.622 21.9541 147.633 26.1737C155.66 30.4014 163.496 34.5231 173.61 37.6163C183.706 40.7041 196.158 42.7897 213.323 42.7897C223.146 42.7896 231.489 42.0507 238.802 40.792L262.232 34.0753C268.204 31.6402 273.612 28.9043 279.049 26.1552C295.888 17.6404 312.996 8.99985 346.97 8.99982C364.552 8.99982 377.494 11.1381 388.113 14.3858C398.714 17.6281 406.916 21.9541 414.927 26.1737C416.061 26.7708 416.47 28.1996 415.837 29.3145C415.225 30.3928 413.862 30.8013 412.765 30.2235L412.66 30.1682C409.558 28.5343 405.873 30.7865 405.873 34.2925L405.873 249.032C405.873 257.869 398.71 265.032 389.873 265.032L-96.8738 265.032C-105.71 265.032 -112.874 257.869 -112.874 249.032V44.8041Z";

// The wave's natural crest sits around y≈26 in the 195-tall viewBox.
const WAVE_CREST = 26;
const VIEW_H = 195;

/**
 * Graph card: a blue box where a pink wave fills up to `percent` of the height,
 * with the number centered on top.
 */
export function GraphBlock({
  percent,
  wave,
}: {
  percent: number;
  wave: string;
}) {
  // Translate the wave so its waterline lands at (100 - percent)% from the top.
  const ty = VIEW_H * (1 - percent / 100) - WAVE_CREST;
  return (
    <div className="relative flex min-h-[120px] items-center justify-center overflow-hidden rounded-2xl bg-[#3366E4] text-white">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 219 195"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={WAVE} fill={wave} transform={`translate(0, ${ty})`} />
      </svg>
      <span className="relative text-4xl font-bold tracking-tight sm:text-5xl">
        {percent}%
      </span>
    </div>
  );
}

/** Info card: the written statement that complements the graph. */
export function InfoBlock({ text, bg }: { text: string; bg: string }) {
  return (
    <div
      className={`flex min-h-[120px] flex-col justify-center rounded-2xl p-5 text-white ${bg}`}
    >
      <p className="text-sm font-semibold leading-snug sm:text-[15px]">{text}</p>
    </div>
  );
}
