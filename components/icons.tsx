interface IconProps {
  className?: string;
}

export function CursorIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`${className ?? ""} translate-y-[1.5px]`}
      aria-hidden
    >
      <path
        d="M7.60439 19.2571L3.04581 3.26553C2.81043 2.43981 3.66805 1.72678 4.44788 2.09985L19.5506 9.32491C20.3536 9.70907 20.2932 10.8616 19.4546 11.1588L13.2432 13.3596C13.0176 13.4395 12.8284 13.5968 12.7098 13.8031L9.44381 19.4818C9.00282 20.2486 7.84677 20.1073 7.60439 19.2571Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FrameIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M8 3v18M16 3v18M3 8h18M3 16h18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TextIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 6.5V4h14v2.5M12 4v16m-3 0h6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ComponentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3l2.6 2.6L12 8.2 9.4 5.6 12 3zM18.4 9.4L21 12l-2.6 2.6L15.8 12l2.6-2.6zM5.6 9.4L8.2 12l-2.6 2.6L3 12l2.6-2.6zM12 15.8l2.6 2.6L12 21l-2.6-2.6 2.6-2.6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma's comment tool: a speech bubble. */
export function CommentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3a9 9 0 1 1-4.3 16.9l-4.08.98a.8.8 0 0 1-.96-.96l.98-4.08A9 9 0 0 1 12 3z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Filled envelope, used on the "Entre em contato" buttons. */
export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      {/* body with the flap cut out (evenodd) */}
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M3.5 2.75h9a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-6.5a2 2 0 0 1 2-2Zm-.3 2.9L8 9l4.8-3.35.7 1L8 10.5 2.5 6.65l.7-1Z"
      />
    </svg>
  );
}
