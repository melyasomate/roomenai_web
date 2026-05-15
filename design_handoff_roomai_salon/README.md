# Handoff: RoomAI Marketing Website — Salon (Light) Direction

## Overview

This is the marketing website for **RoomAI** — an AI-powered room design app. The user photographs their room, picks a direction (Scandinavian, Japandi, Boho, etc.), gets an AI-generated restyle, and shops every product in the new render directly from Amazon, Etsy, and 4,200 other retailers.

The package contains a single self-contained HTML file (`salon.html`) implementing **three pages** behind a hash-router:

| Route | Page |
|---|---|
| `#/` | Landing |
| `#/how` | How it works |
| `#/pricing` | Subscription / Pricing |

The aesthetic direction is **Salon Light** — an editorial, magazine-feel design with warm linen background, italic serif headlines, monospace labels, and a deep moss accent. It is a sibling to a separately-designed dark "Studio" direction; both share the same brand DNA and component logic.

## About the Design Files

The file in this bundle (`salon.html`) is a **design reference built in HTML/CSS/vanilla JS** — a self-contained prototype showing intended look, layout, copy, animation, and interaction behavior. It is **not meant to ship directly**.

The task is to **recreate these designs in the target codebase's environment** (React/Next.js, Vue/Nuxt, Astro, SvelteKit, etc.) using its established patterns, component library, and routing. If no codebase exists yet, choose the framework appropriate for a marketing site (Next.js or Astro are sensible defaults).

Use the HTML as a single source of truth for visual specs (spacing, colors, typography, copy, animation timing), but rebuild components idiomatically in the target environment.

## Fidelity

**High-fidelity.** All colors, type sizes, spacing, copy, animations, and component states are intentional and should be matched precisely. The room and product imagery is intentionally placeholder (gradient + grain + abstract furniture lines via CSS) — replace with real product photography and AI render samples in production.

---

## Visual Direction — "Salon Light"

Editorial / interior-design-magazine feel. Italic serif headlines, monospace labels for chrome, asymmetric layouts, generous whitespace, restrained colour. Numbered references (`N° 042`, `N° 01 — Capture`) act as editorial provenance.

### Why this works

- Italic-emphasis words ("Design any room. *Shop* it.") read as magazine art direction, not SaaS marketing copy.
- Cormorant Garamond italic + Geist + Geist Mono produces a strong premium identity without feeling tech-bro.
- Warm linen `#EBE3CC` ground reads as "interior space," not "Figma canvas."
- No AI tropes — no sparkle glyphs, no purple gradients, no "AI Design" badges. AI is the tool, not the brand.

---

## Design Tokens

### Colors

```
--bg:         #EBE3CC   /* main background — warm gallery linen */
--bg-soft:    #E2D9BD   /* secondary ground */
--surface:    #F1EAD3   /* cards / inputs */
--surface-2:  #E5DCC0   /* raised surface */
--surface-hi: #D6CAA9   /* hover state */

--border:     rgba(30, 22, 12, 0.10)
--border-hi:  rgba(30, 22, 12, 0.18)
--border-vd:  rgba(30, 22, 12, 0.30)

--text:       #1B1610
--text-dim:   rgba(27, 22, 16, 0.62)   /* body secondary */
--text-mute:  rgba(27, 22, 16, 0.40)   /* meta / mono labels */
--text-faint: rgba(27, 22, 16, 0.22)   /* dividers / disabled */

--accent:      #3F5A3A                 /* primary action — deep moss */
--accent-hi:   #4D6D47                 /* hover */
--accent-soft: rgba(63, 90, 58, 0.10)  /* subtle fill */
--accent-bg:   rgba(63, 90, 58, 0.16)  /* tinted background */
--accent-ink:  #F5F1E4                 /* foreground on accent */

--terra:       #9C4B2C                 /* tertiary accent — unused in body */
--oxblood:     #7A2E2A                 /* tertiary accent — unused in body */
```

### Typography

| Role | Font | Notes |
|---|---|---|
| Display headlines | **Cormorant Garamond** (Google Fonts) | Weights 400–600; italic used for emphasis words. Falls back to Georgia. |
| Body / UI text | **Geist** (Google Fonts) | Weights 400–600. Falls back to system-ui. |
| Labels / mono | **Geist Mono** (Google Fonts) | All caps with 0.18–0.22em letter-spacing for section labels, numbers, stamps. |

