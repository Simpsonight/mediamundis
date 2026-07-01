<script setup lang="ts">
import { works } from '~/data/works'

// One reveal per element — called at top level of setup (not in loops)
const rLabel = useReveal()
const rIntro = useReveal()
// Seven work rows — one reveal each (works.length is statically 7)
const rRow0 = useReveal()
const rRow1 = useReveal()
const rRow2 = useReveal()
const rRow3 = useReveal()
const rRow4 = useReveal()
const rRow5 = useReveal()
const rRow6 = useReveal()
const rRows = [rRow0, rRow1, rRow2, rRow3, rRow4, rRow5, rRow6]
const rCvNote = useReveal()
</script>

<template>
  <div id="work" class="wrap">
    <!-- Section label with reveal -->
    <div :ref="rLabel.el" :class="{ reveal: true, in: rLabel.shown }">
      <SectionLabel title="Projekte" />
    </div>

    <!-- Work intro headline with reveal -->
    <p
      :ref="rIntro.el"
      class="work-intro"
      :class="{ reveal: true, in: rIntro.shown }"
    >Ausgewählte Projekte — <span class="g">Technologie und Ergebnis im Fokus.</span>
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

    <!-- CV note: only relevant for Senior-Verstärkung (team support) inquiries -->
    <p
      :ref="rCvNote.el"
      class="cv-note"
      :class="{ reveal: true, in: rCvNote.shown }"
    >Für Anfragen zur Senior-Verstärkung sende ich auf Wunsch gerne meinen
      <a href="#kontakt">detaillierten Lebenslauf</a> mit weiteren Projekten und Referenzen zu.
    </p>

    <!-- Clients marquee below work list -->
    <ClientsMarquee />
  </div>
</template>

<style scoped>
/* large work-intro headline */
.work-intro {
  font-weight: 600;
  font-size: var(--text-work-intro);
  line-height: 0.98;
  letter-spacing: -0.03em;
  max-width: 18ch;
  text-wrap: balance;
  margin: var(--space-sm) 0 var(--space-md);
}

/* grey accent on "zufriedene Kunden." */
.g {
  color: var(--color-grey);
}

/* top border on work list */
.work-list {
  border-top: 1px solid var(--color-line);
}

/* CV note below the work list */
.cv-note {
  margin-top: var(--space-md);
  max-width: 52ch;
  font-size: clamp(15px, 1.3vw, 18px);
  color: var(--color-ink-soft);
}

.cv-note a {
  color: var(--color-ink);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--color-orange);
  transition: color 0.25s;
}

.cv-note a:hover {
  color: var(--color-orange);
}
</style>
