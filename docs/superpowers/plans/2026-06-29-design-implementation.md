# mediamundis Landing-Page — Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax. There is NO unit-test framework; "verify" = dev/prepare/lint/generate + DOM/CSS/output checks, plus visual parity against `docs/demo.html`.

**Goal:** Translate the polished single-page design in `docs/demo.html` into the existing Nuxt 4 + Tailwind v4 scaffold as maintainable, atomic-design Vue components — preserving its look & feel, fixing quality/a11y/perf issues, and adding two tasteful "AHA" animations.

**Architecture:** Token-driven hybrid. All design values live in Tailwind v4 `@theme` (`app/assets/css/main.css`); components use utilities for layout/color and small **scoped** `<style>` for bespoke effects. Atomic components (atoms/molecules/organisms) under `app/components/`, content as typed data under `app/data/`, behaviors as `@vueuse/core` composables under `app/composables/`. Normal document flow with `position: sticky` (NOT the old absolute-layer system). SSG.

**Tech Stack:** Nuxt 4.4.8 · Vue 3.5 · Tailwind v4 (`@tailwindcss/vite`) · @nuxt/fonts (Archivo) · @nuxt/image · @nuxtjs/seo · @vueuse/core 14.

## Global Constraints

- **Source of truth:** `docs/demo.html` — port markup, CSS values, copy, and behaviors faithfully. When a value (color/spacing/clamp/keyframe) is needed, copy it verbatim from the demo unless this plan overrides it.
- **Look & feel:** monochrome ink (#17181B) on white, single orange accent (#F59A18), hairline borders, fluid `clamp()` type, tight tracking, Archivo font.
- **Tailwind v4 CSS-first:** NO `tailwind.config.js`. Tokens in `@theme` in `app/assets/css/main.css`. Utilities like `text-ink bg-orange border-line font-sans` come from token names below.
- **Token names (exact):** colors `--color-{bg,card,ink,ink-soft,grey,grey-strong,grey-soft,orange,line,tile,dot,dot-mini}`; font `--font-sans`; type `--text-{hero,contact,work-intro,card-title,work-title,card-body,lead,lead-soft,logo}`; layout `--maxw:1320px`, `--navh:62px`.
- **German UI text.** All copy in German, taken from the demo.
- **Forbidden:** do NOT add UnoCSS or @vueuse/motion; do NOT build an absolute-positioned "stacked-section/useSectionLayers" system. Use CSS `position: sticky` per the demo.
- **SSR-safe (SSG):** no `window`/`document`/`new Date()` time-of-day at module top level or in SSR render output that differs from client. Time-based greeting and "now" values render neutral/build-time on server, finalize in `onMounted`.
- **Reduced-motion:** every animation (reveal, hero entrance, matrix-fill, marquee, scroll-cue) must be neutralized under `@media (prefers-reduced-motion: reduce)`.
- **Truthfulness:** client marquee brands and the 4 work cases are PLACEHOLDERS. Keep them on-page (visual parity) but mark client marquee `aria-hidden`; do NOT assert clients or case metrics as facts in Schema.org or `llms.txt`.
- **Nuxt auto-imports:** components (nested dirs flatten by filename — names must be globally unique), composables, Vue APIs, and @nuxtjs/seo/schema-org helpers. Do not add manual imports for these.
- **Commit** after each task. No `.nuxt/`/`.output/` committed (already gitignored).
- **Logo dependency:** real `public/brand/logo.svg` is user-supplied (may be absent during build). `AppLogo` must render a temporary Archivo wordmark fallback so the build never blocks.

---

### Task 1: Design tokens + global CSS layer

**Files:**
- Modify (overwrite): `app/assets/css/main.css`

**Interfaces:**
- Produces: Tailwind utilities for all token names above; global `.wrap`, `.content`, `.reveal/.reveal.in`; global reduced-motion base. Later tasks rely on these class/token names.

- [ ] **Step 1: Overwrite `app/assets/css/main.css`**

```css
@import "tailwindcss";

@theme {
  --font-sans: "Archivo", system-ui, -apple-system, "Segoe UI", sans-serif;

  --color-bg: #FFFFFF;
  --color-card: #FFFFFF;
  --color-ink: #17181B;
  --color-ink-soft: #4C4E52;
  --color-grey: #94999C;
  --color-grey-strong: #6B7074;
  --color-grey-soft: #C7C9CB;
  --color-orange: #F59A18;
  --color-line: #E6E7E8;
  --color-tile: #F4F4F5;
  --color-dot: #ECEDEE;
  --color-dot-mini: #DFE0E1;

  --text-hero: clamp(38px, 6.6vw, 112px);
  --text-contact: clamp(46px, 9vw, 150px);
  --text-work-intro: clamp(30px, 5.4vw, 80px);
  --text-card-title: clamp(32px, 5.2vw, 76px);
  --text-work-title: clamp(26px, 3.6vw, 54px);
  --text-card-body: clamp(17px, 1.7vw, 26px);
  --text-lead: clamp(18px, 1.7vw, 25px);
  --text-lead-soft: clamp(15px, 1.3vw, 18px);
  --text-logo: clamp(18px, 1.9vw, 25px);
}

:root {
  --maxw: 1320px;
  --navh: 62px;
}

@layer base {
  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }
  body {
    font-family: var(--font-sans);
    background: var(--color-bg);
    color: var(--color-ink);
    letter-spacing: -0.01em;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  ::selection { background: var(--color-orange); color: #fff; }
}

@utility wrap {
  max-width: var(--maxw);
  margin-inline: auto;
  padding-inline: clamp(20px, 4vw, 56px);
}

@utility content-panel {
  position: relative;
  z-index: 2;
  background: var(--color-bg);
  box-shadow: 0 -24px 70px rgba(20, 22, 26, 0.10);
}

.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.reveal.in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 0.001ms !important; }
  .reveal { opacity: 1; transform: none; }
}
```

Note: Tailwind v4 `@utility` defines custom utilities (`wrap`, `content-panel`). Preflight covers the `*` reset — do not re-add it.

- [ ] **Step 2: Regenerate types**

Run: `npx nuxt prepare`
Expected: success, no errors.

- [ ] **Step 3: Smoke-test tokens in dev**

Temporarily verify by checking the generated utilities exist — run a build of CSS via dev. Run: `npm run dev` (background), then `curl -s http://localhost:3000/ >/dev/null` to trigger compile; confirm dev log has no Tailwind errors; stop dev. (No file change.)

- [ ] **Step 4: Commit**

```bash
git add app/assets/css/main.css
git commit -m "feat(design): add brand design tokens and global CSS layer"
```

---

### Task 2: Switch font to Archivo

**Files:**
- Modify: `nuxt.config.ts` (the `fonts` block)

**Interfaces:**
- Consumes: `--font-sans` points to "Archivo" (Task 1).
- Produces: self-hosted Archivo (weights 400,500,600,700,800).

- [ ] **Step 1: Replace the `fonts` block in `nuxt.config.ts`**

```ts
  fonts: {
    defaults: {
      preload: true,
      display: 'swap',
      weights: [400, 500, 600, 700, 800],
    },
    families: [
      { name: 'Archivo', provider: 'google', weights: [400, 500, 600, 700, 800], styles: ['normal'], global: true },
    ],
  },
```

- [ ] **Step 2: Prepare + dev compile**

Run: `npx nuxt prepare` (expect success). Then `npm run dev` background, `curl -s http://localhost:3000/ | grep -io 'archivo' | head -1` → expect `archivo` (font CSS injected). Stop dev.

- [ ] **Step 3: Commit**

```bash
git add nuxt.config.ts
git commit -m "feat(design): self-host Archivo font via @nuxt/fonts"
```

---

### Task 3: Typed content data

**Files:**
- Create: `app/data/types.ts`, `app/data/site.ts`, `app/data/services.ts`, `app/data/works.ts`, `app/data/clients.ts`

**Interfaces:**
- Produces (exact types — later tasks import from `~/data/types`):
  - `Service { id: string; title: string; body: string; tags: string[]; matrix: { cols: number; rows: number; onIndex: number } }`
  - `Work { id: string; eyebrow: string; title: string; description: string; year: number; meta: string[]; href: string; mini: { cols: number; rows: number; onIndex: number } }`
  - `ClientMark = 'ringo'|'veltra'|'nordwerk'|'paytide'|'orbion'|'helixa'|'klinverio'|'statera'`
  - `Client { name: string; mark: ClientMark }`
  - `NavLink { href: string; label: string }`
  - `SiteContent { email: string; location: string; navLinks: NavLink[]; hero: { lead: string; faded: string; sub: string }; lead: { primaryHtml: string; secondary: string } }`

- [ ] **Step 1: Create `app/data/types.ts`** with the interfaces above (export each).

- [ ] **Step 2: Create `app/data/site.ts`** — `export const site: SiteContent` using demo copy:
  - email `'hello@mediamundis.de'`, location `'Rheinland · remote überall'`
  - navLinks `[{href:'#leistungen',label:'Leistungen'},{href:'#work',label:'Work'}]`
  - hero.lead `'Schlank, schnell und kompromisslos bei Qualität — mediamundis baut Software für Unternehmen, die den '`, hero.faded `'Maßstab setzen.'`, hero.sub `'Die Software-Manufaktur mit echtem Anspruch.'`
  - lead.primaryHtml (demo line 208, keep the inline `<a href="#work">`/`<a href="#leistungen">` links verbatim), lead.secondary (demo line 209).

- [ ] **Step 3: Create `app/data/services.ts`** — `export const services: Service[]` with the 3 demo services (Software Development / Consulting / Artificial Intelligence), bodies + tags from demo lines 220-259. `matrix` for all: `{ cols: 11, rows: 8, onIndex: 57 }` (demo JS: `Math.floor(88*0.62)+3 = 57`).

- [ ] **Step 4: Create `app/data/works.ts`** — `export const works: Work[]` with the 4 demo cases (lines 272-310). `mini.onIndex` per index: `[5, 9, 14, 18]` (works[0]=5, [1]=9, [2]=14, [3]=18), `mini` cols 6 rows 4, `href:'#kontakt'`. Split meta e.g. `['Plattform','Betrieb']`.

- [ ] **Step 5: Create `app/data/clients.ts`** — `export const clients: Client[]` with the 8 demo placeholder names+marks (demo lines 362-365): Nordwerk/nordwerk, Veltra/veltra, Klinverio/klinverio, Paytide/paytide, Orbion/orbion, Helixa/helixa, Statera/statera, Ringo/ringo.

- [ ] **Step 6: Verify + commit**

Run: `npx nuxt prepare` (types compile). Then:
```bash
git add app/data/
git commit -m "feat(design): add typed content data (services, works, clients, site)"
```

---

### Task 4: Composables (behaviors)

**Files:**
- Create: `app/composables/useScrolled.ts`, `app/composables/useReveal.ts`, `app/composables/useGreeting.ts`, `app/composables/useCurrentYear.ts`, `app/composables/useReducedMotion.ts`

**Interfaces:**
- Produces:
  - `useScrolled(threshold = 30): ComputedRef<boolean>`
  - `useReveal(threshold = 0.18): { el: Ref<HTMLElement|null>; shown: Ref<boolean> }`
  - `useGreeting(): Ref<string>` (empty on SSR/first paint)
  - `useCurrentYear(): Ref<number>`
  - `useReducedMotion(): Ref<boolean>` (wraps `useMediaQuery('(prefers-reduced-motion: reduce)')`)

- [ ] **Step 1: `useScrolled.ts`**

```ts
import { useWindowScroll } from '@vueuse/core';

export function useScrolled(threshold = 30) {
  const { y } = useWindowScroll();
  return computed(() => y.value > threshold);
}
```

- [ ] **Step 2: `useReveal.ts`**

```ts
import { useIntersectionObserver } from '@vueuse/core';

export function useReveal(threshold = 0.18) {
  const el = ref<HTMLElement | null>(null);
  const shown = ref(false);
  const { stop } = useIntersectionObserver(
    el,
    ([entry]) => {
      if (entry?.isIntersecting) { shown.value = true; stop(); }
    },
    { threshold },
  );
  return { el, shown };
}
```

- [ ] **Step 3: `useGreeting.ts`** (SSR-safe — empty on server + first paint)

```ts
export function useGreeting() {
  const greeting = ref('');
  onMounted(() => {
    const h = new Date().getHours();
    greeting.value = h < 11 ? 'Guten Morgen!' : h < 18 ? 'Guten Tag!' : 'Guten Abend!';
  });
  return greeting;
}
```

- [ ] **Step 4: `useCurrentYear.ts`**

```ts
export function useCurrentYear() {
  const year = ref(new Date().getFullYear());
  onMounted(() => { year.value = new Date().getFullYear(); });
  return year;
}
```

- [ ] **Step 5: `useReducedMotion.ts`**

```ts
import { useMediaQuery } from '@vueuse/core';

export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
```

- [ ] **Step 6: Verify + commit**

Run: `npx nuxt prepare` && `npm run lint` (expect exit 0). Then:
```bash
git add app/composables/
git commit -m "feat(design): add SSR-safe behavior composables (scroll, reveal, greeting, year, reduced-motion)"
```

---

### Task 5: Atom components

**Files:**
- Create under `app/components/atoms/`: `IconArrow.vue`, `BaseTag.vue`, `BasePill.vue`, `ArrowButton.vue`, `SectionLabel.vue`, `ScrollCue.vue`, `DotMatrix.vue`, `NavGreeting.vue`, `AppLogo.vue`

**Interfaces:**
- Consumes: `useGreeting` (Task 4), tokens (Task 1).
- Produces (props):
  - `IconArrow { variant?: 'diag' | 'right' }` — diag path `M7 17 17 7M9 7h8v8`, right path `M5 12h14M13 6l6 6-6 6`; root `<svg aria-hidden="true">` with demo stroke attrs.
  - `BaseTag` — default slot or `{ label?: string }`; styles `.tag` (demo line 101) using `border-line`, `text-ink-soft`.
  - `BasePill { to: string; label: string }` — renders `<a :href="to">`; dark→orange hover + translateY(-1px) (demo lines 42-46); contains `IconArrow variant="diag"` + label.
  - `ArrowButton { to: string; ariaLabel: string }` — circular `<a>`, hover via parent `.group` → orange + rotate 45° (demo lines 92-96); contains `IconArrow`.
  - `SectionLabel { title: string }` — `<div class="seclabel"><h2>{{title}}</h2><span class="bar"/></div>` (demo lines 78-80); uses `text-grey-strong` for the h2.
  - `ScrollCue` — demo lines 60-65 incl. `@keyframes drop` (scoped).
  - `DotMatrix { cols: number; rows: number; onIndex: number; variant?: 'matrix' | 'mini'; fill?: number }` — renders `cols*rows` `<i>` dots in a CSS grid; the dot at `onIndex` is orange; `aria-hidden="true"`. `fill` (0..N, default 0) is consumed in Task 9b — for now render only the single `onIndex` orange dot. Grid styles from demo `.matrix`/`.mini` (lines 102-104, 127-129).
  - `NavGreeting` — renders `useGreeting()` inside a span with reserved min-width to avoid CLS (e.g. `min-width: 9ch`), `text-ink-soft`.
  - `AppLogo` — `<a href="#top" aria-label="mediamundis – Startseite">` rendering `<img src="/brand/logo.svg" alt="mediamundis" height="24">`. If you cannot guarantee the file exists, render an inline Archivo wordmark `<span class="font-sans font-extrabold tracking-tight">mediamundis</span>` as fallback styled to ~24px; prefer the img when `/brand/logo.svg` is present. Keep KISS: render the wordmark fallback now (logo.svg added later by user) but structure so swapping to `<img>` is trivial.

- [ ] **Step 1–9:** Create each component, porting the exact CSS from the referenced demo lines into scoped `<style>` where bespoke (drop keyframe, arrow rotate, tag borders), using utilities where clean. Use token utilities (`bg-ink`, `text-orange`, `border-line`, etc.).

- [ ] **Step 10: Verify each renders** — add them temporarily to `app/pages/index.vue` OR rely on Task 8 wiring; minimally run `npx nuxt prepare` and `npm run lint` (exit 0). Confirm `DotMatrix` with `cols=11 rows=8 onIndex=57` renders 88 dots with exactly one orange, server-side (will be checked in generate later).

- [ ] **Step 11: Commit**

```bash
git add app/components/atoms/
git commit -m "feat(design): add atom components (icons, pill, arrow-button, tag, dot-matrix, section-label, scroll-cue, greeting, logo)"
```

---

### Task 6: Molecule components

**Files:**
- Create under `app/components/molecules/`: `NavLinks.vue`, `ServiceCard.vue`, `WorkRow.vue`, `ClientLogo.vue`

**Interfaces:**
- Consumes: atoms (Task 5), types + data (Task 3).
- Produces (props):
  - `NavLinks { links: NavLink[] }` — demo lines 36-40 (underline-grow hover, `text-ink-soft`→`text-ink`).
  - `ServiceCard { service: Service; index: number }` — demo `article.card` (lines 218-231): `.group` wrapper enabling `ArrowButton` hover; `card-top` (h3 `text-card-title` + `ArrowButton to="#kontakt" ariaLabel="Anfragen"`), `.card-rule`, `.card-body` (paragraph `text-card-body` + `BaseTag` list, and `DotMatrix` from `service.matrix`). Sticky offsets handled by parent (Task 7) — the card itself is `position: sticky` with its `top` set via `index` (see Task 7). Scoped styles from demo lines 82-104.
  - `WorkRow { work: Work }` — demo `a.work-row` (lines 272-280): eyebrow (`text-grey-strong`), h3 (`text-work-title`) with `IconArrow variant="diag"` `.ar` (fade+translate on hover), description, meta (year bold), `.work-thumb` with `DotMatrix variant="mini"` from `work.mini`. Hover: row title translateX(8px), arrow appear, thumb border-orange + lift. Scoped styles demo lines 111-137.
  - `ClientLogo { client: Client }` — demo `.logo-item` (lines 149-152). Hold the 8 SVG marks as a static `Record<ClientMark, string>` (copy from demo lines 353-360); render the matching mark via `v-html` (trusted static) wrapped in `aria-hidden="true"`, plus the name span (`text-logo`). `color: var(--color-grey-soft)` → `var(--color-ink)` on hover.

- [ ] **Step 1–4:** Create each, porting demo CSS into scoped styles, using atoms + tokens.

- [ ] **Step 5: Add `:focus-visible` ring** (`outline: 2px solid var(--color-orange); outline-offset: 2px`) to the anchor in `WorkRow` (and ensure `NavLinks` anchors get it). (a11y optimization)

- [ ] **Step 6: Verify + commit**

Run: `npx nuxt prepare` && `npm run lint`. Then:
```bash
git add app/components/molecules/
git commit -m "feat(design): add molecule components (nav-links, service-card, work-row, client-logo)"
```

---

### Task 7: Organism components

**Files:**
- Create under `app/components/organisms/`: `SiteHeader.vue`, `HeroSection.vue`, `LeadSection.vue`, `ServicesSection.vue`, `WorkSection.vue`, `ClientsMarquee.vue`, `ContactSection.vue`, `SiteFooter.vue`

**Interfaces:**
- Consumes: atoms + molecules, data, `useScrolled`, `useReveal`, `useCurrentYear`.
- Produces: full page sections.
  - `SiteHeader` — fixed `<nav id="nav">` (demo lines 26-47, 181-191): `AppLogo`, `.sub-note` (orange dot + "Software · Consulting · AI"), spacer, `NavLinks :links="site.navLinks"`, `NavGreeting`, `BasePill to="#kontakt" label="Kontakt"`. Bind `.scrolled` class from `useScrolled()` (blur bg). Scoped nav styles + `:focus-visible` on links.
  - `HeroSection` — `<header class="hero" id="top">` (demo lines 49-65, 193-200): `.dotgrid`, `.hero-center wrap` with `<h1>` (`text-hero`) where the faded part is `<span class="fade">{{ site.hero.faded }}</span>`, `.hero-sub`, `ScrollCue`. Hero entrance animation added in Task 9a. Scoped styles incl. dotgrid mask + reduced-motion static hero (demo lines 170-176).
  - `LeadSection` — `<section class="lead wrap">` (demo lines 70-76, 204-212) using `site.lead` (render `primaryHtml` with `v-html`). Inline links use `border-ink`→`border-orange`/`text-orange` hover.
  - `ServicesSection` — `<div class="wrap" id="leistungen">` with `SectionLabel title="Leistungen"` (wrapped in a `useReveal` element) and `.stack` v-for `ServiceCard :service :index`. Provide the staggered sticky offsets here (demo lines 84-89): card index 0 `top: calc(var(--navh) + 16px)`, 1 `+40px`, 2 `+64px`, with mobile override (demo line 108). Apply offsets via a scoped rule on `.stack > :nth-child(n)` or pass `index` to the card and set `style="top: ..."`.
  - `WorkSection` — `<div class="wrap" id="work">` (demo lines 266-318): `SectionLabel title="Work"`, `.work-intro` ("Etwas Schweiß, viel Code und <span class="g">zufriedene Kunden.</span>"), `.work-list` v-for `WorkRow :work`, then `ClientsMarquee`. Apply `.reveal` (via `useReveal`) to seclabel, work-intro, each row.
  - `ClientsMarquee` — `.clients` + `.marquee` (demo lines 139-152, 314-317): label "Vertrauen von", a `.marquee-track` rendering `clients` TWICE (second copy `aria-hidden="true"`) for seamless loop; `@keyframes scroll{to{transform:translateX(-50%)}}`, pause on hover, edge mask; reduced-motion stops animation. Container `aria-hidden="true"` is acceptable (decorative placeholders).
  - `ContactSection` — `<section class="wrap contact" id="kontakt">` (demo lines 154-166, 320-332): `<h2>` `text-contact` ("Lass uns etwas<br><span class="g">bauen.</span>"), `.row` with `.mail` (mailto, orange underline, gap-grows-on-hover) + `BasePill to="mailto:hello@mediamundis.de" label="Projekt anfragen"`, then `<SiteFooter/>`.
  - `SiteFooter` — `<footer>` (demo lines 163-166, 328-331): "© {{ year }} mediamundis · Software Development & Consulting" using `useCurrentYear()`, and "Rheinland · remote überall". `text-grey-strong`.

- [ ] **Step 1–8:** Create each organism, porting demo CSS into scoped styles. Use `useReveal` by binding `:ref="el"` and `:class="{ in: shown }"` on `.reveal` elements (one `useReveal()` per revealed element, or a small v-for pattern — keep KISS).

- [ ] **Step 9: Verify + commit**

Run: `npx nuxt prepare` && `npm run lint`. Then:
```bash
git add app/components/organisms/
git commit -m "feat(design): add organism sections (header, hero, lead, services, work, marquee, contact, footer)"
```

---

### Task 8: Layout + page wiring

**Files:**
- Modify (overwrite): `app/layouts/default.vue`, `app/pages/index.vue`

**Interfaces:**
- Consumes: all organisms.

- [ ] **Step 1: `app/layouts/default.vue`**

```vue
<template>
  <SiteHeader />
  <slot />
</template>
```

- [ ] **Step 2: `app/pages/index.vue`**

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Software Development, Consulting & AI',
  description:
    'mediamundis baut schlanke, schnelle Software für Mittelstand, Startups und Konzerne — Development, Consulting und KI in Produktion. Im Rheinland zuhause, remote überall.',
});
</script>

