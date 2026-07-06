# Design: Grundarchitektur mediamundis-Website (Neuaufbau)

- **Datum:** 2026-06-29
- **Branch:** `feature/new-mm-site`
- **Status:** Genehmigt (Design), bereit für Implementierungsplanung
- **Scope:** Ausschließlich die **Grundarchitektur / das Scaffold** des Nuxt-Projekts. Inhalt, Sektionen, visuelles Design und Copy sind **nicht** Teil dieses Dokuments und folgen in einer separaten Konzept-/Planungsphase.

## Ziel

Bestehenden Stand im Feature-Branch hart auf `main` zurücksetzen und eine neue, hochperformante, SEO- und GEO-optimierte Marketing-/Landing-Site für **mediamundis** auf Basis von **Nuxt 4 + Tailwind CSS v4** von Grund auf neu aufsetzen — als saubere Grundlage (Best Practices), auf der das spätere Seitenkonzept aufbaut.

GEO bedeutet hier **Generative Engine Optimization** (Auffindbarkeit/Zitierbarkeit durch KI-/LLM-Suchmaschinen wie ChatGPT, Perplexity, Google AI Overviews).

## Entscheidungen (geklärt)

| Frage | Entscheidung |
|---|---|
| Umgang mit aktuellem Branch-Stand | **Hard-Reset auf `main`** (`git reset --hard origin/main`), uncommittete Änderungen verwerfen. |
| GEO-Bedeutung | **Generative Engine Optimization** |
| Tailwind-Integration | **Tailwind v4 pur** via `@tailwindcss/vite` (CSS-first `@theme`, kein `tailwind.config.js`) |
| Rendering-Modus | **Statisches Prerendering (SSG)** via `nuxt generate` + `nitro.prerender.crawlLinks` |

### Verworfene Alternativen
- **Rendering Hybrid (SSR + Route Rules):** flexibler, aber braucht Runtime; bei Bedarf später ohne Architekturbruch nachrüstbar.
- **Rendering SPA:** für SEO/GEO ungeeignet (Inhalt erst nach JS).
- **@nuxt/ui v3 / @nuxtjs/tailwindcss-Modul:** zugunsten des schlankeren, performanteren nativen Tailwind-v4-Vite-Ansatzes verworfen.
- **UnoCSS, @vueuse/motion:** entfernt (YAGNI für die Basis; Animationen ggf. in der Konzeptphase).

## Stack (latest stable, Juni 2026)

- **Nuxt 4** · **Vue 3.5**
- **Tailwind CSS v4** via `@tailwindcss/vite` (Rust-Oxide-Engine, CSS-first Config)
- **`@nuxtjs/seo`** — Meta-Modul; bündelt: `@nuxtjs/robots`, `@nuxtjs/sitemap`, `nuxt-link-checker`, `nuxt-og-image`, `nuxt-schema-org`, `nuxt-seo-utils`, `nuxt-site-config`. Deckt SEO **und** GEO/AEO-Fundament ab.
- **`@nuxt/image`** — responsive, optimierte Bilder (Performance / CWV)
- **`@nuxt/fonts`** — selbst-gehostete Fonts (kein Layout-Shift, DSGVO-freundlich, `display: swap`, preload)
- **`@nuxt/eslint`** — Linting
- **`@vueuse/core`** — Utility-Composables

## Projektstruktur (Nuxt-4-Konvention)

```
app/
  app.vue
  app.config.ts                # Theme-/Brand-Tokens (optional)
  assets/css/main.css          # @import "tailwindcss" + @theme-Tokens
  components/                  # UI-Komponenten
  composables/                 # wiederverwendbare Logik
  layouts/                     # default-Layout
  pages/                       # index.vue (Einstieg)
  utils/                       # Hilfsfunktionen
public/
  llms.txt                     # GEO: Struktur für KI-Crawler
  favicon.ico
  (og-/Bild-Assets)
server/                        # leer; bereit für späteren Hybrid-Ausbau
docs/superpowers/specs/        # Design-/Spec-Dokumente
nuxt.config.ts
eslint.config.mjs
package.json
tsconfig.json
.gitignore
```

