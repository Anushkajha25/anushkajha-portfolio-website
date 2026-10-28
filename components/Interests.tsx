import Image from "next/image";
import type { CSSProperties } from "react";
import { personal, type Interest, type InterestDetail } from "@/data/personal";
import { SHOW_PLACEHOLDERS } from "@/lib/placeholders";
import { DialogOpener } from "./DialogOpener";
import { CloseIcon, InterestGlyph, PlusIcon } from "./icons";

function Photos({ item }: { item: Interest }) {
  const images = item.images ?? [];
  const empty = SHOW_PLACEHOLDERS ? Math.max(0, (item.photoSlots ?? 0) - images.length) : 0;
  if (images.length + empty === 0) return null;
  return (
    <div className="sheet-photos">
      {images.map((img) => (
        <Image key={img.src} src={img.src} alt={img.alt} width={480} height={480} sizes="(max-width: 600px) 30vw, 170px" />
      ))}
      {Array.from({ length: empty }).map((_, i) => (
        <div className="photo-slot" key={`slot-${i}`} aria-hidden>
          Photo
        </div>
      ))}
    </div>
  );
}

/** The structured pair that closes every panel: label above value, two columns (stacked on phones). */
function InterestDetails({ details }: { details: InterestDetail[] }) {
  return (
    <dl className="sheet-details">
      {details.map((d) => (
        <div key={d.label}>
          <dt>{d.label}</dt>
          <dd>{d.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** "When I’m not building things": clickable cards, each opening a detail sheet. */
export function Interests() {
  if (!personal.enabled) return null;
  const items: Interest[] = personal.interests;

  return (
    <section id="life" className="container section">
      <div className="section-title" data-reveal>
        <h2 className="h2">When I&rsquo;m not building things</h2>
        <p className="lead section-sub">A few things that make me, me.</p>
      </div>

      <div className="interests" data-reveal>
        {items.map((item) => {
          const cover = item.images?.[0];
          const style = { "--t1": item.tint[0], "--t2": item.tint[1] } as CSSProperties;
          return (
            <button
              key={item.id}
              type="button"
              className={`card interest ${cover ? "interest--photo" : ""}`}
              style={style}
              data-open={`life-${item.id}`}
              aria-haspopup="dialog"
            >
              {cover && (
                <Image className="interest-cover" src={cover.src} alt="" width={640} height={640} sizes="(max-width: 899px) 90vw, 320px" />
              )}
              <span className="interest-top">
                <span className="interest-icon" aria-hidden>
                  <InterestGlyph name={item.icon} />
                </span>
                <span className="glass circle interest-plus" aria-hidden>
                  <PlusIcon />
                </span>
              </span>
              <span className="interest-text">
                <span className="interest-title">{item.title}</span>
                <span className="interest-teaser">{item.teaser}</span>
              </span>
            </button>
          );
        })}
      </div>

      {items.map((item) => (
        <dialog key={item.id} id={`life-${item.id}`} className="sheet" aria-labelledby={`life-${item.id}-title`}>
          <form method="dialog" className="sheet-close">
            <button type="submit" className="glass circle" aria-label="Close">
              <CloseIcon />
            </button>
          </form>
          <span className="interest-icon" aria-hidden>
            <InterestGlyph name={item.icon} />
          </span>
          <h3 id={`life-${item.id}-title`} className="h3 sheet-title">
            {item.title}
          </h3>
          <p className="sheet-teaser">{item.teaser}</p>
          <div className="sheet-body">
            {item.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Photos item={item} />
          <InterestDetails details={item.details} />
        </dialog>
      ))}

      <DialogOpener />
    </section>
  );
}