<template>
  <HeroSection />
  <main class="content-panel">
    <LeadSection />
    <ServicesSection />
    <WorkSection />
    <ContactSection />
  </main>
</template>
```

- [ ] **Step 3: Visual verification**

Run: `npm run dev` (background). Load `http://localhost:3000/`. Confirm: nav fixed + blurs after 30px scroll; hero pins full-viewport with dotgrid; content panel slides over hero with top shadow; 3 service cards stack with staggered tops; work rows hover (translate + thumb orange); marquee loops + pauses on hover; contact mail gap grows. Compare side-by-side with `docs/demo.html`. Stop dev.

- [ ] **Step 4: Build + commit**

Run: `npx nuxt prepare` && `npm run lint` && `npm run generate` (all succeed). Then:
```bash
git add app/layouts/default.vue app/pages/index.vue
git commit -m "feat(design): wire layout and homepage from organisms"
```

---

### Task 9: AHA animations

**Files:**
- Modify: `app/components/organisms/HeroSection.vue` (entrance), `app/components/molecules/ServiceCard.vue` + `app/components/atoms/DotMatrix.vue` (matrix fill), possibly a new `app/composables/usePinProgress.ts`

**Interfaces:**
- Consumes: `useReducedMotion` (Task 4), `useElementBounding`/`useRafFn` from @vueuse/core, `DotMatrix` `fill` prop (Task 5).

