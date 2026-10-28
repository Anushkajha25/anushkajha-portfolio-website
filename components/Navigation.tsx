"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About me" },
  { id: "contact", label: "Contact" },
];

/** Floating glass pill. Highlights the section you're reading (or Work on case studies). */
export function Navigation() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string>(onHome ? "" : "work");

  useEffect(() => {
    if (!onHome) {
      setActive("work");
      return;
    }
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const onScroll = () => {
      const probe = window.innerHeight * 0.4;
      let current = "";
      for (const el of sections) if (el.getBoundingClientRect().top <= probe) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  return (
    <header className="nav">
      <Link href="/" className="nav-mark" aria-label={`${site.name}, home`}>
        aj
      </Link>
      <span className="nav-divider" aria-hidden />
      <nav className="nav-links" aria-label="Primary">
        {links.map((l) => (
          <Link key={l.id} href={`/#${l.id}`} aria-current={active === l.id ? "true" : undefined}>
            {l.label}
          </Link>
        ))}
        <a href={site.resume} target="_blank" rel="noopener noreferrer">
          Resume <span className="arrow">↗</span>
        </a>
      </nav>
    </header>
  );
}
