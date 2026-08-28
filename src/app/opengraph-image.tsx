import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/**
 * The card that appears when someone shares a link on Viber, WhatsApp,
 * LinkedIn or Facebook. Without this, shares show a blank rectangle — which
 * matters here because Viber and WhatsApp are the main referral channels.
 *
 * Rendered at request time from the office palette. Fonts fall back to the
 * platform sans, which is fine at this size and avoids shipping a font binary.
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
          background: "#1d1f21",
          padding: "72px 80px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        {/* The mark: doorway with a path rising through it */}
        <svg width="150" height="131" viewBox="0 0 320 280">
          <path
            d="M22 262 V30 H258 V262"
            fill="none"
            stroke="#F2EFE9"
            strokeWidth="20"
          />
          <path
            d="M78 238 V78 H210 V238"
            fill="none"
            stroke="#A8A49D"
            strokeWidth="9"
          />
          <circle cx="143" cy="137" r="11" fill="#D19A57" />
          <path
            d="M18 264 H118 C205 264 245 226 281 168"
            fill="none"
            stroke="#D2691E"
            strokeWidth="26"
            strokeLinecap="round"
          />
          <path
            d="M264 190 L289 145 L305 180"
            fill="none"
            stroke="#C4443C"
            strokeWidth="22"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 116,
              letterSpacing: 6,
              color: "#F2EFE9",
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
              color: "#8F8D89",
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
              color: "#B0ADA6",
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
            borderTop: "2px solid #3a3d3f",
            paddingTop: 26,
            fontSize: 24,
            color: "#8F8D89",
            letterSpacing: 1,
          }}
        >
          <span>
            {site.address.floor}, {site.address.line1}
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
