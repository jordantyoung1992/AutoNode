# Real-World Asset (RWA) Marketplace MVP Plan

## 1. Objective
Launch a lightweight marketplace that helps asset originators list real-world assets (e.g., invoices, rentals, equipment leases) and lets investors review deals and reserve allocations without handling custody, KYC, or payments inside the app.

## 2. Core Outcomes
- Publish compliant deal pages with standardized metrics, docs, and risk flags.
- Allow investors to join a waitlist, request allocations, and receive email follow-ups.
- Provide an intake form for asset originators to submit deals for review.
- Operate on zero/low cost using static hosting + third-party embeds (forms, analytics, scheduling).

## 3. MVP Features
1. **Landing Page**
   - Value proposition, short explainer of how allocations work, and call-to-actions (CTA) for investors and originators.
   - Credibility signals: featured assets, partner logos (optional), basic FAQ.
2. **Deal Directory**
   - Card grid of active/past deals with filters for sector, geography, yield range, and tenor.
   - Clicking a card opens a deal detail page (Markdown/MDX) with metrics table, docs links, risk notes, and CTA to "Request Allocation".
3. **Deal Detail Template**
   - Hero with summary stats (target APY, advance rate, LTV, minimum ticket, duration, repayment frequency).
   - Sections for: asset overview, structure, covenants, collateral, servicing/backup servicer, key risks, reporting cadence, FAQ.
   - Download links for teaser/PDD/P&L and a short Loom video.
   - Embeds: Calendly for diligence calls; Typeform/Tally for allocation requests (captures email, entity type, amount, jurisdiction, accreditation self-attest).
4. **Originator Intake**
   - Form embed to collect company info, track record, asset type, servicing model, expected APY, legal docs, and references.
   - Autoresponder email with next steps and data room checklist.
5. **Email & CRM**
   - Mailing list capture on every page via MailerLite (free tier) or ConvertKit free plan.
   - Allocation and intake forms push to Airtable base (free) via native connectors or Make (free tier) scenario.
6. **Analytics & Trust**
   - Privacy-friendly analytics (Plausible/Umami free self-hosted) or Google Analytics.
   - Public status page for upcoming drops and recent updates (changelog style).

## 4. Zero/Low-Cost Architecture
```
Static Frontend (Next.js or Astro on Vercel/Netlify free tier)
    │
    ├── Content: Markdown/MDX for deals + config-driven directory
    ├── Styling: Tailwind + free component kit (e.g., DaisyUI)
    ├── Forms: Typeform/Tally embeds, Netlify Forms fallback
    ├── Scheduling: Calendly embed for investor calls
    └── Email/CRM: MailerLite signup + Airtable/Make for lead sync

Data & Ops
    ├── Airtable base: Leads, Allocation Requests, Originator Intakes
    ├── Make (Integromat) free tier: form → Airtable → email notifications
    └── Analytics: Plausible/GA tag
```

## 5. User Flows
- **Investor**: Landing → Deal directory → Deal page → Request Allocation (form) → receives confirmation + Calendly link.
- **Originator**: Landing → Submit Deal form → auto email with checklist → team review in Airtable → follow-up via Calendly.
- **Admin**: Update deal Markdown, publish via Git, review leads in Airtable, send updates via MailerLite.

## 6. Delivery Checklist (Week 1-2)
- [ ] Pick framework (Astro for static speed) and set up repo + free hosting.
- [ ] Create layout + theme (hero, grid cards, footer, FAQ, CTA blocks).
- [ ] Build deal directory from JSON/YAML config → generates card grid + detail pages.
- [ ] Configure Typeform/Tally for Allocation Request and Originator Intake; connect to Airtable.
- [ ] Add MailerLite embed + double opt-in copy.
- [ ] Add Calendly embed on deal pages and contact page.
- [ ] Write 2-3 sample deals with mock data and risk notes.
- [ ] Add legal/disclaimer pages (not investment advice, accreditation self-attest, data usage, cookies/analytics note).
- [ ] Set up analytics tag and test events.
- [ ] Document how to view site locally and deploy (README snippet below).

### Quickstart (MacBook-friendly, zero prior coding assumed)
1. Install Homebrew (if not installed): `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`.
2. Install Node (LTS) and PNPM: `brew install node pnpm git`.
3. Clone: `git clone <your-repo-url> && cd rwa-marketplace`.
4. Install dependencies: `pnpm install` (or `npm install`).
5. Run locally: `pnpm dev` → open http://localhost:4321 (Astro) or http://localhost:3000 (Next.js).
6. Edit content files in `content/` using any text editor (VS Code recommended: `brew install --cask visual-studio-code`).
7. Deploy: connect repo to Vercel/Netlify → keep default build command (`pnpm build`) and output folder (`dist` for Astro).
8. If errors occur, copy/paste the terminal message into an issue; the build is static so fixes are usually simple.

## 7. Content Structure Proposal
```
content/
  deals/
    2024-bridge-loan.md
    2024-invoice-finance.md
  pages/
    landing.md (hero copy, CTA targets)
    faq.md
    trust.md (process, partners, safeguards)
    updates.md (changelog)
site.config.json (site title, nav, social, form links, mailer id)
```

