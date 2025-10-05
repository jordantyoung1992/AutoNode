# Street Credit Advisory Marketplace Platform Plan

## 1. Vision and Value Proposition
- **Goal**: Launch a marketplace that connects Street Credit Advisory Corporation (SCAC) experts with clients seeking credit advice, educational resources, and community support.
- **Primary Outcomes**:
  - Enable advisors to publish profiles, services, and pricing (including free offerings).
  - Allow clients to browse, book sessions, and purchase digital products.
  - Foster community trust via testimonials, ratings, and transparent success metrics.
  - Maintain operational costs at or near zero by leveraging free/open-source tooling and low-code services.

## 2. Minimum Viable Product (MVP) Scope
1. **Landing Page** showcasing SCAC mission, top services, and advisor highlights.
2. **Advisor Directory** with searchable/filterable profiles.
3. **Service Listings** describing packages, pricing, and booking links.
4. **Client Onboarding Form** (lead capture + consent) integrated with free CRM (e.g., HubSpot free tier, Airtable free base, or Google Sheets).
5. **Booking & Payment Handling** via free-tier integrations (e.g., Calendly + Stripe, PayPal buttons, or Square) with links embedded in profiles.
6. **Knowledge Hub** featuring blog posts, downloadable resources, and community FAQ.
7. **Admin Dashboard (Phase 1)** using Notion/Airtable for manual management of advisor onboarding, content, and lead tracking.

## 3. Target User Flows
- **Client**
  1. Discover landing page → explore services → submit inquiry or book via Calendly/Stripe → receive confirmation email (through MailerLite free tier or Gmail filters + Zapier alternatives).
- **Advisor**
  1. Submit application form (Google Form) → admin review in Airtable → manual onboarding call → profile published on site.
- **Admin**
  1. Manage content and leads through Airtable/Notion templates → update static site content (Markdown + GitHub Pages) → monitor analytics (Plausible free trial or Google Analytics).

## 4. Architecture Overview (Zero-Cost First Release)
```
Static Frontend (Next.js on Vercel free tier or Astro/Eleventy on Netlify free tier)
    │
    ├── Content: Markdown/MDX + Git-based CMS (Netlify CMS / Tina)
    ├── Styling: Tailwind CSS (free) + component library (DaisyUI/Flowbite)
    ├── Forms: Netlify Forms / Formspree free tier / Google Forms embeds
    └── Integrations: Calendly embeds, Stripe checkout links, Gumroad storefront for digital products

Backend Automation (Optional / Phase 2)
    ├── Supabase free tier for auth + database (if moving beyond static content)
    ├── n8n (self-hosted on Railway free tier) for workflow automation
    └── Supabase Edge Functions or Cloudflare Workers (free tier) for custom APIs

Data & Ops
    ├── Airtable/Notion for CRM & knowledge base (free tier)
    ├── Zapier alternative: Make (formerly Integromat) or Pabbly free tier
    └── Analytics: Google Analytics or Umami self-hosted
```

## 5. Feature Roadmap
| Phase | Duration | Features | Tools |
|-------|----------|----------|-------|
| **0. Foundation** | Week 1 | Finalize branding, gather advisor bios, create content outline, register domains (Namecheap ~$10/yr if budget allows, otherwise use free subdomain) | Canva (free), Google Workspace (free tier), GitHub |
| **1. MVP Launch** | Weeks 2-3 | Static site with advisor directory, service listings, embedded booking/payment, lead form → Deploy via Netlify/Vercel | Next.js or Astro, Tailwind, GitHub Pages/Netlify |
| **2. Engagement Boost** | Weeks 4-6 | Publish blog resources, capture emails, automate onboarding emails | Markdown blog, MailerLite, Make automations |
| **3. Marketplace Upgrade** | Weeks 6-10 | Implement user accounts, advisor dashboards, ratings/testimonials, digital downloads | Supabase auth, Stripe Connect (when revenue allows), LemonSqueezy/Gumroad |
| **4. Scaling & Mobile** | Weeks 10+ | Progressive Web App features, referral system, analytics dashboards, community forum | Supabase, Discourse (self-hosted), Metabase |

