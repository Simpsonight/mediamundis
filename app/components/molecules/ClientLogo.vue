<script setup lang="ts">
import type { Client } from '~/data/types'

const props = defineProps<{
  client: Client
}>()

// Optical size multiplier drives the item height via a CSS custom property.
const style = { '--logo-scale': String(props.client.scale ?? 1) }
</script>

<template>
  <div class="logo-item" :style="style">
    <img
      class="logo-img"
      :src="client.src"
      :alt="client.name"
      loading="lazy"
      decoding="async"
      draggable="false"
    >
  </div>
</template>

<style scoped>
.logo-item {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Normalise every logo to a shared cap height, tuned per-logo via --logo-scale */
  height: calc(clamp(30px, 3.4vw, 42px) * var(--logo-scale, 1));
}

.logo-img {
  height: 100%;
  width: auto;
  max-width: clamp(120px, 15vw, 200px);
  object-fit: contain;
  /* Monochrome by default; regains full colour on hover */
  filter: grayscale(1) opacity(0.55);
  transition: filter 0.4s var(--ease-brand);
  -webkit-user-select: none;
  user-select: none;
}

.logo-item:hover .logo-img {
  filter: grayscale(0) opacity(1);
}

@media (prefers-reduced-motion: reduce) {
  .logo-img {
    transition: none;
  }
}
</style>