CSS fallbacks already wired in `:root`:

```
--display: 'Cormorant Garamond', 'Georgia', serif;
--body:    'Geist', -apple-system, system-ui, sans-serif;
--mono:    'Geist Mono', ui-monospace, monospace;
```

### Type scale

| Class | Size | Line-height | Weight | Letter-spacing |
|---|---|---|---|---|
| `.h-display` | clamp(56px, 11vw, 168px) | 0.9 | 400 | -0.025em |
| `.h-hero` | clamp(48px, 8vw, 116px) | 0.95 | 400 | -0.02em |
| `.h-1` | clamp(40px, 6.5vw, 88px) | 0.96 | 400 | -0.02em |
| `.h-2` | clamp(32px, 4.4vw, 64px) | 1.0 | 400 | -0.018em |
| `.h-3` | clamp(24px, 2.6vw, 36px) | 1.1 | 400 | -0.015em |
| `.lead` | clamp(16px, 1.5vw, 19px) | 1.55 | 400 | -0.005em |
| `.kicker`, `.mono-label` | 11px | 1.0 | 500 (mono caps) | 0.18em |
| Body default | 16px | 1.5 | 400 | normal |

Italic emphasis: wrap any word in `<span class="serif-it accent">…</span>` (italic + accent colour) or `<em>` inside hero h1 (alias).

### Spacing & layout

- Container: `.wrap { max-width: 1320px; padding: 0 32px; }`
- Major section vertical rhythm: `padding-top/bottom: 100–120px` (via `.section`, `.section-wide`)
- Card padding: 28–40px
- Grid gaps: 16–60px depending on hierarchy

### Radii

- Buttons / pills: **100px** (full)
- Mono badge / tag: **2–4px**
- Cards: **no radius by default** — flush rectangles. Editorial choice.

### Easings

- `--ease-paper`: `cubic-bezier(0.22, 1, 0.36, 1)` — primary
- `--ease-quart`: `cubic-bezier(0.25, 1, 0.5, 1)` — secondary, slightly less dramatic

All reveal/hover transitions run **1.0s–1.8s** — slow, paper-like. Resist tightening these; they're the whole feel of the design.

---

## Pages

### `#/` — Landing

In document order:

1. **Hero**
   - Two-column grid (1fr × 1fr) on desktop, stacks on mobile (≤920px).
   - Left: editorial stamp (`N° 042 — ISSUE 04 · NEW THIS WEEK`), display h1 (`Design any room. <em>Shop</em> it.`), lead paragraph, two CTAs (primary "Begin a new room" + text link "How it works"), three stat counters (rooms designed / stores indexed / App Store rating).
   - Right: 4:5 aspect "hero image" — placeholder with gradient + abstract furniture lines + corner stamps + bottom italic caption + animated SVG connectors and three floating italic product price tags.
   - Background: subtle paper grain SVG (multiply blend) + radial accent + radial terracotta tint at corners.

2. **Marquee band** — horizontal infinite-scroll list of retailer names (italic serif, dots between). 50s loop. Top + bottom hairline borders.

3. **Before / After compare**
   - 16:10 aspect viewport with two stacked panes (warm before, moss after).
   - Vertical draggable handle (44px circular accent with ⇄ glyph) and floating italic price tag.
   - Auto-animates on scroll into view (15% → 85% then settles at 52%).
   - Furniture rectangles labeled in mono caption beneath each piece.

4. **Process — three editorial columns** (no card chrome, hairline dividers)
   - 01 Photograph / 02 Restyle / 03 Shop. Each column: large italic numeral, mono kicker, italic-emphasis title, body copy.

5. **Gallery** — 3-column asymmetric grid (5fr / 4fr / 3fr) of six aspect-ratio cards. Each card has corner stamp (`N° 042`), gradient image with abstract room lines, and bottom overlay (italic title + mono style + italic price + mono "X pieces").

6. **The list / shoppable**
   - Two-column spread (sticky room image left, list right on desktop).
   - Room image: 4:5 aspect with corner stamps and italic caption.
   - List: 6 hairline-divided rows (thumbnail + mono source + serif name + ship time + italic price + saved tag).
   - Total bar at bottom + "Buy the room" primary CTA.

