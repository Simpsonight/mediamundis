# mediamundis

Marketing- und Landingpage für **mediamundis** – die Person-Marke von Simon Kemmerling (Senior Fullstack Developer & Solution Architect), gerahmt als Firma. Deutschsprachig, statisch vorgerendert (SSG), SEO- und GEO-optimiert.

## Stack

- **Nuxt 4** + **Vue 3** (Quellcode unter `app/`)
- **Tailwind CSS v4** – CSS-first über `@tailwindcss/vite`, kein `tailwind.config.js`
- **@nuxtjs/seo** – Robots, Sitemap, OG-Image, Schema.org, Site-Config
- **@nuxt/image**, **@nuxt/fonts** (Archivo), **@nuxt/eslint**, **@vueuse/core**

## Setup

```bash
npm install
```

## Entwicklung

```bash
npm run dev        # Dev-Server auf http://localhost:3000
npm run lint       # ESLint (Flat Config)
```

## Build & Prerender

```bash
npm run build      # Produktions-Build
npm run generate   # Statisches Prerender → .output/public
npm run preview    # Produktions-Build lokal ansehen
```

Es gibt kein Unit-Test-Framework; Verifikation erfolgt über `npm run lint` + `npm run generate` und Sichtprüfung.

## Struktur

```
app/
  app.vue              # Root: Layout + globale SEO/Schema.org-Defaults
  layouts/default.vue  # header/main/footer-Shell
  pages/               # index.vue (Landing), impressum.vue, datenschutz.vue
  components/          # Atomic Design: atoms/ · molecules/ · organisms/
  composables/         # SSR-sichere Motion-/Interaktions-Helfer (@vueuse)
  data/                # Sämtliche Inhalte als typisierte Daten (types.ts)
  assets/css/main.css  # Design-System: @theme-Tokens + @utility
public/                # llms.txt, Favicon, Brand-Assets
docs/                  # website-texte.md (Text-Vorlage), demo.html (Referenz)
```

**Inhalte liegen als Daten in `app/data/*.ts`**, nicht im Markup – zum Ändern von Texten oder Sektionen die Datendatei bearbeiten, nicht die Komponente. Details und Konventionen: siehe [`CLAUDE.md`](./CLAUDE.md).
