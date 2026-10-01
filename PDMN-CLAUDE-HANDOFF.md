# PDMN Virtual Office — Claude Code handoff

Prepared: 28 September 2026. This document transfers the website work from Codex to Claude Code. It contains no credentials.

## Start here

Project folder: `C:\Users\L.Erika\Desktop\MY PROJECTS\capsule-website`

```powershell
cd "C:\Users\L.Erika\Desktop\MY PROJECTS\capsule-website"
claude
```

Suggested first prompt:

> Read PDMN-CLAUDE-HANDOFF.md, AGENTS.md and PDMN-DESIGN.md. Continue the PDMN Virtual Office website, preserving its current design and purely static Cloudflare deployment. First inspect the current files and deployment status. Do not modify the separate HR project. Do not discard any existing changes. Report what remains before making unrelated changes.

`CLAUDE.md` already exists and imports AGENTS.md, PDMN-DESIGN.md and HR-HANDOFF.md. Its HR import does not mean this website task includes HR work. This handoff is separate so it does not overwrite those existing instructions.

## Current priority and deployment status

The website is hosted at:

https://pdmn-virtual-office.erika-4d7.workers.dev/

Cloudflare product: **Workers Static Assets**, worker name **pdmn-virtual-office**. The user manually uploads the built static ZIP. No automatic Git deployment has been configured in this conversation.

The last live inspection in this conversation found an older site with separate Services/Packages navigation and the old static hero. The user subsequently attempted to upload the updated ZIP. Their screenshot showed 212 files uploading and a red **Authentication error**. A successful deployment has NOT been confirmed. Recheck the live site and dashboard rather than assuming it is synchronized.

Existing ZIP: `pdmn-cloudflare-static.zip` in the project root. Checked on 28 September: 76,448,767 bytes; last modified 18 September 2026 at 5:12 pm. It is an earlier prepared artifact, not proof that all current source files are included. Rebuild before publishing further source changes.

The old worker name `morning-mud-7b5a` is obsolete for this project.

## Technical setup and boundaries

- Next.js 16.3.2, React 19.2.8, TypeScript, Tailwind CSS 4.
- `next.config.ts` uses `output: "export"` and `images.unoptimized: true`.
- Build output is `out/`. The published site needs no running Node server, SMTP service, API endpoint or database.
- `npm run dev` runs Next development mode; `npm start` serves the existing static export locally at port 3001 via `scripts/preview-static.mjs`.
- `AGENTS.md` requires reading relevant guides in `node_modules/next/dist/docs/` before changing Next code. This version may differ from familiar Next APIs.
- The repository has MANY uncommitted edits, deletions and untracked assets. Preserve them. Do not reset, clean, overwrite or broadly stage unrelated files.
- The `hr/` folder, HR scripts, HR-HANDOFF.md and unrelated document/output files belong to other work. Leave them alone.
- Legacy chat components, libraries and the Anthropic dependency remain in the source tree. Their presence does not mean the published website has a chatbot. Do not restore deleted API routes or introduce a chatbot without a new user request.

## Non-negotiable user decisions

1. Keep the website purely static. The user explicitly chose visitors sending through their own email app.
2. The inquiry form prepares a `mailto:` draft to **virtualoffice@pdmn.ph**. Visitors must review and send it themselves. Do not claim the website sent an email.
3. Never put SMTP authorization codes, passwords or API keys into source, public assets, browser JavaScript or the ZIP. A mailbox authorization code was previously shared; it is intentionally excluded from this handoff.
4. Use **Inquire**, not Enquire, in website labels.
5. Navigation and footer should say **Services**, not “Services & Packages.” Services and package comparison are merged at `/services`.
6. Clearly state: **No private offices, dedicated desks or workspaces for regular occupancy.** VIP physical-facility access is only for agreed registration and compliance purposes, subject to suitability, availability and applicable government requirements/approval. Never imply guaranteed approval.
7. Premium, sleek and spacious presentation. Dark warm brown, burgundy, gold and ivory. Use actual supplied office imagery; avoid generic stock imagery.
8. Photos should be sharp at their normal display size. Subtle frames, even margins and spacing. No heavy borders or white mascot box.