**9a — Hero entrance + one-time gradient sweep (CSS-only):**

- [ ] **Step 1:** In `HeroSection.vue` scoped style, add `@keyframes heroRise { from { opacity:0; transform: translateY(24px) } to { opacity:1; transform:none } }` applied to `.hero-center > h1` and `.hero-center > .hero-sub` with staggered `animation-delay` (h1 0ms, sub 120ms), `animation-fill-mode: both`, duration ~0.8s, ease `cubic-bezier(.2,.7,.2,1)`.
- [ ] **Step 2:** On `.fade` span, set `background-size: 200% 100%` on the existing gradient and add a one-time `@keyframes sweep { from { background-position: 120% 0 } to { background-position: 0 0 } }` (~1.1s, `fill-mode: both`, delay ~200ms) so the orange→ink gradient sweeps once on load. Keep final state = demo's static clipped gradient.
- [ ] **Step 3:** Under `@media (prefers-reduced-motion: reduce)`: set both animations to `none` and `.hero-center > *` to final state. (Global rule already neutralizes; add explicit final state for `.fade`.)

**9b — Scroll-driven dot-matrix fill (JS via VueUse, reduced-motion-guarded):**

- [ ] **Step 4:** Create `app/composables/usePinProgress.ts`:

```ts
import { useElementBounding } from '@vueuse/core';

// progress 0..1 as the element pins under the nav and scrolls through the viewport
export function usePinProgress(el: Ref<HTMLElement | null>) {
  const { top, height } = useElementBounding(el);
  return computed(() => {
    const vh = typeof window === 'undefined' ? 0 : window.innerHeight;
    if (!vh || !height.value) return 0;
    const p = (vh - top.value) / (vh + height.value);
    return Math.min(1, Math.max(0, p));
  });
}
```

