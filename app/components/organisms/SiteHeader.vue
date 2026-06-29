<script setup lang="ts">
import { site } from '~/data/site'

const scrolled = useScrolled()
</script>

<template>
  <nav id="nav" :class="{ scrolled }">
    <AppLogo />
    <span class="sub-note">
      <span class="dot" aria-hidden="true" />
      Software · Consulting · AI
    </span>
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
  padding: 0 clamp(20px, 4vw, 56px);
  background: rgba(255, 255, 255, 0);
  border-bottom: 1px solid transparent;
  transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
}

nav.scrolled {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: saturate(140%) blur(12px);
  border-bottom-color: var(--color-line);
}

/* demo line 33-35 */
.sub-note {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
  color: var(--color-ink-soft);
  font-weight: 500;
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
