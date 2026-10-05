"use client";

import { useEffect, useRef } from "react";

/**
 * Marks each element matching `selector` (inside the returned ref) with
 * `data-inview` the first time it is well inside the viewport. CSS keys the
 * entrance animations off that attribute.
 */
export function useReveal<T extends HTMLElement>(selector: string) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(selector);
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-inview", "");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
  return ref;
}

/**
 * Scroll reveal for long pages built from `[data-reveal-block]` sections (the
 * case studies): walks each section's content and animates its pieces in as
 * they reach the viewport, without tagging every element by hand.
 * - rows (a multi-column grid or a horizontal flex) stagger their children;
 * - tall wrappers are split into their children, so a long section reveals
 *   piece by piece instead of all at once;
 * - anything already on screen when the page mounts is left alone, so there
 *   is no flash of hidden content.
 */
export function useAutoReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const vh = window.innerHeight;

    const isRow = (el: Element) => {
      const cs = getComputedStyle(el);
      if (cs.display.includes("grid")) return cs.gridTemplateColumns.split(" ").length > 1;
      return cs.display.includes("flex") && cs.flexDirection.startsWith("row");
    };

    function collect(el: Element, depth: number, out: [Element, number][]) {
      const kids = Array.from(el.children);
      if (kids.length > 1 && depth < 3) {
        if (isRow(el)) {
          kids.forEach((k, i) => out.push([k, Math.min(i, 5) * 90]));
          return;
        }
        if (el.getBoundingClientRect().height > vh * 0.8) {
          kids.forEach((k) => collect(k, depth + 1, out));
          return;
        }
      }
      out.push([el, 0]);
    }

    const items: [Element, number][] = [];
    root.querySelectorAll("[data-reveal-block]").forEach((block) => {
      Array.from(block.children).forEach((child) => collect(child, 0, items));
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-inview", "");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    for (const [el, delay] of items) {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) continue; // already visible: leave it be
      el.classList.add("auto-rv");
      (el as HTMLElement).style.setProperty("--delay", `${delay}ms`);
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
  return ref;
}