## 6. Cost-Minimization Strategies
- **Hosting**: Use Vercel/Netlify free tier; consider GitHub Pages for static content.
- **Domain**: Start with `scac.vercel.app` or `streetcreditadvisory.netlify.app`; upgrade to custom domain when funds become available.
- **Payments**: Utilize Stripe/PayPal per-transaction fees only; no monthly costs.
- **Design**: Use free Tailwind UI kits, Canva templates, and Heroicons.
- **Automation**: n8n self-hosted on Render/Railway free tier instead of paid Zapier.
- **Support**: Collect user feedback via Tally or Google Forms (free).

## 7. Team & Responsibility Matrix
| Role | Responsibilities | Suggested Tooling |
|------|------------------|-------------------|
| Founder (You) | Define services, record testimonial videos, oversee advisors, manage community | Notion dashboard, Loom (free tier) |
| Volunteer Advisor | Submit bio, offer sessions, provide case studies | Google Drive, Calendly |
| Freelance Designer (as budget allows) | Refine UI components, create marketing assets | Figma (free tier) |
| Future Developer Partner | Transition from static site to dynamic marketplace | GitHub Projects, Supabase |

## 8. Content & Branding Checklist
- Brand story, mission statement, and target demographics.
- Advisor profiles: headshot, bio, specialization, pricing, availability.
- Client success stories and testimonials.
- Resource library: blog posts, downloadable guides, webinars.
- Legal pages: Privacy Policy, Terms, Refund Policy (use open-source templates customized for SCAC).

## 9. Launch Plan
1. **Pre-Launch (Week 0-1)**: Collect content, set up Airtable/Notion, design landing page in Figma/Canva.
2. **Soft Launch (Week 2)**: Publish MVP site on Netlify with select advisors and sample services; gather feedback from trusted clients.
3. **Public Launch (Week 3)**: Announce via social media, email list, and community partners; offer introductory discount or free consultation.
4. **Post-Launch (Week 4+)**: Monitor form submissions, track bookings, iterate on site copy, and schedule monthly content updates.

## 10. Next Steps Checklist
- [ ] Choose static site framework (recommend Astro for simplicity + speed).
- [ ] Create GitHub repository and connect to Netlify/Vercel for auto-deploys.
- [ ] Draft homepage and advisor profile Markdown files.
- [ ] Configure lead capture form (Netlify Forms or Google Forms) and connect to Airtable via Make.
- [ ] Set up Calendly/Stripe accounts for each advisor.
- [ ] Prepare initial blog posts (3 topics on credit management, debt repair, financial literacy).
- [ ] Define KPIs (monthly leads, conversion rate, average booking value).
- [ ] Schedule bi-weekly review meetings to adjust roadmap.

## 11. How to See the Website

Follow these steps to preview and share the marketplace once the MVP pages are written:

1. **Create a free deployment account**
   - Sign up for [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/) with your GitHub login (both have generous free tiers).
2. **Push your site files to GitHub**
   - Place your static site (Astro/Next.js) or even simple HTML files in a GitHub repository.
   - Include a `README` that explains how content is organized for future collaborators.
3. **Connect hosting to the repo**
   - In Netlify: "Add new site" → "Import an existing project" → authorize GitHub → pick the repo → keep default build command (`npm run build`) and publish directory (`dist` for Astro, `.next` for Next.js) or set to `public` for plain HTML.
   - In Vercel: "Add New" → "Project" → import Git repository → confirm framework detection → click **Deploy**.
4. **Wait for automatic build**
   - Netlify/Vercel will install dependencies, run the build, and host it at a free subdomain such as `scac.netlify.app` or `scac.vercel.app`.
   - Copy this URL to view the live website and share it with advisors or early testers.
5. **Preview changes before publishing**
   - Use the hosting dashboard preview URLs generated on each pull request/commit to check updates without affecting the live site.
6. **Optional: local preview without coding tools**
   - If you prefer not to install Node.js, use [StackBlitz](https://stackblitz.com/) or [CodeSandbox](https://codesandbox.io/) to open the GitHub repo in the browser and see real-time previews before pushing changes.

---
*This plan prioritizes low-cost, low-code tooling to ship an MVP quickly while setting a foundation for future upgrades when resources allow.*
