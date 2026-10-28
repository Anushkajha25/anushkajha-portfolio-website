import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";
import { ArrowIcon } from "./icons";
import { CardArt } from "./visuals/CardArt";

export function ProjectCard({ project }: { project: Project }) {
  const style = { "--t1": project.tint[0], "--t2": project.tint[1] } as CSSProperties;
  const cls = ["card", "project", project.layout === "wide" && "project--wide"].filter(Boolean).join(" ");

  const inner = (
    <>
      <div className="project-text">
        <p className="label">{project.label}</p>
        <h3 className="h3 project-title">{project.title}</h3>
        <p className="project-line">{project.oneLiner}</p>
        <p className="project-detail">{project.cardDetail}</p>
        <ul className="project-stats">
          {project.highlights.map((h) => (
            <li key={h.label}>
              <span className="v">{h.value}</span>
              <span className="l">{h.label}</span>
            </li>
          ))}
        </ul>
        {project.caseStudy && (
          <span className="project-go" aria-hidden>
            <span className="glass circle">
              <ArrowIcon />
            </span>
          </span>
        )}
      </div>
      <div className="project-art">
        <CardArt kind={project.visual} />
      </div>
    </>
  );

  return project.caseStudy ? (
    <Link href={`/work/${project.slug}`} className={cls} style={style} data-reveal>
      {inner}
    </Link>
  ) : (
    <article className={cls} style={style} data-reveal>
      {inner}
    </article>
  );
}
