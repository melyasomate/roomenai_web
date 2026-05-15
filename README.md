# Handoff: RoomAI Marketing Website — Studio (Dark) Direction

## Overview

This is the marketing website for **RoomAI** — an AI-powered room design app. The user photographs their room, picks a direction (Japandi, Scandi, Mid-century, Boho, etc.), gets an AI-generated restyle, and shops every product in the new render directly from Amazon, Etsy, and 4,200 other retailers.

This bundle is the **"Studio" (dark)** direction — premium, near-black, heavy motion, Linear/Vercel/Raycast-quality aesthetic. It is a sibling to a separately-designed light "Salon" direction; both share the same brand identity, copy voice, and product story.

The package contains **three linked HTML pages** sharing one stylesheet and one motion library:

| Route | File |
|---|---|
| Landing | `index.html` |
| How it works | `how-it-works.html` |
| Pricing | `pricing.html` |

Plus:

| File | Purpose |
|---|---|
| `styles.css` | Shared design tokens, type system, layout, components, footer |
| `motion.js` | Vanilla-JS motion library: reveals, parallax, cursor, counters, magnetic, tilt, spotlight, marquee, compare slider, hero-tilt |

## About the Design Files

The files in this bundle are **design references built in HTML/CSS/vanilla JS** — prototypes showing intended look, layout, copy, animation, and interaction behaviour. They are **not meant to ship directly**.

The task is to **recreate these designs in the target codebase's environment** (Next.js, Astro, SvelteKit, Vue/Nuxt, etc.) using its established patterns, component model, and routing. If no codebase exists yet, choose the framework appropriate for a marketing site — Next.js App Router or Astro are both sensible defaults.

Use the HTML/CSS/JS as the single source of truth for visual specs (spacing, colour, typography, copy, animation timing). Rebuild components idiomatically in the target environment.

## Fidelity

**High-fidelity.** All colors, type sizes, spacing, copy, animation timings, and component states are intentional and should be matched precisely. Room and product imagery is intentionally placeholder (CSS gradients + repeating-linear-gradient patterns + abstract furniture rectangles) — replace with real AI-render samples and product photography in production.

---

## Visual Direction — "Studio Dark"

Linear-meets-Raycast aesthetic. Near-black warm background, soft green accent, glass cards, animated SVG connectors, magnetic primary CTAs, parallax hero blob, and a cursor-tracking spotlight. Inter Tight display + Inter body + JetBrains Mono labels.

### Why this works

- Dark, warm undertone (not pure `#000`) reads as "premium product" instead of "default Tailwind."
- Heavy but tasteful motion — every section reveals, parallaxes, or responds to hover — signals modern web craft.
- Saturated soft-green accent `#1D9E75` for actions only; everywhere else uses cream/text-dim. Restraint makes the accent feel deliberate.
- Mono labels (`02 — Restyle`, `1.8B params`) anchor it as a serious technical product, not a lifestyle brand.

---

## Design Tokens

All in `:root` in `styles.css`:

### Colors

```
--bg:          #0C0C0E   /* main background — near-black warm */
--bg-elev-1:   #121215   /* card base */
--bg-elev-2:   #17171C   /* raised */
--bg-elev-3:   #1E1E25   /* hover / inputs */

--border:        rgba(255, 255, 255, 0.07)
--border-strong: rgba(255, 255, 255, 0.14)

--text:        #F5F5F7
--text-dim:    rgba(245, 245, 247, 0.62)
--text-faint:  rgba(245, 245, 247, 0.38)

--accent:      #1D9E75       /* primary action — soft green */
--accent-hi:   #2BC494       /* hover, gradients */
--accent-lo:   #156F52       /* deeper variant */
--accent-glow: rgba(29, 158, 117, 0.35)

--warm:        #E8C9A0       /* tertiary accent (warm taupe) — sparingly */
--warm-dim:    rgba(232, 201, 160, 0.6)

--danger:      #E26869
```

### Radii

```
--radius-sm: 8px
--radius-md: 14px
--radius-lg: 22px      /* primary card radius */
--radius-xl: 32px      /* hero / CTA card */
```

### Easings

```
--ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1)
--ease-out-quart:   cubic-bezier(0.25, 1, 0.5, 1)
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1)
```

### Typography

| Role | Font | Notes |
|---|---|---|
| Display | **Inter Tight** (Google Fonts) | Weights 400–700 |
| Body | **Inter** (Google Fonts) | Weights 400–600 |
| Mono | **JetBrains Mono** (Google Fonts) | Weights 400–500 — used for kickers, labels, codes |

