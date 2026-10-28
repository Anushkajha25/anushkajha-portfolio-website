import Link from "next/link";
import { Fragment, type CSSProperties } from "react";
import type { Block, Project, Section } from "@/data/projects";
import { SHOW_PLACEHOLDERS, isPlaceholder } from "@/lib/placeholders";
import { EmailPill } from "./Contact";
import { Diagram } from "./Diagrams";
import { Glow } from "./Glow";
import { ScrollTop } from "./ScrollTop";
import { ArrowIcon, ArrowLeftIcon } from "./icons";
import { CoverArt } from "./visuals/CardArt";

function Needed({ note }: { note: string }) {
  return (
    <div className="needed" role="note">
      <strong>[CONTENT NEEDED]</strong>
      {note}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "text":
      return (
        <div className="prose">
          {block.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      );
    case "list":
      return (
        <ul className="cs-list">
          {block.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "metrics":
      return (
        <div>
          <div className="cs-metrics">
            {block.items.map((m) => (
              <div className="cs-metric" key={m.label}>
                <div className="value">{m.value}</div>
                <div className="what">{m.label}</div>
              </div>
            ))}
          </div>
          {block.note && (
            <p className="cs-note" style={{ marginTop: 20 }}>
              {block.note}
            </p>
          )}
        </div>
      );
    case "diagram":
      return (
        <figure className="cs-figure">
          <Diagram kind={block.diagram} />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "table":
      return (
        <figure className="cs-table">
          {block.caption && <figcaption className="cs-table-cap">{block.caption}</figcaption>}
          <div className="cs-table-scroll">
            <table>
              <thead>
                <tr>
                  {block.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r) => (
                  <tr key={r.cells[0]} className={r.best ? "best" : undefined}>
                    {r.cells.map((c, i) =>
                      i === 0 ? (
                        <th key={i} scope="row">
                          {c}
                        </th>
                      ) : (
                        <td key={i}>{c}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && <p className="cs-note">{block.note}</p>}
        </figure>
      );
    case "tags":
      return (
        <p className="cs-tags">
          {block.items.map((t, i) => (
            <Fragment key={t}>
              {i > 0 && (
                <>
                <span className="dot" aria-hidden>·</span>{" "}
                </>
              )}
              <span style={{ whiteSpace: "nowrap" }}>{t}</span>
            </Fragment>
          ))}
        </p>
      );
    case "links":
      return (
        <ul className="cs-links">
          {block.items.map((l) => (
            <li key={l.label}>
              {l.href ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="link">
                  {l.label} <span className="arrow">↗</span>
                </a>
              ) : (
                <span>{l.label}</span>
              )}
              {l.note && <span className="note">{l.note}</span>}
            </li>
          ))}
        </ul>
      );
    case "needed":
      return <Needed note={block.note} />;
  }
}

/** Drop unfinished content in production; drop sections left empty. */
function visibleSections(sections: Section[]): Section[] {
  if (SHOW_PLACEHOLDERS) return sections;
  return sections
    .map((s) => ({
      ...s,
      blocks: s.blocks
        .filter((b) => b.kind !== "needed")
        .map((b) =>
          b.kind === "links" ? { ...b, items: b.items.filter((l) => !isPlaceholder(l.note) && !isPlaceholder(l.label)) } : b,
        )
        .filter((b) => !(b.kind === "links" && b.items.length === 0)),
    }))
    .filter((s) => s.blocks.length > 0);
}

export function CaseStudy({ project, next }: { project: Project; next?: Project }) {
  const cs = project.caseStudy!;
  const sections = visibleSections(cs.sections);
  const d = (n: number) => ({ "--i": n }) as CSSProperties;

  return (
    <article className="cs">
      <ScrollTop />
      <Glow position="top" />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <Link href="/#work" className="cs-back enter">
          <span className="arrow">
            <ArrowLeftIcon />
          </span>
          All work
        </Link>

        <header className="cs-head">
          <h1 className="h2 enter" style={d(1)}>
            {project.title}
          </h1>
          <p className="label enter" style={d(2)}>
            {cs.category}
          </p>
          <p className="lead enter" style={d(3)}>
            {project.oneLiner}
          </p>
        </header>

        <div
          className={`card cs-cover enter ${project.layout === "half" ? "cs-cover--half" : ""}`}
          style={d(4)}
        >
          <CoverArt kind={project.visual} />
        </div>

        <div className="cs-read">
          <dl className="cs-facts enter" style={d(5)}>
            {cs.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          {sections.map((s) => (
            <section className="cs-section" id={s.id} key={s.id} data-reveal>
              <h2>{s.title}</h2>
              <div className="cs-blocks">
                {s.blocks.map((b, j) => (
                  <BlockView block={b} key={j} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="cs-end" data-reveal>
          <h2 className="h3">Want to know more?</h2>
          <p className="lead">
            There&rsquo;s more to this than fits on one page. I&rsquo;m happy to walk you through it.
          </p>
          <EmailPill />
        </div>

        {next && (
          <div className="cs-next" data-reveal>
            <Link href={`/work/${next.slug}`} className="card card-pad">
              <span>
                <span className="label">Next project</span>
                <span className="h3" style={{ display: "block" }}>
                  {next.title}
                </span>
              </span>
              <span className="glass circle" aria-hidden>
                <ArrowIcon />
              </span>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
