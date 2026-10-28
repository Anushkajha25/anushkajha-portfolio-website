/** Crimson orb + haze + faint light streaks. Decorative. */
export function Glow({ position }: { position: "top" | "bottom" }) {
  return (
    <div className={`glow glow--${position}`} aria-hidden>
      <div className="orb" />
    </div>
  );
}
