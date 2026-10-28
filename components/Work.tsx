import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function Work() {
  return (
    <section id="work" className="container section">
      <h2 className="h2 section-title" data-reveal>
        A few things I&rsquo;ve built
      </h2>
      <div className="work-grid">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
