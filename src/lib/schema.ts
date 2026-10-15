import { publishedAddressTiers } from "@/content/pricing";
import { site } from "@/content/site";

/**
 * Structured data beyond the LocalBusiness block in the root layout.
 *
 * Two things were missing and both cost visibility: there was no Service/Offer
 * markup, so the packages and their prices were invisible to search engines
 * even though they are the most searched-for thing on the site; and there was
 * no BreadcrumbList, so result snippets showed a bare URL instead of a path.
 *
 * PRICES COME FROM content/pricing.ts, never typed here. A price repeated in
 * structured data is a price that goes stale silently — the page would say one
 * thing and the search result another.
 *
 * NOTE ON TAX: schema.org offers `valueAddedTaxIncluded`, and it is
 * deliberately NOT set. Whether these rates include the 12% VAT has not been
 * confirmed, and asserting either value in machine-readable form is worse than
 * omitting it. Set it once the tax treatment is settled.
 */

const abs = (path: string) => new URL(path, site.url).toString();

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Virtual Office",
    serviceType: "Virtual office and registered business address",
    provider: {
      "@type": "Organization",
      name: site.operator.name,
      url: site.url,
    },
    areaServed: { "@type": "Country", name: "Philippines" },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.floor}, ${site.address.building}, ${site.address.line1}`,
      addressLocality: site.address.city,
      addressRegion: site.address.village,
      postalCode: site.address.postcode,
      addressCountry: "PH",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Virtual office packages",
      itemListElement: publishedAddressTiers.map((tier) => {
        const monthly = tier.priceMonthly;
        const starting = tier.startingPrice;
        return {
          "@type": "Offer",
          name: tier.name,
          description: tier.bestFor,
          url: abs("/services"),
          priceCurrency: "PHP",
          /* A monthly package states a price; a quoted one states the floor
             it starts from. Conflating the two would advertise ₱5,000 as the
             VIP price when it is the lower bound of a quotation. */
          ...(typeof monthly === "number"
            ? {
                price: String(monthly),
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price: String(monthly),
                  priceCurrency: "PHP",
                  unitCode: "MON",
                  billingduration: 1,
                },
              }
            : {}),
          ...(typeof starting === "number" && typeof monthly !== "number"
            ? {
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: String(starting),
                  priceCurrency: "PHP",
                },
              }
            : {}),
          availability: "https://schema.org/InStock",
        };
      }),
    },
  };
}

/** A trail for result snippets. `path` excludes the home crumb, which is added. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}
