import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the build root to this folder. Without it, Next walks up the tree and
  // picks up an unrelated package-lock.json from the user directory.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
