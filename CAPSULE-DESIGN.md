# CAPSULE Website Design Handoff

This file is automatically loaded by Claude Code through `CLAUDE.md`.

## Active design direction

The current office-led design is implemented at `/concept-3`:

- Page: `src/app/concept-3/page.tsx`
- Scoped styles: `src/app/concept-3/concept.module.css`

Treat Concept Three as the active visual direction unless the user explicitly selects another concept or asks to promote it to `/`.

The other routes are retained for comparison:

- `/` — Concept One
- `/concept-2` — Dragon Orbit exploration
- `/concept-3` — Professional Space, based on the real office

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
- `public/capsule-logo-inverse.svg`
- `public/capsule-mark.svg`
- `public/capsule-logo-concept-2.svg`
- `public/capsule-logo-concept-2-inverse.svg`
- `public/capsule-mark-concept-2.svg`

Confirm the final selected logo with the user before replacing global production branding.

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
