<script setup lang="ts">
import { clients } from '~/data/clients'
</script>

<template>
  <div class="clients">
    <!-- Label is visible and readable by AT -->
    <p class="lbl">Vertrauen von</p>

    <!-- Marquee container: aria-hidden because the track is duplicated + animated -->
    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        <!-- First pass: real items -->
        <ClientLogo v-for="c in clients" :key="c.name" :client="c" />
        <!-- Second pass: duplicate for seamless loop -->
        <ClientLogo v-for="c in clients" :key="`dup-${c.name}`" :client="c" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.clients {
  padding: var(--space-lg) 0 0;
}

.lbl {
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-grey-strong);
  font-weight: 600;
  margin-bottom: 26px;
}

/* overflow + edge mask */
.marquee {
  position: relative;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
}

/* infinite scrolling track */
.marquee-track {
  display: flex;
  align-items: center;
  gap: clamp(44px, 6vw, 92px);
  width: max-content;
  animation: scroll 34s linear infinite;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes scroll {
  to { transform: translateX(-50%); }
}

/* reduced-motion: stop animation entirely */
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
