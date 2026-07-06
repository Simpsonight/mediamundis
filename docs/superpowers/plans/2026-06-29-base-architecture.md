# mediamundis Grundarchitektur – Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Den Feature-Branch hart auf `main` zurücksetzen und ein sauberes, hochperformantes, SEO-/GEO-optimiertes Nuxt-4-+-Tailwind-v4-Scaffold für die mediamundis-Website aufbauen.

**Architecture:** Statisch vorgerenderte (SSG) Nuxt-4-App. Tailwind v4 nativ via `@tailwindcss/vite` (CSS-first `@theme`, kein `tailwind.config.js`). SEO/GEO-Fundament über das `@nuxtjs/seo`-Meta-Modul (robots, sitemap, schema.org, og-image, seo-utils, site-config) plus statische `llms.txt`. Performance über `@nuxt/image` und `@nuxt/fonts`.

**Tech Stack:** Nuxt 4 · Vue 3.5 · Tailwind CSS v4 (`@tailwindcss/vite`) · `@nuxtjs/seo` · `@nuxt/image` · `@nuxt/fonts` · `@nuxt/eslint` · `@vueuse/core`

## Global Constraints

- Nuxt: `^4.4.8` · Vue: `^3.5.0`
- Tailwind: `tailwindcss@^4.3.1` + `@tailwindcss/vite@^4.3.1` — **kein** `tailwind.config.js`, Konfiguration CSS-first via `@theme` in `app/assets/css/main.css`.
- SEO: `@nuxtjs/seo@^5.3.1` (Meta-Modul) · Image: `@nuxt/image@^2.0.0` · Fonts: `@nuxt/fonts@^0.14.0` · ESLint: `@nuxt/eslint@^1.16.0` · Utils: `@vueuse/core@^14.3.0`
- Rendering: **SSG** — `nuxt generate` mit `nitro.prerender.crawlLinks: true`.
- Sprache der Site: **Deutsch** (`<html lang="de">`, `site.defaultLocale: 'de'`).
- Site-URL: `https://www.mediamundis.de` · Site-Name: `mediamundis`.
- **Entfernt/nicht verwenden:** UnoCSS, `@unocss/nuxt`, `@vueuse/motion`.
- Git: `.nuxt/`, `.output/`, `dist/`, `node_modules/` müssen ge-gitignored sein und dürfen **nicht** getrackt werden.
- Es gibt **kein** Unit-Test-Framework. „Verifikation" = Build-/Run-/Inhalts-Checks (dev, prepare, eslint, generate, grep auf Output). Das ist beabsichtigt für ein Scaffold.
- Scope: **nur Grundarchitektur/Scaffold** — keine finalen Inhalte, kein finales visuelles Design, keine echte Copy. Platzhalter sind klar als solche zu markieren.

---

### Task 1: Branch-Reset & Clean Slate

Setzt den Branch hart auf `origin/main`, entfernt Alt-Code und behebt das `.gitignore`-Fehl-Tracking. Das Design-Dokument (untracked) überlebt den Reset und wird hier committet.

**Files:**
- Reset (tracked → `origin/main`): gesamtes Arbeitsverzeichnis
- Delete (tracked, aus main): `app.vue`, `components/Intro.vue`, `assets/fonts/Raleway-Light.ttf`, `assets/fonts/Raleway-Regular.ttf`, `assets/img/mediamundis.svg`, `assets/img/muster_bg4.gif`
- Delete (untracked Alt-Composables): `app/composables/useScrollDirection.ts`, `app/composables/useSectionLayers.ts`
- Modify: `.gitignore`
- Keep (untracked): `docs/`, `CLAUDE.md`

**Interfaces:**
- Consumes: nichts (erste Task)
- Produces: sauberer Working-Tree auf Basis `origin/main`; committetes `docs/superpowers/specs/2026-06-29-base-architecture-design.md`

- [ ] **Step 1: Aktuellen Stand zur Sicherheit als Backup-Branch festhalten**

```bash
git branch backup/pre-reset-$(git rev-parse --short HEAD) 2>/dev/null || true
git tag -f pre-reset-snapshot
```

Hinweis: Erfasst nur committete Stände; uncommittete Änderungen werden bewusst verworfen (vom Nutzer bestätigt).

- [ ] **Step 2: Sicherstellen, dass das Design-Dokument untracked vorliegt (überlebt den Reset)**

Run: `git status --porcelain docs/`
Expected: Zeile `?? docs/` (untracked) — nicht staged.

- [ ] **Step 3: Hard-Reset auf origin/main**

```bash
git fetch origin
git reset --hard origin/main
```

