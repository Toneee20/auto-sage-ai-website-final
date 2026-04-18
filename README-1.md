# AutoSageAI Website — v4.3

**Structured Intelligence. Delivered.**
Thulane Anthony Buthelezi · @tony_ke_star · autosageai.co.za

---

## File Structure

```
index.html   — All page HTML (single-page app with multi-view routing)
style.css    — All styling, animations, responsive rules
script.js    — All JavaScript (routing, modals, chat, forms, starfield)
README.md    — This file
```

Upload all 4 files together to the same folder on your hosting. They must stay in the same directory — `index.html` links directly to `style.css` and `script.js`.

---

## What's On The Site

### Pages (single-page app — no reloads)
| Page | How to reach it |
|------|----------------|
| Home | Default landing page |
| Services | Scroll or nav → Services |
| How We Work | Scroll or nav → Process |
| Case Studies | Scroll or nav → Cases |
| Blog | Nav → Blog |
| Post 1 — Tools to Systems | Blog card click |
| Post 2 — SA SME AI Adoption | Blog card click |
| Careers | Scroll or nav → Careers |
| Contact / Discovery | Nav → Let's Meet / Get Started |

### Modals
| Modal | Trigger |
|-------|---------|
| View Packages (pricing) | Nav button or hero CTA |
| **Find My Packages** *(new)* | Hero "Find My Packages" button |
| Careers Application | Careers section button |
| AI Chat Widget | Bottom-right bubble |

---

## What Was Added in This Version

### 1. "Find My Packages" Button
- Added to the hero section alongside "Get Started" and "View Services"
- Opens a modal with two package suite cards side by side

### 2. Find My Packages Modal
Two cards the visitor clicks to choose their path:

**Digital Automation Package** (blue)
→ Links to automation/AI system builds when those pages are ready

**Digital Marketing Package** (amber)
→ Links to marketing packages when those pages are ready

*To link these cards to real pages: edit the `onclick` attributes on `.fpm-card-auto` and `.fpm-card-mkt` in `index.html` — replace `closeFindPkg()` with your routing function e.g. `gP('automation-packages')`*

### 3. Digital Marketing — Service 05
Added as the 5th card in the Services grid with:
- Full description of what Digital Marketing covers
- "NEW" badge on the service number
- Amber pill tags: Google Ads · Meta Ads · SEO · WhatsApp Funnels · Content Strategy · Analytics

---

## Hosting Instructions

1. Upload `index.html`, `style.css`, `script.js`, and `README.md` to your web host root folder
2. Point your domain to that folder
3. No backend, no database, no build step required — pure HTML/CSS/JS

**Recommended hosts:** Netlify (free), Vercel (free), Hostinger, cPanel shared hosting

---

## Contact & Branding

- **WhatsApp:** 066 001 8931
- **Email:** tonybuthel@gmail.com
- **Location:** Pretoria / Vaal Triangle, South Africa
- **Social:** @tony_ke_star

---

## Upcoming — To Be Linked

When ready, the following package detail pages can be added and linked from the Find My Packages modal:

- `automation-packages.html` — Digital Automation Package tiers
- `marketing-packages.html` — Digital Marketing Package tiers

---

*AutoSageAI · © 2026 · Structured Intelligence. Delivered.*
