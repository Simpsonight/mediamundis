# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/landing site for **mediamundis**, built with Nuxt 4 + Vue 3. German-language content. Statically prerendered (SSG), SEO- and GEO-optimized. Content/visual design are defined in a separate concept phase; the current state is the base architecture/scaffold.

## Commands

```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # production build
npm run generate   # static prerender → .output/public
npm run preview    # preview the production build
npm run lint       # eslint (flat config)
npx nuxt prepare   # regenerate .nuxt types
```

There is no unit-test framework; verification is via build/run/output checks.

## Stack

- **Nuxt 4** (`app/` is the source root — Nuxt 4 nests app code under `app/`).
- **Tailwind CSS v4** via `@tailwindcss/vite` (registered as a Vite plugin in `nuxt.config.ts`). No `tailwind.config.js`; design tokens are CSS-first in `app/assets/css/main.css` via `@theme`.
- **@nuxtjs/seo** — meta-module bundling robots, sitemap, link-checker, og-image, schema.org, seo-utils, site-config. Central `site` config lives in `nuxt.config.ts`.
- **@nuxt/image** — responsive/optimized images.
- **@nuxt/fonts** — self-hosted fonts (Inter; provisional, finalize in concept phase).
- **@nuxt/eslint** — flat-config linting (`eslint.config.mjs` extends `.nuxt/eslint.config.mjs`).
- **@vueuse/core** — utility composables.

## Architecture

- **`app/app.vue`** wraps `<NuxtLayout><NuxtPage/></NuxtLayout>`, sets global SEO defaults (`useSeoMeta`) and Schema.org identity (`useSchemaOrg` with `defineOrganization`).
- **`app/layouts/default.vue`** provides the semantic `<header>/<main>/<footer>` shell.
- **`app/pages/index.vue`** is the entry page with per-page `useSeoMeta`.
- **SSG**: `nuxt generate` with `nitro.prerender.crawlLinks`. Output in `.output/public`.
- **GEO**: `public/llms.txt`, Schema.org JSON-LD, AI-crawler-friendly `robots` config.

## Conventions

- Nuxt auto-imports composables, Vue APIs, components, and `@nuxtjs/seo`/schema.org helpers — do not add manual imports for these.
- `~` resolves to the `app/` srcDir. Use `~/composables/…`, `~/data/…` for explicit imports; components are auto-imported by bare name (`pathPrefix: false`) — no import path needed.
- UI text is German.
- Never commit `.nuxt/` or `.output/` (gitignored).
- Do not reintroduce UnoCSS or @vueuse/motion (removed in the rebuild).

## Adding a section/page

Create a component under `app/components/` (or a route under `app/pages/`), render it, and add per-page `useSeoMeta`. Add new routes to `nitro.prerender.routes` if they are not crawl-reachable.
