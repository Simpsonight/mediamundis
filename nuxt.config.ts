import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    typescript: {
        shim: false
    },
    buildModules: [
        '@nuxtjs/google-fonts'
    ],
    googleFonts: {
        download: true,
        base64: true,
        display: 'swap',
        families: {
            Raleway: {
                wght: [100, 300],
                ital: [100]
            },
        }
    }
})
