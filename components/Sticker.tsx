"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

interface StickerProps {
  name: string;
  className?: string;
  /** Figma-style live comment that types out next to the cursor on hover. */
  comment?: string;
  /** If set, a click (not a drag) opens this URL in a new tab. */
  href?: string;
  /** If set, the sticker pops in on load after this many ms (hero entrance). */
  delay?: number;
  children: ReactNode;
}

/**
 * A canvas object that behaves like a Figma layer: hover shows the blue
 * selection outline with corner handles and the layer name, and it can be
 * dragged around the page. On hover it can also show a live comment bubble
 * that types itself out next to the cursor.
 */
export function Sticker({
  name,
  className = "",
  comment,
  href,
  delay,
  children,
}: StickerProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const start = useRef({ pointerX: 0, pointerY: 0, x: 0, y: 0 });
  const moved = useRef(false);
  const down = useRef(false);
  const box = useRef<HTMLDivElement>(null);

  const [hovering, setHovering] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [typed, setTyped] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Type the comment out one character at a time while hovering.
  useEffect(() => {
    if (!hovering || !comment) return;
    if (typed >= comment.length) return;
    const id = setTimeout(() => setTyped((t) => t + 1), 42);
    return () => clearTimeout(id);
  }, [hovering, typed, comment]);

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      x: offset.x,
      y: offset.y,
    };
    if (box.current) {
      const rect = box.current.getBoundingClientRect();
      setSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
    }
    moved.current = false;
    down.current = true;
    setDragging(true);
    setHovering(false); // hide the comment while dragging
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    setMouse({ x: e.clientX, y: e.clientY });
    if (!down.current) return;
    const dx = e.clientX - start.current.pointerX;
    const dy = e.clientY - start.current.pointerY;
    if (Math.hypot(dx, dy) > 4) moved.current = true;
    setOffset({ x: start.current.x + dx, y: start.current.y + dy });
  }

  function onPointerUp() {
    down.current = false;
    setDragging(false);
    // A click (no meaningful drag) on a linked sticker opens its URL.
    if (href && !moved.current) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }

  function onPointerEnter(e: ReactPointerEvent<HTMLDivElement>) {
    if (!comment || dragging) return;
    setMouse({ x: e.clientX, y: e.clientY });
    setTyped(0);
    setHovering(true);
  }

  const handle =
    "absolute h-2 w-2 rounded-[1px] border border-figma-selection bg-surface";

  const showComment = hovering && !dragging && comment;

  return (
    <div
      ref={box}
      className={`group absolute select-none touch-none ${
        dragging ? "z-40 cursor-grabbing" : "cursor-grab"
      } ${className}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        down.current = false;
        setDragging(false);
      }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={() => setHovering(false)}
    >
      {delay === undefined ? (
        children
      ) : (
        // Animated inside, so it doesn't fight the drag transform above.
        <div
          className="hero-pop"
          style={{ "--delay": `${delay}ms` } as CSSProperties}
        >
          {children}
        </div>
      )}

      {/* Figma selection chrome */}
      <div
        className={`pointer-events-none absolute -inset-1 border-2 border-figma-selection transition-opacity ${
          dragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <span className={`${handle} -left-1 -top-1`} />
        <span className={`${handle} -right-1 -top-1`} />
        <span className={`${handle} -bottom-1 -left-1`} />
        <span className={`${handle} -bottom-1 -right-1`} />
        <span className="absolute -top-7 left-0 whitespace-nowrap text-xs font-medium text-figma-selection">
          {name}
        </span>
        {dragging && size.w > 0 && (
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-figma-selection px-1.5 py-0.5 text-xs font-medium text-white">
            {size.w} × {size.h}
          </span>
        )}
      </div>

      {/* Live comment bubble following the cursor (portaled to escape the
          transformed sticker so `fixed` tracks the viewport). */}
      {mounted && showComment && (
        <CommentBubble x={mouse.x} y={mouse.y} text={comment!} typed={typed} />
      )}
    </div>
  );
}

/**
 * Figma-style live comment bubble next to the cursor, showing the first
 * `typed` characters of `text` with a blinking caret while it types.
 * Portaled to <body> so `fixed` positioning tracks the viewport.
 */
export function CommentBubble({
  x,
  y,
  text,
  typed,
}: {
  x: number;
  y: number;
  text: string;
  typed: number;
}) {
  const flip = x > window.innerWidth - 260;
  return createPortal(
    <div
      className="pointer-events-none fixed z-[100]"
      style={{
        left: x + (flip ? -20 : 20),
        top: y + 20,
        transform: flip ? "translateX(-100%)" : undefined,
      }}
    >
      <div className="animate-comment">
        <div
          className={`whitespace-nowrap rounded-2xl border-2 border-[#2E6FE0] bg-[#4C8DFF] px-3.5 py-1.5 text-sm font-medium text-white shadow-[0_6px_18px_rgba(46,144,250,0.4)] ${
            flip ? "rounded-tr-md" : "rounded-tl-md"
          }`}
        >
          {text.slice(0, typed)}
          {typed < text.length && (
            <span className="comment-caret ml-0.5 inline-block w-px align-middle">
              &#8203;|
            </span>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

/**
 * Wraps any element so that hovering it shows the same typing comment
 * bubble as the hero stickers.
 */
export function HoverComment({
  comment,
  className,
  children,
}: {
  comment: string;
  className?: string;
  children: ReactNode;
}) {
  const [hovering, setHovering] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [typed, setTyped] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Same typing speed as the stickers.
  useEffect(() => {
    if (!hovering || typed >= comment.length) return;
    const id = setTimeout(() => setTyped((t) => t + 1), 42);
    return () => clearTimeout(id);
  }, [hovering, typed, comment]);

  return (
    <span
      className={className}
      onPointerEnter={(e) => {
        setMouse({ x: e.clientX, y: e.clientY });
        setTyped(0);
        setHovering(true);
      }}
      onPointerMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
      onPointerLeave={() => setHovering(false)}
    >
      {children}
      {mounted && hovering && (
        <CommentBubble x={mouse.x} y={mouse.y} text={comment} typed={typed} />
      )}
    </span>
  );
}
