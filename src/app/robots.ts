import type { MetadataRoute } from "next";
import { site } from "@/content/site";
export const dynamic = "force-static";

// Set NEXT_PUBLIC_ALLOW_INDEXING=false for private preview builds.
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}

