import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import { education, experience } from "@/data/experience";
import { personal } from "@/data/personal";
import { site } from "@/data/site";
import { skills } from "@/data/skills";

/** "A bit about me": a bento grid of cards, like the reference. */
export function About() {
  // Experience reads oldest → newest along the rail, as on the reference.
  const rail = [...experience].reverse();

  return (
    <section id="about" className="container section">
      <h2 className="h2 section-title" data-reveal>
        A bit about me
      </h2>

      <div className="bento">
        <div className="bento-row bento-row--a" data-reveal>
          <div className="card card-pad">
            <h3 className="h3 card-head">Some context</h3>
            <div className="prose">
              <p>
                I&rsquo;m an AI/ML engineer from Ahmedabad, India, doing my MS in Computer Science at Arizona State
                University after a B.Tech at SRM, where I specialized in AI and ML. I&rsquo;m most drawn to{" "}
                <strong>machine learning</strong>, <strong>LLM applications</strong>, <strong>AI agents</strong> and{" "}
                <strong>computer vision</strong>, and to turning things that work in a notebook into systems people
                can use.
              </p>
              <p>
                I got here a little by accident. A team filming a reel for SRM&rsquo;s social media stopped me in the
                college canteen and asked what ChatGPT would mean for my generation. I had no idea what ChatGPT was. I
                went home, looked it up, and couldn&rsquo;t stop reading about how it worked. It felt like my
                generation&rsquo;s version of the internet arriving.
              </p>
              <p>{personal.intro}</p>
            </div>
          </div>
          <div className="card photo-card">
            <Image src={site.portrait} alt="Anushka Jha" width={460} height={880} sizes="(max-width: 899px) 90vw, 290px" />
          </div>
        </div>

        <div className="bento-row bento-row--b" data-reveal>
          <div className="card card-pad">
            <h3 className="h3 card-head">Education</h3>
            <ul className="dots-v">
              {education.map((e) => (
                <li key={e.org}>
                  <div className="tl-period">{e.period}</div>
                  <div className="tl-title">{e.title}</div>
                  <div className="tl-org">{e.org}</div>
                  {e.note && <div className="tl-note">{e.note}</div>}
                </li>
              ))}
            </ul>
          </div>
          <div className="card card-pad">
            <div className="card-head">
              <h3 className="h3">Work experience</h3>
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="link">
                Resume <span className="arrow">↗</span>
              </a>
            </div>
            <ul className="dots-h" style={{ "--n": rail.length } as CSSProperties}>
              {rail.map((e) => (
                <li key={`${e.org}-${e.period}`}>
                  <div className="tl-period">{e.period}</div>
                  <div className="tl-rail" aria-hidden />
                  <div className="tl-title">{e.title}</div>
                  <div className="tl-org">{e.org}</div>
                  {e.note && <div className="tl-note">{e.note}</div>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card card-pad" data-reveal>
          <h3 className="h3 card-head">Things I work with</h3>
          <ul className="skills">
            {skills.map((s) => (
              <li key={s.group}>
                <div className="group">{s.group}</div>
                <div className="items">
                  {s.items.map((item, i) => (
                    <Fragment key={item}>
                      {i > 0 && (
                        <>
                          <span className="dot" aria-hidden>
                            ·
                          </span>{" "}
                        </>
                      )}
                      <span style={{ whiteSpace: "nowrap" }}>{item}</span>
                    </Fragment>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
