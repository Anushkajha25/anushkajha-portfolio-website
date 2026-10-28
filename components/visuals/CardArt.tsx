import { AndroidVisual, BreathScreen, HeartScreen } from "./AndroidVisual";
import { Frames, GaitVisual, ViewFan } from "./GaitVisual";
import { casiaFrames } from "@/data/gaitFrames";
import { C } from "./primitives";
import { ResumeVisual } from "./ResumeVisual";
import { WaterVisual } from "./WaterVisual";
import type { VisualKind } from "@/data/projects";

// Compositions sized for the homepage project cards. Artwork bleeds off the
// card's bottom edge, the way product shots do on the reference.

function GaitCard() {
  // 2 real frames sit a little wider; 3 (real or drawn) use the narrower size.
  const n = casiaFrames.length === 2 ? 2 : 3;
  const w = n === 2 ? 140 : 120;
  const gap = n === 2 ? 20 : 14;
  const x0 = (500 - (n * w + (n - 1) * gap)) / 2;
  return (
    <svg
      className="art"
      viewBox="0 0 500 440"
      role="img"
      aria-label="Three CASIA-B walking silhouettes above a fan of 11 camera views, with the 0°, 90° and 180° views used in the study highlighted"
    >
      <text x={x0} y={34} fontSize={11} letterSpacing={1.1} fill={C.ink3} fontWeight={500}>
        CASIA-B · SILHOUETTES
      </text>
      <Frames x0={x0} y={48} w={w} h={180} n={n} gap={gap} images={casiaFrames} />
      <ViewFan cx={250} cy={410} r={128} s={1.1} />
      <text x={250} y={436} textAnchor="middle" fontSize={12} fill={C.ink2}>
        11 views · 3 used
      </text>
    </svg>
  );
}

function AndroidCard() {
  return (
    <svg
      className="art"
      viewBox="0 0 500 440"
      role="img"
      aria-label="Two phone screens: heart rate measured from camera video and respiratory rate from the accelerometer"
    >
      <g transform="translate(26 56)">
        <HeartScreen />
      </g>
      <g transform="translate(262 96)">
        <BreathScreen />
      </g>
    </svg>
  );
}

/** Artwork for a homepage card. */
export function CardArt({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "gait":
      return <GaitCard />;
    case "android":
      return <AndroidCard />;
    case "resume":
      return <ResumeVisual />;
    case "water":
      return <WaterVisual />;
  }
}

/** Artwork for a case-study cover (wider compositions). */
export function CoverArt({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "gait":
      return <GaitVisual />;
    case "android":
      return <AndroidVisual />;
    case "resume":
      return <ResumeVisual />;
    case "water":
      return <WaterVisual />;
  }
}
