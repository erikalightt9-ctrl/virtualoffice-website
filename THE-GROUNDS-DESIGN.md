# THE GROUNDS Website Design Handoff

This file is automatically loaded by Claude Code through `CLAUDE.md`.

## The design direction

There is one direction. The office-led design is the homepage:

- Page: `src/app/page.tsx`
- Scoped styles: `src/app/home.module.css`
- Global tokens and material motifs: `src/app/globals.css`

The exploratory concepts have been deleted, along with their stylesheets and
logo variants. They remain in git history if anything ever needs recovering, but
they are not part of the site and should not be revived without being asked —
they were built for a different name and a different visual idea.

**Do not add new `/concept-*` routes.** Change the design in place, on the
homepage, so there is never a question about which version is current.

## Positioning — the hard boundary

**The Grounds is a virtual-office service, operated by Philippine Dragon Media Network Corp.**

That is the entire offer:

- A business address at 104 Paseo de Roxas, Legaspi Village, Makati
- Mail and document handling by on-site staff
- Meeting rooms and serviced workspace on the same floor
- A **registered-address option** on eligible packages — a component of the
  virtual office, not a separate service

### What The Grounds does NOT offer, coordinate, arrange, facilitate or advise on

- SEC registration or filings
- BIR registration or filings
- Business permits or permit processing
- Company registration or incorporation
- Bookkeeping or accounting
- Tax preparation, filing or compliance
- Payroll
- Corporate secretarial work
- Market-entry or business-setup consulting

There are **no partner firms** delivering any of that on our behalf. A
client's registrations, filings, permits, tax obligations and compliance are
theirs, to handle with their own advisers. The Grounds is the address on the
paperwork and nothing more.

### Copy rules

Never write, or imply:

- "We register your company"
- "We handle SEC/BIR registration"
- "We process your permits"
- "Coordinated through our licensed partner firms"
- "Registration support", "compliance support", "business establishment support"

Write instead:

> The Grounds provides a professional virtual-office solution, including
> registered-address options for businesses that need a credible Philippine
> business address.