CSS:

```
--font-display: "Inter Tight", "Inter", -apple-system, system-ui, sans-serif;
--font-body:    "Inter", -apple-system, system-ui, sans-serif;
--font-mono:    "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
```

### Type scale

| Class | Size | Line-height | Letter-spacing |
|---|---|---|---|
| `.h1` (display) | clamp(44px, 8vw, 96px) | 0.96 | -0.04em |
| `.h2` (display) | clamp(36px, 5.5vw, 64px) | 1.0 | -0.035em |
| `.h3` (display) | clamp(24px, 3vw, 36px) | 1.1 | -0.02em |
| `.h4` | 20px | 1.25 | -0.015em (500 wt) |
| `.lead` | clamp(17px, 1.6vw, 20px) | 1.5 | -0.01em |
| `.eyebrow` | 12px (mono caps) | 1.0 | 0.18em |
| Body default | 16px | 1.5 | normal |

Special text styles:

- `.text-grad` — vertical gradient white → 55% white, `-webkit-text-fill-color: transparent` (used on most h1/h2)
- `.shimmer-text` — animated linear gradient shimmer running across text (used in "in 7 seconds")
- `.text-accent` — `--accent-hi`
- `.text-warm` — `--warm`

### Spacing / Layout

- `.container { max-width: 1240px; padding: 0 24px; }`
- `.container-narrow { max-width: 920px; }`
- `.section { padding: clamp(80px, 12vw, 160px) 0; }`
- Card padding: 28px standard, 80px 40px for CTA cards
- Grid gaps: 16–60px depending on density

---

## Pages

### `index.html` — Landing

In document order:

1. **Background layers** (fixed, behind content)
   - `.bg-grid` — 80×80px hairline grid with radial mask fading edges
   - `.bg-grain` — fractal noise SVG @ 4% opacity, overlay blend
   - `.cursor-blob` — 380px radial green blob that lerps to cursor (desktop only)

2. **Nav** — Fixed top. Logo (custom CSS-drawn "room" mark + wordmark) + 4 anchor links + Sign-in ghost button + "Get the app" primary. On scroll past 8px: adds `.scrolled` for backdrop-blur + bottom border.

3. **Hero**
   - Animated radial green "orb" floating in the background (18s ease-in-out loop, parallax-driven)
   - Pill badge: `Now in early access · v1.2 just shipped`
   - h1 — word-by-word reveal animation (`data-words` attribute splits text and animates each word into view with 70ms stagger)
   - Lead paragraph
   - Two CTAs (primary magnetic "Try it free" + ghost "See how it works")
   - Meta line: `No card required · iOS · Android · Web · 4.9 ★`
   - **Hero visual** — a fake "browser window" mockup. Top bar with traffic lights + URL. Body shows abstract room (gradient + stripe pattern + faux window + perspective floor + animated dashed SVG connectors + 4 floating product cards). The whole visual tilts/scales on scroll (subtle `perspective(1200px) rotateX(0–8°)`).

4. **Marquee** — Horizontal scrolling retailer list (40s loop, paused on hover). Italic-feeling "amazon · Etsy · West Elm · CB2 · Article · IKEA · Wayfair · Crate & Barrel · Anthropologie · Target" with `·` separators.

5. **Before/After compare** — 16:10 viewport with two clipped halves (`--cmp` CSS var, default 50%). Drag the handle or it auto-animates on first scroll-into-view (12% → 88% then settles at 50%). "Before" pane has muted furniture rectangles; "After" pane has accent-bordered furniture with product price labels.

6. **Steps / How it works (preview)** — 3-column grid of editorial cards: 01 Capture / 02 Restyle / 03 Shop. Each card has mono kicker, display title, body copy, and a custom mini-visualization at the bottom (phone scanning, style tile grid with selected states, product list rows). Cards have `data-tilt="3"` for subtle 3D rotation on mouseover.

7. **Shoppable showcase** — 2-column section. Left: 4:5 aspect "room visualization" with floating accent tags (Boucle Chair · $384, Brass Sconce · $89, Olive Tree · $68). Right: 5 product cards in a list — each with thumbnail, title, source badge (amzn/etsy colored), shipping note, italic price, "saved" tag.

8. **Features grid** — 3-column (with 2 wide cards spanning 2 columns). Six features: 14 style models / Budget slider / Ships to you / Chat with the room / AR preview / One checkout. Each has a small icon (hand-rolled SVG, stroke-based, accent-tinted box), display title, body. Spotlight effect on hover (`data-spotlight` tracks mouse position, fills `::after` radial gradient).