Expected: `HEAD is now at <hash> ...` (Commit von origin/main). Untracked Dateien (`docs/`, `CLAUDE.md`, alte Composables) bleiben erhalten.

- [ ] **Step 4: Alt-Composables (untracked Reste der verworfenen UnoCSS-Architektur) entfernen**

```bash
rm -f app/composables/useScrollDirection.ts app/composables/useSectionLayers.ts
rmdir app/composables 2>/dev/null || true
rmdir app 2>/dev/null || true
```

- [ ] **Step 5: Alte App-Dateien aus main entfernen (Scaffold wird neu aufgebaut)**

```bash
git rm -q app.vue components/Intro.vue \
  assets/fonts/Raleway-Light.ttf assets/fonts/Raleway-Regular.ttf \
  assets/img/mediamundis.svg assets/img/muster_bg4.gif
rmdir components assets/fonts assets/img assets 2>/dev/null || true
```

Expected: `git status` zeigt die sechs Dateien als `deleted`/staged.

- [ ] **Step 6: `.gitignore` setzen**

Inhalt von `.gitignore` vollständig ersetzen durch:

```gitignore
# Nuxt / Nitro build artifacts
.nuxt/
.output/
.data/
dist/

# Dependencies
node_modules/

# Logs
logs/
*.log
npm-debug.log*

# Environment
.env
.env.*
!.env.example

# Editor / OS
.DS_Store
.idea/
.vscode/*
!.vscode/extensions.json

# Cache
.cache/
```

- [ ] **Step 7: Verifizieren, dass keine `.nuxt/`-Artefakte mehr getrackt sind**

Run: `git ls-files | grep -E '^\.nuxt/' | head`
Expected: keine Ausgabe (leer).

- [ ] **Step 8: Commit (Reset + Clean Slate + Design-Doc)**

```bash
git add .gitignore docs/superpowers/specs/2026-06-29-base-architecture-design.md
git commit -m "chore: reset branch to main, clean slate, add architecture design doc"
```

Expected: Commit mit gelöschten Alt-Dateien, neuer `.gitignore`, Design-Doc.

---

### Task 2: package.json & Dependency-Installation

Schreibt eine frische `package.json` mit den festgelegten Versionen und installiert sie.

**Files:**
- Modify (überschreiben): `package.json`
- Generated: `package-lock.json`, `node_modules/`

**Interfaces:**
- Consumes: sauberer Working-Tree aus Task 1
- Produces: installierte Toolchain; `npm`-Scripts `dev`/`build`/`generate`/`preview`/`lint`

- [ ] **Step 1: `package.json` vollständig ersetzen**

```json
{
  "name": "mediamundis",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "lint": "eslint .",
    "postinstall": "nuxt prepare"
  },
  "dependencies": {
    "nuxt": "^4.4.8",
    "vue": "^3.5.0",
    "vue-router": "^4.5.0",
    "@nuxtjs/seo": "^5.3.1",
    "@nuxt/image": "^2.0.0",
    "@nuxt/fonts": "^0.14.0",
    "@vueuse/core": "^14.3.0"
  },
  "devDependencies": {
    "@nuxt/eslint": "^1.16.0",
    "eslint": "^9.0.0",
    "tailwindcss": "^4.3.1",
    "@tailwindcss/vite": "^4.3.1"
  }
}
```

- [ ] **Step 2: Sauber installieren**

```bash
rm -f package-lock.json
npm install
```

Expected: Installation ohne `ERESOLVE`/Peer-Fehler. `postinstall` ruft `nuxt prepare` auf — kann beim ersten Lauf scheitern, wenn noch keine Config existiert; das ist okay, wird in Task 3 behoben. Falls `postinstall` hier abbricht, mit `npm install --ignore-scripts` installieren und `nuxt prepare` nach Task 3 laufen lassen.

- [ ] **Step 3: Installierte Versionen verifizieren**

