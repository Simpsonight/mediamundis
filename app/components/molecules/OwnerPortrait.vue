<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const props = defineProps<{
  // 0..1 Scroll-Fortschritt der Section; auf Desktop ist das Portrait gepinnt,
  // daher kommt der Fortschritt von außen. Auf Mobile (nicht gepinnt) misst die
  // Komponente am eigenen Element — das ergibt dort den sauberen blass→voll→blass.
  progress?: number
}>()

const el = ref<HTMLElement | null>(null)
const reduced = useReducedMotion()
const isDesktop = useMediaQuery('(min-width: 821px)')
const selfProgress = usePinProgress(el)
const p = computed(() =>
  isDesktop.value && props.progress != null ? props.progress : selfProgress.value,
)

// Glockenkurve: blass beim Eintreten → voll in Bildmitte → wieder blass.
// Smoothstep für kräftigeren Übergang. Reduced motion: statisch voll.
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
  >
    <span class="ink" aria-hidden="true" />
  </figure>
</template>

<style scoped>
.portrait {
  /* blasser Ausgangston, damit das Reinentwickeln deutlich auffällt */
  --portrait-pale: color-mix(in srgb, var(--color-grey-soft) 70%, #fff);

  position: relative;
  margin: 0;
  width: 100%;
  max-width: 380px;
  aspect-ratio: 2679.64 / 3037.39;   /* Hochformat des SVG halten */
  justify-self: center;
  align-self: center;

  /* SVG als Maske → Punkte = Farbe dieses Elements (+ Ink-Ebene) */
  background-color: var(--portrait-pale);
  -webkit-mask: url(/simon-kemmerling.svg) center / contain no-repeat;
  mask: url(/simon-kemmerling.svg) center / contain no-repeat;
}

/* Ink-Ebene: per opacity eingeblendet → Compositor, kein Repaint der Fläche */
.portrait .ink {
  position: absolute;
  inset: 0;
  background-color: var(--color-ink);
  opacity: var(--dev, 0);
}

/* Desktop: großes, kopfdominantes, links blutendes, gepinntes Portrait */
@media (min-width: 821px) {
  .portrait {
    /* Luft zwischen Header und Portrait-Oberkante */
    --portrait-top-gap: var(--space-lg);

    position: sticky;
    top: calc(var(--navh) + var(--portrait-top-gap));
    height: calc(100vh - var(--navh) - var(--portrait-top-gap));
    width: 100%;
    max-width: none;
    aspect-ratio: auto;
    align-self: stretch;

    /* Kopf groß & beschnitten, links bündig (Bleed) */
    -webkit-mask: url(/simon-kemmerling.svg) left top / auto 135% no-repeat;
    mask: url(/simon-kemmerling.svg) left top / auto 135% no-repeat;
  }
}

/* Mobile: vollbreites, kopfdominantes Banner (edge-to-edge), Text darunter */
@media (max-width: 820px) {
  .portrait {
    justify-self: stretch;                     /* Grid-Item füllt den Track */
    margin-inline: calc(-1 * var(--gutter));   /* randlos bis zum Viewport-Rand */
    width: auto;
    max-width: none;
    height: 40vh;
    aspect-ratio: auto;

    -webkit-mask: url(/simon-kemmerling.svg) center 0 / cover no-repeat;
    mask: url(/simon-kemmerling.svg) center 0 / cover no-repeat;
  }
}
</style>
