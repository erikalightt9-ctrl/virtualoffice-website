# Capsule — website

Marketing and lead-generation site for Capsule, the business address and
workspace service at 104 Paseo de Roxas, 5th Floor, Makati City, operated by
Philippine Dragon Media Network Corp.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Zod

---

## Running it

```bash
npm run dev
```

Then open http://localhost:3002 (or use `start-capsule.cmd` in the parent
folder, which does the same thing).

```bash
npm run build    # production build — run this before deploying
npm run lint
```

---

## Changing the prices

**Everything is in one file: `src/content/pricing.ts`.**

Change a number there and it updates on the homepage, the pricing page, every
service page and every workspace page at once. Prices are plain numbers — no
commas, no peso sign.

```ts
price12: 3900        // shows as ₱3,900
price12: null        // shows as "Enquire"
published: false     // hides that tier or product entirely
```

The file covers address tiers, workspace products, meeting rooms, registration
services and the Capsule Launch bundle.

### The "indicative rates" notice

While pricing is provisional, a notice appears under every price block. When the
prices are final, open `src/content/pricing.ts` and set:

```ts
export const PRICING_DISCLAIMER = "";
```

The notice then disappears from every page.

---

## Changing the words

| What you want to change | File |
| --- | --- |
| Prices, tiers, packages, bundle | `src/content/pricing.ts` |
| Phone, email, Viber, address, office hours, navigation | `src/content/site.ts` |
| Service pages (7 of them) | `src/content/services.ts` |
| Workspace pages (4 of them) | `src/content/workspace.ts` |
| FAQ questions and answers | `src/content/faqs.ts` |
| Location, About, Foreign Companies, Partners, How It Works | `src/content/pages.ts` |
| Terms, Acceptable Use, Privacy | `src/content/legal.ts` |
| Colours and fonts | `src/app/globals.css` |

Adding a new entry to `services.ts` or `workspace.ts` creates its page, adds it
to the sitemap, and makes it available to link to. No other file needs editing.

---

## Adding the photographs

Drop the image files into `public/photos/` using these exact names:

```
reception.jpg      conference-a.jpg   conference-b.jpg   conference-c.jpg
meeting-room.jpg   focus-room.jpg     tea-room.jpg       workstations.jpg
building.jpg       floor.jpg
```

Until a file exists, that slot shows a labelled placeholder telling you which
file is missing. Placeholders disappear on their own once the file is added —
nothing else to change.

**Priority order.** `reception.jpg` matters most (it is the hero image and the
proof that the office is staffed), then `conference-a.jpg` and
`workstations.jpg`.

---

## Where the enquiries go

The form posts to `/api/inquiry`, which validates the submission and forwards it
as JSON to whatever endpoint you configure:

```bash
# .env.local
INQUIRY_WEBHOOK_URL=https://your-endpoint-here
```

That can be a shared-inbox service, a CRM, a Google Sheet webhook, or a
Viber/Slack notification — whatever the team actually watches. **If the variable
is not set, enquiries are written to the server log only.** Set it before launch.

Each lead carries the visitor's name, email, mobile, company, the service they
selected, the pricing tier they clicked from (`plan`), and the referring partner
(`referrer`).

### Partner referral tracking

Give each partner firm a link with their reference on the end:

```
https://capsule.ph/contact?ref=firm-name
```

Any enquiry through that link is tagged with `referrer: "firm-name"` so the
introduction can be credited. Deep links work too — send a partner's client
straight to a service page or to `/pricing`.

---

## The chatbot

A floating assistant on every page, grounded in the site's own content.

### Why it cannot invent a price

`src/lib/knowledge.ts` builds the assistant's entire knowledge base from the
same content files that render the site — `pricing.ts`, `services.ts`,
`faqs.ts`, `pages.ts`, `legal.ts`, `workspace.ts`, `site.ts`. Change a price and
the chatbot's answer changes with the page, in the same edit. There is no second
copy of the information to fall out of date.

The whole knowledge base (~12,000 tokens) is sent on every question rather than
searched. That removes the retrieval step, and with it the possibility of
retrieving the wrong passage and answering confidently from it. Prompt caching
makes resending it cheap.

**You do not edit `knowledge.ts` to change what the chatbot knows.** Edit the
content files.

