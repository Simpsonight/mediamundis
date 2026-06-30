<script setup lang="ts">
import { site } from '~/data/site'

const scrolled = useScrolled()
</script>

<template>
  <nav id="nav" :class="{ scrolled }">
    <AppLogo />
    <span class="nav-spacer" aria-hidden="true" />
    <NavLinks :links="site.navLinks" />
    <NavGreeting />
    <BasePill to="#kontakt" label="Kontakt" />
  </nav>
</template>

<style scoped>
/* demo lines 26-47, 181-191 */
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


.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-orange);
  flex: none;
}

.nav-spacer {
  flex: 1;
}

/* demo line 47: hide sub-note + nav + greet on mobile */
@media (max-width: 760px) {
  .sub-note { display: none; }
  :deep(.nav-links) { display: none; }
  :deep(.greet) { display: none; }
}
</style>
