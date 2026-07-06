<script setup lang="ts">
const { open, toggle } = useMenu()
</script>

<template>
  <button
    type="button"
    class="menu-toggle"
    :class="{ open }"
    :aria-expanded="open"
    aria-controls="menu-overlay"
    :aria-label="open ? 'Menü schließen' : 'Menü öffnen'"
    @click="toggle"
  >
    <span class="label">{{ open ? 'Schließen' : 'Menü' }}</span>
    <span class="bars" aria-hidden="true">
      <span class="bar" />
      <span class="bar" />
    </span>
  </button>
</template>

<style scoped>
.menu-toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: 0;
  margin: 0;
  padding: 6px 0;
  cursor: pointer;
  color: var(--color-ink);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
}

.label {
  min-width: 4.5ch; /* avoids width jump between "Menü" / "Schließen" */
  text-align: right;
  transition: color 0.25s var(--ease-brand);
}

.bars {
  position: relative;
  width: 22px;
  height: 12px;
  flex: none;
}

.bar {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.3s var(--ease-brand), background 0.25s var(--ease-brand);
}
.bar:nth-child(1) { top: 0; transform-origin: center; }
.bar:nth-child(2) { bottom: 0; transform-origin: center; }

/* hamburger → X */
.menu-toggle.open .bar:nth-child(1) { transform: translateY(5px) rotate(45deg); }
.menu-toggle.open .bar:nth-child(2) { transform: translateY(-5px) rotate(-45deg); }

/* when open the toggle sits on the dark overlay */
.menu-toggle.open { color: #fff; }

.menu-toggle:hover .label { color: var(--color-orange); }
.menu-toggle:hover .bar { background: var(--color-orange); }

.menu-toggle:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 3px;
  border-radius: 3px;
}
</style>
