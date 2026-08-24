import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/content/services";
import { workspaceSlugs } from "@/content/workspace";
import { site } from "@/content/site";

const staticPaths = [
  "",
  "/services",
  "/workspace",
  "/meeting-rooms",
  "/pricing",
  "/location",
  "/foreign-companies",
  "/about",
  "/partners",
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
    ...workspaceSlugs.map((slug) => `/workspace/${slug}`),
  ];

  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/pricing" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/pricing" ? 0.9 : 0.7,
  }));
}
