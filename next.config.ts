import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    qualities: [75, 90],
  },
  // Pin the build root to this folder. Without it, Next walks up the tree and
  // picks up an unrelated package-lock.json from the user directory.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
