import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack never walks up to a stray parent
  // lockfile. process.cwd(), not __dirname: this repo is sometimes served
  // through an NTFS junction, and __dirname resolves to the junction
  // TARGET while the server runs from the junction PATH — Next then
  // concatenates the two into a nonexistent path. cwd is consistent in
  // both dev and CI/Vercel builds.
  turbopack: {
    root: process.cwd(),
  },

  images: {
    // AVIF first, WebP fallback. Worth the extra encode time on a site
    // where imagery is the product.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
