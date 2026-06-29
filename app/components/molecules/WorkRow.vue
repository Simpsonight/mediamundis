<script setup lang="ts">
import type { Work } from '~/data/types'

defineProps<{
  work: Work
}>()
</script>

<template>
  <a :href="work.href" class="work-row">
    <div>
      <span class="eyebrow">{{ work.eyebrow }}</span>
      <h3>
        {{ work.title }}
        <IconArrow variant="diag" class="ar" />
      </h3>
      <p>{{ work.description }}</p>
      <div class="meta">
        <b>{{ work.year }}</b> · {{ work.meta.join(' · ') }}
      </div>
    </div>
    <div class="work-thumb">
      <DotMatrix v-bind="work.mini" variant="mini" />
    </div>
  </a>
</template>

<style scoped>
/* demo lines 116-137 */
.work-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: clamp(24px, 4vw, 64px);
  align-items: center;
  padding: clamp(26px, 3.4vw, 46px) 0;
  border-bottom: 1px solid var(--color-line);
  text-decoration: none;
  position: relative;
  color: inherit;
}

/* a11y focus ring */
.work-row:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
}

.eyebrow {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-grey);
  font-weight: 600;
}

/* demo lines 119-121: text-work-title token */
h3 {
  font-weight: 600;
  font-size: var(--text-work-title);
  line-height: 1;
  letter-spacing: -0.03em;
  margin: 12px 0 10px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
}

/* diagonal arrow — hidden until hover */
.ar {
  width: 0.5em;
  height: 0.5em;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.3s, transform 0.3s;
  color: var(--color-orange);
  flex: none;
}

p {
  font-size: clamp(15px, 1.3vw, 18px);
  color: var(--color-ink-soft);
  max-width: 46ch;
}

.meta {
  margin-top: 14px;
  font-size: 13px;
  color: var(--color-grey);
  font-weight: 500;
  display: flex;
  gap: 14px;
  align-items: center;
}

.meta b {
  font-weight: 600;
  color: var(--color-ink);
}

.work-thumb {
  width: clamp(150px, 18vw, 240px);
  aspect-ratio: 4 / 3;
  background: var(--color-tile);
  border: 1px solid var(--color-line);
  display: grid;
  place-items: center;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.35s;
}

/* hover mechanics — demo lines 130-132 */
.work-row:hover h3 {
  transform: translateX(8px);
}

.work-row:hover .ar {
  opacity: 1;
  transform: none;
}

.work-row:hover .work-thumb {
  border-color: var(--color-orange);
  transform: translateY(-3px);
}

@media (max-width: 720px) {
  .work-row {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .work-thumb {
    width: 100%;
    aspect-ratio: 16 / 7;
    order: -1;
  }
}
</style>
