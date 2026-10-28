// Small line icons (decorative; the surrounding control carries the label).

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 10H4M9 5l-5 5 5 5" />
    </svg>
  );
}

const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" {...line} aria-hidden>
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" {...line} aria-hidden>
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

/** Small line icons for the interest cards. */
export function InterestGlyph({ name }: { name: "dumbbell" | "bowl" | "flag" | "paw" | "plane" | "tv" }) {
  switch (name) {
    case "dumbbell":
      return (
        <svg viewBox="0 0 24 24" {...line} aria-hidden>
          <path d="M7 8v8M4.5 9.5v5M17 8v8M19.5 9.5v5M7 12h10" />
        </svg>
      );
    case "bowl":
      return (
        <svg viewBox="0 0 24 24" {...line} aria-hidden>
          <path d="M4 12h16a8 8 0 0 1-16 0zM14 4l-3 7M18 5l-4 6" />
        </svg>
      );
    case "flag":
      return (
        <svg viewBox="0 0 24 24" {...line} aria-hidden>
          <path d="M5 21V4M5 4h13v9H5" />
          <path d="M9.3 4v9M13.7 4v9M5 8.5h13" />
        </svg>
      );
    case "paw":
      return (
        <svg viewBox="0 0 24 24" {...line} aria-hidden>
          <path d="M12 13c-3 0-5 2.6-5 4.6 0 1.6 1.3 2.4 2.6 2.4 1 0 1.6-.5 2.4-.5s1.4.5 2.4.5c1.3 0 2.6-.8 2.6-2.4 0-2-2-4.6-5-4.6z" />
          <circle cx="7" cy="10" r="1.6" />
          <circle cx="10" cy="6.5" r="1.6" />
          <circle cx="14" cy="6.5" r="1.6" />
          <circle cx="17" cy="10" r="1.6" />
        </svg>
      );
    case "plane":
      return (
        <svg viewBox="0 0 24 24" {...line} aria-hidden>
          <path d="M21 4L3 11l7 2.5M21 4l-4 16-7-6.5M21 4L10 13.5V19l3-3" />
        </svg>
      );
    case "tv":
      return (
        <svg viewBox="0 0 24 24" {...line} aria-hidden>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M9 21h6M8 3l4 3 4-3" />
        </svg>
      );
  }
}
