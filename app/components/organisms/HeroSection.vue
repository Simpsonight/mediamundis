<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <header id="top" class="hero">
    <HeroDotField />
    <div class="hero-center wrap">
      <h1>{{ site.hero.lead }}<span class="fade">{{ site.hero.faded }}</span></h1>
      <p class="hero-sub">{{ site.hero.sub }}</p>
    </div>
    <ScrollCue />
  </header>
</template>

<style scoped>
/* demo lines 49-65, 193-200 */
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

/* demo line 56: text-hero token */
h1 {
  font-weight: 600;
  font-size: var(--text-hero);
  line-height: 0.98;
  letter-spacing: -0.03em;
  max-width: 17ch;
  text-wrap: balance;
  animation: heroRise 0.8s cubic-bezier(.2,.7,.2,1) both;
}

/* demo lines 57-58: gradient fade text — resting size 100% so ink fills 35%, grey-soft fills 65% */
.fade {
  background: linear-gradient(90deg, var(--color-ink) 35%, var(--color-grey-soft));
  background-size: 100% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: sweep 1.1s cubic-bezier(.2,.7,.2,1) both 200ms;
}

/* demo line 59 */
.hero-sub {
  margin-top: clamp(18px, 2.4vw, 30px);
  font-size: clamp(15px, 1.4vw, 18px);
  color: var(--color-ink-soft);
  font-weight: 500;
  animation: heroRise 0.8s cubic-bezier(.2,.7,.2,1) both 120ms;
}

/* demo lines 170-176: reduced-motion — static hero, no sticky; explicit final states for animations */
@media (prefers-reduced-motion: reduce) {
  .hero {
    position: static;
    height: auto;
    min-height: 100svh;
  }
  /* global rule kills animations; restore expected visual state */
  .hero-center > h1,
  .hero-center > .hero-sub {
    opacity: 1;
    transform: none;
  }
  .fade {
    /* reset to demo's static gradient: no sweep, no oversized tile */
    background-size: 100% 100%;
    background-position: 0 0;
  }
}
</style>
