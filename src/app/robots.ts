import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Search engine instructions.
 *
 * ⚠️  INDEXING IS BLOCKED BY DEFAULT.
 *
 * Until the site is genuinely ready for the public, every deployment tells
 * search engines to stay away. That matters here because the site currently
 * carries placeholder telephone numbers and email addresses, provisional
 * pricing, and legal pages that have not been through counsel. A Makati
 * business-address site indexed with a fake phone number would do real damage
 * to the brand, and removing pages from Google is slow and unreliable.
 *
 * When the content is final and you want to be found, set this and redeploy:
 *
 *     NEXT_PUBLIC_ALLOW_INDEXING=true
 */
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
