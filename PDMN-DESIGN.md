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
- Six bookable meeting rooms on the same floor
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
- **Workspace of any kind** — no desks, dedicated workstations, team space,
  private offices, day passes or day-office access. The floor has workstations
  on it, but they are not let. Photographs of the floor are office *context*,
  never a product. `public/photos/workspace.jpg` is captioned accordingly.

There are **no partner firms** delivering any of that on our behalf. A
client's registrations, filings, permits, tax obligations and compliance are
theirs, to handle with their own advisers.

### The one thing VIP does beyond the address

This section used to end "PDMN Virtual Office is the address on the paperwork
and nothing more." That was written before VIP existed, and the product has
since contradicted it in `pricing.ts` and in the chatbot guardrail — three
files telling three different stories about the same service. Confirmed with
the operator, the boundary now sits here:

**VIP provides premises, and runs the visit to them.** Specifically:

- A physical office at 104 Paseo de Roxas that an agency can inspect and verify
- Scheduling the inspection, hosting the inspector, and confirming facility
  details an agency asks for
- Staff on site for scheduled visits
- Warehouse/storage where agreed, subject to availability

**It does not touch the application.** No preparation, no filing, no
follow-up, no representation, no regulatory advice — on any package, for any
agency. That line is the difference between letting a room and practising a
regulated profession, and it is why the exclusion appears on the VIP card
itself rather than only in the terms.

Whenever this scope changes, four places must change together or they will
drift apart again: `src/content/pricing.ts`, `src/lib/chat-config.ts`,
`src/content/legal.ts` and this file.

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
  reception and six bookable meeting rooms — not by area.
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

### Material motifs — retired

`globals.css` used to provide five utilities drawn from the building itself:
`.slats`, `.slat-rule` and `.slats-dark` (the oak ceiling battens as repeating
vertical lines), `.concrete` (the wall finish as a surface tint) and `.oak` (a
fine veneer stripe for panels). **They have been removed**, along with the
`/oak-grain.svg` tile that the page-header band used.

Not one of them was ever applied to an element — the only apparent use of
"slats" was the word inside a photograph's alt text.

**Do not reintroduce a repeating timber or concrete texture.** The page is
built from smoke, glass and light now, and a tiled material stripe reads as a
sample pinned behind the type rather than as a room. Texture comes from two
places instead:

1. **The background photograph showing through.** Shade bands are translucent,
   so the smoke image supplies real grain at no cost — and that is also what
   keeps wide gradients from banding.
2. **Gradients of light in the palette.** See `.executive-wood` for the
   pattern: a gold wash entering from one corner as light, a burgundy pool
   settling into the opposite one for depth, both over the shade band. The
   warm reflection is only ever light falling across a surface, never a fill.

## The shade shifter — how a page is grounded

The page ground is not one flat colour. It descends through the palette as you
scroll: deepest espresso at the hero, warming through oak into burgundy,
resolving to rich red at the call to action, then back to espresso for the
footer. Arriving at the bottom of a page should feel like having moved through
a room rather than having scrolled a single wall.

It lives entirely in the SHADE SHIFTER block of `src/app/globals.css`. There is
no JavaScript and no per-page wiring.

| Stop | Value | Alpha | Where it lands |
| --- | --- | --- | --- |
| `--shade-1` | Espresso `#2B140D` | .86 | Hero, and the footer handoff |
| `--shade-2` | Espresso warmed `#3A1D13` | .80 | Second band |
| `--shade-3` | Oak shadow `#4A2619` | .76 | Third band |
| `--shade-4` | Burgundy `#681C2A` | .80 | Fourth band, and the hold beyond it |
| `--shade-5` | Rich red `#9E1B20` | .88 | The CTA band only |

### The five rules

1. **Each band is a ramp, not a block.** A band runs from its own shade to the
   *next* band's shade, so neighbours meet at an identical colour and the page
   reads as one continuous gradient instead of stacked stripes.

2. **The scale is anchored from the START.** `nth-of-type`, not
   `nth-last-of-type`. An end-anchored scale looks equivalent and is not: on a
   two- or three-section page the hero rule and the end rules fight over the
   same section and leave a visible gap mid-page. Only the *end* of the final
   band is overridden, never its start, which is what keeps continuity at any
   page length. This was built end-anchored first and the gap was real.

3. **The shades are translucent.** They are washes over the fixed background,
   not opaque fills, so the smoke photograph still refracts through the glass
   panels above them. An opaque band switches the glass off — see rule 1 of the
   liquid glass section.

4. **Red is earned, not positional.** Gold falls to 3.58:1 on the red band and
   faint text to 3.79:1, both below AA. Red is therefore reserved for
   `.shade-climax`, which only `CtaBand` carries, and whose type is ivory
   (7.37:1) and soft ivory (5.34:1) only. **Never put a gold eyebrow or faint
   text on that band, and never hand `.shade-climax` to an ordinary section.**

5. **Controls invert on the climax band.** The accent fill is a burgundy-to-red
   gradient, which scores 1.09:1 against red — invisible as a shape, against
   the 3:1 WCAG 1.4.11 asks of a control's own boundary. On `.shade-climax` the
   primary action becomes ivory with espresso text (7.40:1 as a shape, 14.74:1
   for the label), which also makes it the brightest thing on the page.

### Things that will silently break it

- **Painting a ground on a section.** A class beats `main > section` in the
  cascade, so any `bg-*` utility or module class that sets a background knocks
  that section off the ramp. `.executive-wood` composites its oak grain *over*
  `var(--shade-a)`/`var(--shade-b)` for exactly this reason; do the same for
  anything else that needs a texture.
