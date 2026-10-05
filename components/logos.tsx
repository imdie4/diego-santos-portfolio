import Image from "next/image";

export function ClaudeLogo() {
  return (
    <Image
      src="/logos/claude.svg"
      alt="Claude"
      width={112}
      height={112}
      className="h-28 w-28 rounded-2xl"
      draggable={false}
      unoptimized
    />
  );
}

export function BehanceLogo() {
  return (
    <Image
      src="/logos/behance.svg"
      alt="Behance"
      width={112}
      height={112}
      className="h-28 w-28"
      draggable={false}
    />
  );
}

export function LinkedInLogo() {
  return (
    <Image
      src="/logos/linkedin.svg"
      alt="LinkedIn"
      width={112}
      height={112}
      className="h-28 w-28"
      draggable={false}
    />
  );
}

export function FigmaLogo() {
  return (
    <svg viewBox="0 0 38 57" className="h-28 w-auto" aria-hidden>
      <path
        d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"
        fill="#1ABCFE"
      />
      <path
        d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"
        fill="#0ACF83"
      />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  );
}