7. **Feature pairs** — three alternating 50/50 sections (style picker grid / chat-with-the-room / budget slider), each with copy column and visual column.

8. **Pull quote** — full-width testimonial. Italic display quote with hairline rules above and below.

9. **CTA block** — centered closer with chapter label, italic h1, lead paragraph, two CTAs.

10. **Footer** — 4-column grid (logo + blurb / Product / Company / Legal) + bottom row with copyright. Underneath: enormous stroked-outline "Room*ai*" wordmark as decorative band.

### `#/how` — How it works

1. **Page hero** — chapter label `N° 02 — HOW IT WORKS`, block h-hero (`From photograph to front door, in seven seconds.`), lead.

2. **Chapters rail** — vertical accent line drawn down the page. Four `<article class="chapter">` rows, each:
   - Sticky huge italic numeral (left, sticky to top: 120px)
   - Text block: mono kicker (e.g. "Capture — 3 seconds"), italic-emphasis h3, body paragraph, "marks" list (3 mono-numbered confirmations)
   - 4:5 visual on the right
   - Rail fills as you scroll; circle marker on active chapter glows accent.

3. **Tech grid** — `Three models, one tap.` Heading + 2×2 grid of editorial cells (no card chrome, just hairline borders): scene model / restyle diffusion / object matcher / commerce layer. Each: mono kicker, italic title, body, then "specs" rows (model / parameters / runtime).

4. **FAQ** — 5 accordion items. Each: mono `N° XX` left, serif question center, italic `+` right (rotates 45° to ×). Underline-style expand.

5. **CTA + Footer** — same as landing.

### `#/pricing` — Subscription

1. **Pricing hero** — chapter label, h-hero, lead, animated **billing toggle** (Monthly / Yearly · Save 20%). Toggle is a pill with sliding accent indicator; switching animates all prices counting from current value to target over 600ms.

2. **Plans** — three horizontal full-width rows (no card chrome): Starter / Pro / Studio. Each row: name + badge (left), italic-serif price + bill note, feature list (2-column), CTA. Hover state: accent ribbon slides in from left + price slides 4px right.

3. **Compare table** — `Every feature, every plan.` Heading + full table with hairline rows, mono section headers (Generation / Editing / Shopping / For designers & teams), `✓` rendered as italic serif accent character, `—` as muted mono.

4. **Enterprise band** — Two-column callout with hairline border + tinted surface bg.

5. **FAQ** — same pattern as how-it-works (5 questions).

6. **CTA + Footer** — same as landing.

---

## Components

### Nav (`<nav class="nav">`)
- Fixed top, 20px padding.
- Logo (`Room` + italic accent `ai`) left, route links center, sign-in + primary "Begin →" CTA right.
- On scroll past 12px: `.scrolled` class adds `rgba(235,227,204,0.72)` background with `backdrop-filter: blur(20px) saturate(140%)` and hairline bottom border.
- Mobile (≤760px): hides nav-links.

### Buttons
- `.btn` — pill shape, 100px radius
- `.btn-primary` — `--accent` bg, `--accent-ink` text, hover lifts to `--accent-hi`, arrow translates +4px on hover
- `.btn-ghost` — transparent with hairline border, hover bumps to surface bg
- `.btn-lg` — 18×28px padding, 14px font
- `.btn-sm` — 9×16px padding, 12px font
- `.btn-text` — underlined mono caps link, accent colour

### Editorial chrome
- `.chapter-label` — `N° XX` mono — short hairline rule — Title mono
- `.stamp` — accent pip + mono caps text
- `.kicker` / `.mono-label` — mono caps 0.18em letter-spacing

### Compare slider
- Two `.cmp-pane` divs (before / after), `clip-path` on `.cmp-after` driven by `--cmp` CSS variable
- `.cmp-handle` is a 2px vertical line with a 56px circular accent grip; drag updates `--cmp` between 4–96%
- Auto-animates on scroll into view via cosine ease

### FAQ accordion
- Click toggles `.open` class on `.faq-item`
- `.faq-a` is `max-height: 0` collapsed, set to `scrollHeight` px when open
- `+` icon rotates 45°

