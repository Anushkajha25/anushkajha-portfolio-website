import type { CSSProperties } from "react";
import { site } from "@/data/site";
import { Glow } from "./Glow";

const d = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" className="hero">
      <Glow position="top" />
      <div className="container">
        <h1 className="display hero-title">
          <span className="enter" style={d(0)}>
            Hi there,
          </span>
          <span className="enter" style={d(1)}>
            I&rsquo;m {site.firstName}
          </span>
        </h1>

        <p className="lead hero-copy enter" style={d(2)}>
          An AI/ML engineer and MS Computer Science student at Arizona State University. I build intelligent systems
          that work beyond the notebook, from gait recognition research to an LLM pipeline that went into production.
        </p>

        <a href="#contact" className="glass pill hero-cta enter" style={d(3)}>
          Get in touch
        </a>

        <p className="hero-note enter" style={d(4)}>
          Open to full-time roles from June 2027
        </p>
      </div>
    </section>
  );
}
