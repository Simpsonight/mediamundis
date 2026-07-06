# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/landing site for **mediamundis** (person-brand of Simon Kemmerling, framed as a firm), built with Nuxt 4 + Vue 3. German-language content. Statically prerendered (SSG), SEO- and GEO-optimized. The landing page and its design system are implemented (ported from `docs/demo.html`); remaining work is placeholder content (real cases/clients, legal text, profile URLs) and visual sign-off.

## Commands

```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # production build
npm run generate   # static prerender → .output/public
npm run preview    # preview the production build
npm run lint       # eslint (flat config)
npx nuxt prepare   # regenerate .nuxt types
```

There is no unit-test framework; verify via `npm run lint` + `npm run generate` and inspecting output/dev server.

## Stack

- **Nuxt 4** (`app/` is the source root — Nuxt 4 nests app code under `app/`).
- **Tailwind CSS v4** via `@tailwindcss/vite` (registered as a Vite plugin in `nuxt.config.ts`). No `tailwind.config.js`; the whole design system is CSS-first in `app/assets/css/main.css`.
- **@nuxtjs/seo** — meta-module bundling robots, sitemap, link-checker, og-image, schema.org, seo-utils, site-config. Central `site` config lives in `nuxt.config.ts`. `@takumi-rs/core` is the og-image render backend.
- **@nuxt/image** — responsive/optimized images.
- **@nuxt/fonts** — **Archivo** (Google provider, weights 400–800), preloaded, `display: swap`.
- **@nuxt/eslint** — flat-config linting (`eslint.config.mjs` extends `.nuxt/eslint.config.mjs`).
- **@vueuse/core** — backs all interaction/motion composables.

## Architecture

- **`app/app.vue`** wraps `<NuxtLayout><NuxtPage/></NuxtLayout>`, sets global SEO defaults (`useSeoMeta`) and Schema.org identity (`useSchemaOrg` with `defineOrganization`).
- **`app/layouts/default.vue`** provides the semantic `<header>/<main>/<footer>` shell (SiteHeader, MenuOverlay, SiteFooter).
- **`app/pages/index.vue`** composes the landing page from organism sections (Hero, Lead, Services, Engagement, Work, Contact). `impressum.vue`/`datenschutz.vue` render via the `LegalPage` organism and are `noindex`.
- **SSG**: `nuxt generate` with `nitro.prerender.crawlLinks: true` (seeded from `/`). Output in `.output/public` (symlinked as `dist/`).
- **GEO**: `public/llms.txt`, Schema.org JSON-LD, and a `robots` group in `nuxt.config.ts` that explicitly allows AI crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended).

### Components — atomic design

`app/components/` is split into `atoms/`, `molecules/`, `organisms/`. `pathPrefix: false` means components are used by **bare name** regardless of folder (`<HeroSection/>`, not `<OrganismsHeroSection/>`). Keep new components in the right tier; page-level composition happens in `pages/` and organisms.

### Content as data

**All copy and structured content lives in `app/data/*.ts`**, typed by `app/data/types.ts` — components render data, they do not hardcode German text. `site.ts` holds shared identity/nav/hero/lead; `services.ts`, `engagements.ts`, `works.ts`, `clients.ts` hold section content. To change wording or add a card/row, edit the data file, not the component. Content workflow: draft prose in `docs/website-texte.md`, get sign-off, then encode into `app/data/`.

### Motion & interaction composables

`app/composables/` are thin @vueuse wrappers, all **SSR-safe** and **reduced-motion aware**:
- `useReveal` — IntersectionObserver → toggles the `.reveal`/`.in` CSS transition on scroll-in.
- `usePinProgress` — 0..1 scroll progress of an element through the viewport (returns 0 on server).
- `useMagnetic` — pointer-follow translate; no-op on coarse pointer / reduced-motion.
- `useMenu` — module-level singleton ref for the full-screen overlay open state (no props/emits).
- `useScrolled`, `useReducedMotion`, `useCurrentYear`.

Prefer extending these over adding a motion library. Do **not** reintroduce UnoCSS or @vueuse/motion (removed in the rebuild); motion is hand-rolled CSS + these composables.

### Design system (`app/assets/css/main.css`)

- `@theme` defines all tokens: brand colors (`--color-ink`, `--color-orange`, greys, tile/dot surfaces), fluid `clamp()` type scale (`--text-hero`, `--text-contact`, …), fluid spacing scale (`--space-*`), and `--ease-brand`. Reuse tokens instead of hardcoding values.
- `@utility wrap` (max-width + gutter container) and `@utility content-panel` (the raised white panel over the hero) are the main layout primitives.
- `.reveal`/`.reveal.in` is the scroll-in transition (paired with `useReveal`); a `prefers-reduced-motion` block neutralizes all animation.

## Conventions

- Nuxt auto-imports composables, Vue APIs, components, and `@nuxtjs/seo`/schema.org helpers — do not add manual imports for these.
- `~` resolves to the `app/` srcDir. Use `~/composables/…`, `~/data/…` for explicit type imports; components need no import (auto-imported by bare name).
- UI text is German, tone is serious/professional first-person ("ich"), never "Ich bin Simon".
- Never commit `.nuxt/` or `.output/` (gitignored).

## Adding a section/page

1. Add/extend the content in `app/data/` (with a type in `types.ts`).
2. Create the component under the right atomic tier in `app/components/`.
3. Render it in `pages/index.vue` (or a new route) and add per-page `useSeoMeta`.
4. If a new route isn't crawl-reachable from `/`, add it to `nitro.prerender.routes`.
