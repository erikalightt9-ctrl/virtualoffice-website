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

## Positioning — the hard boundary

**Capsule is a virtual-office service, operated by Philippine Dragon Media Network Corp.**

That is the entire offer:

- A business address at 104 Paseo de Roxas, Legaspi Village, Makati
- Mail and document handling by on-site staff
- Meeting rooms and serviced workspace on the same floor
- A **registered-address option** on eligible packages — a component of the
  virtual office, not a separate service

### What Capsule does NOT offer, coordinate, arrange, facilitate or advise on

- SEC registration or filings
- BIR registration or filings
- Business permits or permit processing
- Company registration or incorporation
- Bookkeeping or accounting
- Tax preparation, filing or compliance
- Payroll
- Corporate secretarial work
- Market-entry or business-setup consulting

There are **no partner firms** delivering any of that on Capsule's behalf. A
client's registrations, filings, permits, tax obligations and compliance are
theirs, to handle with their own advisers. Capsule is the address on the
paperwork and nothing more.

### Copy rules

Never write, or imply:

- "We register your company"
- "We handle SEC/BIR registration"
- "We process your permits"
- "Coordinated through our licensed partner firms"
- "Registration support", "compliance support", "business establishment support"

Write instead:

> Capsule provides a professional virtual-office solution, including
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
| `src/lib/chat-config.ts` | Chatbot guardrail: "What Capsule is, and is not" |
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

Keep decorative details restrained and subordinate to the virtual-office
proposition: thin orbital lines, small constellation-like nodes, a subtle
curve or seal. No neon, HUD interfaces, gaming aesthetics or literal space
scenes. Language about presence, credibility, flexibility and convenience —
not about expansion, market entry or establishing operations.

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