- [ ] **Step 5:** In `ServiceCard.vue`: get a `ref` on the card root, `const progress = usePinProgress(cardRef)`, `const reduced = useReducedMotion()`. Compute `fill = reduced.value ? 0 : Math.round(progress.value * service.matrix.cols * service.matrix.rows)`. Pass `:fill="fill"` to `DotMatrix`.
- [ ] **Step 6:** In `DotMatrix.vue`: when `fill > 0`, light the first `fill` dots (in addition to the permanent `onIndex` orange dot) by fading them toward orange at reduced opacity (e.g. dot active → `background: color-mix(in srgb, var(--color-orange) 55%, var(--color-dot))`). Keep the `onIndex` dot full orange. When `fill === 0`, behave exactly like the demo (single orange dot). Guard so SSR renders `fill=0`.
- [ ] **Step 7: Verify** — `npm run dev`, scroll services: matrices fill with orange as each card pins; toggle OS reduce-motion → matrices static (single dot), hero static. Confirm no console errors / hydration warnings.
- [ ] **Step 8: Commit**

```bash
git add app/components/ app/composables/usePinProgress.ts
git commit -m "feat(design): add hero entrance + scroll-driven matrix-fill animations (reduced-motion safe)"
```

---

### Task 10: SEO/GEO content + Schema.org