### Billing toggle (pricing page)
- Two-button pill with absolutely-positioned `.pill` sliding indicator
- On toggle: animates each price `<span data-pm="X" data-py="Y">` from current to target value over 600ms with quartic ease
- Updates `.plan-bill` notes (`data-bm` / `data-by`)

---

## Animations & Behaviour

All thresholds and timings live in the JS at the bottom of `salon.html`. Re-implement these in the target environment using its idiomatic animation library (Framer Motion, GSAP, Reanimated, etc.).

### Scroll-driven reveals
- Selector: `[data-reveal] / [data-reveal-stagger] / [data-reveal-img] / [data-reveal-fade]`
- Off-screen elements get `.is-ready` class (sets `opacity: 0`, `translateY: 20px` or `clip-path` for images)
- When element top crosses `window.innerHeight * 0.88`, `.is-in` is added and `.is-ready` removed → 1.0–1.8s transition kicks in
- `[data-reveal-stagger] > *` children get 100ms incremental `transition-delay` up to 8 children

### Cursor blob
- 480×480px multiply-blend radial gradient (moss tint) that lerps toward mouse (0.10 ease per frame)
- Only on `hover: hover` + `pointer: fine` media query — hidden on touch

### Magnetic buttons
- Applied to `.btn-primary.btn-lg`
- On mousemove: `transform: translate(dx * 0.18, dy * 0.18)` where dx/dy are offsets from center
- Returns to 0,0 on mouseleave with 0.35s paper ease

### 3D tilt
- Applied to `.g-card` and `.chapter-vis`
- On mousemove: `perspective(1000px) rotateX(rx) rotateY(ry)` where ±3.5° max
- 0.4s paper ease return

### Spotlight
- Applied to `.process-col`, `.tech-cell`, `.plan`
- On mousemove sets `--mx` / `--my` CSS variables
- `::after` pseudo-element has `radial-gradient(360px circle at var(--mx) var(--my), accent-soft, transparent)` that opacities 0→1 on hover

### Parallax
- Selector: `[data-parallax="0.08"]` (numeric speed)
- On scroll: `translate: 0 (-offset * speed * 100)px` where offset is element's distance from viewport center / window height

### Animated SVG connectors (hero)
- Dashed path with `stroke-dasharray: 3 5` and `animation: hero-dash 30s linear infinite { to { stroke-dashoffset: -120 } }`
- Three accent-coloured `.pt` circles with `drop-shadow` filter at path endpoints

### Hero floating tags
- Three pills positioned absolutely on hero image
- `animation: drift 7s ease-in-out infinite` — 6px vertical sine
- Inner `.hero-tag-pip::after` does a `ring` keyframe (scale 0.6→2, opacity 0.6→0) on a 2.6s cycle

### Marquee
- `width: max-content`, items duplicated in HTML for seamless loop
- `animation: scroll-x 50s linear infinite { from translateX(0); to translateX(-50%) }`

### Counter animation
- `[data-count]` elements (with `data-decimals`, `data-prefix`, `data-suffix`)
- Triggers on scroll when element top < 85% viewport
- Quartic ease over 2200ms via rAF

### Chapter rail fill
- `.chapters-rail::before` is the static border, `.rail-fill` is the accent fill
- Height updated on scroll: `(scrollProgress within rail height) * railHeight`
- Chapter `.is-current` toggled when chapter's rect.top < 60% & rect.bottom > 25% of viewport — fills the circular marker on left of italic numeral

### Hash router
- `window.addEventListener('hashchange', navigate)`
- Three pages: `<main class="page" data-page="/">`, `data-page="/how"`, `data-page="/pricing"`
- Active page gets `.is-active` (display: block; the rest: display: none)
- 0.5s opacity fade-in on activation

---

## State Management

The marketing site is mostly stateless. Per-page client state:

- **Pricing**: `billingMode: 'monthly' | 'yearly'` — drives toggle UI + animated price counters + plan-bill notes
- **All pages**: active route from `location.hash`
- **FAQ**: per-item open boolean (just a class toggle in this prototype; in React/Vue would be local state)

No data fetching in the marketing site. CTAs ("Begin a new room") route to product app at `/app` or similar.

---

## Responsive behaviour

