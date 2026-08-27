# CAPSULE Website Design Handoff

This file is automatically loaded by Claude Code through `CLAUDE.md`.

## The design direction

There is one direction. The office-led design is the homepage:

- Page: `src/app/page.tsx`
- Scoped styles: `src/app/home.module.css`
- Global tokens and material motifs: `src/app/globals.css`

The exploratory concepts have been deleted. Concept One (the previous homepage)
and Concept Two (the Dragon Orbit exploration) are gone, along with their
stylesheets and their logo variants. They remain in git history if anything ever
needs recovering, but they are not part of the site and should not be revived
without being asked.

**Do not add new `/concept-*` routes.** Change the design in place, on the
homepage, so there is never a question about which version is current.

## Brand positioning

CAPSULE is primarily a professional virtual office platform in Makati. It provides:

- Virtual office and registered business address services
- SEC, BIR, barangay, and Mayor's Permit registration support
- Mail and document handling
- Reception and administrative support
- Workstations, team space, and private offices
- Meeting and conference rooms
- Foreign-company support
- Business consulting and professional partner services

Position CAPSULE as a premium gateway for establishing and operating a business in the Philippines—not as a galaxy, entertainment, or gaming brand.

## Physical-office design language

The website should feel continuous with the real office. Its dominant visual references are:

- Warm oak floors, cabinetry, shelving, and ceiling slats
- Concrete-gray feature walls
- Charcoal ceilings, lighting fixtures, frames, and office chairs
- White desks, reception surfaces, and glass partitions
- Green indoor plants
- Restrained corporate red accents
- Warm, welcoming hospitality combined with professional credibility

Use generous spacing, editorial typography, clean grids, and real photography. Avoid excessive neon, HUD interfaces, gaming aesthetics, literal space scenes, or dominant fantasy dragons.

## The palette, sampled from the office

These values were measured from the five office photographs, not chosen by eye.
Every one of them is defined as a token in `src/app/globals.css`; nothing in the
site should hardcode a colour outside that file.

What the photographs actually contain, by share of frame:

| Material | Share | Sampled | Token |
| --- | --- | --- | --- |
| Concrete and white — walls, desks, blinds | 30–62% | `#f1f2f2` → `#909090` | `--capsule-bone`, `--capsule-surface-2`, `--capsule-text-faint` |
| Oak — floors, ceiling slats, joinery | 5–33% | `#a68c73` mean | `--capsule-oak`, `--capsule-oak-light`, `--capsule-oak-deep` |
| Charcoal — exposed ceilings, steel, chairs | — | `#2e2f31`, `#16191c` | `--capsule-ink`, `--capsule-ink-2`, `--capsule-ink-3` |
| Teal — the pantry wall | 1–6% | `#557f7b` | `--capsule-teal`, `--capsule-seafoam` |
| Red — the leather sofa | small | `#70341a`–`#b4462b` | `--capsule-clay` |

Two rules follow from the measurements:

1. **Warm oak and concrete carry the page.** They are what the room is mostly
   made of, so they are what the site is mostly made of.
2. **Red is reserved for actions**, exactly as the office reserves it — one
   sofa in 613 square metres. It is never decoration.

There is no gold in the office, and there is none in the palette. The earlier
navy-and-gold scheme has been removed.

### Contrast

Checked against WCAG before adoption. `--capsule-clay` on `--capsule-bone` is
4.88:1 and white on clay is 5.45:1, so the accent is safe for body text and
buttons. `--capsule-text-faint` (2.96:1) is a border and surface colour only —
never text. `--capsule-oak` and `--capsule-amber` are surface tones, not text.

### Material motifs

`globals.css` provides four utility classes drawn from the building itself:
`.slats` and `.slat-rule` (the oak ceiling battens, the office's signature
detail), `.slats-dark` (battens over a dark soffit), `.concrete` (the wall
finish as a quiet surface tint) and `.oak` (for panels that should read as
joinery rather than paper).

## Secondary brand symbolism

Galaxy and dragon elements are supporting details only:

- Thin orbital lines
- Small constellation-like nodes
- Restrained gradients
- A subtle dragon-inspired curve or seal
- Language about mobility, opportunity, growth, and going beyond boundaries

They must complement the virtual-office proposition rather than compete with it.

## Office photography

Use these real facility assets rather than generated or stock office imagery:

- `public/photos/capsule-reception.jpg`
- `public/photos/capsule-lounge.jpg`
- `public/photos/capsule-pantry.jpg`
- `public/photos/capsule-workspace.jpg`
- `public/photos/capsule-meeting-room.jpg`

Do not materially alter the photographs or represent generated spaces as the actual facility. Use `next/image`, meaningful alt text, responsive `sizes`, and appropriate `object-position` values.

## Logo and tagline

Current tagline:

> Your Space. Your Business. Beyond Boundaries.

Available logo explorations:

- `public/capsule-logo.svg`
- `public/capsule-logo-inverse.svg` — used in the homepage's closing panel
- `public/capsule-mark.svg`

The Concept Two logo variants were deleted with that concept. Confirm the final
selected logo with the user before replacing global production branding.

## Content and data rules

- Keep prices centralized in `src/content/pricing.ts`.
- Keep address, contact, operator, and navigation data centralized in `src/content/site.ts`.
- Preserve compliance caveats and never guarantee government approval or timelines.
- Professional regulated services are coordinated through qualified partner firms where stated.
- Do not invent contact details, registration numbers, client counts, or facility facts.

## Development and verification

Claude Code can launch the project using `.claude/launch.json` on port `3002`.

Before handing off changes, run:

```text
npm run lint
npm run build
```

The repository uses Next.js 16.3.2. Read the relevant files under `node_modules/next/dist/docs/` before changing framework-specific code, as required by `AGENTS.md`.
