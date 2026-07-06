# mediamundis

Marketing and landing page for **mediamundis** - the personal brand of Simon Kemmerling (Senior Fullstack Developer & Solution Architect), framed as a firm. German-language, statically prerendered (SSG), SEO- and GEO-optimized.

## Stack

- **Nuxt 4** + **Vue 3** (source under `app/`)
- **Tailwind CSS v4** - CSS-first via `@tailwindcss/vite`, no `tailwind.config.js`
- **@nuxtjs/seo** - robots, sitemap, OG image, Schema.org, site config
- **@nuxt/image**, **@nuxt/fonts** (Archivo), **@nuxt/eslint**, **@vueuse/core**

## Setup

```bash
npm install
```

## Development

```bash
npm run dev        # dev server at http://localhost:3000
npm run lint       # ESLint (flat config)
```

## Build & Prerender

```bash
npm run build      # production build
npm run generate   # static prerender → .output/public
npm run preview    # preview the production build locally
```

## Structure

```
app/
  app.vue              # root: layout + global SEO/Schema.org defaults
  error.vue            # custom error page (404/500)
  layouts/default.vue  # header/main/footer shell
  pages/               # index.vue (landing), impressum.vue, datenschutz.vue
  components/          # atomic design: atoms/ · molecules/ · organisms/
  composables/         # SSR-safe motion/interaction helpers (@vueuse)
  data/                # all content as typed data (types.ts)
  assets/css/main.css  # design system: @theme tokens + @utility
public/                # llms.txt, favicon, brand assets
docs/                  # website-texte.md (copy source), demo.html (reference)
```

**Content lives as data in `app/data/*.ts`**, not in the markup - to change copy or sections, edit the data file, not the component. Details and conventions: see [`CLAUDE.md`](./CLAUDE.md).
