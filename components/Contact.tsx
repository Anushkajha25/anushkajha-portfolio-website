import { site } from "@/data/site";
import { Glow } from "./Glow";

export function EmailPill() {
  return (
    <a href={`mailto:${site.email}`} className="glass email-pill" aria-label={`Email me at ${site.email}`}>
      <span className="first">Email me</span>
      <span className="swap">{site.email}</span>
    </a>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section contact">
      <Glow position="bottom" />
      <div className="container">
        <h2 className="h2" data-reveal>
          Your turn. Say hello.
        </h2>
        <p className="lead contact-copy" data-reveal>
          Have an opportunity, want to build something interesting, or just want to say hello?
        </p>
        <p className="availability" data-reveal>
          <span className="availability-dot" aria-hidden />
          {site.availability}
        </p>

        <div className="contact-row" data-reveal>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="glass contact-side">
            LinkedIn <span className="arrow">↗</span>
          </a>
          <EmailPill />
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="glass contact-side">
            GitHub <span className="arrow">↗</span>
          </a>
        </div>

        <p className="email-line" data-reveal>
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
        </p>

        <p className="footnote">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
      </div>
    </section>
  );
}