9. **Stats band** — 4-column bordered band with animated counters: 2.4M Rooms restyled / 4,200+ Stores indexed / 7s Average render time / 4.9★ App Store rating.

10. **Testimonials** — 3-column grid of testimonial cards. Stars + display quote + author with circular gradient avatar.

11. **CTA section** — Centered card with massive radial accent glow underneath. "Snap a photo. Live in the answer." + primary magnetic CTA + ghost.

12. **Big footer wordmark** — Enormous "RoomAI" stroked/faded text as decorative band.

13. **Footer** — 4-column grid (logo+blurb / Product / Company / Legal) + bottom row with copyright.

### `how-it-works.html`

1. **Page hero** — Pill `4 steps · 7 seconds · 1 cart`, large word-reveal h1 `From photo to front door.`, lead paragraph.

2. **Process — vertical timeline** — 4 sticky-numbered cards arranged in alternating left/right layout around a central vertical rule. The `.process-progress` line fills as user scrolls down. Each step has:
   - Sticky circular marker (`pstep-num`) that glows accent when active
   - Text block (alternates left/right) with title, body, "detail rows" (mono confirmations)
   - Custom visualization on opposite side (phone scanning with animated scan-line, style tile grid with selected state + checkmark, room with floating tags + animated dashed connectors, cart row list with total)

3. **Tech grid** — `Three models, one tap.` — 2×2 grid of glass cards: scene model / restyle diffusion / object matcher / commerce layer. Each has title, body, hairline-dashed spec table (model / params / runtime).

4. **FAQ** — 6 accordion items with hairline dividers. Each: question + circle `+` icon (rotates 45° on open, fills accent). Body expands via `max-height` set to `scrollHeight`.

5. **CTA + footer** — same as landing.

### `pricing.html`

1. **Page hero** — Pill, big h1 `Fair pricing for beautiful rooms.`, lead.

2. **Billing toggle** — Pill with sliding active indicator. Switching animates plan prices from current → target value over 500ms (quartic ease). Updates `.plan-bill` notes. "Yearly" button shows a "Save 20%" tag.

3. **3-plan grid** — Starter (Free) / Pro (featured, highlighted) / Studio. Each plan:
   - Plan name kicker
   - Tag line (display, 19px)
   - Massive price with `$` currency + per-period suffix
   - Bill note (e.g. "$132 billed yearly · save $36")
   - CTA (ghost for Starter, primary for Pro, ghost for Studio)
   - Feature list (hairline-divided) — 7–8 items each, with accent circle ✓ for included and faint dot for excluded
   - Featured plan has gradient border via `::before` mask trick + "Most popular" badge above

4. **Compare table** — Full feature comparison. Mono-cap section headers (Generation / Editing / Shopping / For designers & teams), accent ✓ / muted — for boolean rows.

5. **Enterprise band** — 2-column row with subtle warm/accent gradient background.

6. **FAQ** — same accordion pattern (6 items).

7. **CTA + footer** — same as landing.

---

## Components (in `styles.css`)

### Buttons (`.btn`)

| Variant | Class | Effect |
|---|---|---|
| Primary | `.btn-primary` | Accent green bg, inset shadow gradient, soft glow |
| Ghost | `.btn-ghost` | Transparent with hairline border, hover bumps surface |
| Large | `.btn-lg` | 48px height vs 40px |

All buttons: pill (999px radius), 14–15px font, transition transforms on press (`scale(0.97)`), arrow icon (`.btn-arrow`) translates +3px on hover.

### Pill / badge

`.pill` — small pill with animated dot (pulse 2.4s ease-in-out) + label text. Used for hero "now in early access" type markers.

### Cards

`.card` — base card: gradient bg, hairline border, optional gradient overlay border (via `::before` mask trick). `.card-hover` modifier adds `translateY(-4px)` on hover.

### Section header

`.section-header` — centered eyebrow + h2 + lead paragraph. 64px bottom margin.

### Divider

`.divider` — horizontal gradient line, 1100px max-width, used between major sections.

### Footer

`.footer` — 4-column grid + bottom row. Hover state on links bumps to full white.

---

## Motion library (`motion.js`)

Vanilla JS, all using IntersectionObserver + scroll events + rAF. Implement equivalents in your animation lib of choice.

### `[data-reveal]`

Fades + translateY(28→0) over 1s `--ease-out-expo` when element enters viewport at threshold 0.12. Supports `data-reveal-delay="500"` for staggered manual offsets.

