"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Placeholder wireframe of an iPhone 15 screen, in a before/after variant. */
function PhoneWireframe({ after }: { after: boolean }) {
  const bar = "rounded bg-neutral-200";
  return (
    <div className="keep-light relative mx-auto aspect-[9/19.5] w-full rounded-[1.7rem] bg-neutral-900 p-[5px] shadow-sm">
      <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] bg-white">
        {/* dynamic island */}
        <div className="absolute left-1/2 top-2 h-3 w-11 -translate-x-1/2 rounded-full bg-neutral-900" />

        {/* wireframe content (placeholder) */}
        <div className="flex h-full flex-col gap-2.5 p-3 pt-9">
          <div className={`h-2.5 w-2/3 ${bar}`} />
          {after ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-12 rounded-lg bg-figma-blue/20" />
                <div className="h-12 rounded-lg bg-neutral-200" />
              </div>
              <div className="h-9 rounded-lg bg-figma-blue/25" />
              <div className={`h-4 w-full ${bar}`} />
              <div className={`h-4 w-5/6 ${bar}`} />
              <div className={`h-4 w-4/6 ${bar}`} />
            </>
          ) : (
            <>
              <div className="h-16 rounded-lg bg-neutral-200" />
              <div className={`h-5 w-full ${bar}`} />
              <div className={`h-5 w-full ${bar}`} />
              <div className={`h-5 w-full ${bar}`} />
              <div className={`h-5 w-3/4 ${bar}`} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/** A row of `count` phones, all in the same before/after variant. */
function PhoneRow({ count, after }: { count: number; after: boolean }) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <PhoneWireframe key={i} after={after} />
      ))}
    </div>
  );
}

export function BeforeAfterScreens({
  count = 4,
  beforeLabel,
  afterLabel,
}: {
  count?: number;
  beforeLabel: string;
  afterLabel: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50); // divider position, % of width
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => setFromClientX(e.clientX);
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging, setFromClientX]);

  const start = (e: React.PointerEvent) => {
    e.preventDefault();
    setFromClientX(e.clientX);
    setDragging(true);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 3));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 3));
  };

  return (
    <div className="overflow-x-auto">
      {/* moving labels above the phones */}
      <div className="relative mx-auto mb-3 h-7 min-w-[600px]">
        <div
          className="absolute top-0 -translate-x-1/2"
          style={{ left: `${pos}%` }}
        >
          <div className="flex -translate-x-full items-center">
            <span className="whitespace-nowrap rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-500">
              {beforeLabel}
            </span>
          </div>
        </div>
        <div
          className="absolute top-0 translate-x-1/2"
          style={{ left: `${pos}%` }}
        >
          <span className="whitespace-nowrap rounded-full bg-figma-blue/10 px-2.5 py-1 text-xs font-semibold text-figma-blue">
            {afterLabel}
          </span>
        </div>
      </div>

      <div ref={wrapRef} className="relative mx-auto min-w-[600px] select-none">
        {/* base layer: AFTER (visible on the right of the line) */}
        <PhoneRow count={count} after />

        {/* overlay layer: BEFORE, clipped to the left of the line */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <PhoneRow count={count} after={false} />
        </div>

        {/* divider line */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-figma-blue"
          style={{ left: `${pos}%` }}
        />

        {/* wide invisible hit area over the line */}
        <div
          className="absolute inset-y-0 w-8 -translate-x-1/2 cursor-ew-resize"
          style={{ left: `${pos}%` }}
          onPointerDown={start}
        />

        {/* grip */}
        <button
          type="button"
          aria-label={`${beforeLabel} / ${afterLabel}`}
          onPointerDown={start}
          onKeyDown={onKey}
          className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-figma-blue text-white shadow-lg ring-4 ring-white"
          style={{ left: `${pos}%` }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