## Schlüsselkomponenten & Verantwortlichkeiten

- **`nuxt.config.ts`** — zentrale Konfiguration: Module, `@tailwindcss/vite` als Vite-Plugin, `site`-Config (URL, Name, `defaultLocale: 'de'`), `nitro.prerender`-Einstellungen, Fonts.
- **`app/assets/css/main.css`** — `@import "tailwindcss";` plus `@theme`-Block für Brand-Tokens (Farben, Typo-Skala, Spacing). Einzige Quelle der Design-Tokens.
- **`app/app.vue` / `app/layouts/default.vue`** — globale Hülle; semantisches HTML-Grundgerüst (`<header>`, `<main>`, `<footer>`), `<html lang="de">`.
- **`@nuxtjs/seo`-Konfiguration** — Sitemap + robots (KI-Crawler GPTBot/PerplexityBot erlaubt), Schema.org `Organization`/`LocalBusiness`, dynamische OG-Images, Default-Meta. Pro Seite: `useSeoMeta`.
- **`public/llms.txt`** — deklariert Inhaltsstruktur für generative Engines (GEO).
- **`.gitignore`** — schließt `.nuxt/`, `.output/`, `dist/`, `node_modules/` korrekt aus (behebt das aktuelle Fehl-Tracking von `.nuxt/`-Artefakten).

## Datenfluss (Build/Runtime)

1. `nuxt generate` rendert alle Routen statisch vor (`crawlLinks`) → reines HTML/CSS.
2. Tailwind-v4-Oxide erzeugt on-demand minimales CSS.
3. `@nuxt/image` + `@nuxt/fonts` liefern optimierte Assets.
4. `@nuxtjs/seo` injiziert Meta, JSON-LD, Sitemap, robots beim Build.
5. Auslieferung als statische Dateien über CDN/statischen Host; Hydration für Interaktivität.

## Performance-Leitlinien

- SSG-Prerendering (CDN-HTML, beste TTFB/LCP).
- Tailwind-v4-Oxide → minimales, on-demand CSS.
- `@nuxt/image` (responsive, moderne Formate), `@nuxt/fonts` (preload, `swap`).
- Minimales Client-JS; Interaktivität nur wo nötig.

## SEO/GEO-Fundament

- Zentrale `site`-Config (URL, Name, Sprache `de`).
- Sitemap + robots.txt (KI-Crawler erlaubt).
- Schema.org JSON-LD: `Organization`, `LocalBusiness`, später `FAQPage` etc.
- Dynamische OG-Images (`nuxt-og-image`).
- `llms.txt` für generative Engines.
- `useSeoMeta` pro Seite; extraktionsfreundliche, semantische Struktur.

## Verifikation (Definition of Done für das Scaffold)

- `npm run dev` startet fehlerfrei; Startseite lädt.
- `npx nuxt prepare` ohne Fehler; `npx eslint .` sauber.
- `npm run generate` erzeugt statische Ausgabe inkl. `sitemap.xml`, `robots.txt`, `llms.txt`.
- Tailwind-v4-Utility-Klassen wirken in einer Test-Komponente.
- `.nuxt/`/`.output/` werden **nicht** von Git getrackt.
- Generiertes HTML enthält korrekte Meta-Tags und Schema.org-JSON-LD.

## Risiken & Annahmen

- **Versions-Drift:** finale Paketversionen werden beim Implementieren gegen die aktuellen Releases geprüft (context7 falls verbunden, sonst Web/Docs).
- **Deploy-Ziel offen:** SSG ist host-agnostisch; konkretes Hosting (Netlify/Vercel/Cloudflare/Webspace) kann später ohne Architekturänderung festgelegt werden.
- **`main`-Inhalt:** Hard-Reset verwirft die Branch-Commits (`intro`, `new logo`) sofern nicht auf `main` — vom Nutzer bestätigt.

## Nächster Schritt

Nach Freigabe dieses Dokuments: Übergang in die **writing-plans**-Skill zur Erstellung eines detaillierten Implementierungsplans (Reset → Scaffold → Module → Config → SEO/GEO → Verifikation).
