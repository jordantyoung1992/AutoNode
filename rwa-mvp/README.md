# RWA Marketplace MVP Starter

A static, zero-cost-friendly landing for real-world asset deals. Uses plain HTML/CSS/JS so you can run it locally on macOS without extra tooling. Replace the placeholder form + Calendly links with your own.

## Quickstart (macOS)
1. Ensure Python 3 is installed (bundled on macOS). In Terminal, from this folder run:
   ```bash
   python3 -m http.server 5500
   ```
2. Open `http://localhost:5500/index.html` in your browser.
3. Edit `assets/data.js` to add/edit deals. Text and styling live in `index.html` and `assets/styles.css`.

## Customize
- **Forms**: Swap the Tally/Typeform iframe URLs in `index.html` and the `callToActionUrl` fields in `assets/data.js`.
- **Calendly**: Update `calendlyUrl` per deal in `assets/data.js`.
- **Analytics**: Add your Plausible or Google Analytics tag to `assets/snippets.html` then include it in `index.html` (already referenced for you).
- **Branding**: Change the `Atlas Yield` brand text and colors in `assets/styles.css`.

## Deployment
- Drop the folder onto Netlify/Vercel as a static site, or serve from any S3/Cloudflare Pages bucket. No build step required.
- If you later move to Astro/Next.js, you can import the JSON-like `deals` array and re-use the markup as components.

## Files
- `index.html` – layout with hero, filters, deal grid, modal, intake form, and disclaimers.
- `assets/data.js` – sample deals + fields (sector, geography, APY, LTV, tenor, docs, risks, CTA links).
- `assets/scripts.js` – filter logic, modal rendering, and live KPI averages.
- `assets/styles.css` – gradients, grid layout, buttons, and modal styling.
- `assets/snippets.html` – drop-in slot for analytics tags or additional embeds.
