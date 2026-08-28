# PDMN Virtual Office — Website Design Handoff

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

**PDMN Virtual Office is operated by Philippine Dragon Media Network Corp.**

That is the entire offer:

- A business address at 104 Paseo de Roxas, Legaspi Village, Makati
- Mail and document handling by on-site staff
- Meeting rooms and serviced workspace on the same floor
- A **registered-address option** on eligible packages — a component of the
  virtual office, not a separate service

### What PDMN Virtual Office does NOT offer, coordinate, arrange, facilitate or advise on

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
theirs, to handle with their own advisers. PDMN Virtual Office is the address on the
paperwork and nothing more.

### Copy rules

Never write, or imply:

- "We register your company"
- "We handle SEC/BIR registration"
- "We process your permits"
- "Coordinated through our licensed partner firms"
- "Registration support", "compliance support", "business establishment support"

Write instead:

> PDMN Virtual Office provides a professional virtual-office solution, including
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
| `src/lib/chat-config.ts` | Chatbot guardrail: "What PDMN Virtual Office is, and is not" |
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
| Concrete and white — walls, desks, blinds | 30–62% | `#f1f2f2` → `#909090` | `--pdmn-bone`, `--pdmn-surface-2`, `--pdmn-text-faint` |
| Oak — floors, ceiling slats, joinery | 5–33% | `#a68c73` mean | `--pdmn-oak`, `--pdmn-oak-light`, `--pdmn-oak-deep` |
| Charcoal — exposed ceilings, steel, chairs | — | `#2e2f31`, `#16191c` | `--pdmn-ink`, `--pdmn-ink-2`, `--pdmn-ink-3` |
| Teal — the pantry wall | 1–6% | `#557f7b` | `--pdmn-teal`, `--pdmn-seafoam` |
| Red — the leather sofa | small | `#70341a`–`#b4462b` | `--pdmn-clay` |

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

Checked against WCAG before adoption. `--pdmn-text-faint` (2.96:1) is a border
and surface colour only — never text. `--pdmn-oak` and `--pdmn-amber` are
surface tones, not text. The accent's own figures are in the section below.

### The accent, and its gradient

One accent, used for actions only. It comes in two forms:

| Token | Value | For |
| --- | --- | --- |
| `--pdmn-clay` | `#c92a14` | Links, eyebrows, borders, small markers, focus rings |
| `--pdmn-clay-gradient` | `#e02a06` → `#c64405` | Filled surfaces: buttons, badges, bands |
| `--pdmn-clay-dark` | `#a32112` | Pressed and hover states |
| `--pdmn-clay-wash` | `#fbeae4` | Tinted callout backgrounds |

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

## Brand symbolism — grounded, not cosmic

The dragon and galaxy motifs are retired. No orbits, constellations, nodes,
star fields, cosmic gradients or dragon curves. They belonged to a different
name and they were never in the room.

The brand is **PDMN Virtual Office** — *a destination for business, ideas &
connection*. Decoration should come from the office itself or from the idea of
arriving somewhere real, and every motif below is drawn from one or the other.

| Idea | Motif | Where it lives |
| --- | --- | --- |
| **Ground** — the premises, the foundation | A horizontal ground line. A datum everything else sits on. | The logo mark; `.groundMotif` on the homepage hero |
| **Growth** — a place you stay and build | Concentric arcs rising from that line: canopy, shelter, growth rings | The logo mark and square mark |
| **The room itself** | The oak ceiling battens, as a rhythm of fine vertical lines | `.slats`, `.slat-rule`, `.slats-dark` in `globals.css` |
| **Connection** | Lines that converge and meet, rather than orbit | Available; use sparingly and only where it means something |
| **Warmth** | Concrete and oak surface tints | `.concrete`, `.oak` in `globals.css` |

Rules:

- **One accent, used sparingly.** The clay red is an action colour, exactly as
  the office uses it — one sofa on the whole floor.
- **Nothing floats.** Motifs rest on a line or spring from one. The office is
  a real place on a real floor; the decoration should behave the same way.
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

### The logo

The identity is **Philippine Dragon Media Network's own**. This is an endorsed
sub-brand: the parent mark carries the credibility, and `VIRTUAL OFFICE` is the
descriptor that says which part of the business this is. Do not commission a
separate mark for the virtual office.

**The artwork is not in the repository yet.** The doorway mark that used to be
here was traced for a retired name and has been deleted — a wrong logo is worse
than none. Until the real artwork arrives the site runs on the stacked text
wordmark, which stands on its own.

To add it, save into `public/`:

| File | Notes |
| --- | --- |
| `pdmn-logo.svg` | Vector. Ideal. |
| `pdmn-logo.png` | Raster with transparency. Fine for web. |
| `pdmn-logo-inverse.svg` or `.png` | Optional, for dark grounds. Falls back to the standard artwork. |

**The artwork must not carry the `WWW.FLW.PH` line** beneath the Chinese
characters. Crop it or ask for a variant without it.

`BrandLogo` probes those paths off-DOM and renders the first that decodes, so a
missing file shows nothing rather than a broken image. Drop the file in and it
appears — no code change.

### Where the logo goes, and where it does not

| Place | What shows |
| --- | --- |
| Header | Text wordmark only — `PDMN` over `VIRTUAL OFFICE` |
| Footer | Full lockup, above the operator line |
| About, operator panel | Full lockup |
| Homepage, operator section | Full lockup |
| Favicon, share card | Typographic placeholder |

The full lockup carries the swirl, the Chinese characters, the mascot and the
company name. At header height the company name sets at roughly six pixels, so
it is illegible there — hence the text wordmark in the header.

**The single most useful thing to obtain is a mark-only variant** — just the
gold swirl, without the type. That would go in the header, the favicon and the
share card, and would finish the identity across the whole site.

### Writing the name

**In body copy, write it in full: "PDMN Virtual Office".** The wordmark stacks
it — `PDMN` over `VIRTUAL OFFICE` — because the full name set on one line is
too wide for a phone header. Both parts come from `site.wordmark` and
`site.wordmarkSub`.

Do not write "PDMN" alone in prose; on its own it reads as the media company,
which is the operator rather than the service. The operator is written in full
as "Philippine Dragon Media Network Corp."

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
