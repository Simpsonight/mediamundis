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
