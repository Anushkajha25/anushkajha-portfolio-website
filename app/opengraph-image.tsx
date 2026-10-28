import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// Link-preview card (LinkedIn, Slack, iMessage, X). Generated once at build time.
export const alt = `${site.name} · AI/ML Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TITLE = site.name;
const SUB = "AI/ML Engineer · MS Computer Science, Arizona State University";
const FOOT = "anushka-jha.vercel.app";

// Fetches only the glyphs we draw, as TTF (Satori can't read woff2).
// If the font can't be fetched, the card still renders with the default font.
async function googleFont(family: string, text: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)
    ).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const res = await fetch(src);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [serif, sans] = await Promise.all([
    googleFont("Instrument+Serif", TITLE),
    googleFont("Inter:wght@400", SUB + FOOT),
  ]);

  const fonts = [
    ...(serif ? [{ name: "Instrument Serif", data: serif, weight: 400 as const, style: "normal" as const }] : []),
    ...(sans ? [{ name: "Inter", data: sans, weight: 400 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#000000",
          fontFamily: "Inter",
        }}
      >
        {/* soft red haze, same palette as the site's glow */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 50% 0%, rgba(221,14,69,0.5) 0%, rgba(221,14,69,0.16) 35%, rgba(0,0,0,0) 62%)",
          }}
        />
        {/* the orb */}
        <div
          style={{
            position: "absolute",
            left: 440,
            top: -250,
            width: 320,
            height: 320,
            borderRadius: 9999,
            display: "flex",
            backgroundImage: "radial-gradient(circle at 50% 50%, #ff3d6e 0%, #dd0e45 55%, #7a0626 100%)",
            boxShadow: "0 0 120px 40px rgba(221,14,69,0.45)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontFamily: "Instrument Serif",
            fontSize: 132,
            lineHeight: 1,
            letterSpacing: -2,
            color: "#ffffff",
            marginTop: 40,
          }}
        >
          {TITLE}
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "rgba(255,255,255,0.68)" }}>{SUB}</div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            padding: "12px 26px",
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.16)",
            background: "rgba(255,255,255,0.06)",
            fontSize: 24,
            color: "#ff3d6e",
          }}
        >
          {FOOT}
        </div>
      </div>
    ),
    { ...size, ...(fonts.length ? { fonts } : {}) },
  );
}