## Current landing page

`src/app/page.tsx` composes these sections in order:

1. `OfficePresentation` — ten-scene automatic promotional presentation.
2. `OfficeGallery` — six office photos and supporting business-presence copy.
3. Company introduction — “Professionally managed in Makati.”
4. Burgundy closing CTA — “Establish your business presence in Makati.”, transparent mascot and “Speak with our team.”
5. Shared footer supplied by the layout.

### Automatic presentation

Files: `src/components/OfficePresentation.tsx` and `OfficePresentation.module.css`.

Ten scenes: primary reception hero; what is a virtual office; business address; business correspondence; credibility; startups/entrepreneurs; remote businesses/professionals; brand presence; why PDMN; final inquiry CTA.

- Advances automatically every 6.5 seconds and loops.
- Smooth crossfades and gentle image movement create the video-like effect.
- The user requested removal of large scene watermark numbers AND the visible playback/progress control bar. Keep autoplay without reintroducing these elements.
- Accessibility includes reduced-motion handling and keyboard controls. Playback can pause when hidden, offscreen or relevant content is focused; retain intentional accessibility behavior.
- Persistent address card sits at bottom right on desktop; adapts for smaller screens.
- Explicit service-scope disclosure below the presentation.
- Primary image: `public/photos/hero-primary.png`.

### Six-photo section

File: `src/components/OfficeGallery.tsx`.

- Two columns by three rows of photos on desktop, text alongside; responsive stacking.
- Each photo opens an enlargement dialog; Close/Escape and focus restoration should keep working.
- Originals: `public/photos/office-collection/office-1.jpg` through `office-6.jpg`.
- Prepared thumbnail files: `office-1-card.webp` through `office-6-card.webp` in the same directory. These were made for sharper card rendering; retain originals for enlargement.
- Keep photos separate from the primary hero rather than replacing it with the gallery.
- The removed gallery on the Location page should not be reintroduced merely because the homepage has a gallery.

### Mascot

- Homepage uses `public/pdmn-mascot-transparent.png` with a transparent background, displayed around 96 px wide.
- `public/pdmn-mascot.png` was also replaced with the transparent version for legacy references.
- Do not add a white card, background, border or rounded container behind it.
- Existing `public/mascot-poses/` assets may also be available; inspect before changing them.
- User provided `H:/ERIKA/OFFICE SPACE PROJECT/Office Photos/PDMN_Dragon_Mascot_10_Corporate_Poses.pdf` for future reference. Availability of that external path is not guaranteed.

## Other pages and key files

| Area | Files / behavior |
| --- | --- |
| Brand, contact and navigation | `src/content/site.ts`; `Header.tsx`, `Footer.tsx`, `BrandLogo.tsx` |
| Services and package comparison | `src/app/services/page.tsx`, `src/content/services.ts`, `src/content/pricing.ts`, `AddressTierCards.tsx`, `PackageRate.tsx` |
| Individual services | `src/app/services/[slug]/page.tsx` |
| Old pricing URL | `src/app/pricing/page.tsx` retained as compatibility page; internal package links point to `/services` |
| Contact | `src/app/contact/page.tsx`, `src/components/InquiryForm.tsx`, `src/lib/inquiry.ts`; validates fields and opens email draft, supports service query presets |
| About | `src/app/about/page.tsx`; clean reception image `public/photos/about-reception.png`, replacing earlier image choices |
| Location | `src/app/location/page.tsx`; visible directions buttons and local `public/location-map.svg` rather than relying on the previously blank iframe |
| Requirements | `src/app/requirements/page.tsx`, `src/content/requirements.ts`, `RequirementsChecklist.tsx` |
| Scope and policies | `src/content/scope.ts`, `legal.ts`, `faqs.ts`; keep consistent with service limitations |
| Styling | `src/app/globals.css`, `src/app/home.module.css` and component CSS |
| Static redirects | `public/_redirects` |
| Export verification | `scripts/check-static.mjs` |

The Location map was built from geographic data with attribution; preserve that attribution. The user wanted both map and directions always visible in their box.

## Business information