| Breakpoint | What changes |
|---|---|
| ≤ 920px | Hero grid stacks, gallery becomes 2-column, feature pairs stack vertically, list spread stacks, chapter visuals stack under text, pricing plans stack vertically, compare table scrolls horizontally |
| ≤ 760px | Nav-links hide (mobile menu not designed — needs to be added before ship; recommend a slide-down sheet), footer-grid collapses to 2 columns |
| ≤ 600px | Most padding tightens; check `.wrap { padding: 0 20px }` and that h-hero clamp still reads on small screens |

A mobile hamburger menu is **not** in this design and should be designed before production ship.

---

## Assets

- **Fonts** — Cormorant Garamond, Geist, Geist Mono from Google Fonts. Self-host for production performance; don't depend on Google CDN. Subset to Latin if possible.
- **Imagery** — All "room images" are CSS gradient placeholders with abstract furniture lines and grain SVG overlay. Replace with:
  - Real AI-generated room renders for hero, gallery, list-spread, chapter visuals
  - Real product photography for product list thumbnails
- **Icons** — None used. All "icons" are typographic (italic `+` for FAQ, italic numerals for chapters, `⇄` for compare handle, `→` for arrows).
- **Logos** — The wordmark is pure type (Cormorant Garamond `Room` + italic accent `ai`). No SVG mark.

---

## Files in this package

| File | Contents |
|---|---|
| `salon.html` | Full single-file prototype — HTML + inline CSS + inline JS for all three pages and the hash router |
| `README.md` | This document |

To preview locally: open `salon.html` in any modern browser. No build step.

---

## Implementation notes

- The prototype uses vanilla JS + a single `<style>` block for fast iteration. **Do not copy that pattern.** Use your codebase's existing build tooling, component model, and routing.
- **Routing**: Replace the hash-router with the framework's native router (Next.js App Router, Vue Router, etc.). The three pages should be `/`, `/how-it-works`, `/pricing`.
- **CSS strategy**: Lift the `:root` token block into your design-system primitive (CSS variables / Tailwind config / styled-system theme). Don't hard-code hex values throughout components.
- **Component split**: Reasonable component boundaries — `<Nav>`, `<Button>`, `<ChapterLabel>`, `<Stamp>`, `<HeroImage>`, `<RoomImage>`, `<ProductCard>`, `<PlanRow>`, `<Faq>`, `<CompareSlider>`, `<BillingToggle>`, `<Marquee>`, `<TechCell>`, `<Footer>`.
- **Animations**: Translate hand-rolled JS to your animation lib of choice. Framer Motion's `whileInView` + `viewport={{ once: true }}` covers most of the reveals; GSAP ScrollTrigger covers the rail and compare slider; CSS-only transitions cover hover states.
- **Reduced motion**: Add `@media (prefers-reduced-motion: reduce)` overrides to disable parallax, magnetic, tilt, and infinite marquee. Not in the prototype.
- **Accessibility**: 
  - Add proper landmark roles (`<header>`, `<main>`, `<footer>`, `<nav>` already there)
  - The italic decorative type used for `Room*ai*` wordmark may need an `aria-label="RoomAI"` on the logo link
  - All FAQ buttons need `aria-expanded` toggling
  - Verify accent `#3F5A3A` on `#EBE3CC` for body text — passes WCAG AA at 7.2:1
- **SEO**: The prototype has basic `<title>` and meta description. Add Open Graph tags, Twitter cards, and a sitemap before launch.

## Accessibility TODO

- Compare slider needs keyboard support (arrow keys to nudge) and `role="slider"` + `aria-valuenow/min/max`
- All decorative animations should respect `prefers-reduced-motion`
- Verify focus-visible states on every interactive element (the prototype has minimal focus styling)
- The Cormorant italic display style is decorative; alt copy should not rely on the italic for meaning

## Open questions for product

- **Real currency/locale**: prototype is `£`-only. Choose currency from user's IP or let them switch?
- **Image strategy**: cinematic AI-generated samples for hero/gallery? Real customer rooms (with permission)?
- **Pricing**: plan tiers and prices in the prototype are placeholders. Confirm final structure.
- **Sign-up flow**: "Begin a new room" CTA currently `href="#"`. Where does it go — `/app`, a modal, App Store/Play Store?
- **Mobile menu**: needs designing before ship.
