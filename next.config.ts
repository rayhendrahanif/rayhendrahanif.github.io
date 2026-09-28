import type { NextConfig } from "next";

// Static export for GitHub Pages: `npm run build` writes the site to ./out
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
