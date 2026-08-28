"use client";

import { useEffect, useState } from "react";

/**
 * The Philippine Dragon Media Network lockup.
 *
 * TO ADD IT: save the logo into `public/` as one of these, best format first:
 *
 *     public/pdmn-logo.svg      ← vector, ideal
 *     public/pdmn-logo.png      ← raster with transparency, fine for web
 *
 * The artwork must NOT carry the WWW.FLW.PH line beneath the Chinese
 * characters. Crop or supply a variant without it before saving.
 *
 * An inverse variant for dark grounds is optional. If `pdmn-logo-inverse.*`
 * is absent, the standard artwork is used there instead.
 *
 * Until a file exists this renders nothing, so the surrounding text wordmark
 * stands alone. It probes the candidates off-DOM before rendering, so a
 * missing file never flashes a broken-image icon on the page.
 *
 * Deliberately NOT used in the site header: the full lockup carries the swirl
 * mark, the Chinese characters, the mascot and the company name, and at header
 * height the company name would set at roughly six pixels. It belongs where
 * there is room to read it — the footer and the operator panel on About.
 * If a mark-only variant of the logo turns up, that is the one for the header.
 */

const STANDARD = ["/pdmn-logo.svg", "/pdmn-logo.png"];
const INVERSE = ["/pdmn-logo-inverse.svg", "/pdmn-logo-inverse.png", ...STANDARD];

type Props = {
  /** Rendered height in pixels. Width follows the artwork. */
  height?: number;
  /** Prefer the light-on-dark variant, for the footer. */
  inverse?: boolean;
  className?: string;
};

export default function BrandLogo({
  height = 44,
  inverse = false,
  className = "",
}: Props) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const candidates = inverse ? INVERSE : STANDARD;
    let cancelled = false;

    // Probe each candidate off-DOM and keep the first that decodes.
    const probe = (i: number) => {
      if (cancelled || i >= candidates.length) return;
      const img = new window.Image();
      img.onload = () => {
        if (!cancelled) setSrc(candidates[i]);
      };
      img.onerror = () => probe(i + 1);
      img.src = candidates[i];
    };
    probe(0);

    return () => {
      cancelled = true;
    };
  }, [inverse]);

  if (!src) return null;

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt="Philippine Dragon Media Network"
      style={{ height, width: "auto" }}
      className={className}
    />
  );
}
