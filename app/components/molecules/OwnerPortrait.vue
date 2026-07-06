<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const props = defineProps<{
  // 0..1 scroll progress of the section; on desktop the portrait is pinned so
  // progress is passed in from outside. On mobile (not pinned) the component
  // measures its own element — giving the clean pale→full→pale bell there.
  progress?: number
}>()

const el = ref<HTMLElement | null>(null)
const reduced = useReducedMotion()
const isDesktop = useMediaQuery('(min-width: 821px)')
const selfProgress = usePinProgress(el)
const p = computed(() =>
  isDesktop.value && props.progress != null ? props.progress : selfProgress.value,
)

// Bell curve: pale on entry → full at center → pale again.
// Smoothstep for a stronger transition. Reduced motion: statically full.
const WIDTH = 0.45
const dev = computed(() => {
  if (reduced.value) return 1
  const t = Math.max(0, 1 - Math.abs(p.value - 0.5) / WIDTH)
  return t * t * (3 - 2 * t)
})
</script>

<template>
  <figure
    ref="el"
    class="portrait"
    :style="{ '--dev': dev }"
    role="img"
    aria-label="Simon Kemmerling, Inhaber von mediamundis"
    fetchpriority="high"
  >
    <span class="ink" aria-hidden="true" />
  </figure>
</template>

<style scoped>
.portrait {
  /* pale base tone so the develop-in effect is clearly visible */
  --portrait-pale: color-mix(in srgb, var(--color-grey-soft) 70%, #fff);

  position: relative;
  margin: 0;
  width: 100%;
  max-width: 380px;
  aspect-ratio: 2679.64 / 3037.39;   /* keep the SVG's portrait aspect ratio */
  justify-self: center;
  align-self: center;

  /* SVG as mask — dots inherit this element's color (+ ink layer) */
  background-color: var(--portrait-pale);
  -webkit-mask: url(/simon-kemmerling.svg) center / contain no-repeat;
  mask: url(/simon-kemmerling.svg) center / contain no-repeat;
}

/* Ink layer: faded in via opacity — compositor-only, no repaint of the surface */
.portrait .ink {
  position: absolute;
  inset: 0;
  background-color: var(--color-ink);
  opacity: var(--dev, 0);
}

/* Desktop: large, head-dominant, left-bleeding, pinned portrait */
@media (min-width: 821px) {
  .portrait {
    /* gap between header and portrait top edge */
    --portrait-top-gap: var(--space-lg);

    position: sticky;
    top: calc(var(--navh) + var(--portrait-top-gap));
    height: calc(100vh - var(--navh) - var(--portrait-top-gap));
    width: 100%;
    max-width: none;
    aspect-ratio: auto;
    align-self: stretch;

    /* head slightly smaller and offset down → whitespace above the head, still left-aligned (bleed) */
    -webkit-mask: url(/simon-kemmerling.svg) left var(--space-lg) / auto 120% no-repeat;
    mask: url(/simon-kemmerling.svg) left var(--space-lg) / auto 120% no-repeat;
  }
}

/* Mobile: full-width, head-dominant banner (edge-to-edge), text below */
@media (max-width: 820px) {
  .portrait {
    justify-self: stretch;                     /* grid item fills the track */
    margin-inline: calc(-1 * var(--gutter));   /* flush to viewport edge */
    width: auto;
    max-width: none;
    height: 40vh;
    aspect-ratio: auto;

    -webkit-mask: url(/simon-kemmerling.svg) center 0 / cover no-repeat;
    mask: url(/simon-kemmerling.svg) center 0 / cover no-repeat;
  }
}
</style>