- Brand: PDMN Virtual Office.
- Operator: Philippine Dragon Media Network Corp.
- Address: 5th Floor, Salustiana D. Ty Tower, 104 Paseo de Roxas, Legaspi Village, San Lorenzo, Makati City 1229, Metro Manila, Philippines.
- Email: virtualoffice@pdmn.ph.
- Landline: (02) 7368-0000.
- Mobile / Viber / WhatsApp: +63 917 311 3638.
- Hours: Monday–Friday, 9:00 am–6:00 pm; Saturday by appointment.
- Basic: PHP 1,400/month; correspondence address support.
- Corporate: PHP 1,800/month; registered address use subject to requirements and approval.
- VIP: starting PHP 5,000; do not invent a monthly billing period or additional entitlement.
- Basic document handling is included across packages, under handling policies.
- Source files contain some TODO comments/placeholders. Do not invent SEC numbers, unit numbers, account details or unconfirmed business claims.

## Build, validate and package

Run from the project root in PowerShell:

```powershell
$env:NEXT_PUBLIC_SITE_URL = 'https://pdmn-virtual-office.erika-4d7.workers.dev'
$env:NEXT_PUBLIC_ALLOW_INDEXING = 'true'
npm run build
if ($LASTEXITCODE -ne 0) { throw 'Build failed; do not package.' }
node scripts/check-static.mjs
if ($LASTEXITCODE -ne 0) { throw 'Static checks failed; do not package.' }
Compress-Archive -Path 'out/*' -DestinationPath 'pdmn-cloudflare-static.zip' -Force
```

The ZIP must have `index.html` at its root, not an enclosing `out` folder. Upload only the prepared export, never the whole source folder, `.env` files, `.next`, `node_modules`, HR data or unrelated documents.

A previous build passed and its export had 17 HTML pages and 212 total files. This is historical validation, not a fresh test of the source as of this handoff. Rerun checks for the actual revision being deployed. Check file sizes and current Cloudflare limits rather than assuming the old count still applies.

`CLOUDFLARE-DEPLOY.md` has a correct Workers note at the top but also older alternative Pages instructions. For THIS existing website, use the existing Worker; do not create a new Pages project or change hosts unnecessarily.

## Manual Cloudflare update

1. Sign into Cloudflare in the user's browser.
2. Open Workers & Pages → `pdmn-virtual-office` → New deployment.
3. On “Upload static files to update your Worker,” select the freshly built `pdmn-cloudflare-static.zip`.
4. Wait for upload completion and resolve errors before deploying.
5. Click Deploy when the user authorizes publishing the prepared version.
6. Confirm deployment success, then inspect the live website with a fresh reload.

Last encountered blocker: dashboard **Authentication error** during manual upload. The user was advised to refresh, sign out/in if necessary, and retry. Do not assume this is a source-code defect or that it has since been resolved. Do not request credentials in chat.

The Workers address is a provided subdomain, not a free independently registered custom domain. Do not promise unlimited free service; verify current account/plan details if discussing charges.

## Acceptance checks after deployment

- Homepage automatically transitions between scenes without clicking; no visible scene numbers or playback bar.
- Main reception photo, six sharp gallery cards, company section and closing CTA render correctly.
- Mascot has genuine transparency with no white rectangle.
- Header and footer both show Services; merged comparison and service detail pages work.
- About page displays the requested clean reception photo.
- Location map and directions are visible; old location gallery remains removed.
- Contact selected service survives service inquiry links; email draft recipient is virtualoffice@pdmn.ph; no false “email sent” state.
- Direct visits and refreshes of `/about`, `/services`, `/services/virtual-office-vip`, `/contact` and `/location` work.
- Desktop and mobile layouts remain balanced, text readable, image dialog usable, and service scope clear.
- Verify source asset paths and deployed results rather than relying on stale browser screenshots.

## Status of Claude Code setup

During this conversation, local `claude --version` returned 2.1.218. `claude auth status` reported not signed in, and `claude auth login` was started. Completion was not confirmed. Check current status; the user should complete any account sign-in personally.

This handoff is documentation only. No source code was changed, build run or Cloudflare deployment performed while preparing it.
