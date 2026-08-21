# QA Checklist

## Automated

- [ ] `npm run validate -- --slug=<slug>` passes.
- [ ] `npm run build -- --slug=<slug>` passes.
- [ ] `npm run qa -- --slug=<slug>` passes.

## Content

- [ ] Facts match brief.
- [ ] One primary angle is consistent.
- [ ] No fabricated proof or urgency.
- [ ] Offer, price, terms, and CTA are correct.
- [ ] Maximum 10 persuasive sections.

## Design

- [ ] Visual concept fits product/category.
- [ ] Page does not look like a generic AI template.
- [ ] Hierarchy and CTA are obvious.
- [ ] Product assets are used effectively.
- [ ] Copy remains readable and scannable.

## Responsive

- [ ] 320×568
- [ ] 360×800
- [ ] 390×844
- [ ] 412×915
- [ ] 768×1024
- [ ] 1024×768
- [ ] 1280×800
- [ ] 1440×900
- [ ] No horizontal overflow.
- [ ] Text zoom 200% usable.
- [ ] Sticky CTA does not obscure content.

## CTA

- [ ] Hero CTA.
- [ ] Mid-page CTA.
- [ ] Offer CTA.
- [ ] Sticky CTA, if used.
- [ ] Footer CTA.
- [ ] All numbers and messages correct.
- [ ] Desktop and mobile tested.

## Tracking

- [ ] GA4 event once per click, if configured.
- [ ] Meta Contact once per click, if configured.
- [ ] Correct event parameters.
- [ ] No personal/sensitive data.
- [ ] Tracking failure does not block WhatsApp.

## Technical and deploy

- [ ] No console errors.
- [ ] No asset 404.
- [ ] Metadata and social preview checked.
- [ ] Public URL smoke tested.
- [ ] Delivery report completed.
