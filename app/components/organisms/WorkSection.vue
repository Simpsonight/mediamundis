<script setup lang="ts">
import { works } from '~/app/data/works'

// One reveal per element — called at top level of setup (not in loops)
const rLabel = useReveal()
const rIntro = useReveal()
// Four work rows — one reveal each (works.length is statically 4)
const rRow0 = useReveal()
const rRow1 = useReveal()
const rRow2 = useReveal()
const rRow3 = useReveal()
const rRows = [rRow0, rRow1, rRow2, rRow3]
</script>

<template>
  <!-- demo lines 266-318 -->
  <div id="work" class="wrap">
    <!-- Section label with reveal -->
    <div :ref="rLabel.el" :class="{ reveal: true, in: rLabel.shown }">
      <SectionLabel title="Work" />
    </div>

    <!-- Work intro headline with reveal — demo lines 112-114 -->
    <p
      :ref="rIntro.el"
      class="work-intro"
      :class="{ reveal: true, in: rIntro.shown }"
    >Etwas Schweiß, viel Code und <span class="g">zufriedene Kunden.</span>
    </p>

    <!-- Work list: each row wrapped in a reveal div -->
    <div class="work-list">
      <div
        v-for="(w, i) in works"
        :key="w.id"
        :ref="rRows[i]?.el"
        :class="{ reveal: true, in: rRows[i]?.shown }"
      >
        <WorkRow :work="w" />
      </div>
    </div>

    <!-- Clients marquee below work list -->
    <ClientsMarquee />
  </div>
</template>

<style scoped>
/* demo lines 266-318 */

/* demo lines 112-114: large work-intro headline */
.work-intro {
  font-weight: 600;
  font-size: var(--text-work-intro);
  line-height: 0.98;
  letter-spacing: -0.03em;
  max-width: 18ch;
  margin: clamp(20px, 3vw, 40px) 0 clamp(30px, 5vw, 60px);
}

/* demo line 114: grey accent on "zufriedene Kunden." */
.g {
  color: var(--color-grey);
}

/* demo line 115: top border on work list */
.work-list {
  border-top: 1px solid var(--color-line);
}
</style>
