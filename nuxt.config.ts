// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2026-06-29',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/image', '@nuxtjs/seo'],

  // Disable folder-name path prefixes so components can be used by bare name
  // (e.g. <HeroSection /> instead of <OrganismsHeroSection />)
  components: [
    { path: '~/components', pathPrefix: false },
  ],

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

  // SEO/GEO: KI-Crawler und Suchmaschinen-Bots ausdrücklich zulassen (GEO-Absicht)
  robots: {
    groups: [
      {
        // GEO: KI-Crawler (ChatGPT, Perplexity, Claude, Google-Extended) explizit zulassen
        userAgent: ['Googlebot', 'GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'],
        allow: ['/'],
      },
    ],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
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
      weights: [400, 500, 600, 700, 800],
    },
    families: [
      { name: 'Archivo', provider: 'google', weights: [400, 500, 600, 700, 800], styles: ['normal'], global: true },
    ],
  },
});