Run: `npm ls nuxt tailwindcss @tailwindcss/vite @nuxtjs/seo @nuxt/image @nuxt/fonts @nuxt/eslint @vueuse/core --depth=0`
Expected: Alle Pakete mit Versionen ≥ den Floors, keine `UNMET DEPENDENCY`.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: set up Nuxt 4 + Tailwind v4 dependency stack"
```

---

### Task 3: Nuxt-Grundkonfiguration + Tailwind v4 + Basis-Seiten

Erstellt `nuxt.config.ts`, `tsconfig.json`, das Tailwind-CSS-Entry mit `@theme`, sowie `app.vue`, Default-Layout und Start-Seite. Ergebnis: lauffähiger Dev-Server mit wirkenden Tailwind-Klassen.

**Files:**
- Create: `nuxt.config.ts`
- Create: `tsconfig.json`
- Create: `app/app.vue`
- Create: `app/layouts/default.vue`
- Create: `app/pages/index.vue`
- Create: `app/assets/css/main.css`

**Interfaces:**
- Consumes: Dependencies aus Task 2
- Produces:
  - `nuxt.config.ts` mit Modulen `['@nuxt/eslint', '@nuxt/fonts', '@nuxt/image', '@nuxtjs/seo']`, Tailwind-Vite-Plugin, `css: ['~/assets/css/main.css']`, `site`-Config, `nitro.prerender`
  - Default-Layout mit semantischem `<header>/<main>/<footer>`-Slot
  - `app/pages/index.vue` als Einstieg

- [ ] **Step 1: `app/assets/css/main.css` erstellen (Tailwind v4 + Theme-Tokens)**

```css
@import "tailwindcss";

/* Brand-Design-Tokens (CSS-first; Platzhalterwerte – finalisieren in der Konzeptphase) */
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --color-brand-50: #eef6ff;
  --color-brand-500: #2563eb;
  --color-brand-900: #1e3a8a;
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-sans);
}
```

- [ ] **Step 2: `nuxt.config.ts` erstellen**

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/image', '@nuxtjs/seo'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  // SEO/GEO: zentrale Site-Identität (von @nuxtjs/seo genutzt)
  site: {
    url: 'https://www.mediamundis.de',
    name: 'mediamundis',
    defaultLocale: 'de',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'de' },
    },
  },

  // SSG: alle verlinkten Routen statisch vorrendern
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  fonts: {
    defaults: {
      preload: true,
      display: 'swap',
      weights: [400, 600, 700],
    },
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 600, 700], styles: ['normal'], global: true },
    ],
  },
});
```

- [ ] **Step 3: `tsconfig.json` erstellen**

```json
{
  "extends": "./.nuxt/tsconfig.json"
}
```

- [ ] **Step 4: `app/layouts/default.vue` erstellen (semantisches Grundgerüst)**

```vue
<template>
  <div class="min-h-screen flex flex-col bg-white text-slate-900">
    <header class="border-b border-slate-100">
      <nav class="mx-auto max-w-6xl px-4 py-4">
        <span class="text-lg font-bold tracking-tight">mediamundis</span>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-slate-100">
      <div class="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">
        © mediamundis
      </div>
    </footer>
  </div>
</template>
```

- [ ] **Step 5: `app/app.vue` erstellen**

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- [ ] **Step 6: `app/pages/index.vue` erstellen (Platzhalter-Einstieg + Tailwind-Beweis-Klassen)**

```vue
<template>
  <section class="mx-auto max-w-6xl px-4 py-24">
    <p class="text-sm font-semibold uppercase tracking-widest text-brand-500">
      Platzhalter – Inhalt folgt in der Konzeptphase
    </p>
    <h1 class="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
      mediamundis
    </h1>
    <p class="mt-6 max-w-2xl text-lg text-slate-600">
      Grundarchitektur steht. Nuxt 4 + Tailwind v4, SEO- und GEO-optimiert.
    </p>
  </section>
</template>
```

- [ ] **Step 7: Nuxt-Typen generieren**

Run: `npx nuxt prepare`
Expected: Erfolgreich; legt `.nuxt/` an (untracked).

- [ ] **Step 8: Dev-Server starten und Tailwind verifizieren**

Run (im Hintergrund, dann beenden):
```bash
(npm run dev &) ; sleep 12 ; curl -s http://localhost:3000/ | grep -o 'mediamundis' | head -1 ; pkill -f 'nuxt dev' || true
```
Expected: Ausgabe `mediamundis`; Dev-Server lief fehlerfrei (keine Vite-/Tailwind-Plugin-Fehler im Log).

- [ ] **Step 9: Commit**

```bash
git add nuxt.config.ts tsconfig.json app/
git commit -m "feat: scaffold Nuxt 4 app with Tailwind v4 and base layout"
```

---

### Task 4: SEO- & GEO-Fundament

Ergänzt Schema.org-Identität, Default-Meta, KI-Crawler-freundliche robots-Regeln und die statische `llms.txt`.

**Files:**
- Modify: `app/app.vue` (Schema.org-Identität + globale `useSeoMeta`-Defaults)
- Modify: `app/pages/index.vue` (seitenspezifische `useSeoMeta`)
- Create: `public/llms.txt`
- Create: `public/robots.txt` ist **nicht** nötig — wird von `@nuxtjs/robots` generiert; stattdessen Config in `nuxt.config.ts`
- Modify: `nuxt.config.ts` (robots-Config für KI-Crawler)

