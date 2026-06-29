<script setup lang="ts">
import type { NavLink } from '~/data/types'

defineProps<{
  links: NavLink[]
}>()
</script>

<template>
  <nav class="nav-links">
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
    >{{ link.label }}</a>
  </nav>
</template>

<style scoped>
/* demo lines 36-40 */
.nav-links {
  display: flex;
  gap: 26px;
  align-items: center;
}

.nav-links a {
  font-size: 14px;
  color: var(--color-ink-soft);
  font-weight: 500;
  text-decoration: none;
  position: relative;
  isolation: isolate;
}

/* soft orange wash — scaleX wipe behind text */
.nav-links a::before {
  content: "";
  position: absolute;
  inset: -2px -6px;
  z-index: -1;
  border-radius: 3px;
  background: color-mix(in srgb, var(--color-orange) 12%, transparent);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.35s var(--ease-brand);
}

.nav-links a:hover::before {
  transform: scaleX(1);
}

/* underline-grow hover */
.nav-links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 2px;
  width: 0;
  background: var(--color-orange);
  transition: width 0.25s var(--ease-brand);
}

.nav-links a:hover {
  color: var(--color-ink);
  font-weight: 600;
}

.nav-links a:hover::after {
  width: 100%;
}

/* a11y focus ring */
.nav-links a:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