- **Sections that are not direct children of `<main>`.** The scale is keyed to
  `main > section`. Wrap a section in a `<div>` and it drops off the ramp.
- **Specificity.** The resolution rules use `:has()`, which carries the
  specificity of its argument, so they score (0,2,2) against the (0,1,2) of the
  `nth-of-type` rules. That is deliberate. A rule written more loosely than
  that will lose to the base scale and appear to do nothing.

`Section` and `PageHeader` therefore set no ground of their own. `Section`'s
former `tone="bone" | "surface"` prop is gone — it was already dead (the
unlayered `.glass-veil` overrode it), and two-tone alternation contradicts a
monotonic ramp. `PageHeader`'s `light | dark` prop is gone for the same reason:
every ground on the site is dark now.

### Verifying it

```
node scripts/check-shade-contrast.mjs
```

Composites each band over the brightest pixel of the background photograph —
the worst case any band has to survive — and reports ivory, soft, faint and
gold against it. Re-run it after changing any shade value or alpha.

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
| **The room itself** | Light describing a space, not the materials in it | The gradient washes on `.executive-wood`; the background photograph through a translucent shade band |
| **Connection** | Lines that converge and meet, rather than orbit | Available; use sparingly and only where it means something |
| **Warmth** | Gold read as light falling across a surface | `--glass-reflect` in `globals.css` — as a sheen or glow, never as a fill |

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

### The text wordmark

`src/components/Wordmark.tsx` owns the stacked lockup for both the header and
the footer, so the two can never drift apart. Three things make it a lockup
rather than two stacked labels, and all three are load-bearing:

1. **Each line has its own leading, with a hairline rule between them.** The
   first version set `leading-none` on both, which put the boxes flush and let
   Archivo's descenders land on the mono line's cap height — a measured 2.6px
   of ink collision.
2. **A negative right margin cancels the trailing letter-space** CSS adds after
   the final glyph, so each box hugs its own ink and the rule lines up.
3. **The tracking on each line is tuned so the two ink widths match.** Before
   tuning, the descriptor was 84% wider than the name; it now sits within 3%.

Those tracking values are specific to "PDMN" over "VIRTUAL OFFICE". **If
`site.wordmark` or `site.wordmarkSub` ever changes length, re-measure and
retune** — do not assume the numbers still hold.

### The bookable spaces section

`/meeting-rooms` carries an interactive room showcase: five floating photo
cards that expand into a detail dialog. It is split so the content and the
presentation never tangle:

| File | Holds |
| --- | --- |
| `src/content/rooms.ts` | Photos, descriptions, what's inside, what it offers, availability, booking links |
| `src/content/pricing.ts` | Names, capacities and rates — still the only place rates live |
| `src/lib/rooms-server.ts` | Joins the two, checks which photographs exist on disk |
| `src/components/rooms/rooms.module.css` | The scatter geometry, keyed by POSITION not by room |
| `src/components/rooms/RoomShowcase.tsx` | Parallax and dialog state |
| `src/components/rooms/RoomDetail.tsx` | The dialog, its FLIP flight and its focus management |

Three rules to keep:

1. **"Floating" here means lifted above a ground, not adrift.** The cards sit
   over a visible datum (`.groundRule`) with their shadows cast down onto it.
   That was a deliberate reconciliation with the "nothing floats" rule above —
   the premium layered feel without the cosmic weightlessness. Do not remove
   the ground and leave the cards hanging in space.
2. **Rates are never duplicated into `rooms.ts`.** `resolveShowcaseRooms()`
   throws if a showcase room has no matching id in `pricing.ts`, so a room can
   never render with a blank price.
3. **Closing the dialog must not depend on an animation finishing.** The exit
   is driven by a timer, because `Animation.finished` never resolves while the
   document timeline is throttled (a background tab, a hidden window) — which
   would strand a visitor in a scroll-locked modal. This was a real bug once;
   do not reintroduce it by awaiting `finished`.

Availability ships as `"unknown"` for every room, so no badge is drawn. Set it
from a real calendar when one exists — never by hand, because a stale
"available" badge reads as a promise.

#### The rooms are client-only

**The five rooms are a facility of the virtual office, not a room-hire
business.** They cannot be booked by non-clients. Depending on the package, room
use is either included in a monthly allocation or charged as an additional fee,
and the fee depends on the package and the room.

Never write, or imply:

- "Book by the hour, no membership required"
- "Non-members can book rooms directly"
- "Bookable directly by anyone else"
- Anything inviting a walk-in or public booking

This replaced an earlier two-tier member/non-member model, so the `rate` and
`memberRate` fields in `pricing.ts` no longer mean walk-in vs member. They are
now the standard additional-use rate and the reduced rate on the higher
packages — the field names are legacy, the doc comments carry the meaning.

The rule is enforced in `src/lib/chat-config.ts` as well, so the chatbot turns
down a non-client room booking rather than inventing a way to take it.

### Service marks

`src/components/ServiceMark.tsx` holds four line-art watermarks for the
homepage service cards: a building, a sealed document, a boardroom table in
plan, an envelope. Each is drawn from the service it names and rests on a
ground line, per "nothing floats".

They replaced an identical ring-with-a-dot on every card, which was an orbit —
retired with the rest of the cosmic language — and which put the clay accent on
a decorative dot. Stroke is `currentColor`; the card sets tone and opacity, and
nothing in the file hardcodes a palette value.

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
