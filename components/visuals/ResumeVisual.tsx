import { Arrow, C } from "./primitives";

// Anonymized resume → structured record. The highlighted `null` is the point
// of the project: a missing field stays empty instead of being guessed.
// The schema shown is illustrative.

function Doc({ x, y, w, h, rot = 0, variant = 0 }: { x: number; y: number; w: number; h: number; rot?: number; variant?: number }) {
  const px = x + 28;
  const bar = (yy: number, ww: number, o = 0.28, hh = 8, xx = px) => (
    <rect x={xx} y={yy} width={ww} height={hh} rx={hh / 2} fill={C.ink3} opacity={o} />
  );
  const cx = x + w / 2;
  return (
    <g transform={rot ? `rotate(${rot} ${cx} ${y + h / 2})` : undefined}>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={C.white} stroke={C.line} strokeWidth={1.25} />
      {variant === 0 ? (
        <g>
          <rect x={px} y={y + 34} width={150} height={18} rx={4} fill={C.ink} opacity={0.85} />
          {bar(y + 64, 110, 0.35, 8)}
          <line x1={px} x2={x + w - 28} y1={y + 92} y2={y + 92} stroke={C.line} />
          <rect x={px} y={y + 112} width={64} height={8} rx={4} fill={C.blue} opacity={0.75} />
          {bar(y + 132, w - 70)}
          {bar(y + 148, w - 96)}
          {bar(y + 164, w - 120)}
          <rect x={px} y={y + 196} width={80} height={8} rx={4} fill={C.blue} opacity={0.75} />
          {bar(y + 216, w - 80)}
          {bar(y + 232, w - 110)}
          {bar(y + 248, w - 90)}
          {bar(y + 264, w - 140)}
          <rect x={px} y={y + 296} width={52} height={8} rx={4} fill={C.blue} opacity={0.75} />
          {[0, 1, 2].map((r) =>
            [0, 1].map((c) => (
              <rect key={`${r}${c}`} x={px + c * ((w - 56) / 2)} y={y + 316 + r * 16} width={(w - 56) / 2 - 14} height={8} rx={4} fill={C.ink3} opacity={0.28} />
            )),
          )}
        </g>
      ) : (
        <g>
          <rect x={x} y={y} width={w * 0.34} height={h} rx={12} fill={C.tile} />
          {bar(y + 40, w * 0.34 - 56, 0.4, 10)}
          {bar(y + 60, w * 0.34 - 76)}
          <rect x={x + w * 0.34 + 20} y={y + 36} width={120} height={16} rx={4} fill={C.ink} opacity={0.8} />
        </g>
      )}
    </g>
  );
}

function Json({ x, y, w, fs }: { x: number; y: number; w: number; fs: number }) {
  const lh = fs * 1.62;
  const lines: { k?: string; v: string; nul?: boolean; ind?: boolean }[] = [
    { v: "{" },
    { k: "name", v: '"████ ███",', ind: true },
    { k: "email", v: '"███@████",', ind: true },
    { k: "education", v: "[ … ],", ind: true },
    { k: "experience", v: "[ … ],", ind: true },
    { k: "skills", v: "[ … ],", ind: true },
    { k: "portfolio", v: "null", nul: true, ind: true },
    { v: "}" },
  ];
  const h = lines.length * lh + fs * 1.6;
  const cw = fs * 0.6; // monospace advance
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={C.white} stroke={C.line} strokeWidth={1.25} />
      {lines.map((l, i) => {
        const ty = y + fs * 1.55 + i * lh;
        const tx = x + fs * 1.1 + (l.ind ? cw * 2 : 0);
        const keyText = l.k ? `"${l.k}": ` : "";
        const vx = tx + keyText.length * cw;
        return (
          <g key={i}>
            {l.nul && (
              <rect x={vx - fs * 0.3} y={ty - fs * 0.95} width={cw * 4 + fs * 0.6} height={fs * 1.35} rx={fs * 0.3} fill={C.blueSoft} />
            )}
            <text className="t-mono" x={tx} y={ty} fontSize={fs} fill={C.ink2} xmlSpace="preserve">
              {l.k ? <tspan fill={C.ink}>{keyText}</tspan> : null}
              <tspan fill={l.nul ? C.blue : C.ink2} fontWeight={l.nul ? 600 : 400}>
                {l.v}
              </tspan>
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function ResumeVisual() {
  return (
    <svg className="art" viewBox="0 0 800 680" role="img" aria-label="An anonymized resume being turned into a structured record, where a missing field stays null">
      <Doc x={58} y={92} w={290} h={392} rot={-5} variant={1} />
      <Doc x={70} y={84} w={290} h={392} />
      {/* extraction highlight */}
      <rect x={90} y={110} width={190} height={34} rx={8} fill="none" stroke={C.blue} strokeWidth={1.75} strokeDasharray="5 5" />
      <path d="M282,127 C340,127 350,186 404,186" fill="none" stroke={C.blue} strokeWidth={1.5} />
      <circle cx={404} cy={186} r={4.5} fill={C.blue} />

      <Json x={410} y={128} w={336} fs={21} />

      {/* steps */}
      <g fontSize={21}>
        <text x={110} y={600} fill={C.ink2}>Extract</text>
        <Arrow x1={204} y1={593} x2={252} y2={593} />
        <text x={270} y={600} fill={C.blue} fontWeight={600}>Validate</text>
        <Arrow x1={376} y1={593} x2={424} y2={593} />
        <text x={442} y={600} fill={C.ink2}>Structured record</text>
      </g>
      <text x={746} y={482} textAnchor="end" fontSize={17} fill={C.blue}>
        Not in the resume → stays empty
      </text>
    </svg>
  );
}
