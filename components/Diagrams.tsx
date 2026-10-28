import { Fragment } from "react";
import type { DiagramKind } from "@/data/projects";

type Step = { k: string; t: string; d?: string };

function Flow({ steps, split }: { steps: Step[]; split?: Step[] }) {
  return (
    <div>
      <div className="flow">
        {steps.map((s, i) => (
          <Fragment key={s.t}>
            {i > 0 && (
              <span className="flow-arrow" aria-hidden>
                →
              </span>
            )}
            <div className="flow-step">
              <div className="k">{s.k}</div>
              <div className="t">{s.t}</div>
              {s.d && <div className="d">{s.d}</div>}
            </div>
          </Fragment>
        ))}
      </div>
      {split && (
        <>
          <div className="flow-down" aria-hidden>
            <span className="flow-down-arrow">↓</span>
            <span>splits into two tasks</span>
          </div>
          <div className="flow-split">
            {split.map((s) => (
              <div key={s.t} className="flow-step">
                <div className="k">{s.k}</div>
                <div className="t">{s.t}</div>
                {s.d && <div className="d">{s.d}</div>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const gaitModelGroups = [
  { label: "Feature sets", items: ["ResNet101 + EfficientNetB2", "VGG16 + InceptionV3"] },
  { label: "Condition models", items: ["Residual CNN", "LSTM", "BiLSTM", "3D CNN", "CNN-LSTM", "CNN-BiLSTM"] },
  { label: "Identity models", items: ["GaitNet", "MLP", "Vision Transformer"] },
];

function GaitModels() {
  return (
    <div className="matrix">
      {gaitModelGroups.map((g) => (
        <div className="col" key={g.label}>
          <div className="label">{g.label}</div>
          <ul>
            {g.items.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Diagram({ kind }: { kind: DiagramKind }) {
  switch (kind) {
    case "gait-pipeline":
      return (
        <Flow
          steps={[
            { k: "Input", t: "Silhouettes", d: "CASIA-B · 124 subjects · 0°, 90°, 180°" },
            { k: "Prepare", t: "Validate & augment", d: "224×224, flips, brightness, rotation" },
            { k: "Features", t: "Fused pretrained CNNs", d: "ResNet101 + EfficientNetB2, or VGG16 + InceptionV3" },
            { k: "Reduce", t: "PCA to 512", d: "Concatenate, then reduce" },
          ]}
          split={[
            { k: "Classification", t: "How are they walking?", d: "Normal, bag or coat · 6 models" },
            { k: "Recognition", t: "Who is walking?", d: "Subject identity · 3 models" },
          ]}
        />
      );
    case "gait-models":
      return <GaitModels />;
    case "resume-pipeline":
      return (
        <Flow
          steps={[
            { k: "Input", t: "Resume", d: "Any layout" },
            { k: "Extract", t: "Prompted extraction", d: "ChatGPT API, one consistent set of fields" },
            { k: "Check", t: "Validation", d: "Missing fields stay empty, never inferred" },
            { k: "Output", t: "Structured record", d: "Ready for screening" },
          ]}
        />
      );
    case "android-flow":
      return (
        <Flow
          steps={[
            { k: "Camera", t: "Heart rate", d: "From a short video" },
            { k: "Accelerometer", t: "Respiratory rate", d: "From phone motion" },
            { k: "You", t: "Symptom log", d: "Each symptom, rated" },
            { k: "Device", t: "Local database", d: "Saved on the phone" },
          ]}
        />
      );
    case "water-pipeline":
      return (
        <Flow
          steps={[
            { k: "Data", t: "Water samples", d: "Chemical and biological measurements" },
            { k: "Clean", t: "EDA & cleaning", d: "Mean imputation, outliers, scaling" },
            { k: "Label", t: "Water Quality Index", d: "Potable or not" },
            { k: "Models", t: "Split & grid search", d: "SVM, Decision Tree, XGBoost (best)" },
          ]}
        />
      );
  }
}
