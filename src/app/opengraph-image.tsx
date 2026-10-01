import { ImageResponse } from "next/og";
import { site } from "@/content/site";
export const dynamic = "force-static";

/**
 * The card that appears when someone shares a link on Viber, WhatsApp,
 * LinkedIn or Facebook. Without this, shares show a blank rectangle — which
 * matters here because Viber and WhatsApp are the main referral channels.
 *
 * Rendered at request time from the office palette. Fonts fall back to the
 * platform sans, which is fine at this size and avoids shipping a font binary.
 *
 * Typographic for now. Once a mark-only variant of the Philippine Dragon Media
 * Network logo exists, that belongs at the top of this card in place of the
 * accent rule.
 */

export const alt = "PDMN Virtual Office — a destination for business, ideas & connection";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#3D0708",
          padding: "72px 80px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 150,
            height: 10,
            background: "linear-gradient(100deg, #870507 0%, #A80407 100%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 116,
              letterSpacing: 6,
              color: "#FDFBF7",
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            {site.wordmark}
          </div>
          <div
            style={{
              fontSize: 34,
              letterSpacing: 16,
              color: "#E3C9A8",
              fontWeight: 600,
              marginTop: 6,
            }}
          >
            {site.wordmarkSub}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 30,
              color: "#F6E8D8",
              letterSpacing: 1,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "2px solid #8A3520",
            paddingTop: 26,
            fontSize: 24,
            color: "#E3C9A8",
            letterSpacing: 1,
          }}
        >
          <span>
            {site.address.floor}, {site.address.building}
          </span>
          <span>
            {site.address.village}, {site.address.city}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
