# Room photographs

Save the five room photographs into **this folder** with **exactly** these
filenames. Until a file is here, its card renders a labelled panel reading
"photo to come" — no broken image, no code change needed when you add it.

| Filename | The photograph |
| --- | --- |
| `palawan.jpg` | **Palawan** (6-8 pax) — the white/grey room — long white table, eight dark mesh chairs, display on the far wall, glass writing wall on the right, white slat ceiling |
| `siargao.jpg` | **Siargao** (10-12 pax) — the oak room — timber ceiling battens, pendant lamps, white table with black high-back chairs, glass partition to the floor |
| `boracay.jpg` | **Boracay** (6-8 pax) — the corner room — peach/terracotta accent wall, light timber table, white-and-black chairs, whiteboard on the left |
| `cubicle.jpg` | The booth — two facing upholstered benches, teal outer backs, orange seats, timber table between them |
| `tea-room.jpg` | The tea room — dark timber table with benches, tea service, shelf of teaware, slatted timber wall (portrait) |

**You do not set a card shape.** Each card is sized from the file itself,
measured at build time, so a photograph is never cropped to fit a shape it was
not made for — and swapping in a differently proportioned photo needs no code
change. If you ever want a card cropped differently from its source, set the
optional `aspect` override on that room in `src/content/rooms.ts`.

## The quick way: one command

Save the five photographs into any folder — the names do not matter, but the
**alphabetical order must match the order they were supplied in** (so `1.jpg`
… `5.jpg` is easiest). Then:

```bash
node scripts/import-room-photos.mjs "C:/Users/L.Erika/Downloads/room-photos"
```

That renames, resizes to 2000px on the long edge, compresses to quality 80,
applies any per-room crop, and writes the results here. Your originals are
untouched.

**The booth photo is cropped on import.** The top 18% of that frame is
background rather than booth — a mirrored strip, the pink wall beyond, a green
cabinet, another room through the glass — so the importer trims it and lands the
top edge on the acoustic panels. The trim is defined per room in
`scripts/import-room-photos.mjs`; adjust or remove it there.

The order it expects, which is the order they were supplied:

1. Oak floor, timber battens, pendant lamps → `siargao.jpg` (Siargao, 10-12)
2. White/grey room, glass writing wall → `palawan.jpg` (Palawan, 6-8)
3. Dark timber table and benches, slatted timber wall → `tea-room.jpg`
4. The booth — orange seats, grey acoustic backs → `cubicle.jpg`
5. Peach accent wall, light timber table → `boracay.jpg` (Boracay, 6-8)

To pass files individually instead, in that same order:

```bash
node scripts/import-room-photos.mjs siargao.jpg palawan.jpg tea.jpg booth.jpg boracay.jpg
```

## Before you save them

**Resize and compress.** The originals are ~1.5–2.8 MB each, which is far too
heavy for five images on one screen — that is 10 MB of photographs on a page a
visitor may open on mobile data. Next.js resizes on the fly, but the source
file still has to be read at build and request time.

Target **2000px on the long edge** and **JPEG quality 80**, which lands each
file around 300–500 KB with no visible loss at these sizes.

`cubicle.jpg` is a phone photograph rather than a DSLR frame, so it is softer
than the other four. It is fine at card size; if you can reshoot it on the same
camera as the rest, the set will look more of a piece.

## What each photo is used for

Both the floating card and the detail dialog read the same file — the card
crops it to the shape in the table above, the dialog shows more of it. There is
no separate large version to prepare.

## To change a photo, a name, or the room list

- **Photo** — replace the file here, keeping the filename.
- **Name, capacity, hourly rate** — `src/content/pricing.ts`.
- **Description, what's inside, what it offers, availability** —
  `src/content/rooms.ts`.
- **Where the cards sit in the composition** — `src/components/rooms/rooms.module.css`
  (`.pos1`–`.pos5`, keyed by position, so reordering the array is enough for
  most changes).