### Deal Frontmatter Fields
- `title`, `slug`, `status` (live, upcoming, closed)
- `sector`, `geography`, `asset_type`
- `target_apy`, `ltv`, `advance_rate`, `tenor_months`, `min_ticket`
- `structure` (seniority, SPV/series note, waterfall summary)
- `collateral` (type, custodian, backup servicer)
- `risk_flags` (array with label + description)
- `docs` (links to teaser, PDD, financials)
- `call_to_action_url` (Typeform/Tally link)
- `calendly_url`
- `last_updated`

#### Example Deal Markdown
```md
---
title: "2024 Bridge Loan"
slug: "2024-bridge-loan"
status: "live"
sector: "Real Estate"
geography: "US"
asset_type: "Bridge Loan"
target_apy: 13
ltv: 65
advance_rate: 75
tenor_months: 12
min_ticket: 10000
structure: "Senior secured; SPV issues series note"
collateral: "1st lien on property; backup servicer engaged"
risk_flags:
  - label: "Sponsor concentration"
    description: "Single-sponsor exposure; mitigated via covenants"
docs:
  teaser: "https://link.to/teaser.pdf"
  financials: "https://link.to/pnl.xlsx"
call_to_action_url: "https://tally.so/r/your-form-id"
calendly_url: "https://calendly.com/your-team/rwa-intro"
last_updated: "2024-07-01"
---

## Asset Overview
Short paragraph that explains the collateral, borrower, use of funds, and repayment source.

## Structure & Covenants
- Seniority, cash waterfall, reserve accounts
- Reporting cadence and triggers

## Key Risks & Mitigations
- Market: demand softening; mitigated via conservative LTV
- Operator: limited track record; mitigated via covenants and monitoring

## Docs & Next Steps
Links above, plus CTA button pulls from `call_to_action_url`.
```

## 8. Local Preview & Deployment
1. Install Node 18+ and PNPM (recommended) or npm.
2. Clone repo → `cd rwa-marketplace` → `pnpm install` → `pnpm dev` (or `npm install && npm run dev`).
3. Environment vars (if needed) stored in `.env.local` for form keys/analytics IDs.
4. Deploy by connecting GitHub repo to Vercel/Netlify and keeping default build (`pnpm build` / `npm run build`) and output (`dist` for Astro, `.next` for Next.js`).
5. Share preview URLs from the hosting dashboard with stakeholders.

### Minimal Project Skeleton (Astro)
Use this to scaffold quickly if starting from scratch.
```
rwa-marketplace/
├─ astro.config.mjs
├─ package.json
├─ src/
│  ├─ components/
│  │  ├─ DealCard.astro
│  │  └─ Layout.astro
│  └─ pages/
│     ├─ index.astro           # Landing
│     ├─ deals/index.astro     # Directory
│     ├─ deals/[slug].astro    # Detail page template (fetch MDX)
│     └─ legal/disclaimer.astro
├─ content/
│  ├─ deals/                   # MD/MDX files like the example above
│  └─ pages/
│     ├─ faq.md
│     └─ trust.md
├─ public/                     # Logos, PDFs (if permitted), OG images
└─ site.config.json            # Nav links, mailer IDs, form URLs
```

### Core Components to Implement
- **DealCard.astro**: receives frontmatter props and renders title, APY, sector, geography, status badge, and CTA link.
- **Deal directory page**: loads all deal frontmatter, filters by `status/sector/geography`, and links to detail pages.
- **Deal detail page**: pulls MDX content for the selected slug, renders hero stats (APY, tenor, LTV, min ticket), risk flags, and embeds CTA + Calendly.
- **Layout**: header with nav + “Join waitlist” button (MailerLite link), footer with disclaimers and social links.

### Suggested Free Services (with Mac-friendly setup)
- **MailerLite** for mailing list; embed script snippet in `Layout`.
- **Tally/Typeform** for allocation + intake; paste form URL into `call_to_action_url` and originator form link.
- **Calendly** embed for investor calls; paste into `calendly_url`.
- **Airtable** base with tables: `Deals`, `Allocation Requests`, `Originator Intakes`; connect via Tally/Typeform native integration or Make.
- **Plausible** for analytics (one-line script) or GA if preferred.

## 9. Next Iterations (Post-MVP)
- Investor login for saved deals/watchlists; gated data room links.
- Basic compliance guardrails: block unsupported jurisdictions, accreditation checkboxes, and digital acknowledgement of disclaimers.
- Automated email sequences (MailerLite) triggered from Airtable status changes.
- Metrics dashboard (Metabase) pulling from Airtable exports.
- Payment rails and settlement (Stripe Treasury/Anchorage) once legal/compliance ready.

## 10. Risks & Mitigations
- **Regulatory**: Keep site informational; require self-attestation and disclaimers; avoid soliciting investments directly.
- **Data accuracy**: Standardize deal templates; require originators to upload source docs; periodic updates noted on deal pages.
- **Ops load**: Automate notifications with Make; use templates for new deals; calendar slots reserved weekly for diligence calls.
- **Trust**: Publish methodology, prior case studies, and independent references when available.