**Interfaces:**
- Consumes: `site`-Config und Module aus Task 3
- Produces: JSON-LD `Organization` global; `sitemap.xml`, `robots.txt`, OG-Image-Endpunkt durch `@nuxtjs/seo`; `/llms.txt`

- [ ] **Step 1: `nuxt.config.ts` um robots-Config erweitern (KI-Crawler explizit erlauben)**

Innerhalb des `defineNuxtConfig({...})`-Objekts (nach dem `site`-Block) einfügen:

```ts
  // SEO/GEO: KI-Crawler ausdrücklich zulassen
  robots: {
    allow: ['Googlebot', 'GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'],
    // Standardmäßig wird alles erlaubt; hier nur zur Klarstellung der GEO-Absicht.
  },
```

- [ ] **Step 2: `app/app.vue` um globale SEO-Defaults + Schema.org-Identität erweitern**

```vue
<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s · mediamundis',
  ogType: 'website',
  ogSiteName: 'mediamundis',
  ogLocale: 'de_DE',
});

// Schema.org-Identität (GEO: maschinenlesbare Entität für generative Engines)
useSchemaOrg([
  defineOrganization({
    name: 'mediamundis',
    url: 'https://www.mediamundis.de',
    // logo: '/og/logo.png', // in Konzeptphase ergänzen
  }),
  defineWebSite({ name: 'mediamundis' }),
  defineWebPage(),
]);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- [ ] **Step 3: `app/pages/index.vue` um seitenspezifische Meta erweitern**

Den `<script setup>`-Block oben in `app/pages/index.vue` einfügen (vor dem `<template>`):

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Startseite',
  description:
    'mediamundis – Platzhalterbeschreibung. Finale Copy folgt in der Konzeptphase.',
});
</script>
```

- [ ] **Step 4: `public/llms.txt` erstellen (GEO: Inhaltsstruktur für KI-Crawler)**

```text
# mediamundis

> mediamundis – Marketing-/Landing-Website. (Platzhalter; finalisieren in der Konzeptphase.)

## Seiten
- [Startseite](https://www.mediamundis.de/): Einstieg und Überblick.

## Hinweise
- Sprache: Deutsch.
- Inhalt befindet sich im Aufbau.
```

- [ ] **Step 5: Typen neu generieren (für auto-importierte Schema-Helper)**

Run: `npx nuxt prepare`
Expected: Erfolgreich; `defineOrganization`/`useSchemaOrg`/`defineWebSite`/`defineWebPage` sind als Auto-Imports bekannt (keine TS-Fehler).

- [ ] **Step 6: Statische Generierung ausführen**

Run: `npm run generate`
Expected: Build erfolgreich; erzeugt `.output/public/` inkl. `index.html`, `sitemap.xml`, `robots.txt`, `llms.txt`.

- [ ] **Step 7: SEO/GEO-Artefakte im Output verifizieren**

```bash
test -f .output/public/sitemap.xml && echo "sitemap OK"
test -f .output/public/robots.txt && echo "robots OK"
test -f .output/public/llms.txt && echo "llms OK"
grep -q 'application/ld+json' .output/public/index.html && echo "jsonld OK"
grep -q '<html lang="de"' .output/public/index.html && echo "lang OK"
grep -qi 'og:site_name' .output/public/index.html && echo "og OK"
```
Expected: `sitemap OK`, `robots OK`, `llms OK`, `jsonld OK`, `lang OK`, `og OK`.

- [ ] **Step 8: Commit**

```bash
git add nuxt.config.ts app/app.vue app/pages/index.vue public/llms.txt
git commit -m "feat: add SEO + GEO foundation (schema.org, meta, robots, llms.txt)"
```

---

### Task 5: ESLint-Konfiguration & Lint-Lauf

Aktiviert das `@nuxt/eslint`-Flat-Config-Setup und stellt einen sauberen Lint-Lauf sicher.

**Files:**
- Create: `eslint.config.mjs`

**Interfaces:**
- Consumes: `@nuxt/eslint`-Modul (in `nuxt.config.ts` aus Task 3 aktiv) erzeugt `.nuxt/eslint.config.mjs`
- Produces: Root-`eslint.config.mjs`, `npm run lint` läuft sauber

- [ ] **Step 1: `eslint.config.mjs` erstellen (erweitert die generierte Nuxt-Config)**

```js
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {},
});
```