### `[data-reveal-stagger]`

Same as `data-reveal` but children get 70ms incremental `transition-delay` (up to 8 children).

### `[data-words]` (hero)

Splits text by space, wraps each word in `<span class="word-reveal"><span>{word}</span></span>`, animates each word with 70ms stagger via translateY(110%→0).

### Parallax (`[data-parallax="0.25"]`)

On scroll: `translate3d(0, -offset * speed * 100px, 0)` where offset is element distance from viewport center / window height. rAF-throttled.

### Cursor blob

Lerps a 380px multiply-blend green radial toward cursor (0.12 per frame). Only on `hover: hover` + `pointer: fine`.

### Counter animation

`[data-count="2.4" data-decimals="1" data-suffix="M"]` — triggers at threshold 0.4, animates 0 → target over 1800ms (configurable via `data-dur`) with quartic ease. Comma-formats thousands.

### Magnetic (`[data-magnet="0.25"]`)

Translates element toward cursor by `offset * strength`. Returns to 0 on mouseleave.

### Tilt (`[data-tilt="6"]`)

`perspective(900px) rotateX(rx) rotateY(ry)` where rx/ry are ±max° based on cursor position within element. Used on step cards, showcase visual.

### Spotlight (`[data-spotlight]`)

On mousemove sets `--spot-x` / `--spot-y` CSS vars (percentages). Element's `::before` or `::after` reads these for radial-gradient positioning.

### Marquee (`[data-marquee]`)

Duplicates innerHTML so the linear-translate(-50%) keyframe loops seamlessly.

### Compare slider (`[data-compare]`)

Drag-controlled `--cmp` percent variable. Includes auto-animate on first reveal: cosine ease 12% → 88% over 2200ms then settles at 50%.

### Hero visual tilt-on-scroll (`[data-hero-visual]`)

Subtle `perspective(1200px) rotateX(min(8°, scrollY*0.02))` + `scale(max(0.92, 1 - scrollY*0.0003))`. Gives the hero browser-mockup a slight 3D tip as user scrolls past.

### Page-load class

Adds `.loaded` to `<html>` after motion library init — useful for any "before motion JS runs, hide things" rules (not currently used, but available).

---

## Animations & timing reference

| Element | Property | Duration | Easing |
|---|---|---|---|
| `[data-reveal]` | opacity, translateY | 1.0s | `--ease-out-expo` |
| Stagger child | opacity, translateY | 0.9s | `--ease-out-expo` |
| Cursor blob | follow lerp | per-frame 0.12 | linear |
| Counter | value | 1.8s | quartic out |
| Compare auto | --cmp | 2.2s | cosine ease |
| Pill dot pulse | opacity, scale | 2.4s infinite | ease-in-out |
| Marquee | translateX | 40s infinite | linear |
| Hero orb float | translateY, scale | 18s infinite | ease-in-out |
| Step scan ring | box-shadow scale | 2.2s infinite | ease-out |
| FAQ open | max-height | 0.5s | `--ease-out-quart` |
| Button hover lift | shadow, bg | 0.2–0.3s | default |
| Pricing toggle | value count | 0.5s | quartic out |
| Pricing toggle pill | translateX, width | 0.4s | `--ease-out-quart` |
| Hero word reveal | translateY | 1.0s | `--ease-out-expo` |

---

## State management

Marketing site is mostly stateless. Per-page client state:

- **Pricing**: `billingMode: 'monthly' | 'yearly'` — drives toggle UI + animated price counters + plan-bill notes
- **All pages**: scroll position only (for parallax, nav-scrolled state, reveal triggers)
- **FAQ**: per-item open boolean (class toggle in this prototype; lift to component state in React/Vue)
- **Compare slider**: `--cmp` percentage CSS var, controlled by drag

No data fetching anywhere in the marketing site. CTAs ("Try it free") should route to product app at `/app` or App Store/Play Store.

---

## Responsive behaviour

| Breakpoint | What changes |
|---|---|
| ≤ 920px | How-it-works steps stack vertically, showcase becomes 1-column, feature grid becomes 1-column, pricing grid becomes 1-column, testimonials become 1-column |
| ≤ 880px | Hero visual product card sizes shrink, feature-wide cards collapse |
| ≤ 720px | Nav links hide (mobile menu needs designing — not in this prototype), footer collapses to 2 columns, stats become 2×2 |

A mobile hamburger menu is **not** in this design and should be added before production ship.

---

## Assets

