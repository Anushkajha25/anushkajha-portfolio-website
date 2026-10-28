import { C } from "./primitives";

// A decision-tree motif (Decision Tree / XGBoost) above a model ledger.
// The only number shown, 93.07%, is the verified XGBoost result.

export function WaterVisual() {
  const nodes = {
    root: { x: 400, y: 104 },
    l: { x: 232, y: 196 },
    r: { x: 568, y: 196 },
  };
  const leaves = [
    { x: 150, label: "Potable", ok: true, parent: nodes.l },
    { x: 316, label: "Not potable", ok: false, parent: nodes.l },
    { x: 484, label: "Not potable", ok: false, parent: nodes.r },
    { x: 650, label: "Potable", ok: true, parent: nodes.r },
  ];
  const leafY = 296;
  const rows = [
    { m: "SVM", v: "71.29%" },
    { m: "Decision Tree", v: "91.08%" },
    { m: "XGBoost", v: "93.07%", best: true },
  ];
  return (
    <svg className="art" viewBox="0 0 800 680" role="img" aria-label="A decision tree splitting water samples into potable and not potable, and three models compared: SVM 71.29%, Decision Tree 91.08%, XGBoost 93.07% accuracy">
      <text x={60} y={58} fontSize={17} letterSpacing={1.6} fill={C.ink3} fontWeight={500}>
        POTABILITY · BINARY CLASSIFICATION
      </text>
      {/* edges */}
      <g stroke={C.ink3} strokeWidth={1.5} fill="none" opacity={0.7}>
        <path d={`M${nodes.root.x},${nodes.root.y} L${nodes.l.x},${nodes.l.y}`} />
        <path d={`M${nodes.root.x},${nodes.root.y} L${nodes.r.x},${nodes.r.y}`} />
        {leaves.map((l, i) => (
          <path key={i} d={`M${l.parent.x},${l.parent.y} L${l.x},${leafY - 22}`} />
        ))}
      </g>
      <circle cx={nodes.root.x} cy={nodes.root.y} r={15} fill={C.ink} />
      <circle cx={nodes.l.x} cy={nodes.l.y} r={11} fill={C.ink2} />
      <circle cx={nodes.r.x} cy={nodes.r.y} r={11} fill={C.ink2} />
      {leaves.map((l, i) => (
        <g key={i}>
          <rect x={l.x - 76} y={leafY - 22} width={152} height={44} rx={22} fill={l.ok ? C.blueSoft : C.tile2} />
          <text x={l.x} y={leafY + 7} textAnchor="middle" fontSize={19} fill={l.ok ? C.blue : C.ink2} fontWeight={500}>
            {l.label}
          </text>
        </g>
      ))}

      {/* ledger */}
      <rect x={60} y={392} width={680} height={236} rx={16} fill={C.white} stroke={C.line} strokeWidth={1.25} />
      <text x={92} y={436} fontSize={15} letterSpacing={1.4} fill={C.ink3} fontWeight={500}>
        GRID SEARCH · 3 MODELS
      </text>
      <text x={708} y={436} textAnchor="end" fontSize={15} letterSpacing={1.4} fill={C.ink3} fontWeight={500}>
        ACCURACY
      </text>
      {rows.map((r, i) => {
        const y = 494 + i * 52;
        return (
          <g key={r.m}>
            <line x1={92} x2={708} y1={y - 34} y2={y - 34} stroke={C.line} />
            <text x={92} y={y} fontSize={24} fontWeight={600} fill={r.best ? C.ink : C.ink2} letterSpacing={-0.3}>
              {r.m}
            </text>
            {r.best && (
              <g>
                <rect x={222} y={y - 22} width={64} height={30} rx={15} fill={C.blueSoft} />
                <text x={254} y={y - 1} textAnchor="middle" fontSize={15} fill={C.blue} fontWeight={600}>
                  best
                </text>
              </g>
            )}
            <text
              
              x={708}
              y={y}
              textAnchor="end"
              fontSize={r.best ? 26 : 19}
              fontWeight={r.best ? 600 : 400}
              fill={r.best ? C.blue : C.ink3}
            >
              {r.v}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
