<script setup lang="ts">
const { open } = useMenu()
</script>

<template>
  <!-- header + page go inert while the full-screen menu is open; the overlay
       carries its own logo + close control, so nothing behind it is reachable -->
  <div :inert="open || undefined">
    <SiteHeader />
    <slot />
  </div>
  <MenuOverlay />
</template>