- **Fonts** — Inter Tight, Inter, JetBrains Mono from Google Fonts. Self-host in production. Subset to Latin only if possible.
- **Imagery** — All "room images" are CSS gradient + repeating-linear-gradient pattern placeholders with abstract furniture rectangles overlaid. Replace with:
  - Real AI-generated room renders for hero browser mockup, showcase, step visuals, chapter visuals
  - Real product photography for product list thumbnails
- **Icons** — All hand-rolled stroke SVGs inline. Recommend replacing with [Lucide](https://lucide.dev) or [Heroicons](https://heroicons.com) for consistency in production.
- **Logo** — CSS-drawn "room" mark (gradient square with cut-out window shapes inside) + Inter Tight wordmark. Should be replaced with a proper SVG logo before launch.

---

## Files in this package

| File | Contents |
|---|---|
| `index.html` | Landing page |
| `how-it-works.html` | How it works page |
| `pricing.html` | Pricing page |
| `styles.css` | Shared design tokens, layout, components (~570 lines) |
| `motion.js` | Shared motion library (~250 lines) |
| `README.md` | This document |

To preview locally: open `index.html` in any modern browser. No build step.

---

## Implementation notes

- The prototype uses vanilla JS + a single shared CSS file for fast iteration. **Do not copy that pattern.** Use your codebase's existing build tooling, component model, and routing.
- **Routing**: Replace the multi-file approach with the framework's native router. Three pages → `/`, `/how-it-works`, `/pricing`.
- **CSS strategy**: Lift the `:root` token block into your design-system primitive (CSS variables / Tailwind theme extension / styled-system theme). Don't hard-code hex values throughout components.
- **Component split**: Reasonable boundaries — `<Nav>`, `<Button>` (with variants), `<Card>`, `<Pill>`, `<SectionHeader>`, `<HeroVisual>`, `<CompareSlider>`, `<StepCard>`, `<ProductCard>`, `<FeatureCard>`, `<StatCounter>`, `<Testimonial>`, `<PlanCard>`, `<BillingToggle>`, `<CompareTable>`, `<FaqItem>`, `<Marquee>`, `<Footer>`.
- **Animations**: Translate the vanilla JS in `motion.js` to your animation lib. Framer Motion's `whileInView` + `viewport={{ once: true }}` covers most of the reveals; GSAP ScrollTrigger covers parallax, the timeline progress in how-it-works, and the hero tilt; CSS-only transitions cover hover states.
- **The hero visual** is currently a CSS pastiche of a browser window. Before launch, consider replacing with an actual screen-recording video or a Lottie/Rive animation of the real product.
- **The "browser mockup" floor perspective trick** is just a CSS `perspective(600px) rotateX(50deg)` on a gradient div. Keep this technique — it's a low-cost way to imply 3D space.
- **Reduced motion**: Add `@media (prefers-reduced-motion: reduce)` overrides to disable parallax, magnetic, tilt, cursor blob, hero orb float, and marquee. Not in the prototype.

## Accessibility TODO

- Compare slider needs keyboard support (arrow keys to nudge `--cmp`) and `role="slider"` + `aria-valuenow/min/max` attributes
- All decorative animations should respect `prefers-reduced-motion`
- FAQ buttons need `aria-expanded` toggling and `aria-controls` pointing to body id
- Verify accent `#1D9E75` and `#2BC494` on `#0C0C0E` — both pass WCAG AA for large text but only `#2BC494` passes AAA for body text. Use the lighter variant for body copy if needed.
- The cursor blob is decorative — fine to skip on assistive tech
- Add `aria-label` to the icon-only sign-in button if it stays icon-only

## SEO / production prep

- Basic `<title>` and meta description present. Add Open Graph tags, Twitter cards, and structured data (Product schema) before launch.
- Add a sitemap.xml and robots.txt
- Pre-render the marketing pages — they're 100% static content, no reason to ship a JS SPA bundle for them

## Open questions for product

- **Real pricing**: numbers in the prototype ($14, $49) are placeholders. Confirm final structure with finance/product.
- **Currency**: prototype is `$`-only. Geo-detect or let users switch?
- **Image strategy**: cinematic AI-generated samples? Real customer rooms (with permission)?
- **Sign-up flow**: "Try it free" CTA currently `href="#"`. Where does it go — `/app`, modal, App Store/Play Store?
- **Mobile menu**: needs designing before ship.
- **Sourcing claims**: "4,200+ stores indexed", "38M SKUs", "2.4M rooms restyled" — confirm with data team before launch.
