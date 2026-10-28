import type { ReactNode } from "react";
import { C } from "./primitives";

// Three phone screens for the context-monitoring app: heart rate from video,
// respiratory rate from the accelerometer, and symptom logging with ratings.
// Readings are deliberately not shown — these are interface sketches, not data.

const W = 220;
const H = 450;

function Phone({ children, title, sub }: { children: ReactNode; title: string; sub: string }) {
  return (
    <g>
      <rect x={0} y={0} width={W} height={H} rx={36} fill={C.bezel} />
      <rect x={9} y={9} width={W - 18} height={H - 18} rx={28} fill={C.white} />
      <rect x={W / 2 - 28} y={20} width={56} height={14} rx={7} fill={C.frame} />
      <text x={28} y={78} fontSize={20} fontWeight={600} fill={C.ink} letterSpacing={-0.3}>
        {title}
      </text>
      <text x={28} y={100} fontSize={12} fill={C.ink3}>
        {sub}
      </text>
      {children}
    </g>
  );
}

function Button({ label, y = 364 }: { label: string; y?: number }) {
  return (
    <g>
      <rect x={28} y={y} width={W - 56} height={44} rx={22} fill={C.ink} />
      <text x={W / 2} y={y + 27} textAnchor="middle" fontSize={14} fill={C.onInk} fontWeight={500}>
        {label}
      </text>
    </g>
  );
}

export function HeartScreen() {
  const r = 62;
  const circ = 2 * Math.PI * r;
  return (
    <Phone title="Heart rate" sub="From camera video">
      <circle cx={W / 2} cy={222} r={r} fill="none" stroke={C.tile2} strokeWidth={8} />
      <circle
        cx={W / 2}
        cy={222}
        r={r}
        fill="none"
        stroke={C.blue}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${circ * 0.68} ${circ}`}
        transform={`rotate(-90 ${W / 2} 222)`}
      />
      <path
        d="M110,236 C96,224 88,216 88,206 C88,198 94,193 100,193 C105,193 108,196 110,199 C112,196 115,193 120,193 C126,193 132,198 132,206 C132,216 124,224 110,236 Z"
        fill={C.blue}
      />
      <text x={W / 2} y={318} textAnchor="middle" fontSize={13} fill={C.ink2}>
        Measuring…
      </text>
      <Button label="Measure" />
    </Phone>
  );
}

export function BreathScreen() {
  const pts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const x = 28 + (i / 80) * (W - 56);
    const y = 222 - 30 * Math.sin((i / 80) * Math.PI * 5) * (0.75 + 0.25 * Math.sin(i / 9));
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return (
    <Phone title="Respiratory rate" sub="From accelerometer">
      <line x1={28} x2={W - 28} y1={222} y2={222} stroke={C.line} strokeDasharray="4 4" />
      <path d={pts.join(" ")} fill="none" stroke={C.blue} strokeWidth={2.5} strokeLinejoin="round" />
      <text x={W / 2} y={318} textAnchor="middle" fontSize={13} fill={C.ink2}>
        Measuring…
      </text>
      <Button label="Measure" />
    </Phone>
  );
}

export function SymptomScreen() {
  const items = [
    { s: "Headache", n: 3 },
    { s: "Fever", n: 1 },
    { s: "Fatigue", n: 4 },
    { s: "Cough", n: 0 },
    { s: "Nausea", n: 2 },
  ];
  return (
    <Phone title="Symptoms" sub="Log and rate how you feel">
      {items.map((it, i) => {
        const y = 144 + i * 40;
        return (
          <g key={it.s}>
            <text x={28} y={y + 5} fontSize={13} fill={C.ink}>
              {it.s}
            </text>
            {Array.from({ length: 5 }).map((_, d) => (
              <circle key={d} cx={124 + d * 16} cy={y} r={5} fill={d < it.n ? C.blue : C.tile2} />
            ))}
            {i < items.length - 1 && <line x1={28} x2={W - 28} y1={y + 20} y2={y + 20} stroke={C.line} />}
          </g>
        );
      })}
      <Button label="Save" y={352} />
      <text x={W / 2} y={418} textAnchor="middle" fontSize={11} fill={C.ink3}>
        Stored on device
      </text>
    </Phone>
  );
}

export function AndroidVisual() {
  return (
    <>
      <svg className="art art--desktop" viewBox="0 0 1200 560" role="img" aria-label="Three phone screens: heart rate measurement, respiratory rate measurement, and symptom logging">
        <g transform="translate(207 64)">
          <HeartScreen />
        </g>
        <g transform="translate(490 64)">
          <BreathScreen />
        </g>
        <g transform="translate(773 64)">
          <SymptomScreen />
        </g>
      </svg>
      <svg className="art art--mobile" viewBox="0 0 800 720" role="img" aria-label="Two phone screens: heart rate measurement and symptom logging">
        <g transform="translate(64 60) scale(1.42)">
          <HeartScreen />
        </g>
        <g transform="translate(424 60) scale(1.42)">
          <SymptomScreen />
        </g>
      </svg>
    </>
  );
}
