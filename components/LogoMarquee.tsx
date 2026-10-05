"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const logos = [
  { src: "/logos/sebrae.svg", alt: "SEBRAE", h: 46 },
  { src: "/logos/logo-1.svg", alt: "Empresa 1", h: 34 },
  { src: "/logos/logo-2.svg", alt: "Empresa 2", h: 54 },
  { src: "/logos/logo-4.svg", alt: "Empresa 3", h: 46 },
];

// Repeat the logos so a single group is always wider than the viewport,
// which keeps the -50% loop seamless (no empty gap / disappearing logos).
const REPEAT = 3;

function LogoGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  const items = Array.from({ length: REPEAT }).flatMap(() => logos);
  return (
    <ul aria-hidden={ariaHidden} className="flex shrink-0 items-center gap-24 pr-24">
      {items.map((logo, i) => (
        <li key={i} className="shrink-0">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={200}
            height={logo.h}
            style={{ height: logo.h, width: "auto" }}
            className="opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const anim = track.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }],
      { duration: 32000, iterations: Infinity, easing: "linear" }
    );
    animRef.current = anim;
    return () => anim.cancel();
  }, []);

  // Changing playbackRate keeps the current position and only changes speed,
  // so hover slows it down smoothly instead of restarting.
  const slowDown = () => {
    if (animRef.current) animRef.current.playbackRate = 0.3;
  };
  const resume = () => {
    if (animRef.current) animRef.current.playbackRate = 1;
  };

  return (
    <div
      onMouseEnter={slowDown}
      onMouseLeave={resume}
      className="relative mt-28 overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div ref={trackRef} className="flex w-max">
        <LogoGroup />
        <LogoGroup ariaHidden />
      </div>
    </div>
  );
}
