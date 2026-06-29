<script setup lang="ts">
/**
 * DotMatrix — renders a cols×rows grid of dots for decorative use.
 *
 * Props:
 *   cols     — number of columns
 *   rows     — number of rows
 *   onIndex  — zero-based index of the single orange (active) dot
 *   variant  — 'matrix' (default, larger dots, --color-dot) or 'mini' (smaller, --color-dot-mini)
 *   fill     — reserved for Task 9b; accepted but unused for now
 *
 * The component is aria-hidden and SSR-safe (v-for over computed array).
 */
const props = withDefaults(defineProps<{
  cols: number
  rows: number
  onIndex: number
  variant?: 'matrix' | 'mini'
  fill?: number
}>(), {
  variant: 'matrix',
  fill: 0,
})

const total = computed(() => props.cols * props.rows)

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
}))
</script>

<template>
  <div
    :class="['dot-grid', variant]"
    :style="gridStyle"
    aria-hidden="true"
  >
    <template v-for="idx in total" :key="idx">
      <!-- fill branch: in-range dot that is NOT the permanent orange dot -->
      <i
        v-if="fill > 0 && idx - 1 < fill && idx - 1 !== onIndex"
        style="background: color-mix(in srgb, var(--color-orange) 55%, var(--color-dot))"
      />
      <!-- default branch: permanent on-dot or unfilled dot (SSR always takes this path) -->
      <i
        v-else
        :class="{ on: idx - 1 === onIndex }"
      />
    </template>
  </div>
</template>

<style scoped>
/* demo lines 102-104 — matrix variant */
.dot-grid {
  display: grid;
}
.matrix {
  gap: clamp(7px, 1vw, 13px);
  justify-self: end;
  align-self: end;
  width: min(340px, 90%);
}
.matrix i {
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--color-dot);
  transition: background-color 0.35s var(--ease-brand);
}

@media (max-width: 820px) {
  .matrix { justify-self: start; width: min(280px, 80%); margin-top: 8px; }
}

/* demo lines 127-129 — mini variant */
.mini {
  gap: 9px;
  width: 62%;
}
.mini i {
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--color-dot-mini);
}

/* shared: orange active dot */
.dot-grid i.on {
  background: var(--color-orange);
}
</style>
