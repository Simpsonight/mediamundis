<script setup lang="ts">
const scrolled = useScrolled()
</script>

<template>
  <nav id="nav" :class="{ scrolled }">
    <AppLogo />
    <span class="nav-spacer" aria-hidden="true" />
    <MenuToggle />
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 24px;
  height: var(--navh);
  padding: 0 var(--gutter);
  background: rgba(255, 255, 255, 0);
  border-bottom: 1px solid transparent;
  transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
}

nav.scrolled {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: saturate(140%) blur(12px);
  border-bottom-color: var(--color-line);
}

.nav-spacer {
  flex: 1;
}
</style>
