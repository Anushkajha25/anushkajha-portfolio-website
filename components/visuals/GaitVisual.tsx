import { casiaFrames, type GaitFrame } from "@/data/gaitFrames";
import { Arrow, Box, C, Walker } from "./primitives";

// Editorial artwork for the gait project, matching the paper:
// CASIA-B silhouette frames, the fused-feature pipeline splitting into the two
// tasks, and the 11 CASIA-B camera views with the three used (0°, 90°, 180°) in blue.

export function Frames({
  x0,
  y,
  w,
  h,
  n,
  gap,
  images,
}: {
  x0: number;
  y: number;
  w: number;
  h: number;
  n: number;
  gap: number;
  images?: GaitFrame[];
}) {
  const real = images && images.length >= n ? images.slice(0, n) : null;
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const x = x0 + i * (w + gap);
        const phase = (i / n) * Math.PI * 2;
        const clip = `frame-${x0}-${y}-${n}-${i}`;
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx={10} fill={C.frame} stroke={C.line} />
            {real ? (
              <>
                <clipPath id={clip}>
                  <rect x={x} y={y} width={w} height={h} rx={10} />
                </clipPath>
                <image
                  href={real[i].src}
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#${clip})`}
                >
                  <title>{real[i].alt}</title>
                </image>
                {real[i].condition && (
                  <text x={x + w / 2} y={y + h + 18} textAnchor="middle" fontSize={11} letterSpacing={0.8} fill={C.ink3}>
                    {real[i].condition.toUpperCase()}
                  </text>
                )}
              </>
            ) : (
              <Walker cx={x + w / 2 - h * 0.02} ground={y + h - h * 0.09} h={h * 0.78} phase={phase} />
            )}
          </g>
        );
      })}
    </g>
  );
}

const USED = [0, 90, 180];

export function ViewFan({ cx, cy, r, s = 1 }: { cx: number; cy: number; r: number; s?: number }) {
  const angles = Array.from({ length: 11 }, (_, i) => i * 18);
  return (
    <g>
      <path
        d={`M${cx - r},${cy} A${r},${r} 0 0 1 ${cx + r},${cy}`}
        fill="none"
        stroke={C.line}
        strokeWidth={1.25}
      />
      {angles.map((a) => {
        const t = (a * Math.PI) / 180;
        const x = cx - r * Math.cos(t);
        const y = cy - r * Math.sin(t);
        const x0 = cx - 22 * s * Math.cos(t);
        const y0 = cy - 22 * s * Math.sin(t);
        const hi = USED.includes(a);
        return (
          <g key={a}>
            <line x1={x0} y1={y0} x2={x} y2={y} stroke={hi ? C.blue : C.ink3} strokeWidth={hi ? 1.75 : 1} opacity={hi ? 1 : 0.55} />
            <circle cx={x} cy={y} r={(hi ? 6 : 4.5) * s} fill={hi ? C.blue : C.ink} />
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={12 * s} fill={C.ink} />
      {[
        { a: 0, t: "0°", anchor: "end" as const, dx: -14 * s, dy: 5 * s },
        { a: 90, t: "90°", anchor: "middle" as const, dx: 0, dy: -16 * s },
        { a: 180, t: "180°", anchor: "start" as const, dx: 14 * s, dy: 5 * s },
      ].map((l) => {
        const t = (l.a * Math.PI) / 180;
        return (
          <text
            key={l.a}
            x={cx - r * Math.cos(t) + l.dx}
            y={cy - r * Math.sin(t) + l.dy}
            textAnchor={l.anchor}
            fontSize={13 * s}
            fill={C.blue}
          >
            {l.t}
          </text>
        );
      })}
    </g>
  );
}

export function GaitVisual() {
  return (
    <>
      {/* Desktop / tablet */}
      <svg
        className="art art--desktop"
        viewBox="0 0 1200 590"
        role="img"
        aria-label="CASIA-B walking silhouettes, a pipeline from frames to fused CNN features and PCA splitting into walking-condition classification and identity recognition, and 11 camera views with 0°, 90° and 180° used"
      >
        <text x={60} y={44} fontSize={12} letterSpacing={1.2} fill={C.ink3} fontWeight={500}>
          CASIA-B · SILHOUETTE FRAMES
        </text>
        <Frames x0={60} y={64} w={124.5} h={196} n={8} gap={12} images={casiaFrames} />

        {/* pipeline */}
        <Box x={60} y={354} w={128} h={112} kicker="INPUT" title="Frames" sub={["Silhouettes", "224 × 224"]} />
        <Arrow x1={194} y1={410} x2={214} y2={410} />
        <Box x={220} y={354} w={222} h={112} kicker="FEATURES" title="Fused CNNs" sub={["ResNet101 + EfficientNetB2", "or VGG16 + InceptionV3"]} />
        <Arrow x1={448} y1={410} x2={468} y2={410} />
        <Box x={474} y={354} w={166} h={112} kicker="REDUCE" title="PCA" sub={["Concatenate,", "then 512 dims"]} />
        <path d="M646,410 C668,410 662,352 680,352" fill="none" stroke={C.ink3} strokeWidth={1.5} />
        <path d="M646,410 C668,410 662,468 680,468" fill="none" stroke={C.ink3} strokeWidth={1.5} />
        <Arrow x1={676} y1={352} x2={686} y2={352} />
        <Arrow x1={676} y1={468} x2={686} y2={468} />
        <Box x={692} y={314} w={232} h={76} kicker="CLASSIFICATION" title="How are they walking?" />
        <Box x={692} y={430} w={232} h={76} kicker="RECOGNITION" title="Who is walking?" />

        {/* viewpoints */}
        <text x={1056} y={334} textAnchor="middle" fontSize={11} letterSpacing={0.9} fill={C.blue} fontWeight={500}>
          VIEWPOINTS
        </text>
        <ViewFan cx={1056} cy={486} r={96} />
        <text x={1056} y={530} textAnchor="middle" fontSize={13} fill={C.ink2}>
          11 views · 3 used
        </text>
      </svg>

      {/* Mobile */}
      <svg
        className="art art--mobile"
        viewBox="0 0 800 760"
        role="img"
        aria-label="CASIA-B walking silhouettes, the two tasks, and 11 camera views with 0°, 90° and 180° used"
      >
        <text x={40} y={50} fontSize={20} letterSpacing={2} fill={C.ink3} fontWeight={500}>
          CASIA-B · SILHOUETTE FRAMES
        </text>
        <Frames x0={40} y={74} w={134.4} h={230} n={5} gap={12} images={casiaFrames} />
        <ViewFan cx={196} cy={640} r={128} s={1.7} />
        <text x={196} y={712} textAnchor="middle" fontSize={22} fill={C.ink2}>
          11 views · 3 used
        </text>
        <Box x={420} y={392} w={340} h={124} kicker="CLASSIFICATION" title="How are they walking?" s={1.5} />
        <Box x={420} y={540} w={340} h={124} kicker="RECOGNITION" title="Who is walking?" s={1.5} />
      </svg>
    </>
  );
}
