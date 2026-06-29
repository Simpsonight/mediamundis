<script setup lang="ts">
import type { Client, ClientMark } from '~/data/types'

defineProps<{
  client: Client
}>()

// Static SVG marks copied verbatim from demo lines 353-360
const marks: Record<ClientMark, string> = {
  ringo: '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="currentColor" stroke-width="3"/><circle cx="20" cy="20" r="4" fill="currentColor"/></svg>',
  veltra: '<svg viewBox="0 0 40 40" fill="none"><path d="M6 8 20 32 34 8" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>',
  nordwerk: '<svg viewBox="0 0 40 40"><rect x="7" y="7" width="26" height="26" rx="2" fill="none" stroke="currentColor" stroke-width="3"/><path d="M7 20h26M20 7v26" stroke="currentColor" stroke-width="3"/></svg>',
  paytide: '<svg viewBox="0 0 40 40" fill="none"><path d="M8 26c4-12 20-12 24 0" stroke="currentColor" stroke-width="3"/><circle cx="20" cy="14" r="3" fill="currentColor"/></svg>',
  orbion: '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="13" stroke="currentColor" stroke-width="3"/><ellipse cx="20" cy="20" rx="13" ry="5" stroke="currentColor" stroke-width="3"/></svg>',
  helixa: '<svg viewBox="0 0 40 40" fill="none"><path d="M20 6 33 13v14L20 34 7 27V13z" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>',
  klinverio: '<svg viewBox="0 0 40 40"><path d="M17 7h6v10h10v6H23v10h-6V23H7v-6h10z" fill="currentColor"/></svg>',
  statera: '<svg viewBox="0 0 40 40" fill="none"><path d="M8 32 20 8l12 24" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M13 23h14" stroke="currentColor" stroke-width="3"/></svg>',
}
</script>

<template>
  <!-- demo lines 149-152 -->
  <div class="logo-item">
    <!-- SVG mark via v-html; trusted static strings — no user input. aria-hidden because name span labels it -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span aria-hidden="true" v-html="marks[client.mark]" />
    <span class="logo-name">{{ client.name }}</span>
  </div>
</template>

<style scoped>
/* demo lines 149-152 */
.logo-item {
  flex: none;
  display: flex;
  align-items: center;
  gap: 13px;
  color: var(--color-grey-soft);
  transition: color 0.35s;
}

.logo-item:hover {
  color: var(--color-ink);
}

/* SVG rendered via v-html — needs :deep() to pierce the aria-hidden span */
.logo-item :deep(svg) {
  width: clamp(28px, 3vw, 36px);
  height: clamp(28px, 3vw, 36px);
  flex: none;
}

/* demo line 152: text-logo token */
.logo-name {
  font-size: var(--text-logo);
  font-weight: 700;
  letter-spacing: -0.025em;
  white-space: nowrap;
}
</style>
