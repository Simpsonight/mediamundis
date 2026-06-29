// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    // Vue 3 supports fragments (multiple root elements); the Nuxt preset erroneously
    // inherits the Vue-2-era restriction — disable it project-wide.
    'vue/no-multiple-template-root': 'off',
  },
});
