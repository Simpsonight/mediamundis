<script setup lang="ts">
import type { Reveal } from '~/data/types'

/**
 * DotMatrix — renders a grid of dots for decorative use. Two modes:
 *
 * Icon mode (pass `glyph`): renders a cols×rows grid sized to the glyph
 *   bitmap. As `progress` (0..1) grows, the glyph's dots light up orange in
 *   `reveal` order while background dots gain a faint ambient tint — so the
 *   icon emerges out of a living field on scroll.
 *
 * Legacy mode (pass `cols`/`rows`/`onIndex`): the original decorative grid
 *   with a single permanent orange dot and an optional scan-order `fill`.
 *   Used by the `mini` variant (WorkRow).
 *
 * The component is aria-hidden and SSR-safe (server renders at progress 0).
 */
const props = withDefaults(defineProps<{
  // legacy
  cols?: number
  rows?: number
  onIndex?: number
  fill?: number
  variant?: 'matrix' | 'mini'
  // icon mode
  glyph?: string[]
  reveal?: Reveal
  progress?: number
}>(), {
  cols: 0,
  rows: 0,
  onIndex: -1,
  fill: 0,
  variant: 'matrix',
  glyph: undefined,
  reveal: 'top',
  progress: 0,
})

/** glyph completes a touch before display progress hits 1 → a soft finish. */
const COMPLETE_AT = 0.9

const isIcon = computed(() => Array.isArray(props.glyph) && props.glyph.length > 0)

const cols = computed(() => isIcon.value ? props.glyph![0].length : props.cols)
const rows = computed(() => isIcon.value ? props.glyph!.length : props.rows)
const total = computed(() => cols.value * rows.value)

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${cols.value}, 1fr)`,
}))

/**
 * Per-cell metadata for icon mode. Recomputed only when glyph/reveal change.
 * `threshold` is the display progress (0..1) at which an icon cell lights.
 * Keys are normalized min→max so the reveal starts immediately and the last
 * cell lights at COMPLETE_AT.
 */
const cells = computed(() => {
  if (!isIcon.value) return []
  const grid = props.glyph!
  const c = cols.value
  const cx = (c - 1) / 2
  const cy = (rows.value - 1) / 2

  const key = (r: number, col: number) => {
    if (props.reveal === 'bottom') return rows.value - 1 - r
    if (props.reveal === 'center') return Math.hypot(col - cx, r - cy)
    return r // 'top'
  }

  const out: { icon: boolean, threshold: number }[] = []
  const keys: number[] = []
  for (let r = 0; r < rows.value; r++) {
    for (let col = 0; col < c; col++) {
      const ch = grid[r]![col]
      const icon = ch !== '.' && ch !== ' '
      const k = icon ? key(r, col) : 0
      out.push({ icon, threshold: k })
      if (icon) keys.push(k)
    }
  }
  const min = Math.min(...keys)
  const span = Math.max(...keys) - min || 1
  for (const cell of out) {
    if (cell.icon) cell.threshold = ((cell.threshold - min) / span) * COMPLETE_AT
  }
  return out
})
</script>

<template>
  <!-- Icon mode -->
  <div
    v-if="isIcon"
    class="dot-grid matrix"
    :style="gridStyle"
    aria-hidden="true"
  >
    <i
      v-for="(cell, idx) in cells"
      :key="idx"
      :class="{
        icon: cell.icon,
        lit: cell.icon && progress > cell.threshold,
      }"
    />
  </div>

  <!-- Legacy mode (mini / decorative) -->
  <div
    v-else
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
  gap: clamp(4px, 0.55vw, 7px);
  justify-self: end;
  align-self: end;
  width: min(340px, 92%);
}
.matrix i {
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--color-dot);
  transition: background-color 0.4s var(--ease-brand);
}

/* icon mode: background dots stay grey; only the glyph's dots light on scroll */
.matrix i.lit {
  background: var(--color-orange);
}

/* reduced motion: show the finished glyph statically, no scroll-linked reveal */
@media (prefers-reduced-motion: reduce) {
  .matrix i {
    transition: none;
  }
  .matrix i.icon {
    background: var(--color-orange);
  }
}

@media (max-width: 820px) {
  .matrix { justify-self: start; width: min(300px, 84%); margin-top: 8px; }
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

/* shared: orange active dot (legacy) */
.dot-grid i.on {
  background: var(--color-orange);
}
</style>
