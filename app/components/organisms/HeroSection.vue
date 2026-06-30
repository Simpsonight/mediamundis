<script setup lang="ts">
import { useEventListener, useMediaQuery } from '@vueuse/core'
import { site } from '~/data/site'

// Cursor "light": tints the headline orange within the same radius as the
// dot-field lens, so the type and the dots react to one shared moving light.
const headline = ref<HTMLElement | null>(null)
const finePointer = useMediaQuery('(pointer: fine)')
const reduced = useReducedMotion()

// The orange spotlight clone is rendered client-only on fine pointers, so the
// prerendered HTML keeps a single <h1> (no SEO duplication) and touch/reduced
// devices never mount the effect at all.
const mounted = ref(false)
onMounted(() => { mounted.value = true })
const enhance = computed(() => mounted.value && finePointer.value && !reduced.value)

let raf = 0
let queued = false
let cx = 0
let cy = 0
const SPOT_MARGIN = 140 // keep the mask live a bit beyond the text box

function apply() {
  queued = false
  const el = headline.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const mx = cx - rect.left
  const my = cy - rect.top
  const off = mx < -SPOT_MARGIN || mx > rect.width + SPOT_MARGIN
    || my < -SPOT_MARGIN || my > rect.height + SPOT_MARGIN
  el.style.setProperty('--mx', off ? '-9999px' : `${mx}px`)
  el.style.setProperty('--my', off ? '-9999px' : `${my}px`)
}
function onMove(e: PointerEvent) {
  if (!finePointer.value || reduced.value) return
  cx = e.clientX
  cy = e.clientY
  if (queued) return
  queued = true
  raf = requestAnimationFrame(apply)
}
useEventListener(window, 'pointermove', onMove)
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <header id="top" class="hero">
    <HeroDotField />
    <div class="hero-center wrap">
      <div ref="headline" class="headline">
        <h1 class="hl">{{ site.hero.lead }}<span class="fade">{{ site.hero.faded }}</span></h1>
        <!-- orange duplicate (client-only, desktop-only), revealed through the cursor spotlight mask -->
        <div v-if="enhance" class="hl spot" aria-hidden="true">{{ site.hero.lead }}<span>{{ site.hero.faded }}</span></div>
      </div>
      <p class="hero-sub">{{ site.hero.sub }}</p>
    </div>
    <ScrollCue />
  </header>
</template>

<style scoped>
.hero {
  position: sticky;
  top: 0;
  height: 100svh;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.hero-center {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: var(--navh);
  padding-bottom: clamp(40px, 6vh, 80px);
}

/* 9a: hero entrance */
@keyframes heroRise {
  from { opacity: 0; transform: translateY(24px) }
  to { opacity: 1; transform: none }
}

/* Sweep animates both position and size so the resting state (100% 100%) matches the demo's
   static gradient (ink 35% → grey-soft). Before the animation the gradient is 200% wide and
   shifted right so only the grey-soft tail is visible; it then slides left while shrinking to
   its final 100%-wide resting size. */
@keyframes sweep {
  from {
    background-position: 120% 0;
    background-size: 200% 100%;
  }
  to {
    background-position: 0 0;
    background-size: 100% 100%;
  }
}

/* headline stack: real h1 + orange spotlight clone share one box so they stay aligned */
.headline {
  position: relative;
  animation: heroRise 0.8s cubic-bezier(.2,.7,.2,1) both;
}

/* text-hero token — shared by h1 and the spotlight clone */
.hl {
  font-weight: 600;
  font-size: var(--text-hero);
  line-height: 0.98;
  letter-spacing: -0.03em;
  max-width: 17ch;
  text-wrap: balance;
}

/* gradient fade text — resting size 100% so ink fills 35%, grey-soft fills 65% */
.fade {
  background: linear-gradient(90deg, var(--color-ink) 35%, var(--color-grey-soft));
  background-size: 100% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: sweep 1.1s cubic-bezier(.2,.7,.2,1) both 200ms;
}

/* orange clone, revealed only inside the cursor radius (matches dot-field lens ~120px) */
.spot {
  position: absolute;
  inset: 0;
  color: var(--color-orange);
  -webkit-text-fill-color: var(--color-orange);
  pointer-events: none;
  -webkit-mask-image: radial-gradient(circle 120px at var(--mx, -9999px) var(--my, -9999px), #000 0%, #000 58%, transparent 100%);
  mask-image: radial-gradient(circle 120px at var(--mx, -9999px) var(--my, -9999px), #000 0%, #000 58%, transparent 100%);
}

.hero-sub {
  margin-top: clamp(18px, 2.4vw, 30px);
  font-size: clamp(15px, 1.4vw, 18px);
  color: var(--color-ink-soft);
  font-weight: 500;
  animation: heroRise 0.8s cubic-bezier(.2,.7,.2,1) both 120ms;
}

/* phones: top-align the headline (no dead-centre float) and let the hero be
   shorter than the viewport so the next section peeks → clear scroll affordance */
@media (max-width: 640px) {
  .hero {
    height: auto;
    min-height: 82svh;
  }
  .hero-center {
    flex: none;
    justify-content: flex-start;
    padding-top: calc(var(--navh) + clamp(20px, 7vh, 52px));
    padding-bottom: clamp(36px, 9vh, 72px);
  }
}

/* reduced-motion — static hero, no sticky; explicit final states for animations */
@media (prefers-reduced-motion: reduce) {
  .hero {
    position: static;
    height: auto;
    min-height: 100svh;
  }
  /* global rule kills animations; restore expected visual state */
  .headline,
  .hero-center > .hero-sub {
    opacity: 1;
    transform: none;
  }
  /* no cursor spotlight without motion */
  .spot { display: none; }
  .fade {
    /* reset to demo's static gradient: no sweep, no oversized tile */
    background-size: 100% 100%;
    background-position: 0 0;
  }
}
</style>
