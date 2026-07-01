<script setup lang="ts">
const route = useRoute()

function onLogoClick(e: MouseEvent) {
  // Let the browser handle modified clicks (open in new tab, etc.)
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  // Already on the homepage: don't re-navigate — scroll to the top and drop
  // any deep-link hash (#work, #leistungen, …) from the URL.
  if (route.path === '/') {
    e.preventDefault()
    if (route.hash) history.replaceState(history.state, '', '/')
    window.scrollTo({ top: 0 }) // respects html{scroll-behavior} (smooth / auto under reduced motion)
  }
  // On other routes the NuxtLink navigates to '/' (Nuxt scrolls to top).
}
</script>

<template>
  <NuxtLink to="/" aria-label="mediamundis - Startseite" class="brand" @click="onLogoClick">
    <img src="/brand/logo-mediamundis.svg" alt="mediamundis - Software Development, Consulting, AI by Simon Kemmerling" height="24">
  </NuxtLink>
</template>

<style scoped>
.brand {
  height: 24px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  width: 300px;
}

/* Render the multi-color brand SVG in solid black; reveal the brand colors on hover */
.brand img {
  filter: brightness(0);
  transition: filter 0.3s;
}

.brand:hover img,
.brand:focus-visible img {
  filter: none;
}

/* a11y focus ring */
.brand:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
