import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/content/services";
import { site } from "@/content/site";
export const dynamic = "force-static";

const staticPaths = [
  "",
  "/services",

  "/location",
  "/about",
  "/requirements",
  "/how-it-works",
  "/faq",
  "/contact",
  "/terms",
  "/acceptable-use",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const paths = [
    ...staticPaths,
    ...serviceSlugs.map((slug) => `/services/${slug}`),
  ];

  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/services" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/services" ? 0.9 : 0.7,
  }));
}