- [ ] **Step 2: Prepare sicherstellen (generiert `.nuxt/eslint.config.mjs`)**

Run: `npx nuxt prepare`
Expected: Erfolgreich; `.nuxt/eslint.config.mjs` existiert.

- [ ] **Step 3: Lint ausführen**

Run: `npm run lint`
Expected: Kein Fehler (Exit-Code 0). Falls Findings auftreten, mit `npm run lint -- --fix` beheben und verbleibende manuell korrigieren.

- [ ] **Step 4: Commit**

```bash
git add eslint.config.mjs
git commit -m "chore: add ESLint flat config"
```

---

### Task 6: CLAUDE.md aktualisieren & Gesamt-Verifikation

Ersetzt die veraltete `CLAUDE.md` (beschreibt die verworfene UnoCSS-/Stacked-Section-Architektur) durch eine, die das neue Scaffold beschreibt, und führt eine End-to-End-Verifikation durch.

**Files:**
- Modify (überschreiben): `CLAUDE.md`

**Interfaces:**
- Consumes: gesamtes Scaffold aus Tasks 1–5
- Produces: aktuelle Projektdoku; bestätigt grünen Endzustand

- [ ] **Step 1: `CLAUDE.md` vollständig ersetzen**

```markdown
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
- UI text is German.
- Never commit `.nuxt/` or `.output/` (gitignored).
- Do not reintroduce UnoCSS or @vueuse/motion (removed in the rebuild).

## Adding a section/page

Create a component under `app/components/` (or a route under `app/pages/`), render it, and add per-page `useSeoMeta`. Add new routes to `nitro.prerender.routes` if they are not crawl-reachable.
```

- [ ] **Step 2: Frischer `npx nuxt prepare`**

Run: `npx nuxt prepare`
Expected: Erfolgreich, keine Fehler.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: Exit-Code 0, keine Findings.

- [ ] **Step 4: Voller Static-Build**

Run: `npm run generate`
Expected: Erfolgreich; `.output/public/index.html`, `sitemap.xml`, `robots.txt`, `llms.txt` vorhanden.

- [ ] **Step 5: Git-Hygiene final prüfen**

```bash
git ls-files | grep -E '^(\.nuxt|\.output|node_modules|dist)/' | head
```
Expected: keine Ausgabe (nichts davon getrackt).

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for new Nuxt 4 + Tailwind v4 architecture"
```

---

## Self-Review (vom Plan-Autor durchgeführt)

**Spec-Coverage:**
- Hard-Reset auf main → Task 1 ✓
- Tailwind v4 pur via `@tailwindcss/vite`, CSS-first `@theme` → Task 3 ✓
- SSG-Rendering (`nitro.prerender.crawlLinks`) → Task 3 + Verifikation Task 4/6 ✓
- `@nuxtjs/seo` (sitemap/robots/schema.org/og-image) → Task 4 ✓
- GEO: `llms.txt`, KI-Crawler erlaubt, Schema.org JSON-LD → Task 4 ✓
- Performance: `@nuxt/image`, `@nuxt/fonts` → Task 2 (Deps) + Task 3 (Fonts-Config) ✓
- Entfernen von UnoCSS/@vueuse/motion → über frische package.json (Task 2) + Clean Slate (Task 1) ✓
- Git-Hygiene (.nuxt/.output ungetrackt) → Task 1 + Verifikation Task 6 ✓
- Sprache `de` → Task 3 (`htmlAttrs.lang`, `site.defaultLocale`) ✓
- Projektstruktur (app/, public/, server/ optional, docs/) → Tasks 1/3/4 ✓ (server/ bleibt leer/implizit; bewusst kein leerer Ordner-Commit)

**Placeholder-Scan:** Keine TBD/TODO ohne konkreten Inhalt; alle Code-Schritte zeigen vollständigen Code; Platzhalter-Copy ist als solche markiert (Konzeptphase). ✓

**Typ-/Namens-Konsistenz:** Modul-Liste, `site`-Keys, Composable-Namen (`useSeoMeta`, `useSchemaOrg`, `defineOrganization`, `defineWebSite`, `defineWebPage`) konsistent über Tasks 3–6; Dateipfade einheitlich (`app/...`). ✓

**Annahme/Risiko:** `defineWebPage`/`defineWebSite` sind Auto-Imports von `nuxt-schema-org`; sollte ein Helper-Name in der installierten v6 abweichen, in Task 4/Step 5 (`nuxt prepare`) sichtbar und dort zu korrigieren. OG-Image-Modul ist aktiv; ein dediziertes Template ist Scope der Konzeptphase.
