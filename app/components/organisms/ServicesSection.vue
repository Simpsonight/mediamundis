<script setup lang="ts">
import { services } from '~/data/services'

const rLabel = useReveal()
</script>

<template>
  <div id="leistungen" class="wrap">
    <!-- SectionLabel wrapped in reveal element -->
    <div :ref="rLabel.el" :class="{ reveal: true, in: rLabel.shown }">
      <SectionLabel title="Leistungen" />
    </div>

    <div class="stack">
      <ServiceCard
        v-for="s in services"
        :key="s.id"
        :service="s"
      />
    </div>
  </div>
</template>

<style scoped>
/* stacking sticky service cards */
/* position:sticky is set here (section owns the behavior); :deep() pierces component boundary */
:deep(.card) {
  position: sticky;
}

/* desktop: staggered top offsets — nth-child on direct children of .stack */
/* ServiceCard root is article.card, so these selectors target the rendered article elements */
.stack :deep(.card:nth-child(1)) {
  top: calc(var(--navh) + 16px);
}
.stack :deep(.card:nth-child(2)) {
  top: calc(var(--navh) + 40px);
}
.stack :deep(.card:nth-child(3)) {
  top: calc(var(--navh) + 64px);
}

/* mobile — all cards same top */
@media (max-width: 820px) {
  .stack :deep(.card:nth-child(1)),
  .stack :deep(.card:nth-child(2)),
  .stack :deep(.card:nth-child(3)) {
    top: calc(var(--navh) + 12px);
  }
}

/* reduced-motion: static cards, no sticky */
@media (prefers-reduced-motion: reduce) {
  :deep(.card) {
    position: static;
  }
}
</style>