For the registered address, describe **what it is** (an address you may name as
your registered business address, subject to approval) and be explicit about
**what it is not** (any filing or registration work on the client's behalf).

### Also removed

- All references to **613 sqm**. Describe the floor by what is on it — staffed
  reception, six bookable rooms, serviced workstations — not by area.
- Wider-group and sister-company references. The operator is named because it
  is a fact worth knowing; nothing beyond that supports the positioning.

### Where the scope is enforced in code

| File | What it guards |
| --- | --- |
| `src/content/services.ts` | Scope warning at the top; only three services exist |
| `src/content/pricing.ts` | No registration or compliance products or bundles |
| `src/content/faqs.ts` | Scope note; answers decline out-of-scope work plainly |
| `src/content/legal.ts` | Terms state the exclusion explicitly |
| `src/lib/chat-config.ts` | Chatbot guardrail: "What The Grounds is, and is not" |
| `src/components/Footer.tsx` | Site-wide disclaimer on every page |

## Physical-office design language

The website should feel continuous with the real office. Its dominant visual references are:

- Warm oak floors, cabinetry, shelving, and ceiling slats
- Concrete-gray feature walls
- Charcoal ceilings, lighting fixtures, frames, and office chairs
- White desks, reception surfaces, and glass partitions
- Green indoor plants
- Restrained corporate red accents
- Warm, welcoming hospitality combined with professional credibility

Use generous spacing, editorial typography, clean grids and the real office photography. Keep decoration minimal and material: lines, arcs, wood rhythm, surface tints. Nothing neon, nothing cosmic, nothing that looks like an interface from a film.

## The palette, sampled from the office

These values were measured from the five office photographs, not chosen by eye.
Every one of them is defined as a token in `src/app/globals.css`; nothing in the
site should hardcode a colour outside that file.

What the photographs actually contain, by share of frame:

| Material | Share | Sampled | Token |
| --- | --- | --- | --- |
| Concrete and white — walls, desks, blinds | 30–62% | `#f1f2f2` → `#909090` | `--grounds-bone`, `--grounds-surface-2`, `--grounds-text-faint` |
| Oak — floors, ceiling slats, joinery | 5–33% | `#a68c73` mean | `--grounds-oak`, `--grounds-oak-light`, `--grounds-oak-deep` |
| Charcoal — exposed ceilings, steel, chairs | — | `#2e2f31`, `#16191c` | `--grounds-ink`, `--grounds-ink-2`, `--grounds-ink-3` |
| Teal — the pantry wall | 1–6% | `#557f7b` | `--grounds-teal`, `--grounds-seafoam` |
| Red — the leather sofa | small | `#70341a`–`#b4462b` | `--grounds-clay` |

The accent has since been brightened. The sampled sofa red was duller than the
logo's own gradient, which made the site look flatter than its own logo. See
the accent section below.

Two rules follow from the measurements:

1. **Warm oak and concrete carry the page.** They are what the room is mostly
   made of, so they are what the site is mostly made of.
2. **Red is reserved for actions**, exactly as the office reserves it — one
   sofa on the whole floor. It is never decoration.

There is no gold in the office, and there is none in the palette. The earlier
navy-and-gold scheme has been removed.

### Contrast

Checked against WCAG before adoption. `--grounds-clay` on `--grounds-bone` is
4.88:1 and white on clay is 5.45:1, so the accent is safe for body text and
buttons. `--grounds-text-faint` (2.96:1) is a border and surface colour only —
never text. `--grounds-oak` and `--grounds-amber` are surface tones, not text.

### The accent, and its gradient

One accent, used for actions only. It comes in two forms:

| Token | Value | For |
| --- | --- | --- |
| `--grounds-clay` | `#c92a14` | Links, eyebrows, borders, small markers, focus rings |
| `--grounds-clay-gradient` | `#e02a06` → `#c64405` | Filled surfaces: buttons, badges, bands |
| `--grounds-clay-dark` | `#a32112` | Pressed and hover states |
| `--grounds-clay-wash` | `#fbeae4` | Tinted callout backgrounds |

Use `.accent-fill` for any filled accent surface. It carries the gradient, a
solid fallback and the hover state together, so buttons cannot drift apart.

**Never put a gradient behind small text.** The gradient is for the surface;
the text on it is white.

**The warm end is deliberately held back from full orange.** White text has to
stay legible everywhere along the sweep, and it does — 4.66:1 at the red end,
4.96:1 at the warm end, never dipping between. Push the end further towards
orange and it fails: `#d2560a` drops white to 4.14:1, below AA. Re-check with a
contrast tool before changing either stop.

The solid accent gives 4.91:1 on the page ground, so it is safe for body-size
link text. That was verified on every page, not assumed.

### Material motifs

`globals.css` provides four utility classes drawn from the building itself:
`.slats` and `.slat-rule` (the oak ceiling battens, the office's signature
detail), `.slats-dark` (battens over a dark soffit), `.concrete` (the wall
finish as a quiet surface tint) and `.oak` (for panels that should read as
joinery rather than paper).

## Brand symbolism — the grounds, not the galaxy

The dragon and galaxy motifs are retired. No orbits, constellations, nodes,
star fields, cosmic gradients or dragon curves. They belonged to a different
name and they were never in the room.

The brand is **The Grounds** — *a destination for business, ideas & connection*.
Everything decorative should come from one of those four words, and every motif
below is already present either in the office or in the logo mark.

| Idea | Motif | Where it lives |
| --- | --- | --- |
| **Grounds** — the premises, the foundation | A horizontal ground line. A datum everything else sits on. | The logo mark; `.groundMotif` on the homepage hero |
| **Growth** — a place you stay and build | Concentric arcs rising from that line: canopy, shelter, growth rings | The logo mark and square mark |
| **The room itself** | The oak ceiling battens, as a rhythm of fine vertical lines | `.slats`, `.slat-rule`, `.slats-dark` in `globals.css` |
| **Connection** | Lines that converge and meet, rather than orbit | Available; use sparingly and only where it means something |
| **Warmth** | Concrete and oak surface tints | `.concrete`, `.oak` in `globals.css` |

Rules:

- **One accent, used sparingly.** The clay red is an action colour, exactly as
  the office uses it — one sofa on the whole floor.
- **Nothing floats.** Motifs rest on a line or spring from one. That is the
  whole idea of the name: this is ground, not orbit.
- **No circles for their own sake.** A ring with a dot on it is an orbit, and
  orbits are gone. Arcs that sit on a ground line are fine.
- Language about **arrival, presence, credibility, gathering and growth** —
  not about expansion, frontiers, boundaries or reaching beyond.

## Office photography

Use these real facility assets rather than generated or stock office imagery:

- `public/photos/reception.jpg`
- `public/photos/lounge.jpg`
- `public/photos/pantry.jpg`
- `public/photos/workspace.jpg`
- `public/photos/meeting-room.jpg`

Do not materially alter the photographs or represent generated spaces as the actual facility. Use `next/image`, meaningful alt text, responsive `sizes`, and appropriate `object-position` values.

## Logo and tagline

Current tagline:

> A destination for business, ideas & connection

Logo assets, traced from the supplied artwork:

- `public/the-grounds-logo.svg` — horizontal lockup
- `public/the-grounds-logo-inverse.svg` — lockup for dark grounds
- `public/the-grounds-mark.svg` — mark only
- `public/the-grounds-mark-inverse.svg` — mark only, for dark grounds

The mark is a doorway drawn as nested frames with a handle, and a path that
comes in along the ground and rises up through it. Its colours: charcoal
`#2B2B2B`, grey `#8A8A8A`, a copper handle `#BE7D3E`, and the path running
`#C0392B` to `#D2691E` with a `#A02128` head.

Intrinsic sizes — match these ratios or the artwork squashes:

| Asset | viewBox | Ratio |
| --- | --- | --- |
| lockup | 1320 × 300 | 4.40 : 1 |
| mark | 320 × 280 | 1.14 : 1 |

**These are traced from a raster image, not the original vector.** Ask the
designer for the source file (AI, EPS or SVG) before anything goes to print or
signage, and note that the wordmark here is live `<text>` in a Montserrat
fallback stack rather than outlines — on screen it is close, in print it is
wrong. Two things to watch when replacing them: XML comments must not contain a
double hyphen (it silently breaks the whole SVG), and the wordmark should be
converted to outlines.

**The brand is always "The Grounds" — never "Grounds" on its own.**

## Content and data rules

- Keep prices centralized in `src/content/pricing.ts`.
- Keep address, contact, operator, and navigation data centralized in `src/content/site.ts`.
- Preserve the scope caveats. Never imply we register companies, make filings,
  obtain permits, or handle accounting, tax or payroll — see the positioning
  boundary above.
- Do not invent contact details, registration numbers, client counts, or facility facts.

## Development and verification

Claude Code can launch the project using `.claude/launch.json` on port `3002`.

Before handing off changes, run:

```text
npm run lint
npm run build
```

The repository uses Next.js 16.3.2. Read the relevant files under `node_modules/next/dist/docs/` before changing framework-specific code, as required by `AGENTS.md`.