### Setup

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-...
```

Without a key the widget still appears, but instead of answering it points
visitors at Viber. It degrades politely rather than showing an error.

Optionally set `CHAT_TRANSCRIPT_WEBHOOK_URL` to receive each completed
conversation as JSON — a lead source, and a queue of real questions worth
adding to the FAQ.

### Guardrails

`src/lib/chat-config.ts` holds the system prompt. The rules that matter:

- **Never invents a price.** Quotes only what is in the knowledge base, and
  carries the "indicative rates" qualification while it is set.
- **Never confirms registration eligibility.** It can explain which tiers are
  eligible in principle and what the process is, but it will not tell anyone
  they qualify — that is a human decision after reviewing documents.
- **Never promises a government outcome or timeline.**
- **Gives no legal, tax or accounting advice.**
- Describes partner-delivered work as coordinated through licensed partner
  firms, never as something Capsule provides.
- Replies in the visitor's language.
- Treats visitor messages as input, not instructions — attempts to override the
  rules, claim staff authority, or extract the prompt are declined.

Read that file before changing it. Each rule is there for a reason.

### Cost

The model is set in one line in `chat-config.ts`:

```ts
export const CHAT_MODEL = "claude-opus-5";
```

Opus 5 is the most capable option, which matters when the assistant is
discussing money and compliance with prospects. If conversation volume makes it
expensive, `claude-sonnet-5` is the sensible step down and `claude-haiku-4-5`
the cheapest — both handle grounded question answering well. Prompt caching
already keeps the large knowledge base from being the dominant cost; check the
server log, which reports cache reads per request.

### Rate limiting

20 requests per IP per minute, held in memory. **That is per server instance —**
if the site is ever scaled to several instances, move it to a shared store or a
platform rate limiter, or the real limit becomes 20 × the instance count.

---

## Before launch — outstanding items

Search the project for `TODO` to find these in place.

- [ ] **Real contact details** — the phone numbers and email in
      `src/content/site.ts` are placeholders.
- [ ] **SEC registration number** for Philippine Dragon Media Network Corp.
      (`site.operator.secRegistrationNo`). It goes in the footer and is a strong
      credibility signal.
- [ ] **Unit or suite number**, if the office has one beyond the floor.
- [ ] **Logo** — replace the text wordmark in `src/components/Header.tsx`.
      Put the file at `public/logo.svg`.
- [ ] **Domain** — set `site.url` in `src/content/site.ts`.
- [ ] **Photographs** — see above.
- [ ] **Final prices** — then clear `PRICING_DISCLAIMER`.
- [ ] **`INQUIRY_WEBHOOK_URL`** — otherwise leads only reach the server log.
- [ ] **`ANTHROPIC_API_KEY`** — otherwise the chatbot points visitors at Viber
      instead of answering.
- [ ] **Read the chatbot's answers before launch.** Ask it the twenty questions
      you are asked most and check every one. The guardrails are strong but the
      knowledge base is only as good as the content files behind it.
- [ ] **Legal review.** `src/content/legal.ts` contains drafting starting points,
      not finished documents. The address-use, government-correspondence and
      data-privacy sections need your counsel's eyes. The notice at the top of
      those pages is controlled by `LEGAL_REVIEW_NOTICE` in the same file —
      clear it once they are approved.
- [ ] **Analytics** — no tracking is installed yet.
- [ ] **Google Business Profile** — not part of this codebase, but for
      "virtual office Makati" the local pack outranks every organic result.

---

## What is deliberately not built yet

- **Chinese and other language versions.** The routing is ready for `/zh/…` but
  no translated content exists. Commercial and legal pages need human
  translation, not machine translation.
- **Client portal** — mail log, room booking, invoices, document upload.
- **A CMS.** Content currently lives in the typed files listed above, which are
  straightforward to edit but do require a code change and a deploy. They are
  structured so they can be moved into a headless CMS without rewriting any
  page.

---

## SEO built in

Every service and workspace product has its own indexable page with its own
title and meta description. `sitemap.xml` and `robots.txt` generate themselves
from the content files. The homepage carries `ProfessionalService` structured
data and the FAQ page carries `FAQPage` structured data.

---

## A note on the copy

Wording around registered addresses is deliberately careful. The site says
registration use is available **on eligible packages and subject to approval,
documentary requirements and applicable government regulations** — and it never
promises a government outcome or timeline. Please keep that framing if you edit
the copy; it is what keeps the claims defensible.

Services delivered by partner firms are described as coordinated through
licensed partners rather than provided by Capsule, for the same reason.
