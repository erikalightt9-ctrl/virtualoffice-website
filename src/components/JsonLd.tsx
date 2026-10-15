/**
 * Renders a structured-data block.
 *
 * Kept as one component so every JSON-LD block on the site is serialised the
 * same way, rather than each page hand-rolling its own script tag.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
