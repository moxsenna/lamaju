# QA Report — LajuPage Portfolio

## Automated checks

Status: **PASS**

- Valid JavaScript syntax (`node --check`).
- Exactly one `<h1>`.
- No duplicate element IDs.
- Seven WhatsApp CTA entry points detected.
- No Lorem Ipsum, TODO, or unfinished content placeholder in the visible page.
- Required local files are present.
- Interactive demo switcher successfully changes content for Beauty, F&B, and Jasa.
- Placeholder WhatsApp protection successfully opens a setup dialog instead of sending visitors to an unknown number.
- No runtime JavaScript errors during tested interactions.

## Responsive browser checks

The page was rendered in headless Chromium at:

- 320 × 568
- 360 × 800
- 390 × 844
- 412 × 915
- 768 × 1024
- 1024 × 768
- 1280 × 800
- 1440 × 900

Result on every viewport:

- Horizontal overflow: **0 px**
- Main heading count: **1**
- WhatsApp CTA count: **7**
- Demo JavaScript interaction: **PASS**
- Runtime page errors: **0**

## Manual checks before production

- Replace the WhatsApp number in `config.js` and test on a real mobile device.
- Replace canonical, Open Graph URL, sitemap URL, and domain placeholders.
- Confirm brand name and pricing.
- Test the deployed URL on Chrome Android and Safari iPhone.
- Run Lighthouse on the final deployed domain because network and Cloudflare settings affect production results.
- Verify optional GA4 and Meta Pixel events in their respective debug tools.
