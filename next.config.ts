import type { NextConfig } from "next";

// The short address is the main one; the original long Vercel address forwards to it.
const PRIMARY = "https://anushka-jha.vercel.app";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "anushkajha-portfolio-website.vercel.app" }],
        destination: `${PRIMARY}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
