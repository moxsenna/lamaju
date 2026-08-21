# Build Specification

## Project

- Client slug:
- Source directory: `src`
- Output directory: `dist/<slug>`
- Deployment target: Cloudflare Pages static assets
- Language: id-ID
- Primary conversion: WhatsApp

## Technical contract

- Keep `<!-- LP_TRACKING_HEAD -->` in `<head>`.
- Load `./runtime-config.js` before `./app.js`.
- All WhatsApp CTAs use:
  - `data-cta="whatsapp"`
  - `data-cta-location="hero|mid|offer|sticky|footer|other"`
- Do not hard-code another WhatsApp number.
- Do not add forms unless `tracking.event_spec.form_success.enabled` and scope explicitly allow it.
- Static output only.
- No secrets.
- No placeholder in final output.

## Acceptance criteria

### Content

- One H1.
- Offer understandable in five seconds.
- Max 10 persuasive sections.
- Approved facts only.
- Price, promo, terms, CTA, and business identity match brief.

### Design

- Custom visual concept from context.
- No default SaaS/AI-slop style.
- One primary CTA color.
- Max two font families.
- Product assets prioritized.

### Responsive

- No horizontal overflow at 320px.
- Body text at least 16px.
- Primary tap target at least 44×44 CSS px.
- Sticky CTA does not cover content.
- 200% text zoom usable.
- `prefers-reduced-motion` respected.

### Technical

- All local assets resolve.
- No console error.
- No duplicate tracking listener.
- WhatsApp CTA works if analytics is unavailable.
- Semantic landmarks and visible focus states.
- Images have dimensions and useful alt text where meaningful.

## Performance budget

- Hero image should be appropriately compressed and sized.
- Lazy-load below-fold images.
- Avoid autoplay media.
- Avoid unnecessary third-party scripts.
- Record known trade-offs in delivery report.