**Files:**
- Modify: `app/app.vue`; Create/overwrite: `public/llms.txt`

**Interfaces:**
- Consumes: schema-org helpers (auto-imported).

- [ ] **Step 1: Update `app/app.vue`** `useSeoMeta` description to the real one (same as index `description` or a site-level variant) and enrich `useSchemaOrg`:

```ts
useSchemaOrg([
  defineOrganization({
    name: 'mediamundis',
    url: 'https://www.mediamundis.de',
    logo: 'https://www.mediamundis.de/brand/logo.svg',
    email: 'hello@mediamundis.de',
    areaServed: 'Rheinland',
    knowsAbout: ['Software Development', 'Consulting', 'Artificial Intelligence'],
  }),
  defineWebSite({ name: 'mediamundis' }),
  defineWebPage(),
]);
```

(Keep `defineOrganization`'s `contactPoint` only if the installed schema-org version supports it inline; otherwise `email` on the org is sufficient. Do NOT add placeholder clients/cases.)

- [ ] **Step 2: Overwrite `public/llms.txt`** with the real offering (services + contact), marking work cases / clients as placeholders and WITHOUT asserting case metrics as facts:

```text
# mediamundis

> Software-Manufaktur aus dem Rheinland — schlanke, schnelle Software für
> Unternehmen, die den Maßstab setzen. Development, Consulting, KI in Produktion.

## Leistungen
- Software Development: von Architektur bis Betrieb — Web & API, Cloud-native, CI/CD, Plattformen.
- Consulting: Architektur-Reviews, Tech-Due-Diligence, Team-Enablement.
- Artificial Intelligence: LLM & RAG, Automatisierung, Evaluation, Guardrails.

## Kontakt
- E-Mail: hello@mediamundis.de — Rheinland · remote überall.

## Hinweise
- Sprache: Deutsch.
- Die im "Work"- und "Vertrauen von"-Bereich gezeigten Projekte und Marken sind
  derzeit Platzhalter und werden durch echte Referenzen ersetzt.
```

- [ ] **Step 3: Verify + commit**

Run: `npm run generate`; then check `.output/public/index.html` contains the new description + `application/ld+json` with `knowsAbout`; `.output/public/llms.txt` is the new content. Then:
```bash
git add app/app.vue public/llms.txt
git commit -m "feat(design): real SEO meta, Schema.org enrichment, and llms.txt"
```

---

### Task 11: A11y polish + final verification

**Files:**
- Modify: any component needing `:focus-visible`, `aria-hidden`, or grey-contrast fixes found during audit.

**Interfaces:** none new.

- [ ] **Step 1: Focus rings** — ensure `:focus-visible { outline: 2px solid var(--color-orange); outline-offset: 2px }` on: `NavLinks` anchors, `BasePill`, `ArrowButton`, `WorkRow` anchor, `.mail`, `AppLogo`.
- [ ] **Step 2: aria-hidden** — confirm decorative SVGs (`IconArrow` in cards/work, dotgrid, scroll-cue), all `DotMatrix`, and the duplicated marquee set are `aria-hidden`. Confirm `AppLogo` img `alt="mediamundis"` + link aria-label; `ArrowButton` has `aria-label`.
- [ ] **Step 3: Grey contrast** — confirm small text (eyebrows, meta, footer, seclabel) uses `text-grey-strong` (not `text-grey`). Large/decorative `.g` spans may keep `text-grey`.
- [ ] **Step 4: Heading audit** — exactly one `<h1>` (hero); section labels `<h2>`; card/work titles `<h3>`; contact `<h2>`.
- [ ] **Step 5: Full verification run**
  - `npx nuxt prepare` → success
  - `npm run lint` → exit 0
  - `npm run generate` → success
  - `.output/public`: `index.html` has real meta + JSON-LD; `llms.txt` new; Archivo woff2 present; NO `fonts.googleapis.com`; dot `<i>` elements present in SSR HTML; greeting span empty in SSR markup
  - git hygiene: `git ls-files | grep -E '^(\.nuxt|\.output)/'` → empty
- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(design): accessibility polish (focus-visible, aria-hidden, contrast, headings)"
```

---

## Self-Review

**Spec coverage:** tokens (T1) · Archivo (T2) · data (T3) · composables/SSR-safety (T4) · atoms incl. DotMatrix/logo-fallback (T5) · molecules (T6) · organisms incl. marquee/sticky offsets (T7) · wiring + content panel + sticky (T8) · both AHA animations + reduced-motion (T9) · SEO/GEO truthful (T10) · a11y/contrast/focus + final verify (T11). All plan §§ map to a task. ✓

**Placeholder scan:** all code steps show concrete code or exact demo line refs; no TBD/TODO. Copy/CSS values are sourced from `docs/demo.html` (in-repo, DRY) rather than re-transcribed wholesale. ✓

**Type consistency:** `Service`/`Work`/`Client`/`NavLink`/`SiteContent` defined in T3 and consumed unchanged in T5–T7; `DotMatrix` props (`cols,rows,onIndex,variant,fill`) consistent T5/T6/T9; composable signatures consistent T4/T9. ✓

**Risk:** schema-org `contactPoint`/`email`/`knowsAbout`/`areaServed` field names depend on installed `nuxt-schema-org` v6 — if a field is unsupported, `nuxt prepare`/generate will surface it in T10; adjust to supported fields then. Visual parity (T8) is the main judgment gate and benefits from a human/screenshot check.
