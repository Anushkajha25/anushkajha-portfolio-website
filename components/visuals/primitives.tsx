// Shared SVG building blocks for the project artwork.
// Colours reference CSS tokens so the art always matches the site palette.

export const C = {
  paper: "var(--art-surface)",
  tile: "var(--card)",
  tile2: "var(--art-chip)",
  ink: "var(--art-ink)",
  ink2: "var(--art-ink-2)",
  ink3: "var(--art-ink-3)",
  line: "var(--art-line)",
  blue: "var(--accent)",
  blueSoft: "var(--accent-soft)",
  white: "var(--art-paper)",
  frame: "var(--art-frame)",
  walker: "var(--art-walker)",
  bezel: "var(--art-bezel)",
  onInk: "#0b0b0b",
};

const rad = (d: number) => (d * Math.PI) / 180;

/**
 * A walking silhouette at a point in the gait cycle.
 * Built from round-capped strokes so it reads like a binary gait silhouette.
 * (cx, ground) = hip x and floor y; h = figure height; phase in [0, 2π).
 */
export function Walker({
  cx,
  ground,
  h,
  phase,
  color = C.walker,
}: {
  cx: number;
  ground: number;
  h: number;
  phase: number;
  color?: string;
}) {
  const hipY = ground - 0.5 * h;
  const shoulder = { x: cx + 0.02 * h, y: ground - 0.81 * h };
  const headR = 0.068 * h;
  const head = { x: shoulder.x + 0.015 * h, y: shoulder.y - 0.1 * h };
  const thigh = 0.255 * h;
  const shin = 0.255 * h;

  const leg = (p: number) => {
    const a = 24 * Math.sin(p); // thigh angle from vertical, +forward
    const knee = a < 0 ? 8 + 34 * Math.min(1, -a / 24) : 6;
    const k = { x: cx + thigh * Math.sin(rad(a)), y: hipY + thigh * Math.cos(rad(a)) };
    const s = a - knee;
    const f = { x: k.x + shin * Math.sin(rad(s)), y: Math.min(ground, k.y + shin * Math.cos(rad(s))) };
    return `M${cx},${hipY} L${k.x},${k.y} L${f.x},${f.y}`;
  };
  const arm = (p: number) => {
    const a = -20 * Math.sin(p);
    const up = 0.17 * h;
    const fore = 0.16 * h;
    const e = { x: shoulder.x + up * Math.sin(rad(a)), y: shoulder.y + 0.02 * h + up * Math.cos(rad(a)) };
    const b = a + 18;
    const w = { x: e.x + fore * Math.sin(rad(b)), y: e.y + fore * Math.cos(rad(b)) };
    return `M${shoulder.x},${shoulder.y + 0.02 * h} L${e.x},${e.y} L${w.x},${w.y}`;
  };

  return (
    <g stroke={color} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={leg(phase + Math.PI)} strokeWidth={0.075 * h} opacity={0.82} />
      <path d={arm(phase + Math.PI)} strokeWidth={0.055 * h} opacity={0.82} />
      <path d={`M${shoulder.x},${shoulder.y} L${cx},${hipY}`} strokeWidth={0.13 * h} />
      <path d={leg(phase)} strokeWidth={0.08 * h} />
      <path d={arm(phase)} strokeWidth={0.058 * h} />
      <circle cx={head.x} cy={head.y} r={headR} fill={color} stroke="none" />
    </g>
  );
}

export function Arrow({ x1, y1, x2, y2, color = C.ink3 }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const s = 7;
  const p1 = `${x2 - s * Math.cos(a - 0.5)},${y2 - s * Math.sin(a - 0.5)}`;
  const p2 = `${x2 - s * Math.cos(a + 0.5)},${y2 - s * Math.sin(a + 0.5)}`;
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x1},${y1} L${x2},${y2}`} />
      <path d={`M${p1} L${x2},${y2} L${p2}`} />
    </g>
  );
}

/** Diagram node: rounded box with the accent outline, an uppercase kicker, title and optional sub-lines. */
export function Box({
  x,
  y,
  w,
  h,
  kicker,
  title,
  sub = [],
  s = 1,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  kicker?: string;
  title: string;
  sub?: string[];
  s?: number;
}) {
  const pad = 16 * s;
  let ty = y + pad + 11 * s;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12 * s} fill={C.paper} stroke={C.blue} strokeWidth={1.25} />
      {kicker && (
        <text x={x + pad} y={ty} fontSize={11 * s} letterSpacing={0.9 * s} fill={C.blue} fontWeight={500}>
          {kicker}
        </text>
      )}
      <text
       
        x={x + pad}
        y={(ty = kicker ? ty + 24 * s : ty + 6 * s)}
        fontSize={17 * s}
        fontWeight={600}
        fill={C.ink}
        letterSpacing={-0.2 * s}
      >
        {title}
      </text>
      {sub.map((line, i) => (
        <text key={i} x={x + pad} y={ty + (20 + i * 17) * s} fontSize={13 * s} fill={C.ink2}>
          {line}
        </text>
      ))}
    </g>
  );
}
