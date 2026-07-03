<script setup lang="ts">
import { engagements } from '~/data/engagements'

// One reveal per element — called at top level of setup (not in loops)
const rLabel = useReveal()
const rIntro = useReveal()
const rCard0 = useReveal()
const rCard1 = useReveal()
const rCards = [rCard0, rCard1]
</script>

<template>
  <div id="arbeitsweise" class="wrap">
    <!-- Section label with reveal -->
    <div :ref="rLabel.el" :class="{ reveal: true, in: rLabel.shown }">
      <SectionLabel title="Arbeitsweise" />
    </div>

    <!-- Intro headline with reveal -->
    <p
      :ref="rIntro.el"
      class="eng-intro"
      :class="{ reveal: true, in: rIntro.shown }"
    >Zwei Modelle der Zusammenarbeit, <span class="g">ein Ansprechpartner</span>
    </p>

    <!-- Two equal engagement paths -->
    <div class="eng-grid">
      <article
        v-for="(e, i) in engagements"
        :key="e.id"
        :ref="rCards[i]?.el"
        class="eng-card"
        :class="{ reveal: true, in: rCards[i]?.shown }"
      >
        <span class="eng-eyebrow">{{ e.eyebrow }}</span>
        <h3>{{ e.title }}</h3>
        <p class="eng-body">{{ e.body }}</p>
        <ul class="eng-points">
          <li v-for="p in e.points" :key="p">{{ p }}</li>
        </ul>
        <BasePill :to="e.cta.href" :label="e.cta.label" />
      </article>
    </div>
  </div>
</template>

<style scoped>
/* large intro headline — mirrors the work-intro token/scale */
.eng-intro {
  font-weight: 600;
  font-size: var(--text-work-intro);
  line-height: 0.98;
  letter-spacing: -0.03em;
  max-width: 20ch;
  text-wrap: balance;
  margin: var(--space-sm) 0 var(--space-md);
}

/* grey accent on the second half of the headline */
.g {
  color: var(--color-grey);
}

.eng-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(20px, 3vw, 36px);
}

.eng-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  background: var(--color-card);
  border: 1px solid var(--color-line);
  padding: clamp(24px, 3vw, 44px);
  box-shadow: 0 10px 40px -24px rgba(20, 22, 26, 0.30);
  transition: border-color 0.3s var(--ease-brand), transform 0.35s var(--ease-brand), box-shadow 0.35s var(--ease-brand);
}

.eng-card:hover {
  border-color: var(--color-ink);
  transform: translateY(-2px);
  box-shadow: 0 18px 50px -28px rgba(20, 22, 26, 0.40);
}

.eng-eyebrow {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-grey-strong);
  font-weight: 600;
}

.eng-card h3 {
  font-weight: 600;
  font-size: var(--text-card-title);
  line-height: 0.98;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.eng-body {
  font-size: var(--text-card-body);
  line-height: 1.4;
  color: var(--color-ink-soft);
  font-weight: 500;
}

.eng-points {
  list-style: none;
  padding: 0;
  margin: 4px 0 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.eng-points li {
  position: relative;
  padding-left: 22px;
  font-size: 15px;
  color: var(--color-ink);
  font-weight: 500;
}

/* orange marker */
.eng-points li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 0.55em;
  width: 8px;
  height: 8px;
  background: var(--color-orange);
}

/* push the CTA to the card's bottom edge so both cards align */
.eng-card :deep(.pill) {
  margin-top: auto;
}

/* stack on mobile/tablet */
@media (max-width: 820px) {
  .eng-grid {
    grid-template-columns: 1fr;
  }
}
</style>
