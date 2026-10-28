import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container hero" style={{ minHeight: "60vh" }}>
      <p className="label">404</p>
      <h1 className="display" style={{ marginTop: 14 }}>
        Nothing here.
      </h1>
      <p className="lead" style={{ marginTop: 20 }}>
        <Link href="/" className="link">
          Back to the homepage <span className="arrow arrow--right">→</span>
        </Link>
      </p>
    </section>
  );
}
